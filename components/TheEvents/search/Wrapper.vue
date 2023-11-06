<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold text-start"
    >
      Fund Raising
    </h1>
    <Carousel
      :items-to-show="carouselOptions.itemsToShow"
      :transition="carouselOptions.transition"
      :breakpoints="carouselOptions.breakpoints"
      v-if="eventListFundRaising.length"
    >
      <Slide v-for="(item, index) in eventListFundRaising" :key="index">
        <EventCardFundRaising :state="item" />
      </Slide>
      <template #addons="{ slidesCount }">
        <Navigation v-if="slidesCount > 3" />
      </template>
    </Carousel>
    <template v-if="!eventListFundRaising.length && !isListLoaded">
      <div
        class="lg:grid grid-cols-4 flex gap-4 overflow-x-auto hide-scrollbar"
      >
        <SkeletonCard v-for="item in 4" :key="item" />
      </div>
    </template>

    <template v-if="!eventListFundRaising.length && isListLoaded">
      <div class="h-[100px] flex items-center justify-center">
        <h2
          class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
        >
          No Data Found !
        </h2>
      </div>
    </template>

    <!-- In Progress -->

    <h1
      class="lg:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold text-start"
    >
      In Progress
    </h1>
    <Carousel
      :items-to-show="carouselOptions.itemsToShow"
      :transition="carouselOptions.transition"
      :breakpoints="carouselOptions.breakpoints"
      v-if="eventListInProgress.length"
    >
      <Slide v-for="(item, index) in eventListInProgress" :key="index">
        <EventCardInProgress :state="item" />
      </Slide>
      <template #addons="{ slidesCount }">
        <Navigation v-if="slidesCount > 3" />
      </template>
    </Carousel>
    <template v-if="!eventListInProgress.length && !isListLoaded">
      <div
        class="lg:grid grid-cols-4 flex gap-4 overflow-x-auto hide-scrollbar"
      >
        <SkeletonCard v-for="item in 4" :key="item" />
      </div>
    </template>
    <template v-if="!eventListInProgress.length && isListLoaded">
      <div class="h-[100px] flex items-center justify-center">
        <h2
          class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
        >
          No Data Found !
        </h2>
      </div>
    </template>
  </div>
</template>

<script setup>
import EventCardFundRaising from "./EventCardFundRaising.vue";
import EventCardInProgress from "./EventCardInProgress.vue";
import SkeletonCard from "./SkeletonCard.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";
import { useRoute } from "vue-router";

//state

const cryptoStore = useCryptoStore();
const { searchedEvents } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const eventList = ref([]);
const eventListFundRaising = ref([]);
const eventListInProgress = ref([]);
const isListLoaded = ref(false);
const route = useRoute();

// emit

const emits = defineEmits(["events"]);

//mounted

onMounted(async () => {
  //   loading.isLoading = true;
  isListLoaded.value = false;
  eventList.value = await searchedEvents(route.params.search);
  eventListFundRaising.value = eventList.value.filter((event) => {
    return (
      event.status === "APPROVED" &&
      +event.target_amount > +event.collected_amount
    );
  });
  eventListInProgress.value = eventList.value.filter((event) => {
    return (
      event.status === "APPROVED" &&
      +event.target_amount < +event.collected_amount
    );
  });
  isListLoaded.value = true;
  //   loading.isLoading = false;
});
</script>
<style lang="scss" scoped>
.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
