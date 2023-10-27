<template>
  <div
    v-if="posts"
    class="w-full h-[400px] bg-no-repeat bg-cover rounded-xl my-10 flex justify-start items-end"
    :style="'background-image:url(' + posts[0].image + ')'"
  >
    <div
      class="bg-Gray-b2 bg-opacity-90 p-5 rounded-xl shadow-lg flex flex-col lg:ml-2 mb-[-40px] gap-2 max-w-[320px]"
    >
      <span
        class="bg-Primary px-2 py-1 rounded-lg text-white text-sm font-medium w-fit"
        >{{ posts[0].category }}
      </span>

      <h2 class="text-white text-lg font-semibold">{{ posts[0].title }}</h2>

      <div class="flex justify-between items-center">
        <div class="flex gap-2 items-center">
          <img :src="posts[0].author.avatar" class="w-10 h-10 rounded-full object-cover" />
          <p class="text-xs text-Gray-b4 font-medium">{{posts[0].author.name}}</p>
        </div>
        <span class="text-xs text-Gray-b4 font-normal">{{
          posts[0].date
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePosts } from "@/store/blogs";

const { posts } = usePosts();
</script>
