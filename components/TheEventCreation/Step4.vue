<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <h1 class="text-Gray-b5 dark:text-LightGray-b5 text-base">
      <NuxtLink
        :key="props.state?.eventDetails.name"
        :to="'/events/' + route.params.id"
        class="text-Primary underline underline-offset-4 cursor-pointer"
        >{{ props.state?.eventDetails.name }}</NuxtLink
      >
      - MileStones
    </h1>
    <el-collapse v-if="props.state?.milestones.length">
      <el-collapse-item
        v-for="(item, index) in props.state.milestones"
        :key="index"
      >
        <template #title>
          <div class="flex justify-between items-center w-full">
            <h6 class="text-Gray-b5 dark:text-LightGray-b5 text-sm">
              #{{ index + 1 }} {{ item.name }} -
              {{
                new Intl.NumberFormat().format(
                  item.targetAmount / Math.pow(10, 18)
                )
              }}
              ETH
            </h6>
            <p class="text-Gray-b4 dark:text-LightGray-b4 text-xs">
              {{ convertDate(item.endDate) }}
            </p>
          </div>
        </template>
        <div class="text-Gray-b4 dark:text-LightGray-b4 md:text-sm text-xs">
          {{ item.description }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <template v-else
      ><span class="text-Gray-b4 dark:text-LightGray-b4">No MileStones!</span>
    </template>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >Target Amount
      </label>
      <div class="relative">
        <i
          class="isax isax-money-add text-xl absolute top-[6px] left-2 text-Gray-b5 dark:text-LightGray-b5"
        />
        <input
          placeholder="Target Amount"
          class="w-full py-2 focus:border-Primary border-2 border-transparent pl-8 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
          type="number"
          v-model="localState.amount"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >Name</label
      >
      <div class="relative">
        <input
          placeholder="Name"
          class="w-full py-2 focus:border-Primary border-2 border-transparent px-2 rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
          v-model="localState.name"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >End Date</label
      >
      <el-date-picker
        v-model="localState.endDate"
        type="date"
        class="w-full"
        format="YYYY/MM/DD"
        value-format="x"
        placeholder="End Date"
      />
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >Description</label
      >
      <textarea
        placeholder="description"
        v-model="localState.description"
        class="rounded-lg focus:border-Primary border-2 border-transparent outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1 p-2 h-[200px]"
      ></textarea>
    </div>
    <div class="flex items-center justify-end gap-6">
      <button class=" " @click="checkValidation">
        <i class="isax isax-arrow-right-1 text-4xl text-Primary" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElNotification } from "element-plus";
import { useCreateEvent } from "@/store/create-event";
import { useRoute } from "vue-router";

//emits

const emit = defineEmits("addMileStone", "clearFlag");

//props

const props = defineProps({
  state: null,
  flag: false,
});

//state

const { state } = useCreateEvent();
const localState = ref({
  amount: null,
  name: "",
  description: "",
  endDate: "",
  mileStones: [],
});
const route = useRoute();
const mileStoneBackup = ref(null);

//methods

const clearState = () => {
  localState.value.amount = null;
  localState.value.name = "";
  localState.value.description = "";
  localState.value.endDate = "";
};
const checkValidation = () => {
  if (!localState.value.amount) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert Amount"),
      type: "error",
    });
    return false;
  } else if (
    mileStoneValue.value + localState.value.amount * Math.pow(10, 18) >=
    +props.state.eventDetails.targetAmount.toString()
  ) {
    ElNotification({
      title: "Error",
      message: h(
        "i",
        "MileStone Target Amounts should be Equal or less than Event Target Amount"
      ),
      type: "error",
    });
    return false;
  } else if (!localState.value.name) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert MileStone Name"),
      type: "error",
    });
    return false;
  } else if (!localState.value.description) {
    ElNotification({
      title: "Error",
      message: h("i", "Please Fill description"),
      type: "error",
    });
    return false;
  } else if (!localState.value.endDate) {
    ElNotification({
      title: "Error",
      message: h("i", "Please select Event End Date"),
      type: "error",
    });
    return false;
  }
  addMileStone();
};
const addMileStone = () => {
  const mileStone = {
    name: localState.value.name,
    description: localState.value.description,
    amount: localState.value.amount,
    endDate: localState.value.endDate,
  };
  emit("addMileStone", mileStone);
  mileStoneBackup.value = mileStone;
};
const convertDate = (item) => {
  var date = new Date(Number(+item.toString()));
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var formattedDate =
    year +
    "/" +
    (month < 10 ? "0" + month : month) +
    "/" +
    (day < 10 ? "0" + day : day);
  console.log(formattedDate);
  return formattedDate;
};

//watch

watch(props.flag, (newVal, oldVal) => {
  if (newVal == "true") {
    state.mileStones.push(mileStoneBackup.value);
    clearState();
    emit("clearFlag");
  }
});

//computed

const mileStoneValue = computed(() => {
  if (process.client) {
    let val = 0;
    props.state.milestones.map((item) => {
      val = +item.targetAmount.toString() + val;
    });
    return val;
  }
});
</script>
