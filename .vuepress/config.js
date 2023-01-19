const { description } = require('../package')
const fs = require("fs");
const path = require("path");
const { loadLanguages } = require("./extendPrism")
loadLanguages();

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
      apiKey: '60f1ac41f6f49d989a3b3c500aba3481',
      appId: 'GN7X16QWOE',
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
          { text: 'TESTed', link: '/nl/tested/' },
          { text: 'Dodona', link: 'https://dodona.ugent.be' }
        ],
        sidebar: {
          '/nl/news/': getNewsSidebar('nl', 'Nieuws', 'Overzicht'),
          '/nl/guides/': getGuidesSidebar('nl', 'Handleidingen', 'Overzicht', 'Voor studenten', 'Voor leerkrachten'),
          '/nl/references/': getReferencesSidebar('nl', 'Referenties', 'Overzicht'),
          '/nl/tested/': getTESTedSidebar('nl', 'TESTed-judge', 'Overzicht'),
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
          { text: 'TESTed', link: '/en/tested/' },
          { text: 'Dodona', link: 'https://dodona.ugent.be' }
        ],
        sidebar: {
          '/en/news/': getNewsSidebar('en', 'News', 'Overview'),
          '/en/guides/': getGuidesSidebar('en', 'Guides', 'Overview', 'For students', 'For teachers'),
          '/en/references/': getReferencesSidebar('en', 'References', 'Overview'),
          '/en/tested/': getTESTedSidebar('en', 'TESTed judge', 'Overview'),
          '/en/': getGeneralSidebar()
        }
      },
    }
  },

  /**
   * Apply plugins, ref: https://v1.vuepress.vuejs.org/plugin/
   */
  plugins: [
    [
      'vuepress-plugin-tabs',
      {
        // Prevent multiple tabs with the same name having the same ID.
        dedupeIds: true,
        tabsAttributes: {
          options: {
            useUrlFragment: false
          }
        }
      },
    ],
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
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
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
};

function getGeneralSidebar() {
  return [
    '',
    'news/',
    'guides/',
    'references/',
    'tested/'
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
    `/${lang}/references/`,
    `/${lang}/tested/`,
  ]
}

function getGuidesSidebar(lang, groupTitle, FirstItem, studentGuideItem, teacherGuideItem) {
  return [
    `/${lang}/news/`,
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 1,
      initialOpenGroupIndex: -1,
      children: [
        ['', FirstItem],
        {
          title: studentGuideItem,
          collapsable: false,
          path: `/${lang}/guides/students/getting-started/`,
          sidebarDepth: 1,
          initialOpenGroupIndex: -1,
          children: [
            'students/getting-started/',
            'students/login-and-settings/',
            'students/courses/',
            'students/exercises/',
          ]
        },
        {
          title: teacherGuideItem,
          collapsable: false,
          path: `/${lang}/guides/teachers/getting-started/`,
          sidebarDepth: 1,
          initialOpenGroupIndex: -1,
          children: [
            'teachers/getting-started/',
            'teachers/creating-a-course/',
            'teachers/course-management/',
            'teachers/user-management/',
            'teachers/exercise-series-management/',
            'teachers/grading/',
            'teachers/new-exercise-repo/',
            'teachers/ufora/',
          ]
        },
        'pycharm-plugin/',
        'vs-code-extension/',
        'the-coders-apprentice/',
        'creating-an-api-token/',
        'creating-a-judge/'
      ]
    },
    `/${lang}/references/`,
    `/${lang}/tested/`
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
        'exercise-description/',
        'exercise-config/',
        'repository-directory-structure/',
        'exercise-directory-structure/',
        'python-judge/',
      ]
    },
    `/${lang}/tested/`
  ]
}

function getTESTedSidebar(lang, groupTitle, FirstItem) {
  return [
    `/${lang}/news/`,
    `/${lang}/guides/`,
    `/${lang}/references/`,
    {
      title: groupTitle,
      collapsable: false,
      sidebarDepth: 1,
      children: [
        // These URLs should be stable, since they are published.
        ['', FirstItem],
        'exercise-config/',
        'json/',
        'types/',
        'new-programming-language/',
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
