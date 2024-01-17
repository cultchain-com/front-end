<template>
  <div class="pt-[80px] pb-4">
    <div class="grid lg:grid-cols-3 lg:gap-y-0 gap-y-4">
      <div>
        <div class="flex gap-2 items-center">
          <img src="/logo.png" class="w-14 h-[40px]" alt="cultchain" />
          <h1
            class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
          >
            CultChain
          </h1>
        </div>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mb-2 mt-4">
          {{ t("CultChain_Description") }}
        </p>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mb-2">
          {{ t("Join_Our_Community") }}
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
          {{ t("Explore") }}
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
          {{ t("Join_Our_Daily_Digest") }}
        </h1>
        <p class="text-sm text-Gray-b4 dark:text-LightGray-b4 mt-4">
          {{ t("Join_Our_Daily_Digest_Description") }}
        </p>
        <div class="relative h-[50px] mt-4">
          <input
            :placeholder="t('Enter_Your_Email_Here')"
            class="w-full h-full p-3 rounded-xl outline-none"
            autocomplete="off"
          />
          <button
            class="absolute top-0 h-[50px] px-4 bg-Primary text-Gray-b5 dark:text-LightGray-b5"
            :class="locale == 'fa' ? 'left-0 rounded-l-xl' : 'right-0 rounded-r-xl'"
          >
            {{ t("Subscribe") }}
          </button>
        </div>
      </div>
    </div>

    <el-divider />
    <p class="text-Gray-b4 dark:text-LightGray-b4 text-sm text-center">
      {{ t("COPYRIGHT") }}
    </p>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

//state

const { t,locale } = useI18n();
const navigations = computed(() => [
  {
    route: "/become-donor",
    text: t("Become_Donor"),
  },
  {
    route: "/create-collections",
    text: t("Collections"),
  },
  {
    route: "/faq",
    text: t("Faq"),
  },
  {
    route: "/blog",
    text: t("Blog"),
  },
  {
    route: "/contact-us",
    text: t("Contact_Us"),
  },
  {
    route: "/request-demo",
    text: t("Request_Demo"),
  },
  {
    route: "/landing-1",
    text: t("Landing_Template"),
  },
]);
</script>
