<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      {{ $t("How_to_become_a_Donor") }}
    </h1>
    <div
      class="flex flex-col gap-6 bg-Gray-b2 dark:bg-LightGray-b2 p-5 rounded-xl mb-20 shadow-xl"
    >
      <section class="flex gap-3 items-center lg:flex-row flex-col">
        <p
          class="text-Gray-b5 dark:text-LightGray-b5 lg:w-[calc(100%-300px)] leading-10 lg:text-[16px] text-sm"
        >
          {{ $t("How_to_become_a_Donor_Description_1") }}
        </p>
        <div
          class="lg:h-[300px] lg:w-[300px] w-full rounded-xl overflow-hidden"
        >
          <img
            src="/charity-1.png"
            class="h-full w-full object-cover"
            alt="become donor"
          />
        </div>
      </section>
      <section class="flex gap-3 items-center lg:flex-row flex-col">
        <p
          class="text-Gray-b5 dark:text-LightGray-b5 lg:w-[calc(100%-300px)] leading-10 lg:text-[16px] text-sm"
        >
          {{ $t("How_to_become_a_Donor_Description_1") }}
        </p>
        <div
          class="lg:h-[300px] lg:w-[300px] w-full rounded-xl overflow-hidden"
        >
          <img
            src="/charity-2.png"
            class="h-full w-full object-cover"
            alt="become donor"
          />
        </div>
      </section>
      <section class="flex gap-3 justify-center lg:flex-row flex-col">
        <NuxtLink
          to="/events"
          class="text-Gray-b5 dark:text-LightGray-b5 lg:w-fit w-full justify-center text-sm font-semibold flex items-center gap-2 rounded-xl border-Primary border-2 px-5 py-3 hover:bg-Primary"
        >
          <Icon name="event" />
          {{ $t("Visit_Events") }}
        </NuxtLink>
        <button
          class="text-Gray-b5 dark:text-LightGray-b5 lg:w-fit w-full justify-center text-sm font-semibold flex items-center gap-2 rounded-xl border-Primary border-opacity-80 hover:border-opacity-100 bg-Primary bg-opacity-80 hover:bg-opacity-100 border-2 px-5 py-3"
        >
          <Icon name="token" />
          {{ $t("Buy_Token") }}
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Icon from "@/components/TheIcon/Icon.vue";
//state
</script>
