<template>
  <el-collapse v-model="activeNames" class="flex flex-col justify-center gap-2">
    <el-collapse-item
      v-for="(item, index) in faqList"
      :key="index"
      :title="item.question"
      :name="index + 1"
      class="border-0 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl px-2"
    >
      <div class="text-Gray-b4 dark:text-LightGray-b4">
        {{ item.answer }}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from "vue";
import { useCryptoStore } from "~/store/crypto";

//state

const { getFaq } = useCryptoStore();
const faqList = ref([]);
const activeNames = ref(["1"]);

//mounted

onMounted(async () => {
  faqList.value = await getFaq();
});
</script>
