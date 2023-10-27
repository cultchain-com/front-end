<template>
  <div class="bg-Gray-b2 rounded-xl overflow-hidden flex flex-col card cursor-pointer">
    <div class="h-[196px] overflow-hidden">
      <img :src="state.image" class="w-full h-full object-cover main-image" />
    </div>

    <div class="p-5 pt-2 pl-2 flex flex-col gap-2">
      <span
        class="bg-Primary bg-opacity-25 text-white px-2 py-1 rounded-lg text-xs font-medium w-fit"
        >{{ state.category }}
      </span>
      <h3 class="text-white text-base font-medium line-clamp-2">
        {{ state.title }}
      </h3>
      <div class="flex justify-between items-center">
        <div class="flex gap-1 items-center">
          <img
            :src="state.author.avatar"
            class="w-6 h-6 rounded-full object-cover"
          />
          <p class="text-xs text-Gray-b4 font-medium">
            {{ state.author.name }}
          </p>
        </div>
        <span class="text-[10px] text-Gray-b4 font-normal">{{
          state.date
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
//props

const props = defineProps({
  state: {
    default: {
      id: 0,
      title: "",
      category: "",
      author: {
        name: "",
        avatar: "",
      },
      date: "",
      image: "",
    },
  },
});

const { state } = props;
</script>

<style lang="scss" scoped>
.card:hover {
  .main-image {
    @apply scale-110;
  }
}
</style>
