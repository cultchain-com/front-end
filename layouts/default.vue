<template>
  <div
    class="relative"
    v-show="isLoading"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <div>
      <slot />
    </div>
    <div
      v-if="isLoading"
      class="overlay min-h-screen w-[calc(100vw-10px)] bg-Gray-b2 dark:bg-LightGray-b2 bg-opacity-50 absolute left-0 top-0 overflow-hidden"
    >
      <div class="loader">
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
      </div>
    </div>
  </div>
  <div class="relative" v-show="!isLoading">
    <div>
      <slot />
      <ClientOnly>
        <el-dialog
          v-model="isWalletDisconnectedVisible"
          class="w-fit"
          :before-close="handleClose"
        >
          <template #title
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
  </div>
</template>
<script setup>
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

//state

const cryptoStore = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const isLoading = ref(false);
const isWalletDisconnectedVisible = ref(false);

//methods

const handleClose = () => {
  isWalletDisconnectedVisible.value = false;
};

//watcher

watch(loading, (value) => {
  if (value.isLoading) {
    isLoading.value = true;
  } else {
    isLoading.value = false;
  }
});
watch(account, (newVal, oldVal) => {
  if (oldVal.length > 0 && newVal.length == 0) {
    console.log("your wallet has been disconnected!");
    isWalletDisconnectedVisible.value = true;
  }
});

// schema

useSchemaOrg([
  defineOrganization({
    name: "CultChain",
    logo: "/logo.png",
  }),
  defineWebSite({
    name: "charity and nft marketplace cultchain.com",
  }),
  defineWebPage(),
  {
    "@type": "DefinedTerm",
    name: "cultchain.com",
    description:
      "CultChain is an innovative blockchain platform designed to revolutionize charitable giving.",
  },
]);
</script>
