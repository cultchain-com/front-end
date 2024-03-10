<script setup>
import Header from "@/components/Base/Header.vue";
import Wrapper from "@/components/TheHowSystemWork/Wrapper.vue";
import Footer from "@/components/Base/Footer.vue";
import { useLoading } from "@/store/loading";

//meta

useHead({
  title: "How CultChain Work",
  meta: [
    {
      name: "How CultChain Work",
      content: "How CultChain Work",
    },
  ],
});

//state

const loading = useLoading();

//mounted

onMounted(() => {
  loading.isLoading = true;
  setTimeout(() => {
    loading.isLoading = false;
  }, 2000);
});
</script>
<template>
  <div
    class="bg-Gray-b1 dark:bg-LightGray-b1 min-h-screen flex flex-col justify-between"
  >
    <div class="lg:px-10">
      <Header />
      <main class="grid lg:grid-cols-12 grid-cols-1 justify-center px-4">
        <Wrapper />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
