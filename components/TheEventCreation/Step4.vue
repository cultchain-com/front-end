<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <h1 class="text-Gray-b5 dark:text-LightGray-b5 text-xl">MileStones</h1>
    <el-collapse v-if="state.mileStones.length">
      <el-collapse-item v-for="(item, index) in state.mileStones" :key="index">
        <template #title>
          <div class="flex justify-between items-center w-full">
            <h6
              class="text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
            >
              #{{ index + 1 }} {{ item.name }} - {{ item.amount }} ETH
            </h6>
            <p class="text-Gray-b4 dark:text-LightGray-b4 md:text-sm text-xs">
              {{ convertDate(item.endDate) }}
            </p>
          </div>
        </template>
        <div class="text-Gray-b4 dark:text-LightGray-b4 md:text-sm text-xs">
          {{ item.description }}
        </div>
      </el-collapse-item>
    </el-collapse>
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
    <div>
      <button class="block w-fit ml-auto" @click="checkValidation">
        <i class="isax isax-arrow-right-1 text-4xl text-Primary" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElNotification } from "element-plus";
import { useCreateEvent } from "@/store/create-event";

//emits

const emit = defineEmits("addMileStone");

//state

const { state } = useCreateEvent();
const localState = ref({
  amount: null,
  name: "",
  description: "",
  endDate: "",
  mileStones: [],
});

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
  state.mileStones.push(mileStone);
  localState.value.mileStones.push(mileStone);
  clearState();
};
const convertDate = (item) => {
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
</script>
