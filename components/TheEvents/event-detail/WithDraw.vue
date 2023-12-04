<template>
  <div
    class="flex items-center justify-between p-5 bg-Primary bg-opacity-30 rounded-xl text-Gray-b5 text-base dark:text-LightGray-b5"
  >
    <p>you can withdraw now!</p>
    <button
      class="bg-Primary px-3 py-2 rounded-xl shadow-xl text-Gray-b5"
      @click="withdrawHandler"
    >
      {{ loading ? "Loading ..." : "WithDraw" }}
    </button>
  </div>
</template>

<script setup>
import { useCryptoStore } from "~/store/crypto";
import { useRoute } from "vue-router";

//state

const { requestWithdraw } = useCryptoStore();
const loading = ref(false);
const route = useRoute();

//methods

const withdrawHandler = async () => {
  loading.value = true;
  await requestWithdraw(route.params.id);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
