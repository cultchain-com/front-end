<template>
  <table class="w-full base-table">
    <thead>
      <tr class="border-b-[1px]">
        <th>*</th>
        <th v-for="(item, index) in columns" :key="index">
          {{ item.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in dataList" :key="index">
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
        <!-- <el-divider
          class="block md:none"
          v-if="index !== dataList.length - 1"
        /> -->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";

const dataList = ref([
  {
    Address: "a0X....sm",
    totalCommitees: 5,
    earning: 10,
    networks: 200,
  },
  {
    Address: "a2X....12",
    totalCommitees: 3,
    earning: 20,
    networks: 156,
  },
]);
const columns = [
  {
    text: "Address",
  },
  {
    text: "Total Commitees",
  },
  {
    text: "Earning",
  },
  {
    text: "Networks",
  },
];
</script>
