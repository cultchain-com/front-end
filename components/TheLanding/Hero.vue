<template>
  <div
    class="gap-2 justify-between items-center py-[80px] grid lg:grid-cols-2 grid-cols-1"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1
        class="lg:text-[67px] text-3xl text-Gray-b5 dark:text-LightGray-b5 font-bold lg:leading-[80px] leading-10"
      >
        {{ $t("Landing_Hero_heading") }}
      </h1>
      <p class="text-Gray-b5 dark:text-LightGray-b5 text-base leading-8">
        {{ $t("Landing_Hero_description") }}
      </p>
      <div class="flex bg-black bg-opacity-40 w-fit py-1 px-1 rounded-3xl">
        <NuxtLink
          to="/request-demo"
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          {{ $t("Request_Demo") }}
        </NuxtLink>
        <a
          href="https://whitepaper.cultchain.com"
          target="_blank"
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          {{ $t("Read_Our_Whitepaper") }}
          <i class="isax isax-arrow-right-3 relative top-[2px]" />
        </a>
      </div>
      <ul class="flex justify-between">
        <li class="flex flex-col gap-2">
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-2xl font-semibold text-base"
            >240k+</span
          >
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-xl text-sm"
            >{{ $t("Total_Sale") }}</span
          >
        </li>
        <li class="flex flex-col gap-2">
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-2xl font-semibold text-base"
            >100k+</span
          >
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-xl text-sm"
            >{{ $t("Auctions") }}</span
          >
        </li>
        <li class="flex flex-col gap-2">
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-2xl font-semibold text-base"
            >240k+</span
          >
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-xl text-sm"
            >{{ $t("Artists_Total_Sale") }}</span
          >
        </li>
      </ul>
    </div>
    <div class="hero-logo">
      <img
        src="/hero-gif.gif"
        v-if="isLoaded"
        class="max-h-[500px] mx-auto"
        alt="cultchain"
      />
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
const infoOptions = [
  {
    label: "Total Sale",
    value: "240k+",
  },
  {
    label: "Auctions",
    value: "100k+",
  },
  {
    label: "ArtistsTotal Sale",
    value: "240k+",
  },
];
const isLoaded = ref(false);
onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true;
  }, 4000);
});
</script>
