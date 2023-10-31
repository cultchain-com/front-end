<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      DAO Validaters Requests
    </h1>
    <div
      class="grid lg:grid-cols-3 md:grid-cols-2 gap-3 place-content-center p-5 pt-10"
    >
      <div v-if="!ongoingDecisions.length" class="col-span-3 h-[395px]">
        <img class="mx-auto" src="/empty.png" />
        <h2
          class="mx-2xl text-Gray-b5 dark:text-LightGray-b5 font-medium text-center"
        >
          No Data Found !
        </h2>
      </div>
      <Card
        v-for="(item, index) in ongoingDecisions"
        :key="index"
        :state="item"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Icon from "@/components/TheIcon/Icon.vue";
import { useDAOValidatorRequests } from "@/store/dao-validator-requests.js";
import Card from "./Card.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

//state

const store = useDAOValidatorRequests();
const cryptoStore = useCryptoStore();
const { getAllOngoingDecisions } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const ongoingDecisions = ref([]);
const loading = useLoading();

//mounted

onMounted(async () => {
  loading.isLoading = true;
  ongoingDecisions.value = await getAllOngoingDecisions();
  console.log(ongoingDecisions.value, "decisions");
  loading.isLoading = false;
});
</script>
