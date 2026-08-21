import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

// The sidebar (see sidebar.ts) is built once, when the VitePress config is
// evaluated, by walking the en/ and nl/ directories. VitePress already
// restarts its dev server whenever `.vitepress/config.ts` (or one of its
// imports) changes, but it has no way to know that config.ts's *output*
// also depends on the content tree: sidebar.ts reads directory listings and
// frontmatter (title, sidebarTitle, order, skipIndex) via plain fs calls,
// which Vite's module graph can't see. So adding/removing a page, or
// editing its frontmatter, does not update the sidebar until the dev
// server is restarted by hand.
//
// Rather than reimplementing VitePress's restart logic (Vite's own
// `server.restart()` just re-applies the already-resolved config and does
// NOT re-run config.ts), we piggyback on the existing mechanism: touching
// config.ts's mtime produces a real "change" event that VitePress's own
// watcher already treats as "config changed, restart and re-resolve".
//
// See https://github.com/dodona-edu/dodona-edu.github.io/issues/260.

const WATCHED_DIRS = ["en", "nl"];
const DEBOUNCE_MS = 100;

function isRelevant(root: string, file: string): boolean {
  if (!file.endsWith(".md")) return false;
  const relative = path.relative(root, file);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return false;
  const topLevelDir = relative.split(path.sep)[0];
  return WATCHED_DIRS.includes(topLevelDir);
}

export function sidebarHotReload(): Plugin {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return {
    name: "dodona-sidebar-hot-reload",
    configureServer(server) {
      const root = server.config.root;
      const configPath = path.join(root, ".vitepress", "config.ts");

      const touchConfig = () => {
        timer = undefined;
        const now = new Date();
        try {
          fs.utimesSync(configPath, now, now);
        } catch {
          // config.ts should always exist; ignore if it doesn't.
        }
      };

      const handle = (file: string) => {
        if (!isRelevant(root, file)) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(touchConfig, DEBOUNCE_MS);
      };

      server.watcher.on("add", handle);
      server.watcher.on("unlink", handle);
      server.watcher.on("change", handle);
    },
  };
}
