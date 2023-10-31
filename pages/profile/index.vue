<script setup>
import Header from "@/components/Base/Header.vue";
import Footer from "@/components/Base/Footer.vue";
import Warpper from "@/components/TheProfile/Wrapper.vue";
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
</script>
<template>
  <div class="bg-Gray-b1 dark:bg-LightGray-b1">
    <div class="lg:px-10">
      <Header />
    </div>
    <div class="h-40 overflow-hidden">
      <img
        src="/wide-bg.jpg"
        class="transition duration-700 ease-in-out h-full object-cover w-full hover:scale-105"
      />
    </div>
    <div class="lg:px-10">
      <main class="lg:px-[195px] px-4">
        <Warpper />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
