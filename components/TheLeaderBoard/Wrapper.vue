<template>
  <section class="mt-8 my-6 rounded-xl">
    <h1
      class="lg:text-2xl text-lg text-Gray-b5 dark:text-LightGray-b5 font-bold text-start lg:leading-[40px] leading-10"
    >
      {{ t("Leader_Board") }}
    </h1>
    <p
      class="text-Gray-b5 dark:text-LightGray-b5 text-sm leading-8 text-start mb-8"
    >
      {{ t("Leader_Board_description") }}
    </p>
    <el-tabs v-model="activeTab" class="profile-tabs">
      <el-tab-pane name="donations-history">
        <template #label>
          <span class="custom-tabs-label">
            <span>{{ t("Donors") }}</span>
          </span>
        </template>
        <div class="border-0 mb-6 rounded-xl">
          <h2
            class="text-Gray-b5 text-center py-10"
            v-if="!donorsLeaderboard?.length"
          >
            {{ t("Donors_empty") }}
          </h2>
          <DonorsTable
            :state="donorsLeaderboard"
            v-if="donorsLeaderboard?.length"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane name="validations-history">
        <template #label>
          <span class="custom-tabs-label">
            <span>{{ t("Validaters") }}</span>
          </span>
        </template>
        <div class="border-0 mb-6 rounded-xl">
          <ValidatersTable
            :state="validatorsLeaderboard"
            v-if="validatorsLeaderboard?.length"
          />
          <h2
            class="text-Gray-b5 text-center py-10"
            v-if="!validatorsLeaderboard?.length"
          >
            {{ t("Validaters_empty") }}
          </h2>
        </div>
      </el-tab-pane>
      <el-tab-pane name="created-events">
        <template #label>
          <span class="custom-tabs-label">
            <span>{{ t("Creaters") }}</span>
          </span>
        </template>
        <div class="border-0 mb-6 rounded-xl">
          <h2
            class="text-Gray-b5 text-center py-10"
            v-if="!creatorsLeaderboard?.length"
          >
            {{ t("Creaters_empty") }}
          </h2>
          <CreatersTable
            :state="creatorsLeaderboard"
            v-if="creatorsLeaderboard?.length"
          ></CreatersTable>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import DonorsTable from "./DonorsTable.vue";
import ValidatersTable from "./ValidatersTable.vue";
import CreatersTable from "./CreatersTable.vue";
import { ref } from "vue";
import { useCryptoStore } from "~/store/crypto";
import { useLoading } from "@/store/loading";

//state

const { t } = useI18n();
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
