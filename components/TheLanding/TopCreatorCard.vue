<template>
  <div
    class="flex flex-col gap-8 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl hover:scale-95 p-5 relative"
  >
    <img
      :src="state.avatar"
      class="h-[120px] w-[120px] rounded-full object-cover mx-auto"
      alt=""
    />
    <div class="info flex flex-col gap-3">
      <h1 class="text-lg text-Gray-b5 dark:text-LightGray-b5 font-bold">
        {{ state.name }}
      </h1>
      <div
        class="flex justify-between text-Gray-b3 dark:text-LightGray-b3 text-base"
      >
        Total Sales:
        <span class="text-Gray-b5 dark:text-LightGray-b5"
          >{{ state.value }} ETH</span
        >
      </div>
    </div>
    <span
      class="h-[30px] w-[30px] flex justify-center items-center bg-Gray-b1 dark:bg-LightGray-b1 absolute top-5 left-5 text-Gray-b5 dark:text-LightGray-b5 rounded-full"
      >{{ state.count }}</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  state: {
    default: {
      name: "",
      avatar: "",
      count: 0,
      value: "",
    },
  },
});
const { state } = props;
</script>
