<template>
  <div
    class="rounded-xl flex flex-col justify-end hover:shadow-xl w-full min-h-[400px] bg-no-repeat bg-center bg-contain bg-Gray-b5 dark:bg-LightGray-b5"
    :style="`background-image:url(${
      state.image ? state.image : '/no-image.png'
    })`"
  >
    <section class="p-5 pt-2 max-w-[300px]">
      <div class="flex flex-col justify-between gap-2">
        <div class="flex justify-between">
          <h5
            class="lg:text-lg text-base text-start text-Gray-b1 dark:text-LightGray-b1 line-clamp-1 font-semibold"
          >
            {{ state.name }}
          </h5>
          <span
            class="text-xs text-Gray-b1 dark:text-LightGray-b1 text-end flex items-center font-normal"
            >{{ convertDate(state.endDate) }}</span
          >
        </div>
        <img
          src="/trending-collections/mrfox-avatar.png"
          class="h-10 w-10 rounded-full"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col gap-2 items-start">
          <p
            class="md:text-sm text-xs text-Gray-b2 dark:text-LightGray-b2 font-semibold"
          >
            Target Amount
          </p>
          <p
            class="md:text-base text-sm text-Gray-b1 dark:text-LightGray-b1 font-semibold"
          >
            {{ state.targetAmount / Math.pow(10, 18) }} ETH
          </p>
        </div>
        <div class="flex flex-col gap-2 items-start">
          <p
            class="md:text-sm text-xs text-Gray-b2 dark:text-LightGray-b2 font-semibold"
          >
            Collected Amount
          </p>
          <p
            class="md:text-base text-sm text-Gray-b1 dark:text-LightGray-b1 font-semibold"
          >
            {{ state.collectedAmount / Math.pow(10, 18) }} ETH
          </p>
        </div>
      </div>
      <!-- <div class=" mt-2 h-[50px] flex">
        <NuxtLink
          :to="'/event-in-progress/' + state.eventId"
          class="border-Primary border-2 text-Primary font-semibold p-5 py-3 rounded-xl hover:bg-Primary hover:text-Gray-b5 dark:text-LightGray-b5 transition-all"
          >View Event</NuxtLink
        >
      </div> -->
    </section>
  </div>
</template>

<script setup>
//props

const props = defineProps({
  state: {
    default: {
      name: "",
      description: "",
      date: "",
      image: "",
    },
  },
});
const { state } = props;

//methods

const convertDate = (item) => {
  const timestamp = parseInt(item) * 1000; // multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timestamp).toLocaleDateString("en-GB");
  return date;
};
</script>
