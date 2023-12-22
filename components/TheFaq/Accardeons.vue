<template>
  <el-collapse v-model="activeNames" class="flex flex-col justify-center gap-2">
    <el-collapse-item
      v-for="(item, index) in props.list"
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
//props

const props = defineProps({
  list: {
    default: [],
  },
});
</script>
