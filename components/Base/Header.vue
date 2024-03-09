<template>
  <div class="sticky top-0 z-50" :key="counter">
    <div
      class="flex justify-between items-center h-[70px] lg:px-0 px-10 bg-Gray-b1 dark:bg-LightGray-b1"
    >
      <!-- logo -->

      <div class="flex">
        <NuxtLink to="/" class="icon flex gap-2 items-center min-w-fit"
          ><img src="/logo.png" class="h-[40px]" alt="cultchain" />
          <h1
            class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl italic md:static hidden"
          >
            CultChain
          </h1>
          <div class="h-[60%] w-1 bg-Gray-b3 rounded-xl"></div>
        </NuxtLink>
        <el-menu
          class="el-menu-demo bg-transparent xl:min-w-full border-none justify-start relative top-1 lg:flex hidden"
          mode="horizontal"
        >
          <el-menu-item
            index="1"
            class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
          >
            <nuxt-link
              to="/validater-decisions"
              class="dark:text-LightGray-b5 text-Gray-b4"
              >{{ t("Validaters_Decision") }}</nuxt-link
            >
          </el-menu-item>
          <el-menu-item
            index="2"
            class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
          >
            <nuxt-link
              to="/events"
              class="dark:text-LightGray-b5 text-Gray-b4"
              >{{ t("Events") }}</nuxt-link
            >
          </el-menu-item>
        </el-menu>
      </div>

      <!-- desktop navigation  -->

      <div
        class="navigation lg:flex lg:items-center justify-between items-end gap-4 lg:min-w-fit w-full lg:opacity-100 lg:flex-row flex-col lg:static absolute top-0 right-0 lg:bg-transparent bg-Gray-b1 dark:bg-LightGray-b1 bg-opacity-90 pb-2 lg:pt-2 pt-12 px-3 lg:min-h-0 min-h-screen overflow-hidden hidden"
      >
        <!-- searchbar  -->

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
              :placeholder="t('Search')"
              autocomplete="off"
              class="w-full h-10 placeholder:text-Gray-b5 dark:text-LightGray-b5 text-Gray-b5 rounded-xl outline-none px-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70"
            />
          </div>
        </div>
        <div
          class="lg:flex lg:items-center items-end min-w-fit gap-4 lg:opacity-100 lg:flex-row flex-col lg:static absolute top-0 right-0 lg:bg-transparent bg-Gray-b1 dark:bg-LightGray-b1 bg-opacity-90 pb-2 lg:pt-2 pt-12 px-3 lg:min-h-0 min-h-screen overflow-hidden hidden"
        >
          <!-- buttons  -->

          <el-button
            class="border-2 border-transparent px-0 glass min-w-[40px] h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl hover:scale-105"
            v-if="!account"
            @click="connectWallet"
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
          <el-button
            icon
            class="border-0 px-0 mx-0 glass min-w-[40px] h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl flex items-center justify-center hover:scale-105"
            @click="checkWalletConnection"
          >
            <i
              class="isax isax-user text-2xl text-Gray-b5 dark:text-LightGray-b5"
            ></i>
          </el-button>
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
          <el-button
            icon
            class="border-0 px-0 mx-0 glass min-w-[40px] h-10 bg-Gray-b3 dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl flex items-center justify-center hover:scale-105"
          >
            <el-dropdown
              @command="locale = $event"
              class="focus-visible:outline-none hover:outline-none"
            >
              <i
                class="isax isax-global-edit text-2xl text-Gray-b5 dark:text-LightGray-b5"
              >
              </i>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                  <el-dropdown-item command="fa">فارسی</el-dropdown-item>
                  <el-dropdown-item command="ar">عربی</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
                <el-menu-item
                  index="1"
                  class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                >
                  <nuxt-link to="/validater-decisions">{{
                    t("Validaters_Decision")
                  }}</nuxt-link>
                </el-menu-item>
                <el-menu-item
                  index="2"
                  class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                >
                  <nuxt-link to="/events">{{ t("Events") }}</nuxt-link>
                </el-menu-item>
                <el-menu-item
                  class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                  @click="checkWalletConnection"
                  >{{ t("Profile") }}
                </el-menu-item>
                <el-menu-item
                  @click="toggleTheme"
                  class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                >
                  <!-- <input
                    id="toggle"
                    class="toggle"
                    v-model="isDarkMode"
                    type="checkbox"
                  />
                  <Icon name="sun" v-if="isDarkMode" />
                  <Icon name="moon" v-if="!isDarkMode" /> -->
                  <div class="flex justify-between items-center w-full">
                    <h5>{{ t("Theme") }}</h5>
                    <el-switch
                      size="large"
                      v-model="isDarkMode"
                      @change="isDarkMode = !isDarkMode"
                      :active-action-icon="Sunny"
                      :inactive-action-icon="Moon"
                      active-colo="red"
                    >
                    </el-switch>
                  </div>
                </el-menu-item>
                <el-menu-item
                  class="text-Gray-b4 dark:text-LightGray-b4 hover:bg-transparent hover:text-Gray-b5 dark:text-LightGray-b5"
                >
                  <div class="flex w-full justify-between items-center">
                    <h5>{{ t("Translation") }}</h5>
                    <el-button
                      icon
                      class="border-0 px-0 mx-0 glass min-w-[40px] h-10 bg-transparent dark:bg-LightGray-b3 bg-opacity-70 text-Gray-b5 dark:text-LightGray-b5 rounded-xl flex items-center justify-center hover:scale-105"
                    >
                      <el-dropdown
                        @command="locale = $event"
                        class="focus-visible:outline-none hover:outline-none"
                      >
                        <i
                          class="isax isax-global-edit text-2xl text-Gray-b5 dark:text-LightGray-b5"
                        >
                        </i>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item command="en"
                              >English</el-dropdown-item
                            >
                            <el-dropdown-item command="fa"
                              >فارسی</el-dropdown-item
                            >
                            <el-dropdown-item command="ar"
                              >عربی</el-dropdown-item
                            >
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </el-button>
                  </div>
                </el-menu-item>
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
import { useI18n } from "vue-i18n";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useDialog } from "@/store/tips-and-tricks";
const dialogStore = useDialog();

//state

const { t } = useI18n();
const { locale } = useI18n();
const cryptoStore = useCryptoStore();
const { switchNetwork, connectWallet, isAccountConnected } = useCryptoStore();
const { account, isNetworkValid } = storeToRefs(cryptoStore);
const { isConnectAccountModalVisible } = storeToRefs(dialogStore);
const drawer = ref(false);
const direction = ref("rtl");
const router = useRouter();
const counter = ref(1);
const search = ref("");
const navigations = ref([
  // {
  //   route: "/DAO-validator-requests",
  //   text: "DAO Validator Requests",
  //   children: [],
  // },
  {
    route: "/validater-decisions",
    text: t("Validaters_Decision"),
    children: [],
  },
  {
    route: "/events",
    text: "Events",
    children: [],
  },
]);
const isMounted = ref(false);
const isDarkMode = ref(true);

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
const checkWalletConnection = async () => {
  if (!account.value) {
    isConnectAccountModalVisible.value = true;
  } else {
    router.push("/profile");
  }
};

//mounted

onMounted(() => {
  isAccountConnected();
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
