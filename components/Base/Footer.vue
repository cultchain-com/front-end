<template>
  <div class="pt-[80px] pb-4">
    <div class="grid lg:grid-cols-3 lg:gap-y-0 gap-y-4">
      <div>
        <div class="flex gap-2 items-center">
          <i class="isax isax-shop text-Primary text-3xl"></i>
          <h1
            class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
          >
            CultChain
          </h1>
        </div>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mb-2 mt-4">
          CultChain MarketPlace created by CultChain team.
        </p>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mb-2">
          Join Our Community
        </p>
        <div class="flex gap-2 mb-2">
          <i
            class="isax isax-instagram text-2xl text-Gray-b4 dark:text-LightGray-b4"
          ></i>
        </div>
      </div>
      <div>
        <h1
          class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
        >
          Explore
        </h1>
        <ul class="flex gap-2 flex-col mt-4">
          <li v-for="(item, index) in navigations" :key="index">
            <nuxt-link
              :to="item.route"
              class="text-Gray-b4 dark:text-LightGray-b4 text-sm"
              >{{ item.text }}</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div>
        <h1
          class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
        >
          Join Our Daily Digest
        </h1>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mt-4">
          Get exclusive promotions & updates straight to your inbox.
        </p>
        <div class="relative h-[50px] mt-4">
          <input
            placeholder="Enter Your Email Here"
            class="w-full h-full p-3 rounded-xl outline-none"
            autocomplete="off"
          />
          <button
            class="absolute right-0 top-0 h-[50px] px-4 bg-Primary rounded-r-xl text-Gray-b5 dark:text-LightGray-b5"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>

    <el-divider />
    <p class="text-Gray-b4 dark:text-LightGray-b4 text-sm text-center">
      © 2022 NFT Marketplace™. All Rights Reserved.
    </p>
  </div>
</template>

<script setup>
const navigations = [
  {
    route: "/become-donor",
    text: "Become Donor",
  },
  {
    route: "/create-collections",
    text: "Collections",
  },
  {
    route: "/faq",
    text: "Faq",
  },
  {
    route: "/blog",
    text: "Blog",
  },
  {
    route: "/contact-us",
    text: "Contact Us",
  },
  {
    route: "/request-demo",
    text: "Request Demo",
  },
];
</script>
