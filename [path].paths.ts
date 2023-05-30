/**
 * Redirects various things.
 *
 * We need this, as GitHub Actions doesn't support server-side redirects,
 * and VitePress doesn't want to support this.
 */

import path from 'node:path';
import { Dirent, readdirSync } from "node:fs";


// Custom redirects.
const redirects = {
    'guides/getting-started': 'guides/teachers/getting-started',
    'nl/guides/getting-started': 'nl/guides/teachers/getting-started',
    'en/guides/getting-started': 'en/guides/teachers/getting-started',
    'ufora': 'guides/teachers/ufora',
    'nl/ufora': 'nl/guides/teachers/ufora',
    'en/ufora': 'en/guides/teachers/ufora'
};


function recursiveReadMd(directory: string): string[] {
    const allThePaths: Dirent[] = readdirSync(directory, { withFileTypes: true });
    const results: string[] = [];
    for (const aPath of allThePaths) {
        const result = path.join(directory, aPath.name);
        if (aPath.isDirectory()) {
            results.push(...recursiveReadMd(result));
        } else if (result.endsWith(".md")) {
            results.push(result);
        }
    }
    return results;
}

/**
 * Redirects pages without languages.
 *
 * For example:
 *
 * /guides -> /nl/guides
 * / -> /en/
 */
function getLanguageRedirects(): { params: Record<string, any> }[] {
    return recursiveReadMd("nl")
        .map((foundPath) => {
            return {
                params: {
                    // Strips the nl/ part at the front and the .md at the back.
                    path: foundPath.substring("nl/".length, foundPath.length - 3),
                    reason: 'translation'
                }
            };
        });
}

function getCustomRedirects(): { params: Record<string, any> }[] {
    const result = [];
    for (const [from, to] of Object.entries(redirects)) {
        result.push({
            params: {
                path: from,
                reason: 'redirect',
                to: to
            }
        }, {
            params: {
                path: from + "/index",
                reason: 'redirect',
                to: to
            }
        });
    }
    return result;
}

/**
 * Redirects pages without trailing slash to a trailing slash.
 *
 * While GitHub Pages does support this, the VitePress dev server does not.
 */
function getTrailingSlashRedirects(): { params: Record<string, any> }[] {
    // We want the original files
    const nl = recursiveReadMd("nl");
    const originals = nl.concat(recursiveReadMd("en"));
    // We also want to do this for the "non-language" pages
    const nonLanguage = nl.map(p => p.substring("nl/".length));
    // We also want to do this for the redirect pages...
    return originals.concat(nonLanguage)
        .filter(foundPath => foundPath.endsWith("/index.md"))
        .map((foundPath) => {
            // We want to strip "/index.md" at the end of the url.
            const redirector = foundPath.substring(0, foundPath.length - "/index.md".length);
            return {
                params: {
                    path: redirector,
                    reason: "trailing-slash"
                }
            };
        });
}

export default {
    paths() {
        return getLanguageRedirects().concat(getTrailingSlashRedirects()).concat(getCustomRedirects());
    }
};
