<template>
  <div class="flex flex-col gap-6">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      {{ t("Validator") }}
    </h1>
    <p
      class="text-Gray-b4 dark:text-LightGray-b4 text-sm leading-8 text-center"
    >
      {{ t("Why_Become_a_Validator?") }}
    </p>
    <div
      class="grid lg:grid-cols-4 md:grid-cols-2 justify-center gap-8"
      v-if="propositions.length"
    >
      <div
        v-for="(item, index) in propositions"
        :key="index"
        class="flex flex-col items-center gap-2 max-w-[250px]"
      >
        <div
          :style="`background-color:${item.bg}`"
          class="relative h-16 w-16 p-2 rounded-full bg-opacity-30 mb-4"
        >
          <img
            :src="item.image"
            :alt="item.description"
            class="h-14 w-14 absolute -right-2 -top-2"
          />
        </div>
        <h3
          class="font-semibold text-lg text-center"
          :style="`color:${item.color}`"
          :key="index"
        >
          {{ item.label }}
        </h3>
        <p class="text-Gray-b4 dark:text-LightGray-b4 text-center text-sm">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t } = useI18n();

//computed

const propositions = computed(() => [
  {
    label: t("Validator_benefits_1_label"),
    description: t("Validator_benefits_1_description"),
    image: "/landing/proposition-1.svg",
    color: "#663afa",
    bg: "#663afa57",
  },
  {
    label: t("Validator_benefits_2_label"),
    description: t("Validator_benefits_2_description"),
    image: "/landing/proposition-2.svg",
    color: "#ffc143",
    bg: "#ffc14338",
  },
  {
    label: t("Validator_benefits_3_label"),
    description: t("Validator_benefits_3_description"),
    image: "/landing/proposition-3.svg",
    color: "#7fd65a",
    bg: "#7fd65a3b",
  },
  {
    label: t("Validator_benefits_4_label"),
    description: t("Validator_benefits_4_description"),
    image: "/landing/proposition-4.svg",
    color: "#df4a4c",
    bg: "#df4a4c4a",
  },
]);
</script>
