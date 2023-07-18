import fs from "node:fs";
// @ts-ignore
import matter from 'gray-matter';
import type { DefaultTheme } from "vitepress";

export interface Options {
  directory: string;
  overview: string;
  uncollapsed?: string;
  topTitle ?: string;
}

type SortableSidebarItem = [number, DefaultTheme.SidebarItem];

function sortSidebarItems(items: SortableSidebarItem[]): DefaultTheme.SidebarItem[] {
  return items
      .sort((a, b) => a[0] - b[0] || a[1].text.localeCompare(b[1].text))
      .map(i => i[1]);
}

function getSidebarItems(directory: string, options: Options): SortableSidebarItem[] {
  const sidebarItems: Array<SortableSidebarItem> = [];
  const subitems = fs.readdirSync(directory);

  for (const subitemName of subitems) {
    let subitem = directory + "/" + subitemName;
    if (fs.statSync(subitem).isDirectory()) {
      // If there is no index page, skip the directory.
      const indexPage = subitem + "/index.md";
      if (!fs.existsSync(indexPage)) {
        console.warn(`${subitem} folder does not contain index.md or README.md, skipping in sidebar.`);
        continue;
      }
      const data = matter.read(indexPage);
      const title = data.data.sidebarTitle ?? data.data.title ?? "";
      const order = data.data.order ?? Infinity;
      const otherChildren = sortSidebarItems(getSidebarItems(subitem, options));

      if (otherChildren.length === 0) {
        // There is one special case: a folder containing only an "index.md" file.
        // In that case, we don't use a subfolder and directly link to the file instead.
        sidebarItems.push([order, {
          text: title,
          link: "/" + subitem + "/"
        }]);
      } else {
        // In this case, there are other files or subfolders in the folder.
        // We then add a special "overview" page to the subitems, followed by the other items.
        const childItems: DefaultTheme.SidebarItem[] = [];
        if (!data.data.skipIndex) {
          childItems.push({
            text: options.overview,
            link: "/" + subitem + "/"
          });
        }
        sidebarItems.push([order, {
          text: title,
          items: childItems.concat(otherChildren),
          collapsed: subitem !== directory + "/" + (options?.uncollapsed ?? "")
        }]);
      }
    } else {
      if (!subitem.endsWith(".md") || subitem.endsWith("index.md")) {
        continue;
      }
      const data = matter.read(subitem);
      const title = data.data.sidebarTitle ?? data.data.title ?? "";
      const order = data.data.order ?? Infinity;
      sidebarItems.push([order, {
        text: title,
        link: "/" + subitem
      }]);
    }
  }

  return sidebarItems;
}

export function getSidebar(options: Options): DefaultTheme.SidebarItem[] {
  const items = getSidebarItems(options.directory, options);
  const sortedItems = sortSidebarItems(items);
  if (options.topTitle) {
    return [{
      text: options.topTitle,
      items: sortedItems
    }]
  } else {
    return sortedItems;
  }
}
