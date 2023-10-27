<template>
  <div class="py-[80px]">
    <section
      class="head flex justify-between items-center lg:flex-row flex-col gap-2"
    >
      <div class="header">
        <h1 class="text-Gray-b5 lg:text-3xl text-xl font-bold">Top Creators</h1>
        <p class="text-Gray-b5 lg:text-base text-sm mt-3">
          Checkout Top Rated Creators On The Nft Marketplace
        </p>
      </div>

      <button
        class="text-Gray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl border-Primary border-2 bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
      >
        <Icon name="rocket-primary" />
        View Rankings
      </button>
    </section>
    <section
      class="cards grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-8"
    >
      <TopCreatorCard
        v-for="(item, index) in topCreatorsOptions"
        :state="item"
        :key="index"
      />
    </section>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import TopCreatorCard from "./TopCreatorCard.vue";
const topCreatorsOptions = [
  {
    name: "MrFox",
    avatar: "/trending-collections/mrfox-avatar.png",
    count: 6,
    value: "34.53",
  },
  {
    name: "KeepItReal",
    avatar: "/trending-collections/keepitreal-avatar.png",
    count: 1,
    value: "34.53",
  },
  {
    name: "Shroomie",
    avatar: "/trending-collections/shroomie-avatar.png",
    count: 7,
    value: "34.53",
  },
  {
    name: "Robotika",
    avatar: "/trending-collections/robotica-avatar.png",
    count: 3,
    value: "34.53",
  },
  {
    name: "KeepItReal",
    avatar: "/trending-collections/keepitreal-avatar.png",
    count: 1,
    value: "34.53",
  },
  {
    name: "MrFox",
    avatar: "/trending-collections/mrfox-avatar.png",
    count: 6,
    value: "34.53",
  },
  {
    name: "Robotika",
    avatar: "/trending-collections/robotica-avatar.png",
    count: 3,
    value: "34.53",
  },
  {
    name: "Shroomie",
    avatar: "/trending-collections/shroomie-avatar.png",
    count: 7,
    value: "34.53",
  },
];
</script>
