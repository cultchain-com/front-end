<template>
  <NuxtLink
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
            {{ CommitteeType[state[0] || state.committeeTypeId] }}
          </h5>
          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ state[2] || state.totalMembers }} <i class="isax isax-user"
          /></span>
        </div>
        <img
          src="/trending-collections/mrfox-avatar.png"
          class="h-10 w-10 rounded-full"
        />
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col gap-2 items-center">
          <p class="md:text-base text-sm text-green-800">
            {{ state[3] || state.yesVotes }}
            <i class="isax isax-like-1 text-xl text-green-800" />
          </p>
        </div>
        <div class="flex flex-col gap-2 items-center">
          <p class="md:text-base text-sm text-red-800">
            {{ state[4] || state.noVotes }}
            <i class="isax isax-dislike text-xl text-red-800" />
          </p>
        </div>
      </div>
    </section>
  </NuxtLink>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
//props

const props = defineProps({
  state: {
    default: null,
  },
});
const { state } = props;
const { CommitteeType } = useCryptoStore();

//methods

const convertDate = (item) => {
  const timestamp = parseInt(item) * 1000; // multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timestamp).toLocaleDateString("en-GB");
  return date;
};
</script>
