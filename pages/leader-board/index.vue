<script setup>
import Header from "@/components/Base/Header.vue";
import Footer from "@/components/Base/Footer.vue";
import Warpper from "@/components/TheLeaderBoard/Wrapper.vue";
</script>

<template>
  <div class="bg-Gray-b1 dark:bg-LightGray-b1">
    <div class="lg:px-10">
      <Header />
    </div>
    <div class="lg:px-10">
      <main class="lg:px-[195px] px-4"><Warpper /></main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
