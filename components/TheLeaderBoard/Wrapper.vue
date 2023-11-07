<template>
  <section class="mt-8 my-6 rounded-xl">
    <h1
      class="lg:text-2xl text-lg text-Gray-b5 dark:text-LightGray-b5 font-bold text-start lg:leading-[40px] leading-10"
    >
      Leader Board
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-start mb-8"
    >
      Feel Free to investigate useful resources provided by our team to learn
      more about this new market.
    </p>
    <el-tabs v-model="activeTab" class="profile-tabs">
      <el-tab-pane label="Donors" name="donations-history">
        <div class="border-0 mb-6 rounded-xl">
          <h2 class="text-Gray-b5 text-center py-10" v-if="!donorsLeaderboard?.length">donors leaderboard is empty</h2>
          <DonorsTable :state="donorsLeaderboard" v-if="donorsLeaderboard?.length" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="Validaters" name="validations-history">
        <div class="border-0 mb-6 rounded-xl">
          <ValidatersTable :state="validatorsLeaderboard" v-if="validatorsLeaderboard?.length" />
          <h2 class="text-Gray-b5 text-center py-10" v-if="!validatorsLeaderboard?.length">validators leaderboard is empty</h2>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Creaters" name="created-events">
        <div class="border-0 mb-6 rounded-xl">
          <h2 class="text-Gray-b5 text-center py-10" v-if="!creatorsLeaderboard?.length">creators leaderboard is empty</h2>
          <CreatersTable :state="creatorsLeaderboard" v-if="creatorsLeaderboard?.length" /></div
      ></el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
import DonorsTable from "./DonorsTable.vue";
import ValidatersTable from "./ValidatersTable.vue";
import CreatersTable from "./CreatersTable.vue";
import { ref } from "vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

// state

const activeTab = ref("donations-history");
const donorsLeaderboard = ref(null);
const creatorsLeaderboard = ref(null);
const validatorsLeaderboard = ref(null);
const {
  getCreatorsLeaderboard,
  getDonorsLeaderboard,
  getValidatersLeaderboard,
} = useCryptoStore();
const loading = useLoading();

//mounted

onMounted(async () => {
  loading.isLoading = true;
  donorsLeaderboard.value = await getDonorsLeaderboard();
  creatorsLeaderboard.value = await getCreatorsLeaderboard();
  validatorsLeaderboard.value = await getValidatersLeaderboard();
  loading.isLoading = false;
});
</script>
