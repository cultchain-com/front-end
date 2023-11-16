<template>
  <NuxtLink
    :to="`/blog/${props.state?.id}`"
    v-if="props.state"
    class="w-full h-[400px] bg-no-repeat bg-cover rounded-xl my-10 flex justify-start items-end"
    :style="'background-image:url(' + props.state.header_image + ')'"
  >
    <div
      class="bg-Gray-b2 dark:bg-LightGray-b2 bg-opacity-90 p-5 rounded-xl shadow-lg flex flex-col lg:ml-2 mb-[-40px] gap-2 max-w-[320px]"
    >
      <div class="flex justify-between items-center">
        <span
          class="bg-Primary px-2 py-1 rounded-lg text-Gray-b5 dark:text-LightGray-b5 text-sm font-medium w-fit"
          >category
        </span>

        <span class="text-xs text-Gray-b4 dark:text-LightGray-b4 font-normal">{{
          convertDate(props.state.updated_at)
        }}</span>
      </div>

      <h2 class="text-Gray-b5 dark:text-LightGray-b5 text-lg font-semibold">
        {{ props.state.title }}
      </h2>

      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <img
            :src="posts[0].author.avatar"
            class="w-10 h-10 rounded-full object-cover"
          />
          <p class="text-xs text-Gray-b4 dark:text-LightGray-b4 font-medium">
            Name
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { usePosts } from "@/store/blogs";

//props

const props = defineProps({
  state: null,
});

const { posts } = usePosts();

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
