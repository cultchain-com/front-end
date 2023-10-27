<template>
  <div class="flex flex-col gap-4 border-t-[1.5px] pt-5 border-Gray-b4">
    <el-radio-group v-model="state.vote">
      <el-radio :label="true" size="large">
        <i class="text-2xl isax isax-like-1 text-green-800" />
      </el-radio>
      <el-radio :label="false" size="large">
        <i class="text-2xl isax isax-dislike text-red-800" />
      </el-radio>
    </el-radio-group>

    <textarea
      class="rounded-lg outline-none text-Gray-b5 bg-Gray-b1 border-2 border-transparent p-5 text-sm h-[200px] focus:border-Primary"
      placeholder="Comment"
      v-model="state.comment"
    ></textarea>
  </div>
</template>

<script setup>
import { useVote } from "@/store/vote";
const { state } = useVote();
</script>
