<template>
  <div class="py-20 gap-8 flex flex-col">
    <section class="grid lg:grid-cols-2 gap-8">
      <div class="flex justify-center flex-col">
        <h2 class="text-2xl text-white font-bold mb-4">FAQ</h2>
        <p class="text-base text-Gray-b4 font-normal">
          Have a question? You can find the answers to the most common questions
          we get asked below. If your question is not answered below or you
          require further clarification, do not hesitate to get in touch!
        </p>
      </div>
      <Icon name="faq" />
    </section>
    <Accardeons />
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import Accardeons from "./Accardeons.vue";
</script>
