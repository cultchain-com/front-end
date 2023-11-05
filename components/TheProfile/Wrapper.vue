<template>
  <div class="mb-6 relative bg-Gray-b2 dark:bg-LightGray-b2 rounded-b-xl p-5">
    <section class="absolute -top-8">
      <img
        :src="state.avatar ? state.avatar : '/no-avatar.webp'"
        class="object-cover h-16 w-16 rounded-xl"
      />
    </section>
    <section class="pt-8 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <i
          class="isax isax-user-square text-3xl text-Gray-b5 dark:text-LightGray-b5 relative bottom-1"
        />
        <p class="md:text-lg text-base text-Gray-b5 dark:text-LightGray-b5">
          {{ state.name }}
        </p>
      </div>
      <div class="gap-2 items-center md:flex hidden">
        <NuxtLink to="/leader-board">
          <el-button
            icon
            class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-0 text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
          >
            Leader Board
          </el-button></NuxtLink
        >
        <el-button
          icon
          class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-0 text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
          v-if="!account"
          @click="connectWallet"
        >
          Connect Wallet
        </el-button>
        <el-button
          icon
          class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-0 ml-0 text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
        >
          Request Validator
        </el-button>
      </div>
      <div class="md:hidden">
        <client-only
          ><el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i
                class="isax isax-more text-2xl text-Gray-b5 dark:text-LightGray-b5"
              />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <NuxtLink to="/leader-board"
                  ><el-dropdown-item>Leader Board</el-dropdown-item></NuxtLink
                >
                <el-dropdown-item>Connect Wallet</el-dropdown-item>
                <el-dropdown-item>Request Validator</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown></client-only
        >
      </div>
    </section>
    <section class="pt-8 flex md:justify-evenly justify-between items-center">
      <div class="flex flex-col gap-1 items-center">
        <p
          class="md:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold"
        >
          {{ state.donation }}$
        </p>
        <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
          Donations
        </p>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <p
          class="md:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold"
        >
          {{ state.rewards }}
        </p>
        <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
          Rewards
        </p>
      </div>
      <div class="flex flex-col gap-1 items-center">
        <p
          class="md:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold"
        >
          {{ state.participation }}
        </p>
        <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
          Participation
        </p>
      </div>
    </section>
    <el-divider />
    <section>
      <h1
        class="text-Gray-b5 dark:text-LightGray-b5 md:text-2xl text-lg italic mt-8"
      >
        Bio
      </h1>
      <p
        class="text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm mt-2 px-2"
      >
        {{ state.bio }}
      </p>
      <h1
        class="text-Gray-b5 dark:text-LightGray-b5 md:text-2xl text-lg italic mt-12"
      >
        Links
      </h1>
      <div class="flex items-center gap-4 mt-2">
        <NuxtLink
          v-for="(item, index) in state.links"
          :key="index"
          :to="item.link"
          class="hover:scale-110 cursor-pointer"
        >
          <Icon :name="item.icon" />
        </NuxtLink>
      </div>
    </section>
    <el-divider />
    <section class="mt-8">
      <el-tabs v-model="activeTab" class="profile-tabs">
        <el-tab-pane label="Donation History" name="donations-history">
          <div
            class="grid lg:grid-cols-3 md:grid-cols-2 gap-3 place-content-center p-5 pt-10"
          >
            <div
              v-if="!isDonationHistoryLoading && !userDonationList.length"
              class="col-span-3 h-[395px]"
            >
              <img class="mx-auto no-data-img" src="/empty.png" />
              <h2
                class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
              >
                No Data Found !
              </h2>
            </div>
            <template v-if="!isDonationHistoryLoading">
              <DonationHistoryCard
                v-for="(item, index) in userDonationList"
                :key="index"
                :state="item" /></template
            ><Loading
              :isLoading="isDonationHistoryLoading"
              class="col-span-3 h-[395px] items-start"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Validations History" name="validations-history">
          <div
            class="grid lg:grid-cols-3 md:grid-cols-2 gap-3 place-content-center p-5 pt-10"
          >
            <div
              v-if="!isValidationHistoryLoading && !userValidationList.length"
              class="col-span-3 h-[395px]"
            >
              <img class="mx-auto no-data-img" src="/empty.png" />
              <h2
                class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
              >
                No Data Found !
              </h2>
            </div>
            <template v-if="!isValidationHistoryLoading">
              <ValidationHitoryCard
                v-for="(item, index) in userValidationList"
                :key="index"
                :state="item"
            /></template>

            <Loading
              :isLoading="isValidationHistoryLoading"
              class="col-span-3 h-[395px] items-start"
            /></div
        ></el-tab-pane>
        <el-tab-pane label="Created Events" name="created-events">
          <div
            class="grid lg:grid-cols-3 md:grid-cols-2 gap-3 place-content-center p-5 pt-10"
          >
            <div
              v-if="!isEventHistoryLoading && !userEventList.length"
              class="col-span-3 h-[395px]"
            >
              <img class="mx-auto no-data-img" src="/empty.png" />
              <h2
                class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
              >
                No Data Found !
              </h2>
            </div>
            <template v-if="!isEventHistoryLoading"
              ><EventHistoryCard
                v-for="(item, index) in userEventList"
                :key="index"
                :state="item"
            /></template>

            <Loading
              :isLoading="isEventHistoryLoading"
              class="col-span-3 h-[395px] items-start"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import Loading from "@/components/Base/Loading.vue";
import DonationHistoryCard from "./DonationHistoryCard.vue";
import ValidationHitoryCard from "./ValidationHitoryCard.vue";
import EventHistoryCard from "./EventHistoryCard.vue";
import { ref } from "vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";

//state

const isDonationHistoryLoading = ref(false);
const isValidationHistoryLoading = ref(false);
const isEventHistoryLoading = ref(false);
const cryptoStore = useCryptoStore();
const {
  connectWallet,
  getDonorDonations,
  getUserPastDecisions,
  userCreatedEvents,
  userProfile,
} = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const state = ref({
  avatar: "",
  name: "User 1",
  donation: 15000,
  rewards: 20,
  participation: 7,
  bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  links: [
    {
      icon: "facebook",
      link: "",
    },
    {
      icon: "twitter",
      link: "",
    },
    {
      icon: "instagram",
      link: "",
    },
  ],
  account: "",
});
const profile = ref(null);
const activeTab = ref("donations-history");
const userDonationList = ref([]);
const userValidationList = ref([]);
const userEventList = ref([]);

// methods

const setUserDonationList = async () => {
  isDonationHistoryLoading.value = true;
  userDonationList.value = await getDonorDonations(account.value);
  isDonationHistoryLoading.value = false;
};
const setUserValidationList = async () => {
  isValidationHistoryLoading.value = true;
  userValidationList.value = await getUserPastDecisions(account.value);
  isValidationHistoryLoading.value = false;
};
const setUserEventLis = async () => {
  isEventHistoryLoading.value = true;
  userEventList.value = await userCreatedEvents();
  isEventHistoryLoading.value = false;
};
const setProfile = async (userAddress) => {
  profile.value = await userProfile(userAddress);
};

//mounted

onMounted(() => {
  if (account.value) {
    setProfile(account.value);
    setUserDonationList();
    setUserValidationList();
    setUserEventLis();
  }
});

//watch

watch(account, (newVal, oldVal) => {
  if (newVal) {
    setProfile(newVal);
    setUserDonationList();
    setUserValidationList();
    setUserEventLis();
  }
});
</script>
<style lang="scss" scoped>
.no-data-img {
  height: inherit;
}
</style>
