<template>
  <div class="lg:p-[60px] p-3 bg-Gray-b2 my-20 rounded-xl">
    <div class="grid lg:grid-cols-2">
      <img src="/support.png" class="object-cover rounded-xl" alt="" />
      <div class="flex flex-col gap-4 p-4">
        <p class="lg:text-base text-sm text-Gray-b5">AWARD WINNING SUPPORT</p>
        <h2 class="lg:text-2xl leading-7 font-semibold text-xl text-Gray-b5">
          We’re here to help
        </h2>
        <p class="lg:text-base text-sm text-Gray-b4">
          Were at the early days of blockchain, in compare to the Internet, were
          at 1997. There are rooms for inovation and improvement, solving
          traditional problems that cant be addressed using traditional
          Technologies.
        </p>
        <a
          href="https://cultchain.gitbook.io/whitepaper"
          target="_blank"
          class="text-Gray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl border-Primary border-2 bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
        >
          <Icon name="rocket-primary" />
          Visit our WhitePaper
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
</script>
