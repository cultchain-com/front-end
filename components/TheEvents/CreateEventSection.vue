<template>
  <div
    class="gap-2 justify-between items-center p-5 grid lg:grid-cols-2 grid-cols-1 bg-Gray-b2 rounded-xl"
  >
    <div class="hero-content flex flex-col gap-6">
      <h1 class="lg:text-3xl text-lg text-Gray-b5 font-bold">Create Event</h1>
      <p class="text-Gray-b5 text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <NuxtLink
        @click="createEventStore.activeStepp = 1"
        to="/event-creation"
        class="text-Gray-b5 w-fit text-sm font-semibold flex items-center gap-2 rounded-xl bg-Primary bg-opacity-90 hover:bg-opacity-100 hover:scale-95 px-5 py-3"
      >
        Create Event
      </NuxtLink>
    </div>
    <div class="hero-logo">
      <img
        src="/create-event-hero.png"
        class="max-h-[250px] object-cover mx-auto"
      />
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import { useCreateEvent } from "@/store/create-event";

//state

const createEventStore = useCreateEvent();
</script>
