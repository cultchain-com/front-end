<template>
  <div class="py-20 gap-8 flex flex-col">
    <section class="grid lg:grid-cols-2 gap-8">
      <div class="flex justify-center flex-col">
        <h2 class="text-2xl text-Gray-b5 dark:text-LightGray-b5 font-bold mb-4">
          FAQ
        </h2>
        <p class="text-base text-Gray-b4 dark:text-LightGray-b4 font-normal">
          Have a question? You can find the answers to the most common questions
          we get asked below. If your question is not answered below or you
          require further clarification, do not hesitate to get in touch!
        </p>
      </div>
      <img
        src="/landing/faq.png"
        class="h-[400px] object-cover float-left mr-4 max-w-[400px] rounded-xl"
      />
    </section>
    <Accardeons :list="faqList" />
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import Accardeons from "@/components/TheFaq/Accardeons.vue";

//state

const faqList = ref([
  {
    question: "Fix a problem",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "Watch videos",
    answer:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
  },
  {
    question: "Manage your account and settings",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    question: "Policy, safety and copyright",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "Monetise with the YouTube Partner Programme",
    answer:
      "Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  },
]);
</script>
