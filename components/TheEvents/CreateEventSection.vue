<template>
  <div
    class="gap-2 justify-between items-center p-5 grid lg:grid-cols-2 grid-cols-1 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1
        class="lg:text-3xl text-lg text-Gray-b5 dark:text-LightGray-b5 font-bold"
      >
        {{ $t("Create_Event") }}
      </h1>
      <p class="text-Gray-b5 dark:text-LightGray-b5 text-base">
        {{ $t("Lorem") }}
      </p>
      <button
        @click="checkWalletConnection"
        class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
      >
        {{ $t("Create_Event") }}
      </button>
    </div>
    <div class="hero-logo">
      <img
        src="/create-event-hero.png"
        class="max-h-[250px] object-cover mx-auto"
        alt="create event"
      />
    </div>
  </div>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
import { useCreateEvent } from "@/store/create-event";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useDialog } from "@/store/tips-and-tricks";

//state

const dialogStore = useDialog();
const cryptoStore = useCryptoStore();
const createEventStore = useCreateEvent();
const { account } = storeToRefs(cryptoStore);
const router = useRouter();
const { isConnectAccountCreateAccountModalVisible } = storeToRefs(dialogStore);

//methods

const checkWalletConnection = () => {
  if (!account.value) {
    isConnectAccountCreateAccountModalVisible.value = true;
  } else {
    router.push("/event-creation");
    createEventStore.activeStepp = 1;
  }
};
</script>
