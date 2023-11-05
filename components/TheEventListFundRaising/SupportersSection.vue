<template>
  <div class="bg-Gray-b2 dark:bg-LightGray-b2 p-5 rounded-xl">
    <ul class="flex flex-col gap-6">
      <h5 class="text-Gray-b5 dark:text-LightGray-b5 text-xl font-semibold">
        Supporters
      </h5>
      <li
        v-for="(item, index) in props.state"
        :key="index"
        class="flex w-full justify-between items-center"
      >
        <div class="flex gap-2 items-center w-full">
          <img
            class="h-12 w-12 rounded-full"
            :src="item.avatar ? item.avatar : '/no-avatar.webp'"
          />
          <div class="flex flex-col gap-1 w-full">
            <h4
              class="lg:text-base text-sm text-Primary font-semibold flex justify-between items-center w-full"
            >
              {{ item[1] / Math.pow(10, 18) }} ETH
              <span class="text-xs text-Gray-b4 dark:text-LightGray-b4">{{
                convertDate(item[3])
              }}</span>
            </h4>
            <client-only>
              <h4
                class="lg:text-sm text-xs text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-2"
              >
                <el-tooltip :content="item[0]" placement="top">
                  <span>{{ shortenAddress(item[0]) }}</span>
                </el-tooltip>
                <el-tooltip
                  :content="
                    supporterArrayForCheckCopied[index].value
                      ? 'Copied'
                      : 'Copy'
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
                </el-tooltip></h4
            ></client-only>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { shortenAddress } from "@/utils/shortenAddress";

//props

const props = defineProps({
  state: [],
});
const { state } = props;
const supporterArrayForCheckCopied = ref([]);

//methods

const convertDate = (item) => {
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
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
