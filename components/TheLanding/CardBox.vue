<template>
  <main class="flex flex-col gap-8 py-[80px]">
    <h6 class="lg:text-xl text-base text-Primary text-center">
      {{ t("DONATE_TRANSPARENTLY") }}
    </h6>
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      {{ t("DONATE_TRANSPARENTLY_Title") }}
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-center"
    >
      {{ t("DONATE_TRANSPARENTLY_Description") }}
    </p>
    <ul
      class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 mt-8"
    >
      <ClientOnly
        ><li
          v-for="(item, index) in cardOptions"
          :key="index"
          class="px-6 pb-6 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl relative hover:scale-95"
        >
          <div
            class="w-[50px] h-[50px] relative top-[-25px] flex items-center justify-center mx-auto bg-gradient-to-r from-Primary to-[#a259ff52] rounded-xl"
          >
            <i
              class="isax text-2xl text-Gray-b5 dark:text-LightGray-b5"
              :class="'isax-' + item.icon"
            />
          </div>
          <div class="flex flex-col justify-between h-[calc(100%-50px)]">
            <h3
              class="text-Gray-b5 dark:text-LightGray-b5 lg:text-xl text-lg text-center pb-6"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-Gray-b5 dark:text-LightGray-b5 lg:text-base text-sm text-center"
            >
              {{ item.description }}
            </p>
          </div>
        </li></ClientOnly
      >
    </ul>
  </main>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t, locale } = useI18n();
const cardOptions = computed(() => [
  {
    icon: "direct-send",
    title: t("Transparency"),
    description: t("Transparency_Description"),
  },
  {
    icon: "lock",
    title: t("Trust_Based"),
    description: t("Trust_Based_Description"),
  },
  {
    icon: "refresh",
    title: t("Community_Proof"),
    description: t("Community_Proof_Description"),
  },
  {
    icon: "wallet-check4",
    title: t("Open_to_NGOs"),
    description: t("Open_to_NGOs_Description"),
  },
  {
    icon: "setting-2",
    title: t("NFT_Power"),
    description: t("NFT_Power_Description"),
  },
  {
    icon: "element-4",
    title: t("Corporate_Social_Responsibilites"),
    description: t("Corporate_Social_Responsibilites_Description"),
  },
]);
</script>
