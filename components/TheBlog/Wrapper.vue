<template>
  <div>
    <HeroCard v-if="postList" :state="postList[0]" />
    <div class="grid lg:grid-cols-4 md:grid-cols-3 gap-4 mt-20 mb-6">
      <template v-for="(item, index) in postList" :key="index">
        <BlogCard v-if="index !== 0" :state="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import HeroCard from "./HeroCard";
import BlogCard from "./BlogCard";

import { usePosts } from "@/store/blogs";
import { useCryptoStore } from "~/store/crypto";

const { posts } = usePosts();
const { getPosts } = useCryptoStore();
const postList = ref([]);

//mounted

onMounted(async () => {
  postList.value = await getPosts();
});
</script>
