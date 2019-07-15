module.exports = {
  /*
  ** Headers of the page
  */
  build: {
    vendor: ['axios']
  },
  head: {
    title: 'Service Mobile',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Магазин техники Service Mobile' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      { rel: 'icon', type: 'image/png', href: './favicon.png' }
    ]
  },
  css: ['~/assets/main.css'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3e64ea' },
  plugins: [
    { ssr: false, src: '~plugins/string-cut' },
    '~/plugins/firebase',
    {src: '~/plugins/vuelidate'},
    {src: '~/plugins/axios'},
    {src: '~/plugins/searchBar'}
  ],
  axios: {
    /* set API_URL environment variable to configure access to the API
    */
    baseURL: process.env.API_URL || 'http://localhost:3000/',
    redirectError: {
      404: '/notfound'
    }
  }
}
