<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4 my-6"
  >
    <label class="md:text-sm text-xs text-Gray-b5 dark:text-LightGray-b5 mb-6"
      >{{ $t("Donating_to") }}
      <b class="text-base underline underline-offset-8 text-Primary">{{
        event?.name
      }}</b>
    </label>
    <div class="form-item flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
          >{{ $t("Amount") }}
          <span class="text-Gray-b4 dark:text-LightGray-b4 text-sm">(ETH)</span>
        </label>
        <el-popover placement="bottom" trigger="click">
          <h6
            class="text-sm text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-1"
          >
            <span class="text-red-600 text-xl relative top-[2px]">*</span
            >{{ $t("Amount") }}
          </h6>
          <p class="text-xs text-Gray-b4 dark:text-LightGray-b4 mt-2">
            {{ $t("Amount_Description") }}
          </p>
          <template #reference
            ><i
              class="isax isax-info-circle text-Gray-b5 dark:text-LightGray-b5 font-bold text-lg"
            />
          </template>
        </el-popover>
      </div>
      <div class="relative">
        <i
          class="isax isax-money-add text-xl absolute top-[6px] left-2 text-Gray-b5 dark:text-LightGray-b5"
        />
        <input
          class="w-full py-2 pl-8 focus:border-Primary border-2 border-transparent rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
          type="number"
          :placeholder="$t('Amount')"
          v-model="state.amount"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label
          class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
          >{{ $t("Message") }}</label
        >
        <el-popover placement="bottom" trigger="click">
          <h6
            class="text-sm text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-1"
          >
            <span class="text-red-600 text-xl relative top-[2px]">*</span
            >{{ $t("Message") }}
          </h6>
          <p class="text-xs text-Gray-b4 dark:text-LightGray-b4 mt-2">
            {{ $t("Donate_Message_Description") }}
          </p>
          <template #reference
            ><i
              class="isax isax-info-circle text-Gray-b5 dark:text-LightGray-b5 font-bold text-lg"
            />
          </template>
        </el-popover>
      </div>
      <textarea
        class="rounded-lg outline-none focus:border-Primary border-2 border-transparent text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1 p-5 text-sm h-[200px]"
        :placeholder="$t('Message')"
        v-model="state.message"
      ></textarea>
    </div>
    <div>
      <button
        class="bg-Primary w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="checkValidation"
      >
        {{ $t("Transfer") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElNotification } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

//state

const { getEventDetail, donateToEvent } = useCryptoStore();
const loading = useLoading();
const event = ref(null);
const state = ref({
  amount: "",
  message: "",
});
const route = useRoute();
const router = useRouter();

//methods

const checkValidation = () => {
  if (!state.value.amount) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert Amount"),
      type: "error",
    });
    return false;
  } else if (!state.value.message) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert Message"),
      type: "error",
    });
    return false;
  }
  transferHandler();
};
const transferHandler = async () => {
  loading.isLoading = true;
  const donationResult = await donateToEvent(
    route.params.id,
    state.value.message,
    state.value.amount
  );
  loading.isLoading = false;
  if (donationResult) {
    setTimeout(() => {
      router.go(-1);
    }, 1000);
  }
};

//mounted

onMounted(async () => {
  loading.isLoading = true;
  event.value = await getEventDetail(route.params.id);
  loading.isLoading = false;
});

//watcher

watch(event, (newValue) => {
  useSeoMeta({
    title: () => newValue?.name,
    ogTitle: () => newValue?.name,
    // and other stuff
  });
});
</script>
