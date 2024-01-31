<template>
  <div
    class="grid lg:grid-cols-2 items-center lg:gap-6 gap-10 bg-Gray-b2 dark:bg-LightGray-b2 p-1 rounded-xl my-6"
  >
    <div class="flex flex-col justify-around gap-6 py-20 h-full px-4">
      <div>
        <h1 class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-xl mb-6">
          {{ $t("Schedule_Your_Free_Demo") }}
        </h1>
        <p class="text-Gray-b4 dark:text-LightGray-b4 text-sm mb-6">
          {{ $t("Lorem_ipsum") }}
        </p>
      </div>
      <div class="grid grid-cols-3">
        <div
          v-for="(item, index) in certificates"
          :key="index"
          class="text-center"
        >
          <img
            :src="item.image"
            class="h-20 w-20 object-contain mx-auto"
            :alt="item.description"
          />
          <p
            class="text-center h-[calc(100%-80px)] mt-4 flex items-center justify-center text-Gray-b4 dark:text-LightGray-b4 text-xs mb-6"
          >
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="bg-Gray-b1 dark:bg-LightGray-b1 py-6 px-4 h-full rounded-r-xl">
      <div
        class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl h-full border-t-4 border-Primary p-5 flex flex-col gap-4"
      >
        <h2
          class="text-Gray-b5 dark:text-LightGray-b5 font-bold text-base px-6 text-center"
        >
          {{ $t("Complete_the_Form_below_to_Request_free_Demo") }}
        </h2>
        <div class="form-item flex flex-col gap-2">
          <label
            class="text-sm text-Gray-b4 dark:text-LightGray-b4 font-medium"
            for="name"
            >{{ $t("Name") }}</label
          >
          <input
            v-model="state.name"
            id="name"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 dark:bg-LightGray-b1 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
            :placeholder="$t(`Name`)"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label
            class="text-sm text-Gray-b4 dark:text-LightGray-b4 font-medium"
            for="email"
            >{{ $t("Email") }}</label
          >
          <input
            v-model="state.email"
            id="email"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 dark:bg-LightGray-b1 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
            :placeholder="$t(`Email`)"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label
            class="text-sm text-Gray-b4 dark:text-LightGray-b4 font-medium"
            for="subject"
            >{{ $t("Subject") }}</label
          >
          <input
            v-model="state.subject"
            id="name"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 dark:bg-LightGray-b1 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
            :placeholder="$t(`Subject`)"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label
            class="text-sm text-Gray-b4 dark:text-LightGray-b4 font-medium"
            for="phone_number"
            >{{ $t("Phone_Number") }}</label
          >
          <input
            v-model="state.phoneNumber"
            id="phone_number"
            class="lg:w-[calc(100%-20px)] w-full h-10 px-3 rounded-xl outline-none bg-Gray-b3 dark:bg-LightGray-b1 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
            :placeholder="$t(`Phone_Number`)"
          />
        </div>
        <div class="form-item flex flex-col gap-2">
          <label
            class="text-sm text-Gray-b4 dark:text-LightGray-b4 font-medium"
            for="message"
            >{{ $t("Message") }}</label
          >
          <textarea
            v-model="state.message"
            id="message"
            class="lg:w-[calc(100%-20px)] w-full h-20 px-3 rounded-xl outline-none bg-Gray-b3 dark:bg-LightGray-b1 bg-opacity-70 border-2 border-transparent focus:border-Primary"
            autocomplete="off"
            :placeholder="$t(`Message`)"
          ></textarea>
        </div>
        <NuxtTurnstile v-model="token" />
        <button
          @click="sendMessagehandler"
          class="lg:w-[calc(100%-20px)] w-full bg-Primary h-10 mt-2 rounded-xl text-Gray-b5 dark:text-LightGray-b5 font-semibold"
        >
          {{ isLoading ? `${$t('Loading')}...` : $t("Send_Message") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import { ElNotification } from "element-plus";
import { useCryptoStore } from "~/store/crypto";

//state

const state = ref({
  name: "",
  email: "",
  subject: "",
  phoneNumber: "",
  message: "",
});
const certificates = ref([
  {
    image: "/certificates/1.png",
    description: "High Performer in Overal and Enterprise Project Management",
  },
  {
    image: "/certificates/2.png",
    description: "Easy Projects Ranks",
  },
  {
    image: "/certificates/3.png",
    description: "Project Portfolio Management",
  },
]);
const token = ref();
const { sendMessage } = useCryptoStore();
const isLoading = ref(false);

//methods

const sendMessagehandler = async () => {
  if (!token.value) {
    ElNotification({
      title: "Error",
      message: h("i", "error: complete capthcha!!"),
      type: "error",
    });
  } else if (!state.value.name) {
    ElNotification({
      title: "Error",
      message: h("i", "error: enter your name"),
      type: "error",
    });
  } else if (!state.value.email) {
    ElNotification({
      title: "Error",
      message: h("i", "error: enter your email"),
      type: "error",
    });
  } else if (!state.value.subject) {
    ElNotification({
      title: "Error",
      message: h("i", "error: enter subject"),
      type: "error",
    });
  } else if (!state.value.message) {
    ElNotification({
      title: "Error",
      message: h("i", "error: enter your message"),
      type: "error",
    });
  } else {
    isLoading.value = true;
    const reponse = await sendMessage(
      state.value.name,
      state.value.email,
      state.value.subject,
      state.value.message,
      state.value.phoneNumber
    );
    isLoading.value = false;
    if (reponse.data.id) {
      ElNotification({
        title: "Sucess",
        message: h("i", "success: your Request Submitted,wait for our Call!"),
        type: "success",
      });
      resetForm();
    }
  }
};
const resetForm = () => {
  state.value.name = "";
  state.value.email = "";
  state.value.subject = "";
  state.value.message = "";
  state.value.phoneNumber = "";
};
</script>
