const { description } = require('../package')
const fs = require("fs");
const path = require("path");

module.exports = {
  title: 'Dodona Docs',
  description: description,

  locales: {
    '/nl/': {
      lang: 'nl-BE',
      title: 'Dodona Docs'
    }, 
    '/en/': {
      lang: 'en-US',
      title: 'Dodona Docs'
    }
  },

  head: [
    ['meta', { name: 'theme-color', content: '#1976d2' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    smoothScroll: true,
    nextLinks: false,
    prevLinks: false,
    algolia: {
      apiKey: '6479590fc338465f3439cfe6ef357683',
      indexName: 'dodona-edu'
    },
    locales: {
      '/nl/': {
        label: 'Nederlands',
        selectText: '🌐',
        editLinkText: 'Bewerken op GitHub',
        serviceWorker: {
          updatePopup: {
            message: "Nieuwe inhoud is beschikbaar.",
            buttonText: "Herladen"
          }
        },
        nav: [
          { text: 'Nieuws', link: '/nl/news/' },
          { text: 'Handleidingen', link: '/nl/guides/' },
          { text: 'Referenties', link: '/nl/references/' },
          { text: 'Dodona', link: 'https://dodona.ugent.be' }
        ],
        sidebar: {
          '/nl/news/': getNewsSidebar('nl', 'Nieuws', 'Overzicht'),
          '/nl/guides/': getGuidesSidebar('nl', 'Handleidingen', 'Overzicht'),
          '/nl/references/': getReferencesSidebar('nl', 'Referenties', 'Overzicht'),
          '/nl/': getGeneralSidebar()
        }
      },
      '/en/': {
        label: 'English',
        selectText: '🌐',
        nav: [
          { text: 'News', link: '/en/news/' },
          { text: 'Guides', link: '/en/guides/' },
          { text: 'References', link: '/en/references/' },
          { text: 'Dodona', link: 'https://dodona.ugent.be' }
        ],
        sidebar: {
          '/en/news/': getNewsSidebar('en', 'News', 'Overview'),
          '/en/guides/': getGuidesSidebar('en', 'Guides', 'Overview'),
          '/en/references/': getReferencesSidebar('en', 'References', 'Overview'),
          '/en/': getGeneralSidebar()
        }
      },
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      'vuepress-plugin-redirect',
      {
        // provide i18n redirection
        // it will automatically redirect `/foo/bar/` to `/:locale/foo/bar/` if exists
        locales: true,
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-76309350-2'
      }
    ]
  ],

  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-imsize'));
    }
  }
}

function getGeneralSidebar() {
  return [
    '',
    'news/',
    'guides/',
    'references/'
  ]
}

function getNewsSidebar(lang, groupTitle, FirstItem) {
  return [
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', FirstItem],
        ...getNewsLinks()
      ]
    },
    `/${lang}/guides/`,
    `/${lang}/references/`
  ]
}

function getGuidesSidebar(lang, groupTitle, FirstItem) {
  return [
    `/${lang}/news/`,
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', FirstItem],
        'getting-started/',
        'pycharm-plugin/',
        'new-exercise-repo/',
        'the-coders-apprentice/',
        'creating-an-api-token/',
        'creating-a-judge/'
      ]
    },
    `/${lang}/references/`
  ]
}

function getReferencesSidebar(lang, groupTitle, FirstItem) {
  return [
    `/${lang}/news/`,
    `/${lang}/guides/`,
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', FirstItem],
        'repository-directory-structure/',
        'exercise-description/',
        'exercise-config/',
        'exercise-directory-structure/'
      ]
    }
  ]
}

function getNewsLinks() {
  return fs
    .readdirSync(path.join(`${__dirname}/../nl/news`), {withFileTypes: true})
    .filter(item => item.isDirectory())
    .map(item => item.name + "/")
    .reverse()
    .slice(0, 5);
}