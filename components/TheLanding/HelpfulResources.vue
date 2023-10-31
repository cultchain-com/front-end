<template>
  <main class="flex flex-col gap-8 py-[80px]">
    <h6 class="lg:text-xl text-base text-Primary text-center">LEARN</h6>
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      Helpful Resources
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-center"
    >
      Feel Free to investigate useful resources provided by our team to learn
      more about this new market.
    </p>
    <ul class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10">
      <li
        v-for="(item, index) in cardOptions"
        :key="index"
        class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl hover:scale-95"
      >
        <img
          :src="item.image"
          class="h-[192px] object-cover w-full rounded-t-xl"
        />
        <div
          class="px-6 pb-6 content flex flex-col justify-between gap-4 mt-4 h-[calc(100%-208px)]"
        >
          <div class="flex flex-col gap-4">
            <a href="javascript:void(0)" class="text-Primary">{{
              item.type
            }}</a>
            <p class="text-Gray-b5 dark:text-LightGray-b5 text-lg">
              {{ item.title }}
            </p>
            <p class="text-sm text-Gray-b5 dark:text-LightGray-b5">
              {{ item.description }}
            </p>
          </div>
          <div class="flex gap-3">
            <img
              :src="item.avatar"
              class="rounded-full object-cover h-10 w-10"
            />
            <div class="flex flex-col">
              <h6 class="text-sm text-Gray-b5 dark:text-LightGray-b5">
                {{ item.author }}
              </h6>
              <span class="text-Gray-b4 dark:text-LightGray-b4 text-sm"
                >{{ item.date }} . {{ item.timeToRead }}</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
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
