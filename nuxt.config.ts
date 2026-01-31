// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/",
    buildAssetsDir: 'assets', // Avoid underscores (e.g., '_nuxt') as GitHub Pages may ignore them
    // pageTransition: { name: 'page', mode: 'out-in' },
  },
  nitro: {
    preset: 'github-pages'
  },
  image: {
    // This prevents the /_ipx/ prefix and uses original paths
    provider: 'none' 
  },
  ssr: false,
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@pinia/nuxt',
  ],
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons'
    }]
  },

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
    theme: {
      colors: [
        'primary',
        'secondary',
        'tertiary',
        'info',
        'success',
        'warning',
        'error'
      ]
    }
  },
  vite: {
    build: {
      rollupOptions: {
        // Prevents Vite from trying to process these as JS modules
        // external: [/^\/img\//] 
      }
    }
  },
  content: {
    renderer: {
      anchorLinks: false,
    }
  }
})