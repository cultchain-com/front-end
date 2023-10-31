<template>
  <div
    class="gap-2 justify-between items-center py-[80px] grid lg:grid-cols-2 grid-cols-1"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1
        class="lg:text-[67px] text-3xl text-Gray-b5 dark:text-LightGray-b5 font-bold lg:leading-[80px] leading-10"
      >
        Blockchain Defacto For Charities
      </h1>
      <p class="text-Gray-b5 dark:text-LightGray-b5 text-base leading-8">
        Cultchain is a blockchain based charity which aims to bring transparency
        and Trust to Charities and NGOs.
      </p>
      <div
        class="flex bg-black bg-opacity-40 w-fit py-1 px-1 rounded-3xl"
      >
        <button
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          Our Mission
        </button>
        <a
          href="https://cultchain.gitbook.io/whitepaper"
          target="_blank"
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          Read Our Whitepaper
          <i class="isax isax-arrow-right-3 relative top-[2px]" />
        </a>
      </div>
      <ul class="flex justify-between">
        <li
          v-for="(item, index) in infoOptions"
          :key="index"
          class="flex flex-col gap-2"
        >
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-2xl font-semibold text-base"
            >{{ item.value }}</span
          >
          <span
            class="text-Gray-b5 dark:text-LightGray-b5 lg:text-xl text-sm"
            >{{ item.label }}</span
          >
        </li>
      </ul>
    </div>
    <div class="hero-logo">
      <img src="/hero-gif.gif" class="max-h-[500px] mx-auto" />
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
</script>
