import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)
import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8001,
  },
  devtools: { enabled: true },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_APP_NAME: process.env.NUXT_PUBLIC_APP_NAME || "YOUR_APP_NAME",
      NUXT_PUBLIC_API_ENDPOINT: process.env.NUXT_PUBLIC_API_ENDPOINT || "YOUR_API_ENDPOINT",
    }
  },
  // exp
  experimental: {
    localLayerAliases: true,
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: `Carbon`,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: process.env.APP_DESCRIPTION || "Carbon",
        }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "192x192" },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' },
      ],
    },
  },

  // plugins
  plugins: [
  ],

  modules: [
    '@pinia/nuxt',
    '@ant-design-vue/nuxt',
    '@nuxtjs/google-fonts',
  ],

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  googleFonts: {
    families: {
      Poppins: true,
    },
  },

  css: [
  ],

  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
      pathPrefix: false,
    }
  ],
})
