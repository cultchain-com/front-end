<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >{{ $t("Tatget_Amount") }}
      </label>
      <div class="relative">
        <i
          class="isax isax-money-add text-xl absolute top-[6px] left-2 text-Gray-b5 dark:text-LightGray-b5"
        />
        <input
          class="w-full py-2 pl-8 focus:border-Primary border-2 border-transparent rounded-lg outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
          type="number"
          :placeholder="$t(`Tatget_Amount`)"
          v-model="state.amount"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">{{
        $t("Event_Name")
      }}</label>
      <div class="relative">
        <input
          class="w-full py-2 px-2 rounded-lg focus:border-Primary border-2 border-transparent outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1"
          v-model="state.name"
          :placeholder="$t(`Event_Name`)"
          autocomplete="off"
        />
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">{{
        $t("Category")
      }}</label>

      <div class="w-full">
        <el-select
          v-model="state.category"
          :placeholder="$t(`Category`)"
          class="select w-full"
        >
          <el-option
            v-for="item in props.CategoryList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </div>
    </div>
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5">{{
        $t("End_Date")
      }}</label>
      <div>
        <el-date-picker
          v-model="state.endDate"
          type="date"
          value-format="x"
          class="w-full focus:border-Primary border-2 border-transparent"
          format="YYYY/MM/DD"
          :placeholder="$t(`End_Date`)"
        />
      </div>
    </div>
    <div>
      <button
        class="bg-Primary w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="checkValidation"
      >
        {{ $t("Next") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElNotification } from "element-plus";
import { useCreateEvent } from "@/store/create-event";

const { state } = useCreateEvent();

//props

const props = defineProps({
  CategoryList: {
    default: [],
  },
});

//emits

const emit = defineEmits("nextStep");

//state

// const state = ref({
//   amount: null,
//   name: "",
//   category: "",
//   endDate: "",
// });

//methods

const checkValidation = () => {
  if (!state.amount) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert Amount"),
      type: "error",
    });
    return false;
  } else if (!state.name) {
    ElNotification({
      title: "Error",
      message: h("i", "Please insert Event Name"),
      type: "error",
    });
    return false;
  } else if (!state.category) {
    ElNotification({
      title: "Error",
      message: h("i", "Please select Category"),
      type: "error",
    });
    return false;
  } else if (!state.endDate) {
    ElNotification({
      title: "Error",
      message: h("i", "Please select Event End Date"),
      type: "error",
    });
    return false;
  }
  emit("nextStep", state);
};
const onMouseOver = (event) => {
  event.target.classList.add("is-focused");
};
const onMouseLeave = (event) => {
  event.target.classList.remove("is-focused");
};
</script>
