<template>
  <table class="w-full base-table" dir="ltr">
    <thead>
      <tr class="border-b-[1px]">
        <th>*</th>
        <th v-for="(item, index) in columns" :key="index">
          {{ item.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.state" :key="index">
        <td data-label="*">
          <span
            class="h-5 w-5 rounded-full bg-Gray-b1 dark:bg-LightGray-b1 md:block md:mx-auto text-Gray-b3 dark:text-LightGray-b3"
            >{{ index + 1 }}</span
          >
        </td>

        <td data-label="Address">{{ item.Address }}</td>
        <td data-label="Total Commitees">{{ item.totalCommitees }}</td>
        <td data-label="Earning">{{ item.earning }}$</td>
        <td data-label="Networks">{{ item.networks }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//props

const props = defineProps({
  state: {
    default: [],
  },
});

//state

const { t } = useI18n();
const columns = computed(() => [
  {
    text: t("Address"),
  },
  {
    text: t("Total_Commitees"),
  },
  {
    text: t("Earning"),
  },
  {
    text: t("Networks"),
  },
]);
</script>
