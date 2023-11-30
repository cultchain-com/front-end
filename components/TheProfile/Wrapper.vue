<template>
  <div class="mb-6 relative bg-Gray-b2 dark:bg-LightGray-b2 rounded-b-xl p-5">
    <div v-if="state">
      <section class="absolute -top-8">
        <img
          :src="state.avatar ? state.avatar : '/no-avatar.webp'"
          class="object-cover h-16 w-16 rounded-xl"
        />
      </section>
      <section class="pt-8 flex justify-between items-center">
        <div>
          <h3
            class="md:text-xl font-semibold text-base text-Gray-b5 dark:text-LightGray-b5"
          >
            {{ state.name ? state.name : "Unnamed" }}
          </h3>
          <div class="flex items-center gap-2">
            <i
              class="isax isax-user-square text-3xl text-Gray-b5 dark:text-LightGray-b5 relative bottom-1"
            />
            <div>
              <p
                class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-2"
              >
                {{ shortenAddress(account) }}
                <span class="text-sm text-Gray-b3 dark:text-LightGray-b3"
                  >Joined {{ convertDate(state.date_joined) }}</span
                >
              </p>
            </div>
            <button class="ml-2" @click="isEditMode = !isEditMode">
              <i
                class="isax isax-edit text-Gray-b5 dark:text-LightGray-b5 relative top-[1px]"
              />
            </button>
          </div>
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
            @click="addValidatorHandler"
            icon
            class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-0 ml-0 text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
            :disabled="isAddValidatorLoading"
          >
            {{ isAddValidatorLoading ? "Loading..." : "Request Validator" }}
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
      <section v-if="!isEditMode">
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
            :to="state.facebook_link"
            class="hover:scale-110 cursor-pointer"
          >
            <Icon name="facebook" />
          </NuxtLink>
          <NuxtLink
            :to="state.twitter_link"
            class="hover:scale-110 cursor-pointer"
          >
            <Icon name="twitter" />
          </NuxtLink>
          <NuxtLink
            :to="state.instagram_link"
            class="hover:scale-110 cursor-pointer"
          >
            <Icon name="instagram" />
          </NuxtLink>
        </div>
      </section>
      <section v-if="isEditMode">
        <div class="max-w-[391px] w-full flex flex-col gap-4">
          <div class="form-item flex flex-col gap-1">
            <label
              class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
              >Name</label
            >
            <div class="relative">
              <input
                placeholder="Name ..."
                class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
                v-model="editModeState.name"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-item flex flex-col gap-1">
            <label
              class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
              >Bio</label
            >
            <div class="relative">
              <input
                placeholder="Bio ..."
                class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
                v-model="editModeState.bio"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-item flex flex-col gap-1">
            <label
              class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
              ><Icon name="facebook"
            /></label>
            <div class="relative">
              <input
                placeholder="https://www.facebook.com/your_facebook_id"
                class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
                v-model="editModeState.facebook_link"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-item flex flex-col gap-1">
            <label
              class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
              ><Icon name="twitter"
            /></label>
            <div class="relative">
              <input
                placeholder="https://www.twitter.com/your_twitter_id"
                class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
                v-model="editModeState.twitter_link"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="form-item flex flex-col gap-1">
            <label
              class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
              ><Icon name="instagram"
            /></label>
            <div class="relative">
              <input
                placeholder="https://www.instagram.com/your_instagram_id"
                class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
                v-model="editModeState.instagram_link"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="grid grid-cols-2">
            <el-button
              @click="saveEditsHandler"
              icon
              class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-2 border-transparent text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
            >
              {{ isLoading ? "Loading ..." : "Save" }}
            </el-button>
            <el-button
              @click="clearEditModeState"
              icon
              class="bg-transparent bg-opacity-95 hover:bg-opacity-100 border-2 border-Primary text-Gray-b5 dark:text-LightGray-b5 py-5 rounded-xl"
            >
              Cancel
            </el-button>
          </div>
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
    <div v-if="!state">
      <section class="absolute -top-8">
        <img src="/no-avatar.webp" class="object-cover h-16 w-16 rounded-xl" />
      </section>
      <section class="pt-8 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i
            class="isax isax-user-square text-3xl text-Gray-b5 dark:text-LightGray-b5 relative bottom-1"
          />
          <p class="md:text-lg text-base text-Gray-b5 dark:text-LightGray-b5">
            {{ shortenAddress(account) }}
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
          <NuxtLink
            to="/become-donor"
            class="bg-Primary bg-opacity-95 hover:bg-opacity-100 border-0 ml-0 text-Gray-b5 dark:text-LightGray-b5 px-[15px] max-h-10 h-10 flex items-center rounded-xl"
          >
            Become Donor
          </NuxtLink>
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
            0 $
          </p>
          <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
            Donations
          </p>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <p
            class="md:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold"
          >
            0
          </p>
          <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
            Rewards
          </p>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <p
            class="md:text-xl text-base text-Gray-b5 dark:text-LightGray-b5 font-bold"
          >
            0
          </p>
          <p class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">
            Participation
          </p>
        </div>
      </section>
    </div>
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
import { shortenAddress } from "@/utils/shortenAddress";
import { useRouter } from "vue-router";

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
  getUserProfile,
  updateUserProfile,
  addValidator,
} = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const state = ref(null);
const profile = ref(null);
const activeTab = ref("donations-history");
const userDonationList = ref([]);
const userValidationList = ref([]);
const userEventList = ref([]);
const isEditMode = ref(false);
const editModeState = ref({
  bio: "",
  name: "",
  facebook_link: "",
  instagram_link: "",
  twitter_link: "",
});
const isLoading = ref(false);
const isAddValidatorLoading = ref(false);
const router = useRouter();

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
  userEventList.value = await userCreatedEvents(account.value);
  isEventHistoryLoading.value = false;
};
const setProfile = async (userAddress) => {
  let status;
  status = await getUserProfile(userAddress);
  if (status == -1) {
    state.value = null;
  } else {
    state.value = await getUserProfile(userAddress);
  }
};
const clearEditModeState = () => {
  editModeState.value = {
    bio: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
  };
  isEditMode.value = false;
};
const saveEditsHandler = async () => {
  isLoading.value = true;
  let profile = JSON.parse(JSON.stringify(state.value));
  profile.name = editModeState.value.name;
  profile.twitter_link = editModeState.value.twitter_link;
  profile.instagram_link = editModeState.value.instagram_link;
  profile.facebook_link = editModeState.value.facebook_link;
  const response = await updateUserProfile(account.value, profile);
  if (response !== -1) {
    state.value = profile;
    ElNotification({
      title: "Success",
      message: h("i", "Profile Update Successfully."),
      type: "success",
    });
    clearEditModeState();
    isEditMode.value = false;
  }
  isLoading.value = false;
};
const convertDate = (item) => {
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
const addValidatorHandler = async () => {
  isAddValidatorLoading.value = true;
  await addValidator(account.value);
  isAddValidatorLoading.value = false;
};

//mounted

onMounted(async () => {
  let status = await connectWallet();
  if (!status) {
    router.push("/");
  }
  setProfile(account.value);
  setUserDonationList();
  setUserValidationList();
  setUserEventLis();
});
</script>
<style lang="scss" scoped>
.no-data-img {
  height: inherit;
}
</style>
