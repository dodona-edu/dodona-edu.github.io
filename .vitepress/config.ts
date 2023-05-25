import { defineConfig } from 'vitepress';
import packageInfo from '../package.json';
import { getSidebar } from "./sidebar";
import markdownItImsize from "markdown-it-imsize";


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dodona Docs",
  description: packageInfo.description,
  head: [
    ['meta', { name: 'theme-color', content: '#0061a6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  lastUpdated: false,

  // Redirect language-less pages to nl.
  rewrites: {},

  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(markdownItImsize)
    }
  },

  // Common theme options for all languages.
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: 'icon.png',

    sidebar: {
      "/nl/guides": getSidebar({ directory: "nl", overview: "Overzicht", uncollapsed: "guides" }),
      "/nl/references": getSidebar({ directory: "nl", overview: "Overzicht", uncollapsed: "references" }),
      "/nl/tested": getSidebar({ directory: "nl", overview: "Overzicht", uncollapsed: "tested" }),
      "/en/guides": getSidebar({ directory: "en", overview: "Overview", uncollapsed: "guides" }),
      "/en/references": getSidebar({ directory: "en", overview: "Overview", uncollapsed: "references" }),
      "/en/tested": getSidebar({ directory: "en", overview: "Overview", uncollapsed: "tested" }),
    },

    search: {
      provider: 'algolia',
      options: {
        apiKey: '60f1ac41f6f49d989a3b3c500aba3481',
        appId: 'GN7X16QWOE',
        indexName: 'dodona-edu'
      }
    },

    footer: {
      message: "Made by Team Dodona with ❤️"
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/dodona-edu/dodona' }
    // ]
  },

  // Language-specific overrides and options
  locales: {
    nl: {
      lang: 'nl',
      label: 'Nederlands',
      themeConfig: {
        nav: [
          { text: 'Nieuws', link: 'https://github.com/orgs/dodona-edu/discussions?discussions_q=category%3AAnnouncements+category%3A%22Release+notes%22' },
          { text: 'Handleidingen', link: '/nl/guides/', activeMatch: "/nl/guides/*" },
          { text: 'Referenties', link: '/nl/references/', activeMatch: "/nl/references/*" },
          { text: 'TESTed', link: '/nl/tested/', activeMatch: "/nl/tested/*" },
        ],
        outline: {
          level: [2, 3],
          label: "Op deze pagina"
        },
        returnToTopLabel: "Terug omhoog",
        darkModeSwitchLabel: "donkere modus aan/uit",
      }
    },
    en: {
      lang: 'en',
      label: 'English',
      themeConfig: {
        nav: [
          { text: 'News', link: 'https://github.com/orgs/dodona-edu/discussions?discussions_q=category%3AAnnouncements+category%3A%22Release+notes%22' },
          { text: 'Guides', link: '/en/guides/', activeMatch: "/en/guides/*" },
          { text: 'References', link: '/en/references/', activeMatch: "/en/references/*" },
          { text: 'TESTed', link: '/en/tested/', activeMatch: "/en/tested/*" },
        ],
        outline: {
          level: [2, 3],
        }
      },
    }
  },
});
