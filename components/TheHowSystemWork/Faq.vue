<template>
  <div class="py-20 gap-8 flex flex-col">
    <section class="grid lg:grid-cols-2 gap-8">
      <div class="flex justify-center flex-col">
        <h2 class="text-2xl text-Gray-b5 dark:text-LightGray-b5 font-bold mb-4">
          {{ t("FAQ") }}
        </h2>
        <p class="text-base text-Gray-b4 dark:text-LightGray-b4 font-normal">
          {{ t("FAQ_description") }}
        </p>
      </div>
      <img
        src="/landing/faq.png"
        class="h-[400px] object-cover float-left mr-4 max-w-[400px] rounded-xl w-full"
      />
    </section>
    <Accardeons :list="faqList" />
  </div>
</template>

<script setup>
import Accardeons from "@/components/TheFaq/Accardeons.vue";
import { useI18n } from "vue-i18n";

//state

const { t } = useI18n();

//computed

const faqList = computed(() => [
  {
    question: t("FAQ_1_label"),
    answer: t("FAQ_1_description"),
  },
  {
    question: t("FAQ_2_label"),
    answer: t("FAQ_2_description"),
  },
  {
    question: t("FAQ_3_label"),
    answer: t("FAQ_3_description"),
  },
  {
    question: t("FAQ_4_label"),
    answer: t("FAQ_4_description"),
  },
  {
    question: t("FAQ_5_label"),
    answer: t("FAQ_5_description"),
  },
]);
</script>
