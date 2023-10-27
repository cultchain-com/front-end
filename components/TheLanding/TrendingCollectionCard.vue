<template>
  <div class="flex flex-col gap-2">
    <img :src="state.heroImage" class="h-[330px] rounded-xl hover:scale-95 object-cover" />
    <ul class="flex gap-2">
      <img :src="state.image1" class="h-[100px] rounded-xl hover:scale-95 w-1/3 object-cover" />
      <img :src="state.image2" class="h-[100px] rounded-xl hover:scale-95 w-1/3 object-cover" />
      <span
        class="h-[100px] flex justify-center items-center text-Gray-b5 text-xl font-semibold w-1/3 rounded-xl bg-Primary"
        >1025+</span
      >
    </ul>
    <h1 class="text-lg text-Gray-b5 font-bold">{{ state.label }}</h1>
    <div class="author flex gap-2">
      <img :src="state.authorAvatar" class="rounded-full h-6 w-6" />
      <span class="text-Gray-b5 text-sm">
        {{ state.authorName }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  state: {
    default: {
      heroImage: "",
      image1: "",
      image2: "",
      label: "",
      authorName: "",
      authorAvatar: "",
    },
  },
});
const { state } = props;
</script>
