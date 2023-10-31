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
      <tr v-for="(item, index) in state" :key="index">
        <td data-label="*">
          <span
            class="h-5 w-5 rounded-full bg-Gray-b1 dark:bg-LightGray-b1 md:block md:mx-auto text-Gray-b3 dark:text-LightGray-b3"
            >{{ index + 1 }}</span
          >
        </td>

        <td data-label="Address">
          <client-only>
            <div class="flex gap-2 items-center">
              <el-tooltip :content="item[0]" placement="top">
                <span>{{ shortenAddress(item[0]) }}</span>
              </el-tooltip>
              <el-tooltip
                :content="
                  supporterArrayForCheckCopied[index].value ? 'Copied' : 'Copy'
                "
                placement="top"
              >
                <i
                  class="isax isax-copy text-2xl"
                  v-if="!supporterArrayForCheckCopied[index].value"
                  @click="copyTextToClipboard(item, index)"
                />
                <i
                  class="isax isax-copy-success text-2xl text-green-800"
                  v-if="supporterArrayForCheckCopied[index].value"
                  @click="copyTextToClipboard(item, index)"
                />
              </el-tooltip></div
          ></client-only>
        </td>
        <td data-label="Total Donation">
          {{ new Intl.NumberFormat().format(item[1] / Math.pow(10, 18)) }} ETH
        </td>
        <!-- <td data-label="Events">{{ item.events }}</td>
        <td data-label="Rewards">{{ item.rewards }}$</td> -->
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
import { shortenAddress } from "@/utils/shortenAddress";

//props

const props = defineProps({
  state: {
    default: [],
  },
});

//state

const columns = [
  {
    text: "Address",
  },
  {
    text: "Total Donation",
  },
  // {
  //   text: "Events",
  // },
  // {
  //   text: "Reward",
  // },
];
const supporterArrayForCheckCopied = ref([]);

const copyTextToClipboard = async (item, index) => {
  try {
    supporterArrayForCheckCopied.value.map((item) => {
      item.value = false;
    });
    await navigator.clipboard.writeText(item[0]);
    supporterArrayForCheckCopied.value[index].value = true;
    setTimeout(() => {
      supporterArrayForCheckCopied.value[index].value = false;
    }, 5000);
    console.log("Copying to clipboard was successful!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

watch(props, (newVal, oldVal) => {
  if (newVal) {
    let array = [];
    for (let i = 0; i < props.state.length; i++) {
      supporterArrayForCheckCopied.value.push({
        key: i,
        value: false,
      });
    }
  }
});
</script>
