<template>
  <div
    class="max-w-[491px] w-full bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl p-5 mx-auto flex flex-col gap-4"
    :key="counter"
  >
    <div class="form-item flex flex-col gap-1">
      <label class="md:text-base text-sm text-Gray-b5 dark:text-LightGray-b5"
        >Add Cover Photo</label
      >
      <div class="flex flex-col gap-2">
        <div
          class="h-[200px] rounded-xl bg-Gray-b1 dark:bg-LightGray-b1 border-2 border-dashed border-Gray-b4 dark:border-LightGray-b4 cursor-pointer flex items-center justify-center text-Gray-b5 dark:text-LightGray-b5 overflow-hidden"
          @click="chooseImg"
          id="img-preview"
        >
          <span v-if="isImageUploading">Uploading...</span>
          <img
            class="w-full object-cover"
            :src="'https://ipfs.io/ipfs/' + state.coverPhoto + '/'"
            v-else-if="!isImageUploading && state.coverPhoto"
          />
          <span v-else-if="!isImageUploading && !state.coverPhoto"
            >Upload Image,click here</span
          >
        </div>
        <input
          type="file"
          id="choose-file"
          name="choose-file"
          accept="image/*"
          class="hidden"
          @change="getImgData"
        />
      </div>
    </div>
    <div class="flex gap-2">
      <button
        class="border-Gray-b5 dark:border-LightGray-b5 border-2 w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="emit('prevStep')"
      >
        Prev
      </button>
      <button
        :disabled="isImageUploading"
        class="bg-Primary border-2 border-Primary w-fit px-8 h-10 rounded-xl text-Gray-b5 dark:text-LightGray-b5 md:text-base text-sm"
        @click="checkValidation"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { ElNotification } from "element-plus";
import { create } from "ipfs-http-client";
import { useCreateEvent } from "@/store/create-event";
import { storeToRefs } from "pinia";

//emits

const emit = defineEmits(["nextStep", "prevStep"]);

//state

const { state } = useCreateEvent();
const createEventStore = useCreateEvent();
const { image, isImageUploading } = storeToRefs(createEventStore);
const counter = ref(1);

//methods

const checkValidation = () => {
  if (!state.coverPhoto) return false;
  emit("nextStep", state);
};

const chooseImg = () => {
  const chooseFile = document.getElementById("choose-file");
  chooseFile.click();
};

const getImgData = async () => {
  isImageUploading.value = true;
  const chooseFile = document.getElementById("choose-file");
  const imgPreview = document.getElementById("img-preview");
  const files = chooseFile.files[0];
  image.value.image = files;
  const apiKey = "2VvvCFYIm16cc3CMtkmYydinEXt";
  const secretApiKey = "fea051bb38f629593c195eeda460359e";
  const auth = "Basic " + btoa(`${apiKey}:${secretApiKey}`);
  const client = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization: auth,
    },
  });

  try {
    const result = await client.add(image.value.image);
    console.log("Image saved to IPFS:", result.path);
    state.coverPhoto = result.path;
    console.log(isImageUploading.value);
    isImageUploading.value = false;
  } catch (error) {
    ElNotification({
      title: "Error",
      message: h("i", "Failed to save image to IPFS"),
      type: "error",
    });
  }
};
</script>
