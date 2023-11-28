<template>
  <div class="sticky top-0 z-50">
    <div
      class="flex justify-between items-center h-[70px] lg:px-0 px-10 bg-Gray-b1 dark:bg-LightGray-b1"
    >
      <!-- logo -->

      <div class="flex">
        <NuxtLink to="/" class="icon flex gap-2 items-center"
          ><i class="isax isax-shop text-Primary text-3xl"></i>
          <h1
            class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
          >
            CultChain
          </h1>
          <div class="h-[60%] w-1 bg-Gray-b3 rounded-xl"></div>
        </NuxtLink>
        <el-menu
          class="el-menu-demo bg-transparent xl:min-w-full border-none justify-start relative top-1 lg:flex hidden"
          mode="horizontal"
        >
          <template v-for="(item, index) in navigations">
            <el-menu-item
              v-if="!item.children.length"
              :index="converToString(index + 1)"
              class="text-Gray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
            >
              <nuxt-link
                :to="item.route"
                class="dark:text-LightGray-b5 text-Gray-b4"
                >{{ item.text }}</nuxt-link
              >
            </el-menu-item>
            <el-sub-menu
              v-if="item.children.length"
              class="text-Gray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
              :index="converToString(index + 1)"
            >
              <template #title
                ><span
                  class="text-Gray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                  >{{ item.text }}</span
                ></template
              >
              <el-menu-item
                v-for="(subMenu, i) in item.children"
                :key="i"
                :index="index + 1 + '-' + i + 1"
              >
                <nuxt-link :to="subMenu.route">{{
                  subMenu.text
                }}</nuxt-link></el-menu-item
              >
            </el-sub-menu>
          </template>
        </el-menu>
      </div>

      <!-- desktop navigation  -->

      <div
        class="navigation lg:flex lg:items-center justify-between items-end gap-4 lg:min-w-fit w-full lg:opacity-100 lg:flex-row flex-col lg:static absolute top-0 right-0 lg:bg-transparent bg-Gray-b1 dark:bg-LightGray-b1 bg-opacity-90 pb-2 lg:pt-2 pt-12 px-3 lg:min-h-0 min-h-screen overflow-hidden hidden"
      >
        <div class="w-full">
          <div class="relative max-w-[400px] mx-auto">
            <button @click="searchHandler">
              <i
                class="isax isax-search-normal absolute left-2 top-1 text-Gray-b5 dark:text-LightGray-b5 text-2xl"
              />
            </button>
            <button @click="searchHandler">
              <i
                class="isax isax-shuffle5 absolute right-2 top-1 text-Gray-b5 dark:text-LightGray-b5 text-2xl"
              />
            </button>

            <input
              v-model="search"
              @keyup.enter="searchHandler"
              placeholder="Search"
              autocomplete="off"
              class="w-full h-10 placeholder:text-Gray-b5 dark:text-LightGray-b5 text-Gray-b5 rounded-xl outline-none pr-2 pl-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70"
            />
          </div>
        </div>
        <div
          class="lg:flex lg:items-center items-end min-w-fit gap-4 lg:opacity-100 lg:flex-row flex-col lg:static absolute top-0 right-0 lg:bg-transparent bg-Gray-b1 dark:bg-LightGray-b1 bg-opacity-90 pb-2 lg:pt-2 pt-12 px-3 lg:min-h-0 min-h-screen overflow-hidden hidden"
        >
          <el-button
            class="border-2 px-0 glass min-w-[40px] h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl hover:scale-105"
            v-if="!account"
            @click="connectWallet"
            :class="
              isConnectWalletFocused ? 'border-Primary' : 'border-transparent'
            "
          >
            <i
              class="isax isax-empty-wallet text-2xl text-Gray-b5 dark:text-LightGray-b5"
            ></i>
          </el-button>
          <el-button
            icon
            class="border-0 px-2 glass h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl hover:scale-105"
            v-if="account"
          >
            {{ shortenAddress(account) }}
          </el-button>
          <NuxtLink
            :to="account && '/profile'"
            icon
            class="border-0 px-0 glass min-w-[40px] h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl flex items-center justify-center hover:scale-105"
            @click="focusOnConnectWallet"
          >
            <i
              class="isax isax-user text-2xl text-Gray-b5 dark:text-LightGray-b5"
            ></i>
          </NuxtLink>
          <el-button
            icon
            class="border-0 px-2 glass mx-0 h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl hover:scale-105"
            @click="toggleTheme"
          >
            <input
              id="toggle"
              class="toggle"
              v-model="isDarkMode"
              type="checkbox"
            />
            <Icon name="sun" v-if="isDarkMode" />
            <Icon name="moon" v-if="!isDarkMode" />
          </el-button>
        </div>
      </div>

      <!-- mobile toggle navigation -->

      <span class="inline lg:hidden" @click="drawer = !drawer">
        <i
          class="isax isax-menu-1 text-3xl text-Gray-b5 dark:text-LightGray-b5 lg:hidden static"
        ></i>
      </span>

      <!-- mobile navigation  -->

      <section class="lg:hidden absolute" :class="!drawer && 'hidden'">
        <ClientOnly
          ><el-drawer
            v-model="drawer"
            :direction="direction"
            size="100%"
            class="navigation-drawer"
          >
            <template #header>
              <div class="icon flex gap-2 items-center">
                <i class="isax isax-shop text-Primary text-2xl"></i>
                <h1
                  class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic"
                >
                  CultChain
                </h1>
              </div>
            </template>
            <template #default>
              <el-menu
                class="el-menu-responsive bg-transparent w-full border-none justify-end"
              >
                <template v-for="(item, index) in navigations">
                  <el-menu-item
                    v-if="!item.children.length"
                    :index="converToString(index + 1)"
                    class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                  >
                    <nuxt-link :to="item.route">{{ item.text }}</nuxt-link>
                  </el-menu-item>
                  <el-sub-menu
                    v-if="item.children.length"
                    class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                    :index="converToString(index + 1)"
                  >
                    <template #title
                      ><span
                        class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                        >{{ item.text }}</span
                      ></template
                    >
                    <el-menu-item
                      v-for="(subMenu, i) in item.children"
                      :key="i"
                      :index="index + 1 + '-' + i + 1"
                    >
                      <nuxt-link :to="subMenu.route">{{
                        subMenu.text
                      }}</nuxt-link></el-menu-item
                    >
                  </el-sub-menu>
                </template>
              </el-menu>
            </template>
          </el-drawer></ClientOnly
        >
      </section>
    </div>

    <div
      class="network-alert"
      v-if="isMounted && !isNetworkValid && !$isSafari()"
      :key="counter"
    >
      <span variant="info" class="text"
        >You're viewing data from the diffrenet network, please switch your
        network to
        <a
          class="cursor-pointer text-interactive-primary hover:text-interactive-primary-hover disabled:pointer-events-none disabled:opacity-40 underline text-blue-700"
          href="javascript:void(0)"
          @click="switchNetwork"
          >(Mumbai)</a
        ></span
      >
    </div>
    <div v-if="$isSafari()" class="network-alert">
      <span variant="info" class="text"
        >You are using Safari,for better experience please use google
        Chrome</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { shortenAddress } from "@/utils/shortenAddress";
