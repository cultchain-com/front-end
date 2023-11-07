<template>
  <NuxtLink
    class="bg-Gray-b1 dark:bg-LightGray-b1 rounded-xl flex flex-col hover:shadow-xl"
  >
    <div class="overflow-hidden w-full h-[200px] rounded-xl rounded-b-none">
      <img
        :src="
          state.related_object.image
            ? state.related_object.image
            : '/no-image.png'
        "
        class="w-full h-full object-contain ml-auto hover:scale-105 bg-Gray-b5 dark:bg-LightGray-b5 rounded-b-none"
      />
    </div>
    <section class="p-5 pt-2">
      <div class="flex flex-col justify-between gap-2">
        <div class="flex justify-between">
          <h5
            class="lg:text-lg text-base text-Gray-b5 dark:text-LightGray-b5 line-clamp-1"
          >
            {{ state.related_object.name }}
          </h5>
          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ state.total_members }} <i class="isax isax-user"
          /></span>
        </div>
        <div class="flex justify-between items-center">
          <img
            src="/trending-collections/mrfox-avatar.png"
            class="h-10 w-10 rounded-full"
          />
          <span class="bg-Primary bg-opacity-20 text-Primary px-2 rounded-xl text-xs font-semibold">
            {{ state.related_object.status }}
          </span>
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col gap-2 items-center">
          <p class="md:text-base text-sm text-green-800">
            {{ state.yes_votes }}
            <i class="isax isax-like-1 text-xl text-green-800" />
          </p>
        </div>
        <div class="flex flex-col gap-2 items-center">
          <p class="md:text-base text-sm text-red-800">
            {{ state.no_votes }}
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
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
</script>
