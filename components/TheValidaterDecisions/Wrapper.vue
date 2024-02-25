<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold text-start"
    >
      {{ $t("Validaters_Decision") }}
    </h1>

    <!-- desktop slider -->

    <Carousel
      dir="ltr"
      :modelValue="0"
      :items-to-show="carouselOptions.itemsToShow"
      :transition="carouselOptions.transition"
      :breakpoints="carouselOptions.breakpoints"
      v-if="validatersDecisions.length"
      class="hidden md:block"
    >
      <Slide v-for="(item, index) in validatersDecisions" :key="index">
        <CreationCard :state="item" />
      </Slide>
      <template #addons="{ slidesCount }">
        <Navigation v-if="slidesCount > 3" />
      </template>
    </Carousel>

    <!-- mobile slides  -->

    <template class="md:hidden flex gap-4 overflow-x-auto hide-scrollbar">
      <CreationCard
        v-for="(item, index) in validatersDecisions"
        :key="index"
        :state="item"
        class="min-w-[300px]"
      />
    </template>

    <!-- skeleton cards  -->

    <template v-if="!validatersDecisions.length && !isListLoaded">
      <div
        class="lg:grid grid-cols-4 flex gap-4 overflow-x-auto hide-scrollbar"
      >
        <SkeletonCard v-for="item in 4" :key="item" />
      </div>
    </template>

    <!-- emplty -->

    <template v-if="!validatersDecisions.length && isListLoaded">
      <div class="h-[100px] flex items-center justify-center">
        <h2
          class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
        >
          {{ $t("No_Data_Found") }}
        </h2>
      </div>
    </template>
  </div>
</template>

<script setup>
import CreationCard from "./CreationCard.vue";
import SkeletonCard from "./SkeletonCard.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";
import axios from "axios";

//state

const cryptoStore = useCryptoStore();
const { getAllPastDecisions } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const validatersDecisions = ref([]);
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

// emit

const emits = defineEmits(["decisions"]);

//mounted

onMounted(async () => {
  //   loading.isLoading = true;
  isListLoaded.value = false;
  validatersDecisions.value = await getAllPastDecisions();
  emits("decisions", validatersDecisions.value);
  console.log(validatersDecisions.value, "validatersDecisions");
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
