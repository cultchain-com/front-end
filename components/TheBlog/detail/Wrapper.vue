<template>
  <div v-html="post.body" class="text-Gray-b5 dark:text-LightGray-b5 py-20"></div>
</template>

<script setup>
import { useRoute } from "vue-router";

import { useCryptoStore } from "~/store/crypto";
import { useLoading } from "@/store/loading";

const loading = useLoading();
const route = useRoute();
const { getPosts } = useCryptoStore();
const postList = ref([]);
const post = ref(null);

//mounted

onMounted(async () => {
  loading.isLoading = true;
  postList.value = await getPosts();
  postList.value.filter((post) => post.id == route.params.id);
  post.value = postList.value[0];
  loading.isLoading = false;
});
</script>
