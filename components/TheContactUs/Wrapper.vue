<template>
  <div class="grid lg:grid-cols-2 lg:gap-0 gap-10 bg-Gray-b2 p-5 rounded-xl my-6">
    <div class="flex flex-col justify-between gap-4">
      <div class="flex flex-col gap-4">
        <h1 class="text-Gray-b5 font-bold text-xl mb-6">Get In Touch</h1>
        <div class="form-item flex flex-col gap-2">
          <label class="text-sm text-Gray-b4 font-medium" for="name"
            >Name</label
          >
          <input
            v-model="state.name"
            id="name"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label class="text-sm text-Gray-b4 font-medium" for="email"
            >Email</label
          >
          <input
            v-model="state.email"
            id="email"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label class="text-sm text-Gray-b4 font-medium" for="message"
            >Message</label
          >
          <textarea
            v-model="state.message"
            id="message"
            class="lg:w-[calc(100%-20px)] w-full h-20 px-3 rounded-xl outline-none bg-Gray-b3 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
          ></textarea>
        </div>
        <button
          class="lg:w-[calc(100%-20px)] w-full bg-Primary h-10 mt-2 rounded-xl text-white font-semibold"
        >
          Send Message
        </button>
      </div>
      <div
        class="lg:w-[calc(100%-20px)] w-full flex items-center justify-between gap-4 mt-2"
      >
        <NuxtLink
          v-for="(item, index) in links"
          :key="index"
          :to="item.link"
          class="hover:scale-110 cursor-pointer"
        >
          <Icon :name="item.icon" />
        </NuxtLink>
      </div>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.58519537744!2d-0.2664048925574199!3d51.528526201324404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sfr!4v1697800250023!5m2!1sen!2sfr"
      class="w-full lg:rounded-r-xl lg:rounded-l-none rounded-xl lg:h-[500px] h-[200px]"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script setup>
import Icon from "@/components/TheIcon/Icon.vue";
import { ref } from "vue";

//state

const state = ref({ name: "", email: "", message: "" });
const links = [
  {
    icon: "facebook",
    link: "",
  },
  {
    icon: "twitter",
    link: "",
  },
  {
    icon: "instagram",
    link: "",
  },
];
</script>
