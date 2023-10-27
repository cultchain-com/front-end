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
  modules: ["@pinia/nuxt", "@element-plus/nuxt", "vue3-carousel-nuxt"],

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
