import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const userAgent = process.server ? "server-side" : navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const isChrome = /chrome|crios/i.test(userAgent);
  const isFirefox = /firefox/i.test(userAgent);
  // Add more conditions here to check for other browsers

  return {
    provide: {
      isSafari: () => isSafari,
      isChrome: () => isChrome,
      isFirefox: () => isFirefox,
      // Provide other browser checks here
    },
  };
});
