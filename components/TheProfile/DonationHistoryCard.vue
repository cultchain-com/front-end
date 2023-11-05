<template>
  <NuxtLink
    :to="'/event-in-progress/' + state[2]"
    class="bg-Gray-b1 dark:bg-LightGray-b1 rounded-xl flex flex-col hover:shadow-xl"
  >
    <div class="overflow-hidden w-full h-[200px] rounded-xl rounded-b-none">
      <img
        :src="state.image ? state.image : '/no-image.png'"
        class="w-full h-full object-contain ml-auto hover:scale-105 bg-Gray-b5 dark:bg-LightGray-b5 rounded-b-none"
      />
    </div>
    <section class="p-5 pt-2">
      <div class="flex flex-col justify-between gap-2">
        <div class="flex justify-between">
          <h5
            class="lg:text-lg text-base text-Gray-b5 dark:text-LightGray-b5 line-clamp-1"
          >
            {{ state[4] }}
          </h5>
          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ convertDate(state[3]) }}</span
          >
        </div>
        <img
          src="/trending-collections/mrfox-avatar.png"
          class="h-10 w-10 rounded-full"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col gap-2 items-center">
          <p class="md:text-sm text-xs text-Gray-b3 dark:text-LightGray-b3">
            Amount
          </p>
          <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
            {{ state[1] / Math.pow(10, 18) }} ETH
          </p>
        </div>
      </div>
    </section>
  </NuxtLink>
</template>

<script setup>
//props

const props = defineProps({
  state: {
    default: [],
  },
});
const { state } = props;

//methods

const convertDate = (item) => {
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
</script>
