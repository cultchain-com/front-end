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
            {{ $t("Sign_in_your_wallet") }}
          </h4></template
        >
        <p class="text-Gray-b5 dark:text-LightGray-b5 text-center mt-10">
          {{ $t("Sign_in_your_wallet_description") }}
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
