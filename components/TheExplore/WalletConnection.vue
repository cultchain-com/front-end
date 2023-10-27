<script setup lang="ts">
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";

const messageInput = ref(null as any);
const cryptoStore = useCryptoStore();
const { connectWallet, validators } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
</script>

<template>
  <div
    class="rounded-xl border-dashed border-2 border-Gray-b5 h-[170px] flex items-center justify-center my-20 flex-col gap-4"
  >
    <p class="text-Gray-b5">You Need Chrome to be able to run this</p>
    <button
      v-if="!account"
      class="bg-Primary rounded-xl text-Gray-b5 p-4"
      @click="connectWallet"
    >
      Connect Wallet
    </button>
  </div>
</template>
