<template>
  <div class="flex flex-col gap-6 bg-Gray-b2 p-5 rounded-xl mb-20 shadow-xl">
    <div class="form-item max-w-[600px] mx-auto w-full flex flex-col gap-2">
      <label class="text-base text-Gray-b5">Title</label>
      <el-input
        v-model="state.title"
        placeholder="Board Apes"
        class="outline-none"
      >
        <template #prefix> <span>@</span> </template>
      </el-input>
    </div>
    <div class="form-item max-w-[600px] mx-auto w-full flex flex-col gap-2">
      <label class="text-base text-Gray-b5">Description</label>
      <el-input
        v-model="state.description"
        placeholder="it's Collection of ..."
        :rows="4"
        type="textarea"
      >
        <template #prefix> <span>@</span> </template>
      </el-input>
      <p class="text-sm text-Gray-b4">Brief description for your profile.</p>
    </div>
    <div class="form-item max-w-[600px] mx-auto w-full flex flex-col gap-2">
      <label class="text-base text-Gray-b5">Collection Type</label>
      <el-select v-model="state.type" placeholder="Choose your Collection" class="select">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="form-item max-w-[600px] mx-auto w-full flex flex-col gap-2">
      <label class="text-base text-Gray-b5">Cover photo</label>
      <el-upload
        class="upload-demo"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <i class="isax isax-direct-send text-3xl" />
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
          <div class="el-upload__tip">jpg/png files with a size Up to 10MB</div>
        </div>
      </el-upload>
    </div>
    <div class="form-item max-w-[600px] mx-auto w-full flex flex-col gap-2">
      <label class="text-base text-Gray-b5">Background photo</label>
      <el-upload
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <i class="isax isax-direct-send text-3xl" />
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
          <div class="el-upload__tip">jpg/png files with a size Up to 10MB</div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

//state

const state = ref({
  title: "",
  description: "",
  type: "",
  coverImage: "",
  bgImage: "",
});
const typeOptions = [
  {
    value: "Music",
    label: "Music",
  },
  {
    value: "Picture",
    label: "Picture",
  },
  {
    value: "Video",
    label: "Video",
  },
  {
    value: "Access Token",
    label: "Access Token",
  },
  {
    value: "Other",
    label: "Other",
  },
];
</script>
