<script setup>
import Header from "@/components/Base/Header.vue";
import Hero from "@/components/TheLanding/Hero.vue";
import MainSection from "@/components/TheLanding/MainSection.vue";
import CardBox from "@/components/TheLanding/CardBox.vue";
import HelpfulResources from "@/components/TheLanding/HelpfulResources.vue";
import ReviewSection from "@/components/TheLanding/ReviewSection.vue";
import AwardWinningSupport from "@/components/TheLanding/AwardWinningSupport.vue";
import Footer from "@/components/Base/Footer.vue";
import TrendingCollection from "@/components/TheLanding/TrendingCollection.vue";
import TopCreators from "@/components/TheLanding/TopCreators.vue";
import Roadmap from "@/components/TheLanding/Roadmap.vue";
import { useLoading } from "@/store/loading";

//state

const loading = useLoading();

//mounted

onMounted(() => {
  loading.isLoading = true;
  setTimeout(() => {
    loading.isLoading = false;
  }, 1000);
});
</script>
<template>
  <div class="bg-Gray-b1 dark:bg-LightGray-b1">
    <div class="lg:px-10">
      <Header />
      <main class="lg:px-[195px] px-4">
        <Hero />
        <MainSection />
        <CardBox />
        <HelpfulResources />
        <!-- <TrendingCollection />
        <TopCreators /> -->
        <Roadmap />
      </main>
    </div>
    <div
      class="bg-gradient-to-r from-[#a159ff] to-[#7d19ff] lg:px-10 lg:max-h-[400px]"
    >
      <div class="lg:px-[195px] px-4">
        <ReviewSection />
      </div>
    </div>
    <div class="lg:px-10">
      <main class="lg:px-[195px] px-4">
        <AwardWinningSupport />
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
