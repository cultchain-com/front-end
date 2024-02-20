<template>
  <div
    class="gap-2 justify-between items-center py-[80px] grid lg:grid-cols-2 grid-cols-1"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1
        class="lg:text-[50px] text-3xl text-Gray-b5 dark:text-LightGray-b5 font-bold lg:leading-[80px] leading-10"
      >
        {{ t("Join_Us_as_a_Validator_for_Transparency_in_Charities") }}
      </h1>
      <p class="text-Gray-b5 dark:text-LightGray-b5 text-base leading-8">
        {{ t("Join_Us_as_a_Validator_for_Transparency_in_Charities_desc") }}
      </p>
      <div class="flex bg-black bg-opacity-40 w-fit py-1 px-1 rounded-3xl">
        <button
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          {{ t("GET_OFFER") }}
        </button>
        <button
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-1"
        >
          {{ t("Read_Our_Whitepaper") }}
          <i class="isax isax-arrow-right-3 relative top-[2px]" />
        </button>
      </div>
    </div>
    <div class="hero-logo">
      <img
        src="/landing/landing-hero.png"
        class="h-[400px] object-cover float-left mr-4 max-w-[400px] rounded-xl w-full"
        alt="cultchain"
      />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t } = useI18n();
</script>
