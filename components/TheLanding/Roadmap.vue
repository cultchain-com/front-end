<template>
  <div class="mb-20">
    <h6 class="lg:text-xl text-base text-Primary text-center">
      {{ t("LEARN") }}
    </h6>
    <h1
      class="lg:text-3xl text-xl mt-4 text-Gray-b5 dark:text-LightGray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      {{ t("Full_Roadmap") }}
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
              {{ t("Phase") }} {{ index + 1 }}
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
import Icon from "@/components/TheIcon/Icon.vue";
import { useI18n } from "vue-i18n";

//state

const { t } = useI18n();

const state = computed(() => [
  {
    label: t("Launch"),
    steps: [
      {
        label: t("Launching_Time"),
        status: true,
      },
      {
        label: t("Social_Launch"),
        status: true,
      },
      {
        label: t("GiveWays_Promos"),
        status: true,
      },
    ],
  },
  {
    label: t("Investment"),
    steps: [
      {
        label: t("Publish_Whitepaper"),
        status: false,
      },
      {
        label: t("Website_Launch"),
        status: false,
      },
      {
        label: t("Meda_Advertisement"),
        status: false,
      },
    ],
  },
  {
    label: t("Growing"),
    steps: [
      {
        label: t("Opening_Collections"),
        status: false,
      },
      {
        label: t("Influenser_Marketing"),
        status: false,
      },
      {
        label: t("Publish_Release"),
        status: false,
      },
    ],
  },
]);
</script>
