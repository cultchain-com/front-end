<script setup>
import Header from "@/components/Base/Header.vue";
import Wrapper from "@/components/TheValidaterDecisions/Wrapper.vue";
import Hero from "@/components/TheValidaterDecisions/Hero.vue";
import Footer from "@/components/Base/Footer.vue";

//state

const validatersDecisions = ref([]);
</script>
<template>
  <div
    class="bg-Gray-b1 dark:bg-LightGray-b1 min-h-screen flex flex-col justify-between"
  >
    <div class="lg:px-10">
      <Header />
      <Hero :state="validatersDecisions" />
      <main class="lg:px-[195px] px-4">
        <Wrapper @decisions="validatersDecisions = $event" />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
