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

  markdown: {
    config: (md) => {
      // use more markdown-it plugins!
      md.use(markdownItImsize);
    }
  },

  // Common theme options for all languages.
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    logo: 'icon.png',

    externalLinkIcon: true,

    sidebar: {
      "/nl/faq": getSidebar({ topTitle: "FAQ", directory: "nl/faq", overview: "FAQ" }),
      "/nl/guides": getSidebar({ directory: "nl/guides", overview: "Overzicht" }),
      "/nl/references": getSidebar({ topTitle: "Referenties", directory: "nl/references", overview: "Overzicht" }),
      "/en/faq": getSidebar({ topTitle: "FAQ", directory: "en/faq", overview: "FAQ" }),
      "/en/guides": getSidebar({ directory: "en/guides", overview: "Overview" }),
      "/en/references": getSidebar({ topTitle: "References", directory: "en/references", overview: "Overview" }),
    },

    search: {
      provider: 'algolia',
      options: {
        apiKey: '60f1ac41f6f49d989a3b3c500aba3481',
        appId: 'GN7X16QWOE',
        indexName: 'dodona-edu',
        locales: {
          nl: {
            placeholder: 'Zoeken',
            translations: {
              button: {
                buttonText: 'Zoeken',
                buttonAriaLabel: 'Zoeken'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: 'Zoekopdracht wissen',
                  resetButtonAriaLabel: 'Zoekopdracht wissen',
                  cancelButtonText: 'Annuleren',
                  cancelButtonAriaLabel: 'Annuleren'
                },
                startScreen: {
                  recentSearchesTitle: 'Zoekgeschiedenis',
                  noRecentSearchesText: 'Geen zoekgeschiedenis',
                  saveRecentSearchButtonTitle: 'Opslaan in zoekgeschiedenis',
                  removeRecentSearchButtonTitle: 'Verwijderen uit zoekgeschiedenis',
                  favoriteSearchesTitle: 'Favorieten',
                  removeFavoriteSearchButtonTitle: 'Verwijderen uit favorieten'
                },
                errorScreen: {
                  titleText: 'Kon geen resultaten ophalen',
                  helpText: 'Controleer uw netwerkverbinding'
                },
                footer: {
                  selectText: 'selecteren',
                  navigateText: 'navigeren',
                  closeText: 'sluiten',
                  searchByText: 'Zoeken door'
                },
                noResultsScreen: {
                  noResultsText: 'Geen resultaten voor',
                  suggestedQueryText: 'Probeer te zoeken naar',
                  reportMissingResultsText: 'Ontbreken er resultaten?',
                  reportMissingResultsLinkText: 'Klik op Feedback'
                }
              }
            }
          }
        }
      }
    },

    footer: {
      message: "Made by Team Dodona with ❤️"
    },

    docFooter: {
      prev: false,
      next: false
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/dodona_edu' },
      { icon: 'github', link: 'https://github.com/dodona-edu/dodona' }
    ]
  },

  // Language-specific overrides and options
  locales: {
    nl: {
      lang: 'nl',
      label: 'Nederlands',
      themeConfig: {
        nav: [
          {
            text: 'Nieuws',
            link: 'https://github.com/orgs/dodona-edu/discussions?discussions_q=category%3AAnnouncements+category%3A%22Release+notes%22'
          },
          { text: 'FAQ', link: '/nl/faq/', activeMatch: "/nl/faq/*" },
          { text: 'Handleidingen', link: '/nl/guides/general/getting-started/', activeMatch: "/nl/guides/*" },
          { text: 'Referenties', link: '/nl/references/', activeMatch: "/nl/references/*" }
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
          {
            text: 'News',
            link: 'https://github.com/orgs/dodona-edu/discussions?discussions_q=category%3AAnnouncements+category%3A%22Release+notes%22'
          },
          { text: 'FAQ', link: '/en/faq/', activeMatch: "/en/faq/*" },
          { text: 'Guides', link: '/en/guides/general/getting-started/', activeMatch: "/en/guides/*" },
          { text: 'References', link: '/en/references/', activeMatch: "/en/references/*" },
        ],
        outline: {
          level: [2, 3],
        }
      },
    }
  },
});
