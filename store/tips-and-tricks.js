import { defineStore } from "pinia";
export const useDialog = defineStore("dialog", () => {
  // modals state

  const isConnectAccountModalVisible = ref(false);
  const isConnectAccountCreateAccountModalVisible = ref(false);

  return {
    isConnectAccountModalVisible,
    isConnectAccountCreateAccountModalVisible,
  };
});
