<template>
  <div class="rounded-xl border-dashed border-2 border-Gray-b5 h-[170px] flex items-center justify-center my-20">
    <NuxtLink to="/create-collections" class="flex items-center justify-between flex-col">
      <Icon name="storage" />
      <p class="text-Gray-b5">Create New Collection</p></NuxtLink
    >
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
</script>
