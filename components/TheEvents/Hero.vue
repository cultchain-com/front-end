<template>
  <div class="flex flex-col pb-20">
    <Carousel
      :items-to-show="carouselOptions.itemsToShow"
      :transition="carouselOptions.transition"
      v-if="props.state.length"
    >
      <Slide v-for="(item, index) in props.state" :key="index">
        <HeroCard :state="item" />
      </Slide>
      <template #addons="{ slidesCount }">
        <div v-if="slidesCount > 3" class="event-hero">
          <Navigation />
        </div>
      </template>
    </Carousel>
    <template v-if="!props.state.length">
      <div class="flex gap-4 overflow-x-auto hide-scrollbar">
        <SkeletonBanner />
      </div>
    </template>
    <!-- <template v-if="!eventListFundRaising?.length">
      <img src="/empty.png" class="max-h-[400px] h-full w-fit mx-auto" />
    </template> -->
  </div>
</template>

<script setup>
import HeroCard from "./HeroCard.vue";
import SkeletonBanner from "./SkeletonBanner.vue";

//state

const eventList = ref([]);
const carouselOptions = {
  itemsToShow: 1,
  transition: 300,
};

//props

const props = defineProps({
  state: {
    default: [],
  },
});
</script>
<style lang="scss" scoped>
.carousel__slide {
  padding: 10px;
}

@media screen and (min-width: 1024px) {
  .carousel__prev {
    left: -40px;
  }
  .carousel__next {
    right: -40px;
  }
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
<style lang="scss">
.event-hero .carousel__prev {
  @apply left-[-40px] h-[400px];
}
.event-hero .carousel__next {
  @apply right-[-40px] h-[400px];
}
.event-hero .carousel__next,
.event-hero .carousel__prev {
  @apply hover:bg-Gray-b4 dark:bg-LightGray-b4 rounded-lg text-Gray-b5 dark:text-LightGray-b5 hover:text-Gray-b1 dark:text-LightGray-b1;
}
</style>
