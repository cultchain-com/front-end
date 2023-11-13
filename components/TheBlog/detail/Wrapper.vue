<template>
  <div class="p-5 my-20 rounded-xl flex flex-col gap-3">
    <!-- image  -->

    <div class="max-h-[400px] overflow-hidden rounded-xl">
      <img :src="post?.header_image" class="h-full hover:scale-105 w-full" />
    </div>

    <!-- description -->

    <section class="p-5 pt-2">
      <div class="flex justify-between items-start md:flex-row flex-col gap-6">
        <div class="flex gap-4 items-center md:flex-row flex-col w-full">
          <img class="h-16 w-16 rounded-2xl" src="/no-avatar.webp" />
          <div
            class="flex md:justify-center justify-between md:flex-col flex-row-reverse gap-0 w-full items-center md:items-start"
          >
            <h2
              class="text-Gray-b5 dark:text-LightGray-b5 text-lg font-semibold"
            >
              {{ post?.title }}
            </h2>
            <p
              class="text-sm font-semibold text-Gray-b5 dark:text-LightGray-b5"
            >
              name
            </p>
          </div>
        </div>
        <div
          class="flex md:flex-col flex-row justify-between md:items-end gap-2 w-full"
        >
          <span class="text-Gray-b5 dark:text-LightGray-b5 text-sm">{{
            convertDate(post?.updated_at)
          }}</span>
          <span class="text-Gray-b5 dark:text-LightGray-b5 text-sm"
            >category</span
          >
        </div>
      </div>
    </section>

    <!-- body  -->

    <div class="bg-Gray-b2 dark:bg-LightGray-b2 p-5 rounded-xl justify-between">
      <h5 class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5">
        Story
      </h5>
      <div
        v-html="post?.body"
        class="text-Gray-b5 dark:text-LightGray-b5 py-6"
      ></div>
    </div>
  </div>
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
