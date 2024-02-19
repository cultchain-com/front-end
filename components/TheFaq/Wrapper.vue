<template>
  <div class="py-20 gap-8 flex flex-col">
    <section class="grid lg:grid-cols-2 gap-8">
      <div class="flex justify-center flex-col">
        <h2 class="text-2xl text-Gray-b5 dark:text-LightGray-b5 font-bold mb-4">
          {{ $t("Faq") }}
        </h2>
        <p class="text-base text-Gray-b4 dark:text-LightGray-b4 font-normal">
          {{ $t("FAQ_Description") }}
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
import Accardeons from "./Accardeons.vue";
import { useCryptoStore } from "~/store/crypto";

//state

const { getFaq } = useCryptoStore();
const faqList = ref([]);

//mounted

onMounted(async () => {
  faqList.value = await getFaq();
});
</script>
