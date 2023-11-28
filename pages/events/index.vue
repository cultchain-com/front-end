<script setup>
import Header from "@/components/Base/Header.vue";
import Wrapper from "@/components/TheEvents/Wrapper.vue";
import CreateEventSection from "@/components/TheEvents/CreateEventSection.vue";
import Hero from "@/components/TheEvents/Hero.vue";
import Footer from "@/components/Base/Footer.vue";

//state

const eventList = ref([]);

//meta

useHead({
  title: "Events",
  meta: [
    {
      name: "Events",
      content: "CultChain Events",
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
      <Hero :state="eventList" />
      <main class="lg:px-[195px] px-4">
        <CreateEventSection />
        <Wrapper @events="eventList = $event" />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
