<template>
  <div class="py-[80px]">
    <h1 class="text-Gray-b5 lg:text-3xl text-xl font-bold">Trending Collection</h1>
    <p class="text-Gray-b5 lg:text-base text-sm mt-3">
      Checkout Our Weekly Updated Trending Collection.
    </p>
    <section
      class="cards grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-8"
    >
      <TrendingCollectionCard
        v-for="(item, index) in trndingCollectionsOptions"
        :state="item"
        :key="index"
      />
    </section>
  </div>
</template>

<script setup>
import TrendingCollectionCard from "./TrendingCollectionCard.vue";
const trndingCollectionsOptions = [
  {
    heroImage: "/trending-collections/animal-1.png",
    image1: "/trending-collections/animal-2.png",
    image2: "/trending-collections/animal-3.png",
    label: "Dsgn Animals",
    authorName: "MrFox",
    authorAvatar: "/trending-collections/mrfox-avatar.png",
  },
  {
    heroImage: "/trending-collections/mushroom-1.png",
    image1: "/trending-collections/mushroom-2.png",
    image2: "/trending-collections/mushroom-3.png",
    label: "Magic Mushrooms",
    authorName: "Shroomie",
    authorAvatar: "/trending-collections/shroomie-avatar.png",
  },
  {
    heroImage: "/trending-collections/robot-1.png",
    image1: "/trending-collections/robot-2.png",
    image2: "/trending-collections/robot-3.png",
    label: "Disco Machines",
    authorName: "BeKind2Robots",
    authorAvatar: "/trending-collections/benkid-avatar.png",
  },
];
</script>
