const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Dodona Docs',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  locales: {
    '/': {
      lang: 'nl-BE',
      title: 'Dodona Docs'
    }, 
    '/en/': {
      lang: 'en-US',
      title: 'Dodona Docs'
    }
  },

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    locales: {
      '/': {
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
          { text: 'Nieuws', link: '/news/' },
          { text: 'Handleidingen', link: '/guides/' },
          { text: 'Referenties', link: '/references/' },
          { text: 'Dodona', link: 'https://dodona.ugent.be' }
        ],
        sidebar: {
          '/': getGeneralSidebar()
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
  ]
}

function getGeneralSidebar() {
  return [
    '',
    'news/',
    'guides/',
    'references/'
  ]
}
