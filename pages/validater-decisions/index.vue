<script setup>
import Header from "@/components/Base/Header.vue";
import Wrapper from "@/components/TheValidaterDecisions/Wrapper.vue";
import Footer from "@/components/Base/Footer.vue";

</script>
<template>
  <div class="bg-Gray-b1 min-h-screen flex flex-col justify-between">
    <div class="lg:px-10">
      <Header />
      <main class="lg:px-[195px] px-4">
        <Wrapper />
      </main>
    </div>
    <div class="bg-Gray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
