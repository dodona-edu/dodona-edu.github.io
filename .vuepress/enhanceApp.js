/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  router.addRoutes([
    { path: '/nl/guides/getting-started/', redirect: '/nl/guides/teachers/getting-started/' },
    { path: '/en/guides/getting-started/', redirect: '/en/guides/teachers/getting-started/' },
    { path: '/ufora/', redirect: '/nl/guides/teachers/ufora/' },
    { path: '/nl/ufora/', redirect: '/nl/guides/teachers/ufora/' },
    { path: '/en/ufora/', redirect: '/en/guides/teachers/ufora/' }
  ])
}
