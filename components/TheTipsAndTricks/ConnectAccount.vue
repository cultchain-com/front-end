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
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useDialog } from "@/store/tips-and-tricks";

const dialogStore = useDialog();
const { isConnectAccountModalVisible } = storeToRefs(dialogStore);
</script>

<style lang="scss">
.el-dialog__header.show-close {
  @apply flex items-center;
}
</style>
