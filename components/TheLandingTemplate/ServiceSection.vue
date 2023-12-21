<template>
  <div class="flex flex-col gap-6">
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5 font-bold text-center"
    >
      Our services include
    </h1>
    <p
      class="text-Gray-b4 dark:text-LightGray-b4 text-sm leading-8 text-center"
    >
      How will your product change your customer's life
    </p>
    <div class="grid lg:grid-cols-2 gap-8">
      <div
        v-for="(item, index) in services"
        :key="index"
        class="bg-gradient-to-r from-[#a159ff] to-[#7d19ff] p-5 rounded-xl relative w-full"
      >
        <img
          src="/landing/shape-rec.svg"
          class="h-6 w-6 absolute top-8 lg:right-40 right-20 z-0"
        />
        <img
          src="/landing/shape-close.svg"
          class="h-8 w-8 absolute top-5 right-10 z-0"
        />
        <h2 class="text-lg text-Gray-b5 font-bold z-10">{{ item.title }}</h2>
        <p class="text-sm text-Gray-b4 z-10">{{ item.label }}</p>
        <p class="text-base text-Gray-b5 mt-6">{{ item.description }}</p>
        <div class="mt-4 grid grid-cols-2 gap-4 items-center pb-4">
          <button
            class="py-3 rounded-md border-[1px] border-white hover:bg-Gray-b2 text-white hover:bg-opacity-30"
          >
            GET OFFER
          </button>
          <p
            class="lg:text-3xl flex items-center justify-center text-[#f0f8ff42] font-bold -rotate-[20deg]"
          >
            SERVICE {{ index + 1 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//state

const services = ref([
  {
    label: "About Service No. 1",
    title: "Service No. 1 customers life",
    description:
      "Add a description of your offer and key benefits. What it is and how it helps your customer Add a description of your offer and key benefits. What it is and how it helps your customer.",
  },
  {
    label: "About Service No. 2",
    title: "Service No. 2 customers life",
    description:
      "Add a description of your offer and key benefits. What it is and how it helps your customer Add a description of your offer and key benefits. What it is and how it helps your customer.",
  },
  {
    label: "About Service No. 3",
    title: "Service No. 3 customers life",
    description:
      "Add a description of your offer and key benefits. What it is and how it helps your customer Add a description of your offer and key benefits. What it is and how it helps your customer.",
  },
  {
    label: "About Service No. 4",
    title: "Service No. 4 customers life",
    description:
      "Add a description of your offer and key benefits. What it is and how it helps your customer Add a description of your offer and key benefits. What it is and how it helps your customer.",
  },
]);
</script>
