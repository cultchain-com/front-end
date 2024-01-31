<template>
  <main class="flex flex-col gap-8 py-[80px]">
    <h6 class="lg:text-xl text-base text-Primary text-center">
      {{ $t("LEARN") }}
    </h6>
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      {{ $t("Helpful_Resources") }}
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-center"
    >
      {{ $t("Helpful_Resources_Description") }}
    </p>
    <ul
      class="grid lg:grid-cols-4 items-center md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10"
    >
      <template v-if="!isLoaded">
        <SkeletonCard v-for="(item, index) in 4"
      /></template>
      <template v-for="(item, index) in postList" :key="index">
        <BlogCard :state="item" />
      </template>
    </ul>
    <template v-if="isLoaded && !postList?.length">
      <p
        class="text-Gray-b5 dark:text-LightGray-b5 text-xl leading-8 text-center"
      >
        Nothing To Show!
      </p>
    </template>
  </main>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
import SkeletonCard from "./helpful-resources/SkeletonCard.vue";
import BlogCard from ".//helpful-resources/BlogCard.vue";

const { getPosts } = useCryptoStore();
const postList = ref([]);
const isLoaded = ref(false);

//mounted

onMounted(async () => {
  isLoaded.value = false;
  postList.value = await getPosts();
  isLoaded.value = true;
});
const cardOptions = [
  {
    image: "/helpful-resources/1.png",
    type: "Article",
    title: "How to use search engine optimization to drive sales",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    author: "Roel Aufderehar",
    avatar: "/helpful-resources/avatar-1.png",
    date: "Mar 16, 2020",
    timeToRead: "6 min read",
  },
  {
    image: "/helpful-resources/2.png",
    type: "Article",
    title: "Boost your conversion rate",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    author: "Brenna Goyette",
    avatar: "/helpful-resources/avatar-2.png",
    date: "Mar 10, 2020",
    timeToRead: "4 min read",
  },
  {
    image: "/helpful-resources/3.png",
    type: "Case Study",
    title: "Improve your customer experience",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    author: "Daniela Metz",
    avatar: "/helpful-resources/avatar-3.png",
    date: "Mar 12, 2020",
    timeToRead: "12 min read",
  },
];
</script>