import Icon from "@/components/TheIcon/Icon.vue";
import { useRouter } from "vue-router";

//state

const cryptoStore = useCryptoStore();
const { switchNetwork, connectWallet } = useCryptoStore();
const { account, isNetworkValid } = storeToRefs(cryptoStore);
const drawer = ref(false);
const direction = ref("rtl");
const router = useRouter();
const counter = ref(1);
const search = ref("");
const navigations = [
  // {
  //   route: "/DAO-validator-requests",
  //   text: "DAO Validator Requests",
  //   children: [],
  // },
  {
    route: "/validater-decisions",
    text: "Validaters Decision",
    children: [],
  },
  {
    route: "/events",
    text: "Events",
    children: [],
  },
];
const isMounted = ref(false);
const isDarkMode = ref(true);
const isConnectWalletFocused = ref(false);
const userAgentString = ref(null);
const safariAgent = ref(null);

//methods

const converToString = (e) => {
  if (process.client) {
    return typeof String(e);
  }
};
const toggleTheme = () => {
  const htmlTags = [...document.getElementsByTagName("html")];
  console.log(htmlTags);
  htmlTags.map((item) => {
    item.classList.toggle("dark");
  });
  isDarkMode.value = !isDarkMode.value;
};
const searchHandler = () => {
  if (search.value) {
    router.push(`/search/${search.value}`);
  }
};
const focusOnConnectWallet = async () => {
  if (!account.value) {
    ElNotification({
      title: "Prompt",
      message: "please connect your wallet first!",
      duration: 3000,
    });
    isConnectWalletFocused.value = true;
    setTimeout(() => {
      isConnectWalletFocused.value = false;
    }, 10000);
  }
};

//mounted

onMounted(() => {
  isMounted.value = true;
});

//watch

watch(isNetworkValid, (newVal, oldVal) => {
  if (newVal) {
    counter.value++;
  }
});
</script>

<style lang="scss" scoped>
// magic
.toggle {
  --size: 25px;

  appearance: none;
  outline: none;
  cursor: pointer;

  transition: all 500ms;
}
</style>
