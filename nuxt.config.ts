// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: '2024-01-01',

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
  },

  i18n: {
    locales: [
      { code: 'ru', name: 'Русский' },
      { code: 'en', name: 'English' },
    ],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },

  app: {
    head: {
      title: 'FiberFlow — Личный кабинет абонента',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },
})
