<template>
  <div>
    <ClientOnly>
      <el-dialog
        v-model="isConnectAccountModalVisible"
        class="w-fit"
        :before-close="() => (isConnectAccountModalVisible = false)"
      >
        <template #header
          ><h4 class="text-Gray-b5 dark:text-LightGray-b5 text-center">
            {{ $t("Connect_Account") }}
          </h4></template
        >
        <p class="text-Gray-b5 dark:text-LightGray-b5 text-center mt-10">
          {{ $t("Connect_Account_description") }}
        </p>
        <div class="flex gap-4 mt-6">
          <button
            @click="isConnectAccountModalVisible = false"
            class="px-3 py-1 bg-transparent border-2 border-red-700 text-red-600 hover:bg-red-500 hover:bg-opacity-20 rounded-xl font-bold"
          >
            {{ $t("Close") }}
          </button>
          <button
            @click="handleConnectWallet"
            class="px-4 py-2 border-2 border-Primary bg-Primary bg-opacity-80 text-Gray-b5 hover:bg-Primary hover:bg-opacity-100 rounded-xl font-bold"
          >
            {{ $t("Connect_Wallet") }}
          </button>
        </div>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDialog } from "@/store/tips-and-tricks";
import { useCryptoStore } from "~/store/crypto";

const dialogStore = useDialog();
const { isConnectAccountModalVisible } = storeToRefs(dialogStore);
const { connectWallet } = useCryptoStore();

const handleConnectWallet = async () => {
  let status = await connectWallet();
  if (status) {
    navigateTo("/profile");
  }
  isConnectAccountModalVisible.value = false;
};
</script>

<style lang="scss">
.el-dialog__header.show-close {
  @apply flex items-center;
}
</style>
