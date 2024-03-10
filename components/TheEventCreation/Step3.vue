<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <div class="form-item flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <label
          class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
          >{{ $t("Describe_Your_Situation") }}</label
        >
        <el-popover placement="bottom" trigger="click">
          <h6
            class="text-sm text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-1"
          >
            <span class="text-red-600 text-xl relative top-[2px]">*</span
            >{{ $t("Describe_Your_Situation") }}
          </h6>
          <p class="text-xs text-Gray-b4 dark:text-LightGray-b4 mt-2">
            {{ $t("Describe_Your_Situation_Description") }}
          </p>
          <template #reference
            ><i
              class="isax isax-info-circle text-Gray-b5 dark:text-LightGray-b5 font-bold text-lg"
            />
          </template>
        </el-popover>
      </div>
      <textarea
        class="rounded-lg focus:border-Primary border-2 border-transparent outline-none text-Gray-b5 dark:text-LightGray-b5 bg-Gray-b1 dark:bg-LightGray-b1 p-5 text-sm h-[200px]"
        :placeholder="$t(`Describe_Your_Situation`)"
        v-model="state.description"
      ></textarea>
    </div>
    <div class="flex gap-2">
      <button
        class="border-Gray-b5 dark:border-LightGray-b5 border-2 w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="emit('prevStep')"
      >
        {{ $t("Prev") }}
      </button>
      <button
        class="bg-Primary border-2 border-Primary w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="checkValidation"
      >
        {{ $t("Next") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCreateEvent } from "@/store/create-event";

//emits

const emit = defineEmits(["nextStep", "prevStep"]);

//state

const { state } = useCreateEvent();
// const state = ref({
//   description: null,
// });

//methods

const checkValidation = () => {
  if (!state.description) return false;
  emit("nextStep", state);
};

const chooseImg = () => {
  const chooseFile = document.getElementById("choose-file");
  chooseFile.click();
};
</script>
