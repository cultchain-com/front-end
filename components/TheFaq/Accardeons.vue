<template>
  <el-collapse v-model="activeNames" class="flex flex-col justify-center gap-2">
    <el-collapse-item
      v-for="(item, index) in faqList"
      :key="index"
      :title="item.title"
      :name="item.name"
      class="border-0 bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl px-2"
    >
      <div class="text-Gray-b4 dark:text-LightGray-b4">
        {{ item.description }}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup>
import { ref } from "vue";
import { useCryptoStore } from "~/store/crypto";

//state

const { getFaq } = useCryptoStore();

const faqList = ref([
  {
    title: "Consistency",
    name: "1",
    description:
      "Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;",
  },
  {
    title: "Feedback",
    name: "2",
    description:
      "Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;",
  },
  {
    title: "Efficiency",
    name: "3",
    description:
      "Simplify the process: keep operating process simple and intuitive;",
  },
  {
    title: "Controllability",
    name: "4",
    description:
      "Decision making: giving advices about operations is acceptable, but do not make decisions for the users;",
  },
]);
const activeNames = ref(["1"]);

//mounted

onMounted(async () => {
  await getFaq();
  console.log("getFaq", getFaq());
});
</script>
