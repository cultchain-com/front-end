<template>
  <div>
    <HeroCard />
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-20 mb-6">
      <template v-for="(item, index) in posts" :key="index">
        <BlogCard v-if="index !== 0" :state="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import HeroCard from "./HeroCard";
import BlogCard from "./BlogCard";

import { usePosts } from "@/store/blogs";

const { posts } = usePosts();
</script>
