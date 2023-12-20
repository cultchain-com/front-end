<template>
  <div class="mb-20">
    <h6 class="lg:text-xl text-base text-Primary text-center">LEARN</h6>
    <h1
      class="lg:text-3xl text-xl mt-4 text-Gray-b5 dark:text-LightGray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      Full Roadmap
    </h1>
    <div class="p-5 rounded-xl border-[1px] border-Gray-b3 mt-6">
      <div class="grid lg:grid-cols-3">
        <template v-for="(item, index) in state" :key="index">
          <div
            class="flex flex-col w-full border-r-2 border-transparent px-5"
            :class="index !== state.length - 1 && 'border-Gray-b3'"
          >
            <p
              class="text-Gray-b3 dark:text-LightGray-b3 text-base font-semibold"
            >
              Phase {{ index + 1 }}
            </p>
            <p
              class="text-Gray-b5 dark:text-LightGray-b5 text-lg font-semibold"
            >
              {{ item.label }}
            </p>
            <div
              v-for="(step, i) in item.steps"
              :key="i"
              class="p-2 rounded-xl bg-Gray-b2 dark:bg-LightGray-b2 mb-2 mt-2 flex items-center gap-2 text-Gray-b4 dark:text-LightGray-b4 text-sm"
            >
              <span
                class="h-4 w-4 rounded-full flex justify-center items-center border-[1px] border-Gray-b5 dark:border-LightGray-b5"
              >
                <Icon
                  name="check"
                  class="hidden dark:block"
                  color="#000000"
                  v-if="step.status"
                />
                <Icon
                  name="check"
                  class="dark:hidden block"
                  color="#ffffff"
                  v-if="step.status"
                />
              </span>
              <p>{{ step.label }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Icon from "@/components/TheIcon/Icon.vue";

const state = ref([
  {
    label: "Launch",
    steps: [
      {
        label: "Launching Time",
        status: true,
      },
      {
        label: "Social Launch",
        status: true,
      },
      {
        label: "GiveWays & Promos",
        status: true,
      },
    ],
  },
  {
    label: "Investment",
    steps: [
      {
        label: "Publish Whitepaper",
        status: false,
      },
      {
        label: "Website Launch",
        status: false,
      },
      {
        label: "Meda Advertisement",
        status: false,
      },
    ],
  },
  {
    label: "Growing",
    steps: [
      {
        label: "Opening Collections",
        status: false,
      },
      {
        label: "Influenser Marketing",
        status: false,
      },
      {
        label: "Publish Release",
        status: false,
      },
    ],
  },
]);
</script>
