// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/fonts/icon/style.css",
    "~/assets/css/tailwind.css",
    "~/assets/css/Main.scss",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "vue3-carousel-nuxt",
    "@nuxtjs/turnstile",
  ],

  turnstile: {
    siteKey: "0x4AAAAAAAM0C-69dCKvEr7f",
  },
  runtimeConfig: {
    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: "0x4AAAAAAAM0C6xq5pIXGpxx7uu_Uzr23Mw",
    },
  },

  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },

  nitro: {
    devServer: {
      // My files are under src, if yours are in the root you can change this to ./
      watch: ["./"],
    },
  },
});
