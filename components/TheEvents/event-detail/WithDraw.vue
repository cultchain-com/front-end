<template>
  <div
    class="flex items-center justify-between p-5 bg-Primary bg-opacity-30 rounded-xl text-Gray-b5 text-base dark:text-LightGray-b5"
  >
    <p>you can withdraw now!</p>
    <button
      class="bg-Primary px-3 py-2 rounded-xl shadow-xl text-Gray-b5"
      @click="openWithDrawModalHandler"
    >
      {{ loading ? "Loading ..." : "WithDraw" }}
    </button>
  </div>
  <ClientOnly>
    <el-dialog
      v-model="isWithDrawModalVisible"
      class="w-fit min-w-[320px]"
      :before-close="handleClose"
    >
      <template #title
        ><h4 class="text-Gray-b5 dark:text-LightGray-b5 text-center">
          WithDraw
        </h4></template
      >

      <el-steps :active="activeStep" finish-status="success">
        <el-step title="Confirm"></el-step>
        <el-step title="WithDraw"></el-step>
      </el-steps>
      <div class="p-5 pb-0">
        <template v-if="activeStep == 0">
          <div class="mt-6 social-share text-Gray-b4 dark:text-LightGray-b4">
            Your next Possible withDraw Amount is:
            <span class="font-bold text-Gray-b5 dark:text-LightGray-b5"
              >{{ +withDrawAmount / Math.pow(10, 18) }} ETH,
            </span>
            Do you want to
            <button
              @click="activeStep = 1"
              class="ont-bold text-Gray-b5 dark:text-LightGray-b5"
            >
              Continue</button
            >?
          </div>
          <div class="mt-10 grid grid-cols-2 gap-10">
            <button
              @click="handleClose"
              class="border-Primary border-2 text-Gray-b5 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              class="bg-Primary text-Gray-b5 py-2 rounded-xl"
              @click="activeStep = 1"
            >
              Continue
            </button>
          </div>
        </template>
        <template v-if="activeStep == 1">
          <div class="mt-6 social-share text-Gray-b4 dark:text-LightGray-b4">
            Are you Sure?
          </div>
          <div class="mt-10 grid grid-cols-2 gap-10">
            <button
              class="border-Primary border-2 text-Gray-b5 py-2 rounded-xl"
              @click="activeStep = 0"
            >
              Prev
            </button>
            <button
              class="bg-Primary text-Gray-b5 py-2 rounded-xl"
              @click="withdrawHandler"
            >
              {{ loading ? "Loading..." : "Confirm" }}
            </button>
          </div>
        </template>
      </div>
    </el-dialog>
  </ClientOnly>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
import { useRoute } from "vue-router";

//state

const { requestWithdraw, getNextPossibleMilestoneAmount } = useCryptoStore();
const loading = ref(false);
const route = useRoute();
const withDrawAmount = ref(null);
const isWithDrawModalVisible = ref(false);
const activeStep = ref(0);

//methods

const openWithDrawModalHandler = async () => {
  debugger;
  loading.value = true;
  withDrawAmount.value = await getNextPossibleMilestoneAmount(route.params.id);
  isWithDrawModalVisible.value = true;
  loading.value = false;
};
const handleClose = () => {
  activeStep.value = 0;
  isWithDrawModalVisible.value = false;
};
const withdrawHandler = async () => {
  loading.value = true;
  await requestWithdraw(route.params.id, withDrawAmount.value);
  loading.value = false;
  handleClose();
};
</script>

<style lang="scss" scoped></style>
