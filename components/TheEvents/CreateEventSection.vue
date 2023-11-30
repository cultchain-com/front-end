<template>
  <div
    class="gap-2 justify-between items-center p-5 grid lg:grid-cols-2 grid-cols-1 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1
        class="lg:text-3xl text-lg text-Gray-b5 dark:text-LightGray-b5 font-bold"
      >
        Create Event
      </h1>
      <p class="text-Gray-b5 dark:text-LightGray-b5 text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <button
        @click="checkWalletConnection"
        class="text-Gray-b5 dark:text-LightGray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
      >
        Create Event
      </button>
    </div>
    <div class="hero-logo">
      <img
        src="/create-event-hero.png"
        class="max-h-[250px] object-cover mx-auto"
      />
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import { useCryptoStore } from "~/store/crypto";
import { useCreateEvent } from "@/store/create-event";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
import { h } from "vue";
import { useRouter } from "vue-router";

//state

const cryptoStore = useCryptoStore();
const createEventStore = useCreateEvent();
const { connectWallet } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const router = useRouter();

//methods

const checkWalletConnection = async () => {
  if (!account.value) {
    let status = await connectWallet();
    status
      ? (router.push("/event-creation"), (createEventStore.activeStepp = 1))
      : ElNotification({
          title: "Error",
          message: h("i", "You Don't have connected wallet!"),
          type: "error",
        });
  } else {
    router.push("/event-creation");
    createEventStore.activeStepp = 1;
  }
};
</script>
