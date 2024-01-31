<template>
  <div class="lg:p-[60px] p-3 bg-Gray-b2 dark:bg-LightGray-b2 my-20 rounded-xl">
    <div class="grid lg:grid-cols-2">
      <img
        src="/support.png"
        class="object-cover rounded-xl"
        alt="AWARD WINNING SUPPORT"
      />
      <div class="flex flex-col justify-between gap-4 p-4">
        <p class="lg:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
          {{ $t("AWARD_WINNING_SUPPORT") }}
        </p>
        <h2
          class="lg:text-2xl leading-7 font-semibold text-xl text-Gray-b5 dark:text-LightGray-b5"
        >
          {{ $t("AWARD_WINNING_SUPPORT_Title") }}
        </h2>
        <p class="lg:text-base text-sm text-Gray-b4 dark:text-LightGray-b4">
          {{ $t("AWARD_WINNING_SUPPORT_Description") }}
        </p>
        <a
          href="https://whitepaper.cultchain.com"
          target="_blank"
          class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl border-Primary border-2 bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
        >
          <Icon name="rocket-primary" />
          {{ $t("Read_Our_Whitepaper") }}
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
</script>
