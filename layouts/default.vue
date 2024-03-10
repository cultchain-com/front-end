<template>
  <div
    :style="locale == 'en' ? '' : 'direction: rtl;'"
    :class="locale == 'en' ? 'direction-ltr' : 'direction-rtl'"
  >
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
        <WalletDisconnected
          :visible="isWalletDisconnectedVisible"
          @handleClose="isWalletDisconnectedVisible = false"
        />
        <ConnectAccount />
        <ConnectAccountCreateEvent />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";
import { useI18n } from "vue-i18n";
import ConnectAccount from "~/components/TheTipsAndTricks/ConnectAccount.vue";
import ConnectAccountCreateEvent from "~/components/TheTipsAndTricks/ConnectAccountCreateEvent.vue";
import WalletDisconnected from "~/components/TheTipsAndTricks/WalletDisconnected.vue";

//state

const { locale } = useI18n();
const cryptoStore = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const isLoading = ref(false);
const isWalletDisconnectedVisible = ref(false);

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
