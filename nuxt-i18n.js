import en from "./locales/en";
import fa from "./locales/fa";
import ar from "./locales/ar";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "en",
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: "en",
        file: "en.js",
      },
      {
        code: "fa",
        file: "fa.js",
      },
      {
        code: "ar",
        file: "ar.js",
      },
    ],
    messages: {
      en,
      fa,
      ar,
    },
  };
});
