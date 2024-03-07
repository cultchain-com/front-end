import type { tagEmits } from 'element-plus';
<template>
  <div>
    <ClientOnly>
      <el-dialog
        v-model="props.visible"
        class="w-fit"
        :before-close="handleClose"
      >
        <template #header
          ><h4 class="text-Gray-b5 dark:text-LightGray-b5 text-center">
            Sign in your wallet
          </h4></template
        >
        <p class="text-Gray-b5 dark:text-LightGray-b5 text-center mt-10">
          You will be prompted to sign a message to authenticate, please check
          your wallet.
        </p>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
});
const emit = defineEmits("handleClose");

const handleClose = () => {
  emit("handleClose", "");
};
</script>
