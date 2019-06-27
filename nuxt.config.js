module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Service Mobile',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Магазин техники Service Mobile' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/main.css'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3e64ea' },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
      } else {
        const position = {}
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
          position.selector = to.hash
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
          // cords will be used if no selector is provided,
          // or if the selector didn't match any element.
          position.x = 0
          position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position
      }
    }
  },
  plugins: [
    { ssr: false, src: '~plugins/string-cut' },
    '~/plugins/firebase',
    {src: '~/plugins/vuelidate'}
  ]
}
