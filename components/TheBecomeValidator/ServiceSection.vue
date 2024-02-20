<template>
  <div class="flex flex-col gap-6">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      {{ t("Our_services_include") }}
    </h1>
    <p
      class="text-Gray-b4 dark:text-LightGray-b4 text-sm leading-8 text-center"
    >
      {{ t("How_will_your_product_change_your_customers_life") }}
    </p>
    <div class="grid lg:grid-cols-2 gap-8">
      <div
        v-for="(item, index) in services"
        :key="index"
        class="bg-gradient-to-r from-[#a159ff] to-[#7d19ff] p-5 rounded-xl relative w-full"
      >
        <img
          src="/landing/shape-rec.svg"
          class="h-6 w-6 absolute top-8 z-0"
          :class="
            locale == 'fa' ? 'lg:left-40 left-20' : 'lg:right-40 right-20'
          "
        />
        <img
          src="/landing/shape-close.svg"
          class="h-8 w-8 absolute top-5 z-0"
          :class="locale == 'fa' ? ' left-10' : 'right-10'"
        />
        <h2 class="text-lg text-Gray-b5 font-bold z-10">{{ item.title }}</h2>
        <p class="text-sm text-Gray-b4 z-10">{{ item.label }}</p>
        <!-- <p class="text-base text-Gray-b5 mt-6">{{ item.description }}</p> -->
        <ul class="list-disc mt-6">
          <li
            class="text-sm text-Gray-b4 mb-1"
            v-for="(desc, i) in item.descriptions"
            :key="i"
          >
            {{ desc }}
          </li>
        </ul>
        <div class="mt-4 grid grid-cols-2 gap-4 items-center pb-4">
          <button
            class="py-3 rounded-md border-[1px] border-white hover:bg-Gray-b2 text-white hover:bg-opacity-30"
          >
            {{ t("GET_OFFER") }}
          </button>
          <p
            class="lg:text-3xl flex items-center justify-center text-[#f0f8ff42] font-bold -rotate-[20deg]"
          >
            {{ t("SERVICE") }} {{ index + 1 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t, locale } = useI18n();

//computed

const services = computed(() => [
  {
    label: t("Service_No_1_label"),
    title: t("Service_No_1_title"),
    descriptions: [
      t("Service_No_1_description_1"),
      t("Service_No_1_description_2"),
      t("Service_No_1_description_3"),
    ],
  },
  {
    label: t("Service_No_2_label"),
    title: t("Service_No_2_title"),
    descriptions: [
      t("Service_No_2_description_1"),
      t("Service_No_2_description_2"),
      t("Service_No_2_description_3"),
    ],
  },
  {
    label: t("Service_No_3_label"),
    title: t("Service_No_3_title"),
    descriptions: [
      t("Service_No_3_description_1"),
      t("Service_No_3_description_2"),
      t("Service_No_3_description_3"),
    ],
  },
  {
    label: t("Service_No_4_label"),
    title: t("Service_No_4_title"),
    descriptions: [
      t("Service_No_4_description_1"),
      t("Service_No_4_description_2"),
      t("Service_No_4_description_3"),
    ],
  },
]);
</script>
