<template>
  <main class="">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      Events
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-center mb-5"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi natus
      commodi molestias soluta veniam distinctio
    </p>

    <Carousel
      dir="ltr"
      :modelValue="0"
      :items-to-show="carouselOptions.itemsToShow"
      :transition="carouselOptions.transition"
      :breakpoints="carouselOptions.breakpoints"
      v-if="events.length"
    >
      <Slide v-for="(item, index) in events" :key="index">
        <EventsCard :state="item" />
      </Slide>
      <template #addons="{ slidesCount }">
        <Navigation v-if="slidesCount > 3" />
      </template>
    </Carousel>
    <template v-if="!events.length && !isListLoaded">
      <div
        class="lg:grid grid-cols-4 flex gap-4 overflow-x-auto hide-scrollbar"
      >
        <SkeletonCard v-for="item in 4" :key="item" />
      </div>
    </template>

    <template v-if="!events.length && isListLoaded">
      <div class="h-[100px] flex items-center justify-center">
        <h2
          class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
        >
          No Data Found !
        </h2>
      </div>
    </template>
  </main>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
import EventsCard from "./EventsCard.vue";
import SkeletonCard from "./SkeletonCard.vue";

//state

const events = ref([]);
const { listAllEvents } = useCryptoStore();
const carouselOptions = {
  itemsToShow: 4,
  transition: 300,
  breakpoints: {
    320: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    768: {
      itemsToShow: 2,
      snapAlign: "center",
    },
    1440: {
      itemsToShow: 4,
      snapAlign: "center",
    },
  },
};
const isListLoaded = ref(false);

//mounted

onMounted(async () => {
  isListLoaded.value = false;
  events.value = await listAllEvents();
  isListLoaded.value = true;
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
