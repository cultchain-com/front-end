<script setup>
import { useRoute } from "vue-router";
import Header from "@/components/Base/Header.vue";
import Footer from "@/components/Base/Footer.vue";
import Step4 from "@/components/TheEventCreation/Step4.vue";
import { useLoading } from "@/store/loading";
import { useCryptoStore } from "~/store/crypto";

//state

const route = useRoute();
const { getEventDetail, addMilestone } = useCryptoStore();
const loading = useLoading();
const eventDetail = ref(null);

//mounted

onMounted(async () => {
  loading.isLoading = true;
  eventDetail.value = await getEventDetail(route.params.id);
  loading.isLoading = false;
});

//methods

const addMileStone = async (e) => {
  console.log(e);
  loading.isLoading = true;
  await addMilestone(
    route.params.id,
    e.name,
    e.description,
    e.amount,
    e.endDate
  );
  loading.isLoading = false;
};
</script>
<template>
  <div class="bg-Gray-b1 dark:bg-LightGray-b1">
    <div class="lg:px-10">
      <Header />
      <main class="lg:px-[195px] px-4">
        <div class="p-5">
          <el-steps :active="4" align-center class="my-6">
            <el-step>
              <template #title>Step 1</template>
            </el-step>
            <el-step>
              <template #title>Step 2</template>
            </el-step>
            <el-step>
              <template #title>Step 3</template>
            </el-step>
            <el-step>
              <template #title>Step 4</template>
            </el-step>
          </el-steps>
          <Step4 @addMileStone="addMileStone" />
        </div>
      </main>
    </div>
    <div class="bg-Gray-b2 dark:bg-LightGray-b2 lg:px-10 px-4">
      <main class="lg:px-[195px] px-4">
        <Footer />
      </main>
    </div>
  </div>
</template>
