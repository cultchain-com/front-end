<template>
  <el-steps :active="activeStepp" align-center class="my-6">
    <el-step>
      <template #title>Step 1</template>
    </el-step>
    <el-step>
      <template #title>Step 2</template>
    </el-step>
    <el-step>
      <template #title>Step 3</template>
    </el-step>
    <el-step>
      <template #title>Step 4</template>
    </el-step>
  </el-steps>
  <div class="p-5">
    <template v-if="activeStepp == 1">
      <Step1 @nextStep="stepOneHandler" :CategoryList="categoryList" />
    </template>
    <template v-else-if="activeStepp == 2">
      <Step2 @nextStep="stepTwoHandler" @prevStep="activeStepp = 1" />
    </template>
    <template v-else-if="activeStepp == 3">
      <Step3 @nextStep="stepThreeHandler" @prevStep="activeStepp = 2" />
    </template>
    <template v-else-if="activeStepp == 4">
      <Step4 @addMileStone="stepFourHandler" />
    </template>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import Step1 from "./Step1.vue";
import Step2 from "./Step2.vue";
import Step3 from "./Step3.vue";
import Step4 from "./Step4.vue";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useCreateEvent } from "@/store/create-event";
import { useLoading } from "@/store/loading";

//state

const router = useRouter();
const { state } = useCreateEvent();
const createEventStore = useCreateEvent();
const { activeStepp } = storeToRefs(createEventStore);
const cryptoStore = useCryptoStore();
const { createEvent, CategoryList, addMilestone, getEventDetail } =
  useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const localState = ref({
  mileStone: {
    eventId: null,
    milestoneName: null,
    description: null,
    targetAmount: null,
    endDate: null,
  },
});
const categoryList = ref([]);
const loading = useLoading();
const eventDetail = ref(null);

//methods

const stepOneHandler = (e) => {
  activeStepp.value = 2;
};
const stepTwoHandler = (e) => {
  activeStepp.value = 3;
};
const stepThreeHandler = async (e) => {
  await createEventHandler();
};
const stepFourHandler = async (e) => {
  loading.isLoading = true;
  eventDetail.value = await getEventDetail();
  await addMileStoneHandler();
  dialogVisible.value = false;
};

const createEventHandler = async () => {
  const { amount, name, coverPhoto, description, endDate, category } = state;
  const eventId = await createEvent(
    coverPhoto,
    name,
    description,
    amount,
    endDate,
    category
  );
  if (!eventId) {
    router.push("/events");
  } else {
    localState.value.mileStone.eventId = eventId;
    router.push("/event-creation/" + eventId);
  }
};
const addMileStoneHandler = async () => {
  const { eventId, milestoneName, description, targetAmount, endDate } =
    localState.value.mileStone;
  await addMilestone(
    eventId,
    milestoneName,
    description,
    targetAmount,
    endDate
  );
};

//mounted

onMounted(() => {
  if (!account.value) {
    router.push("/events");
  }
  categoryList.value = Object.entries(CategoryList).map(([key, value]) => ({
    value: key,
    label: value,
  }));
});
</script>
