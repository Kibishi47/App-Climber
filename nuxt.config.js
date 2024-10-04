export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  devtools: { enabled: true },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AppClimber',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  googleFonts: {
    families: {
      Roboto: true,
      Lato: [100, 300],
      // Ajoutez les polices que vous souhaitez utiliser ici
    }
  },

  image: {
    // Configuration du module Nuxt Image
  },

  pinia: {
    // Configuration pour Pinia si nécessaire
  }
}
