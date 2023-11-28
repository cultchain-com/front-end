<script setup>
import Header from "@/components/Base/Header.vue";
import Footer from "@/components/Base/Footer.vue";
import WalletConnection from "@/components/TheExplore/WalletConnection.vue";
import { useLoading } from "@/store/loading";

//state

const loading = useLoading();

//mounted

onMounted(() => {
  loading.isLoading = true;
  setTimeout(() => {
    loading.isLoading = false;
  }, 3000);
});

//meta

useHead({
  title: "Explore",
  meta: [
    {
      name: "Explore",
    },
  ],
});
</script>
<template>
  <div
    class="bg-Gray-b1 dark:bg-LightGray-b1 min-h-screen flex flex-col justify-between"
  >
    <div class="lg:px-10">
      <Header />
      <main class="lg:px-[195px] px-4">
        <WalletConnection />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
