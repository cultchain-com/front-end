<template>
  <NuxtLink
    :to="'/events/' + state.eventId"
    class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl flex flex-col hover:shadow-xl"
  >
    <div class="overflow-hidden w-full h-[200px] rounded-xl rounded-b-none">
      <img
        :src="state.image ? state.image : '/no-image.png'"
        class="w-full h-full rounded-xl object-contain ml-auto hover:scale-105 bg-Gray-b5 dark:bg-LightGray-b5 rounded-b-none"
        :alt="state.proposalDetail.name"
      />
    </div>
    <section class="p-5 pt-2">
      <div class="flex flex-col justify-between gap-2">
        <div class="flex justify-between">
          <h5
            class="lg:text-lg text-base text-Gray-b5 dark:text-LightGray-b5 line-clamp-1"
          >
            {{ state.proposalDetail.name }}
          </h5>
          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ convertDate(state.proposalDetail.endDate) }}</span
          >
        </div>
        <div class="flex gap-2 items-center">
          <img
            src="/trending-collections/mrfox-avatar.png"
            class="h-10 w-10 rounded-full"
          />
          <h5
            class="lg:text-base text-sm text-Gray-b4 dark:text-LightGray-b4 line-clamp-1"
          >
            {{ shortenAddress(state.proposalDetail.creator) }}
          </h5>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <div
          class="flex items-center bg-Gray-b1 dark:bg-LightGray-b1 rounded-3xl"
        >
          <div
            class="w-14 h-8 flex items-center justify-center text-Gray-b3 dark:text-LightGray-b3 md:text-base text-sm gap-1"
          >
            <i class="isax isax-like-1 text-xl text-green-800" />
            {{ state.yesVotes }}
          </div>
          <div
            class="h-5 bg-Gray-b3 dark:bg-LightGray-b3 w-[2px] rounded-full"
          ></div>
          <div
            class="w-14 flex items-center justify-center text-Gray-b3 dark:text-LightGray-b3 md:text-base text-sm gap-1"
          >
            <i class="isax isax-dislike text-xl text-red-800" />
            {{ state.noVotes }}
          </div>
        </div>
        <div
          class="md:text-base text-sm font-semibold italic bg-opacity-20 px-2 rounded-3xl h-8 flex items-center justify-center"
          :class="
            state.proposalDetail.status === 'Pending'
              ? 'text-purple-600 bg-purple-600'
              : state.proposalDetail.status == 'Approved'
              ? 'text-green-600 bg-green-600'
              : state.proposalDetail.status == 'Rejected'
              ? 'text-red-600 bg-red-600'
              : state.proposalDetail.status == 'NotStartedYet'
              ? 'text-blue-600 bg-blue-600'
              : ''
          "
        >
          {{ state.proposalDetail.status }}
        </div>
      </div>
    </section>
  </NuxtLink>
</template>

<script setup>
import { shortenAddress } from "@/utils/shortenAddress";
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
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
</script>
