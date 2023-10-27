<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <el-collapse v-if="state.mileStones.length">
      <el-collapse-item v-for="(item, index) in state.mileStones" :key="index">
        <template #title>
          <div class="flex justify-between items-center w-full">
            <h6 class="text-Gray-b5 md:text-base text-sm">
              #{{ index + 1 }} {{ item.name }} - {{ item.amount }} ETH
            </h6>
            <p class="text-Gray-b4 md:text-sm text-xs">
              {{ convertDate(item.endDate) }}
            </p>
          </div>
        </template>
        <div class="text-Gray-b4 md:text-sm text-xs">
          {{ item.description }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-white">Target Amount </label>
      <div class="relative">
        <i
          class="isax isax-money-add text-xl absolute top-[6px] left-2 text-Gray-b5"
        />
        <input
          class="w-full py-2 pl-8 rounded-lg outline-none text-Gray-b5 bg-Gray-b1"
          type="number"
          v-model="localState.amount"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-white">Name</label>
      <div class="relative">
        <input
          class="w-full py-2 px-2 rounded-lg outline-none text-Gray-b5 bg-Gray-b1"
          v-model="localState.name"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-white">End Date</label>
      <el-date-picker
        v-model="localState.endDate"
        type="date"
        class="w-full"
        format="YYYY/MM/DD"
        value-format="x"
      />
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-white">Description</label>
      <textarea
        v-model="localState.description"
        class="rounded-lg outline-none text-Gray-b5 bg-Gray-b1 p-5 text-sm h-[200px]"
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
  const timestamp = parseInt(item) * 1000; // multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timestamp).toLocaleDateString("en-GB");
  return date;
};
</script>
