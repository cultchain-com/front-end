// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // buildAssetsDir: "/something/",
    head: {
      // htmlAttrs: { dir: "rtl", lang: "fa" },
      link: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-32x32.png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon-16x16.png",
          sizes: "16*16",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    },
  },
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
    "nuxt-simple-sitemap",
    "nuxt-simple-robots",
    "nuxt-schema-org",
    "@stefanobartoletti/nuxt-social-share",
  ],
  // optional configuration
  socialShare: {
    // module options
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "sitemap.xml"],
      ignore: ["/tak", "/konfiguration", "/checkout"],
    },
  },
  site: {
    url: "https://cultchain.com/",
    name: "CultChain",
  },
  sitemap: {
    sources: ["/api/sitemap"],
    autoLastmod: true,
  },

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
});
