<template>
  <div
    class="p-5 my-20 rounded-xl flex flex-col gap-3"
    v-if="state.eventDetails"
  >
    <!-- hero section -->

    <section class="wrapper grid lg:grid-cols-3 grid-cols-1 md:gap-3 gap-y-3">
      <div
        class="lg:h-[500px] bg-Gray-b2 md:h-[300px] h-[196px] max-w-full rounded-xl overflow-hidden col-span-2"
      >
        <img
          :src="localState.image"
          class="h-full w-full object-cover hover:scale-105"
        />
      </div>
      <div
        class="flex items-center bg-Gray-b2 justify-between flex-col gap-4 p-5 rounded-xl"
      >
        <div class="flex items-center justify-center flex-col gap-4">
          <div
            class="percentage relative h-[133px] w-[133px] bg-Primary bg-opacity-30 border-[5px] border-Primary flex items-center justify-center rounded-full"
          >
            <div
              class="absolute h-[114px] w-[114px] bottom-1 rounded-full overflow-hidden z-10 flex items-end"
            >
              <div
                v-if="percentage"
                :style="`height : ${percentage}%;position:static`"
                class="w-full percentage-bg"
                :class="percentage"
                :key="percentage"
              ></div>
            </div>

            <h6 class="text-Gray-b5 text-3xl z-20">
              {{
                `%${
                  percentage?.toString() > 5
                    ? percentage?.toString().slice(0, 5)
                    : percentage?.toString()
                }`
              }}
            </h6>
          </div>
          <h1 class="text-Primary text-2xl">
            {{ state.eventDetails.collectedAmount / Math.pow(10, 18) }} ETH
          </h1>
          <p class="text-center text-Gray-b4">
            raised of
            <span class="text-Primary font-semibold"
              >{{
                state.eventDetails.targetAmount / Math.pow(10, 18)
              }}
              ETH</span
            >
            target<br />
            by
            <span class="text-Gray-b5 font-semibold"
              >{{ donationsList.length }} supporters</span
            >
          </p>
        </div>
        <div class="w-full flex gap-4 flex-col">
          <NuxtLink
            :to="'/donate/' + route.params.id"
            class="py-4 bg-Primary border-Primary w-full rounded-xl text-lg text-white text-center"
          >
            Give Now
          </NuxtLink>
          <button
            class="py-4 border-2 border-Gray-b4 w-full rounded-xl text-lg text-white"
          >
            Share
          </button>
        </div>
      </div>
    </section>

    <!-- description -->

    <section class="p-5 pt-2">
      <div class="flex justify-between items-start md:flex-row flex-col gap-6">
        <div class="flex gap-4 items-center md:flex-row flex-col w-full">
          <img
            class="h-16 w-16 rounded-2xl"
            :src="localState.avatar ? localState.avatar : '/no-avatar.webp'"
          />
          <div
            class="flex md:justify-center justify-between md:flex-col flex-row-reverse gap-0 w-full items-center md:items-start"
          >
            <client-only>
              <p class="text-sm text-white flex items-center gap-2">
                <el-tooltip
                  :content="state.eventDetails.creator"
                  placement="top"
                >
                  <span>{{ shortenAddress(state.eventDetails.creator) }}</span>
                </el-tooltip>
                <el-tooltip
                  :content="state.eventDetails.isCopied ? 'Copied' : 'Copy'"
                  placement="top"
                >
                  <i
                    class="isax isax-copy text-2xl"
                    v-if="!state.eventDetails.isCopied"
                    @click="copyTextToClipboard(state.eventDetails)"
                  />
                  <i
                    class="isax isax-copy-success text-2xl text-green-800"
                    v-if="state.eventDetails.isCopied"
                    @click="copyTextToClipboard(state.eventDetails)"
                  />
                </el-tooltip></p
            ></client-only>
            <p class="text-2xl font-semibold text-white">
              {{ state.eventDetails.name }}
            </p>
          </div>
        </div>
        <div
          class="flex md:flex-col flex-row justify-between md:items-end gap-2 w-full"
        >
          <span class="text-white text-sm">{{
            convertDate(state.eventDetails.endDate)
          }}</span>
          <span class="text-white text-sm">{{
            state.eventDetails.category
          }}</span>
        </div>
      </div>
    </section>

    <!-- wrapper  -->

    <div class="grid md:grid-cols-3 gap-3">
      <div
        class="flex flex-col gap-2 md:col-span-2 bg-Gray-b2 p-5 rounded-xl justify-between"
      >
        <div class="max-h-[calc(100%-200px)] h-full overflow-y-auto">
          <div class="flex justify-between">
            <h5 class="lg:text-3xl text-xl text-Gray-b5">Story</h5>
          </div>
          <p class="text-Gray-b4 lg:text-base text-sm mt-4 lg:leading-10">
            {{ state.eventDetails.description }}
          </p>
        </div>
        <div class="max-h-[200px] h-full flex flex-col">
          <el-collapse accordion class="flex flex-col h-full">
            <el-collapse-item
              v-for="(item, index) in state.milestones"
              :key="index"
              ><template #title>
                <span class="text-Gray-b5 lg:text-base text-sm">{{
                  item.name
                }}</span></template
              >
              <div class="px-2 text-Gray-b4 lg:text-sm text-xs">
                <p>{{ item.description }}</p>
                <p class="text-Gray-b5 font-semibold">
                  Tatget Amount :
                  <span class="text-Gray-b5 font-bold"
                    >{{ item.targetAmount / Math.pow(10, 18) }} ETH</span
                  >
                </p>
              </div></el-collapse-item
            >
          </el-collapse>
          <NuxtLink
            :to="'/event-creation/' + route.params.id"
            class="cursor-pointer"
            @click="
              createEventStore.activeStepp = 4;
              createEventStore.state.eventId = route.params.id;
              createEventStore.state.mileStones = state.milestones;
            "
            v-if="account == state.eventDetails.creator"
            ><button
              class="py-2 bg-Primary border-Primary w-fit px-4 mx-auto rounded-xl text-sm text-white flex gap-2 justify-center items-center"
            >
              <i class="isax isax-add-square text-2xl" />Add MileStone
            </button></NuxtLink
          >
        </div>
      </div>
      <div class="flex flex-col gap-3 col-span-1">
        <CommiteeDecisionSection
          :state="commiteeDecisionsList"
          :committeeId="state?.eventDetails.committeeId"
        />
        <SupportersSection :state="donationsList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CommiteeDecisionSection from "./CommiteeDecisionSection.vue";
