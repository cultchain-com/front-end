<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
  >
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-white"
        >Describe Your Situation</label
      >
      <textarea
        class="rounded-lg outline-none text-Gray-b5 bg-Gray-b1 p-5 text-sm h-[200px]"
        placeholder="Describe Your Situation"
        v-model="state.description"
      ></textarea>
    </div>
    <div class="flex gap-2">
      <button
        class="border-white border-2 w-fit px-8 h-10 rounded-xl text-white md:text-base text-sm"
        @click="emit('prevStep')"
      >
        Prev
      </button>
      <button
        class="bg-Primary border-2 border-Primary w-fit px-8 h-10 rounded-xl text-white md:text-base text-sm"
        @click="checkValidation"
      >
        Next
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
