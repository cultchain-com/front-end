<template>
  <div
    class="relative"
    v-show="isLoading"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <div>
      <slot />
    </div>
    <div
      v-if="isLoading"
      class="overlay min-h-screen w-[calc(100vw-10px)] bg-Gray-b2 bg-opacity-50 absolute left-0 top-0 overflow-hidden"
    >
      <div class="loader">
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
        <div class="blob"></div>
      </div>
    </div>
  </div>
  <div class="relative" v-show="!isLoading">
    <div>
      <slot />
    </div>
  </div>
</template>
<script setup>
import { useLoading } from "@/store/loading";

//state

const loading = useLoading();
const isLoading = ref(false);

//watcher

watch(loading, (value) => {
  if (value.isLoading) {
    isLoading.value = true;
  } else {
    isLoading.value = false;
  }
});
</script>
