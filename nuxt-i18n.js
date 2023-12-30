import en from "./locales/en.json";
import fa from "./locales/fa.json";

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: "en",
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fa",
        file: "fa.json",
      },
    ],
    messages: {
      en,
      fa,
    },
  };
});
