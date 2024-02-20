<template>
  <div class="">
    <img
      src="/landing/about-us.png"
      class="h-[400px] object-cover float-left mr-4 max-w-[400px] rounded-xl w-full"
    />
    <h2
      class="italic text-3xl text-Gray-b5 dark:text-LightGray-b5 font-medium my-8"
    >
      {{ t("About_Validator") }}
    </h2>
    <p
      class="text-base text-Gray-b4 dark:text-LightGray-b4 leading-10 italic text-justify delay-1000 ease-linear"
    >
      <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_1_Title") }}</h4>
      {{ t("About_Validator_1_description") }}
      <span
        :class="
          isShowMore ? 'opacity-100' : 'absolute left-[-1000px] -z-30 opacity-0'
        "
        >
          <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_2_Title") }}</h4>
          {{ t("About_Validator_2_description") }}

          <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_3_Title") }}</h4>
          {{ t("About_Validator_3_description") }}

          <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_4_Title") }}</h4>
          {{ t("About_Validator_4_description") }}

          <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_5_Title") }}</h4>
          {{ t("About_Validator_5_description") }}

          <h4 class="font-bold text-lg text-Gray-b5 dark:text-LightGray-b5">{{ t("About_Validator_6_Title") }}</h4>
          {{ t("About_Validator_6_description") }}
      </span>
      <a
        class="text-blue-600 underline underline-offset-4 font-medium cursor-pointer"
        href="javascript:void(0)"
        @click="isShowMore = !isShowMore"
        >{{ isShowMore ? "Show Less" : "Show More" }}</a
      >
    </p>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t } = useI18n();
const isShowMore = ref(false);
</script>
