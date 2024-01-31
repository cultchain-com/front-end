<template>
  <NuxtLink
    :to="'/events/' + state.id"
    class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl flex flex-col hover:shadow-xl w-full"
  >
    <div
      class="overflow-hidden w-full h-[200px] bg-Gray-b5 dark:bg-LightGray-b5 rounded-t-xl"
    >
      <img
        :src="
          state.token_uri
            ? 'https://ipfs.io/ipfs/' + state.token_uri + '/'
            : '/no-image.png'
        "
        class="w-full h-full rounded-xl object-contain ml-auto hover:scale-105"
        :alt="state.name"
      />
    </div>
    <section class="p-5 pt-2">
      <div class="flex flex-col justify-between gap-1">
        <div class="flex justify-between">
          <h5
            class="lg:text-base text-md font-medium text-Gray-b5 dark:text-LightGray-b5 line-clamp-1 text-start"
          >
            {{ state.name }}
          </h5>
          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ convertDate(state.end_date) }}</span
          >
        </div>
        <img
          src="/trending-collections/mrfox-avatar.png"
          class="h-10 w-10 rounded-full"
          alt="avatar"
        />
      </div>
      <div class="flex justify-between items-center mt-1">
        <div class="flex flex-col gap-1 items-center">
          <p class="text-xs text-Gray-b3 dark:text-LightGray-b3">
            Target Amount
          </p>
          <p class="md:text-sm text-xs text-Gray-b5 dark:text-LightGray-b5">
            {{
              new Intl.NumberFormat().format(
                state.target_amount / Math.pow(10, 18)
              )
            }}
            ETH
          </p>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <p class="text-xs text-Gray-b3 dark:text-LightGray-b3">
            Collected Amount
          </p>
          <p class="md:text-sm text-xs text-Gray-b5 dark:text-LightGray-b5">
            {{
              new Intl.NumberFormat().format(
                state.collected_amount / Math.pow(10, 18)
              )
            }}
            ETH
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
    default: {
      name: "",
      description: "",
      endDate: "",
      image: "",
      collectedAmount: "",
      targetAmount: "",
    },
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
