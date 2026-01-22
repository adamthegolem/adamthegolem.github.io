// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    buildAssetsDir: 'assets', // Avoid underscores (e.g., '_nuxt') as GitHub Pages may ignore them
  },
  nitro: {
    preset: 'github-pages'
  },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  ui: {
    
  },
  vite: {
    build: {
      rollupOptions: {
        // Prevents Vite from trying to process these as JS modules
        external: [/^\/img\//] 
      }
    }
  }
})