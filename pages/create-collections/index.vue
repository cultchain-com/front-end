<script setup>
import Header from "@/components/Base/Header.vue";
import Footer from "@/components/Base/Footer.vue";
import Hero from "@/components/TheCollections/Hero.vue";
import CreateCollection from "@/components/TheCollections/CreateCollection.vue";
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
  title: "Create Collection",
  meta: [
    {
      name: "Create Collection",
      content: "How you can Create Collection in CultChain",
    },
  ],
});
</script>
<template>
  <div class="bg-Gray-b1 dark:bg-LightGray-b1">
    <div class="lg:px-10">
      <Header />
      <main class="lg:px-[195px] px-4">
        <Hero />
        <CreateCollection />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
