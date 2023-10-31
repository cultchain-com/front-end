<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      Event List(In Progress)
    </h1>
    <div class="grid lg:grid-cols-3 md:grid-cols-2">
      <EventCard
        v-for="(item, index) in eventList"
        :key="index"
        :state="item"
      />
    </div>
    <template v-if="!eventList?.length">
      <img src="/empty.png" class="max-h-[400px] h-full w-fit mx-auto" />
    </template>
  </div>
</template>

<script setup>
import EventCard from "./EventCard.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

//state

const cryptoStore = useCryptoStore();
const { listAllEvents } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const eventList = ref([]);
const loading = useLoading();

onMounted(async () => {
  loading.isLoading = true;
  eventList.value = await listAllEvents();
  eventList.value = eventList.value?.filter((event) => {
    return (
      event.status === "Approved" &&
      +event.targetAmount.toString() < +event.collectedAmount.toString()
    );
  });
  loading.isLoading = false;
});
</script>
