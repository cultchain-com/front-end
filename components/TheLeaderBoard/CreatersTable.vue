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

        <td data-label="Address">
          <client-only>
            <div class="flex gap-2 items-center justify-center">
              <el-tooltip
                :content="item.creator__wallet_address"
                placement="top"
              >
                <span>{{ shortenAddress(item.creator__wallet_address) }}</span>
              </el-tooltip>
              <el-tooltip
                :content="item.value ? t('Copied') : t('Copy')"
                placement="top"
              >
                <i
                  class="isax isax-copy text-2xl"
                  v-if="!item.value"
                  @click="copyTextToClipboard(item, index)"
                />
                <i
                  class="isax isax-copy-success text-2xl text-green-800"
                  v-if="item.value"
                  @click="copyTextToClipboard(item, index)"
                />
              </el-tooltip></div
          ></client-only>
        </td>
        <td data-label="Raised">
          {{
            new Intl.NumberFormat().format(
              item.total_money_raised / Math.pow(10, 18)
            )
          }}
          ETH
        </td>
        <td data-label="Total Created Events">
          {{ item.number_of_created_events }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { shortenAddress } from "@/utils/shortenAddress";

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
    text: t("Total_Raised"),
  },
  {
    text: t("Total_Created_Events"),
  },
]);

const copyTextToClipboard = async (item, index) => {
  try {
    props.state.map((item) => {
      item.value = false;
    });
    await navigator.clipboard.writeText(item.creator__wallet_address);
    props.state[index].value = true;
    setTimeout(() => {
      props.state[index].value = false;
    }, 5000);
    console.log("Copying to clipboard was successful!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
</script>
