<template>
  <div class="flex flex-col gap-8 py-20">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      Validaters Decision
    </h1>
    <section class="flex flex-col mt-8 gap-4">
      <h6 class="lg:text-xl text-base mt-12 text-Primary text-start">
        Creation
      </h6>
      <div class="grid lg:grid-cols-3 md:grid-cols-2">
        <CreationCard
          v-for="(item, index) in creationList"
          :key="index"
          :state="item"
        />
      </div>
      <h6 class="lg:text-xl text-base mt-12 text-Primary text-start">
        Progress
      </h6>

      <div class="grid lg:grid-cols-3 md:grid-cols-2">
        <ProgressCard
          v-for="(item, index) in progressList"
          :key="index"
          :state="item"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Icon from "@/components/TheIcon/Icon.vue";
import { useValidatorDecisions } from "@/store/validator-decisions";
import CreationCard from "./CreationCard.vue";
import ProgressCard from "./ProgressCard.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";

//state

const store = useValidatorDecisions();
const cryptoStore = useCryptoStore();
const { getAllPastDecisions } = useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const pastDecisions = ref([]);
const loading = useLoading();

//mounted

onMounted(async () => {
  loading.isLoading = true;
  pastDecisions.value = await getAllPastDecisions();
  console.log(pastDecisions.value, "past decisions");
  loading.isLoading = false;
});

//computed

const creationList = computed(() => {
  let list = pastDecisions.value;
  return list?.filter((event) => {
    return (
      event.proposalDetail.status === "Approved" &&
      +event.proposalDetail.targetAmount.toString() <
        +event.proposalDetail.collectedAmount.toString()
    );
  });
});

const progressList = computed(() => {
  let list = pastDecisions.value;
  return list?.filter((event) => {
    return (
      event.proposalDetail.status === "Approved" &&
      +event.proposalDetail.targetAmount.toString() >
        +event.proposalDetail.collectedAmount.toString()
    );
  });
});
</script>