import SupportersSection from "./SupportersSection.vue";
import { useRoute } from "vue-router";
import { useEventList } from "@/store/events-fund-raing";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";
import { shortenAddress } from "@/utils/shortenAddress";
import { useCreateEvent } from "@/store/create-event";

//state

const { activeStepp } = useCreateEvent();
const cryptoStore = useCryptoStore();
const { getEventDetail, getEventDonationList, getCommitteeDecision } =
  useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const store = useEventList();
const route = useRoute();
const localState = ref({
  id: 1,
  title: "Event 1",
  description:
    "In the face of a devastating earthquake in Morocco, countless families are grappling with the aftermath. Homes have crumbled, livelihoods have been shattered, and communities are in dire need of assistance. In these moments of hardship, our faith calls us to extend a helping hand.Join forces with Human Appeal, an organisation dedicated to humanitarian causes, to raise funds for the Morocco earthquake emergency relief. With your dedication and our expertise, we aim to provide essential aid to those who have suffered.Our faith teaches us the significance of charity and assisting those in need. The Quran mentions in Surah Al-Baqarah (2:267): O you who have believed, spend from the good things which you have earned… Your contributions reflect the goodness within your heart.For £100 you can start to support immediate relief; food, water, medical & shelter.Your support can be the beacon of hope for those affected by this tragedy. By donating to my fundraising campaign, you can fulfill the teachings of our faith by helping to provide:",
  date: "24/04/2023",
  image: "/events/1.png",
  bookAmount: 35600,
  targetAmount: 70000,
  creator: "Human Appeal",
  category: "Charity ",
  milestones: [
    {
      title: "MileStone #1",
      description:
        "Emergency Shelter: In times of crisis, it's our duty to provide shelter to those who have lost their homes, following the Islamic principles of compassion and solidarity.",
      targetAmount: "400K",
    },
    {
      title: "MileStone #2",
      description:
        "Food and Clean Water: Access to basic necessities is a fundamental right, and your donation can ensure that no one in need goes hungry or thirsty.",
      targetAmount: "150K",
    },
    {
      title: "MileStone #3",
      description:
        "Medical Care: Providing medical care to the injured is an act of mercy. Your support can help ease their pain and suffering.",
      targetAmount: "300K",
    },
  ],
});
const commiteeDecisions = ref([
  {
    name: "Yahya Ibrahim",
    vote: false,
    avatar: "",
  },
  {
    name: "Mariah Idrissi",
    vote: true,
    avatar: "",
  },
  {
    name: "Humble Akh",
    vote: true,
    avatar: "",
  },
]);
const supporters = ref([
  {
    name: "Anonymous",
    amount: "£700",
    avatar: "",
  },
  {
    name: "l mckenna",
    amount: "£100",
    avatar: "",
  },
  {
    name: "Anonymous",
    amount: "£5",
    avatar: "",
  },
]);
const state = ref({ eventDetails: null });
const donationsList = ref(null);
const commiteeDecisionsList = ref(null);

//computed

const percentage = computed(() => {
  if (process.client) {
    return (
      (state.value.eventDetails?.collectedAmount /
        state.value.eventDetails?.targetAmount) *
      100
    );
  }
});

// mounted

onMounted(async () => {
  loading.isLoading = true;
  state.value = await getEventDetail(route.params.id);
  donationsList.value = await getEventDonationList(route.params.id);
  commiteeDecisionsList.value = await getCommitteeDecision(
    state.value.eventDetails.committeeId
  );
  createCommitteeDecisionList();
  loading.isLoading = false;
});

//methods

const convertDate = (item) => {
  const timestamp = parseInt(item) * 1000; // multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timestamp).toLocaleDateString("en-GB");
  return date;
};
const createCommitteeDecisionList = () => {
  let array = [];
  for (
    let index = 0;
    index < commiteeDecisionsList.value.totalValidators;
    index++
  ) {
    array.push({
      address: commiteeDecisionsList.value.validatorAddresses[index],
      vote: commiteeDecisionsList.value.validatorVotes[index],
      feedback: commiteeDecisionsList.value.validatorFeedbacks[index],
    });
  }
  commiteeDecisionsList.value = array;
};
const copyTextToClipboard = async (item) => {
  try {
    await navigator.clipboard.writeText(item.creator);
    item.isCopied = true;
    console.log("Copying to clipboard was successful!");
    setTimeout(() => {
      item.isCopied = false;
    }, 5000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
</script>
