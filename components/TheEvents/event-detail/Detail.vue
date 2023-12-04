<template>
  <div class="p-5 my-20 rounded-xl flex flex-col gap-3" v-if="state">
    <!-- hero section -->

    <section class="wrapper grid lg:grid-cols-3 grid-cols-1 md:gap-3 gap-y-3">
      <div
        class="lg:h-[500px] bg-Gray-b2 dark:bg-LightGray-b2 md:h-[300px] h-[196px] max-w-full rounded-xl overflow-hidden col-span-2"
      >
        <img
          :src="
            state.token_uri
              ? 'https://ipfs.io/ipfs/' + state.token_uri + '/'
              : '/events/1.png'
          "
          class="h-full w-full object-cover hover:scale-105"
          :alt="state.name"
        />
      </div>
      <div
        class="flex items-center bg-Gray-b2 dark:bg-LightGray-b2 justify-between flex-col gap-4 p-5 rounded-xl"
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

            <h6 class="text-Gray-b5 dark:text-LightGray-b5 text-3xl z-20">
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
            {{
              new Intl.NumberFormat().format(
                state.collected_amount / Math.pow(10, 18)
              )
            }}
            ETH
          </h1>
          <p class="text-center text-Gray-b4 dark:text-LightGray-b4">
            raised of
            <span class="text-Primary font-semibold"
              >{{
                new Intl.NumberFormat().format(
                  state.target_amount / Math.pow(10, 18)
                )
              }}
              ETH</span
            >
            target<br />
            by
            <span class="text-Gray-b5 dark:text-LightGray-b5 font-semibold"
              >{{ donationsList?.length }} supporters</span
            >
          </p>
        </div>
        <div class="w-full flex gap-4 flex-col">
          <a
            href="javascript:void(0)"
            @click="donationHandler"
            class="py-4 bg-Primary border-Primary w-full rounded-xl text-lg text-Gray-b5 dark:text-LightGray-b5 text-center"
          >
            Give Now
          </a>
          <button
            class="py-4 border-2 border-Gray-b4 dark:border-LightGray-b4 w-full rounded-xl text-lg text-Gray-b5 dark:text-LightGray-b5"
          >
            Share
          </button>
        </div>
      </div>
    </section>

    <!-- withdraw -->

    <template
      v-if="
        account == state.creator_wallet_address &&
        state.collected_amount >= state.target_amount
      "
    >
      <WithDraw />
    </template>

    <!-- description -->

    <section class="p-5 pt-2">
      <div class="flex justify-between items-start md:flex-row flex-col gap-6">
        <div class="flex gap-4 items-center md:flex-row flex-col w-full">
          <img
            class="h-16 w-16 rounded-2xl"
            src="/no-avatar.webp"
            alt="avatar"
          />
          <div
            class="flex md:justify-center justify-between md:flex-col flex-row-reverse gap-0 w-full items-center md:items-start"
          >
            <client-only>
              <p
                class="text-sm text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-2"
              >
                <el-tooltip
                  :content="state.creator_wallet_address"
                  placement="top"
                >
                  <span>{{
                    shortenAddress(state.creator_wallet_address)
                  }}</span>
                </el-tooltip>
                <el-tooltip
                  :content="state.isCopied ? 'Copied' : 'Copy'"
                  placement="top"
                >
                  <i
                    class="isax isax-copy text-2xl"
                    v-if="!state.isCopied"
                    @click="copyTextToClipboard(state)"
                  />
                  <i
                    class="isax isax-copy-success text-2xl text-green-800"
                    v-if="state.isCopied"
                    @click="copyTextToClipboard(state)"
                  />
                </el-tooltip></p
            ></client-only>
            <p
              class="text-2xl font-semibold text-Gray-b5 dark:text-LightGray-b5 flex gap-2"
            >
              {{ state.name }}
              <span
                class="text-sm font-semibold italic bg-opacity-20 px-2 rounded-3xl h-8 flex items-center justify-center"
                :class="
                  state.status === 'PENDING'
                    ? 'text-orange-600 bg-orange-600'
                    : state.status == 'APPROVED'
                    ? 'text-green-600 bg-green-600'
                    : state.status == 'REJECTED'
                    ? 'text-red-600 bg-red-600'
                    : state.status == 'NOTSTARTEDYET'
                    ? 'text-blue-600 bg-blue-600'
                    : ''
                "
                >{{ state.status }}</span
              >
            </p>
          </div>
        </div>
        <div
          class="flex md:flex-col flex-row justify-between md:items-end gap-2 w-full"
        >
          <span class="text-Gray-b5 dark:text-LightGray-b5 text-sm">{{
            convertDate(state.end_date)
          }}</span>
          <span class="text-Gray-b5 dark:text-LightGray-b5 text-sm">{{
            state.category
          }}</span>
        </div>
      </div>
    </section>

    <!-- wrapper  -->

    <div class="grid md:grid-cols-3 gap-3">
      <div
        class="flex flex-col gap-2 md:col-span-2 bg-Gray-b2 dark:bg-LightGray-b2 p-5 rounded-xl justify-between"
      >
        <div class="max-h-[calc(100%-200px)] h-full overflow-y-auto">
          <div class="flex justify-between">
            <h5 class="lg:text-3xl text-xl text-Gray-b5 dark:text-LightGray-b5">
              Story
            </h5>
          </div>
          <p
            class="text-Gray-b4 dark:text-LightGray-b4 lg:text-base text-sm mt-4 lg:leading-10"
          >
            {{ state.description }}
          </p>
        </div>
        <div class="max-h-[200px] h-full overflow-y-auto flex flex-col gap-6">
          <el-collapse accordion>
            <el-collapse-item
              v-for="(item, index) in state.milestones"
              :key="index"
              ><template #title>
                <span
                  class="text-Gray-b5 dark:text-LightGray-b5 lg:text-base text-sm"
                  >{{ item.name }}</span
                ></template
              >
              <div
                class="px-2 text-Gray-b4 dark:text-LightGray-b4 lg:text-sm text-xs"
              >
                <p>{{ item.description }}</p>
                <p class="text-Gray-b5 dark:text-LightGray-b5 font-semibold">
                  Tatget Amount :
                  <span class="text-Gray-b5 dark:text-LightGray-b5 font-bold"
                    >{{
                      new Intl.NumberFormat().format(
                        item.target_amount / Math.pow(10, 18)
                      )
                    }}
                    ETH</span
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
            v-if="
              account &&
              account?.toLowerCase() ==
                state.creator_wallet_address?.toLowerCase()
            "
            ><button
              class="py-2 bg-Primary border-Primary w-fit px-4 mx-auto rounded-xl text-sm text-Gray-b5 dark:text-LightGray-b5 flex gap-2 justify-center items-center"
            >
              <i class="isax isax-add-square text-2xl" />Add MileStone
            </button></NuxtLink
          >
        </div>
      </div>
      <div class="flex flex-col gap-3 col-span-1">
        <CommiteeDecisionSection
          :state="commiteeDecisionsList"
          :committeeId="state?.committee_id"
          @handleVote="handleVote"
        />
        <SupportersSection :state="donationsList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CommiteeDecisionSection from "./CommiteeDecisionSection.vue";
import SupportersSection from "./SupportersSection.vue";
import WithDraw from "./WithDraw.vue";
import { useRoute, useRouter } from "vue-router";
import { useCryptoStore } from "~/store/crypto";
import { storeToRefs } from "pinia";
import { useLoading } from "@/store/loading";
import { shortenAddress } from "@/utils/shortenAddress";
import { h } from "vue";
import { ElNotification } from "element-plus";

//state

const cryptoStore = useCryptoStore();
const { getEventDetail, getEventDonationList, getCommitteeDecision } =
  useCryptoStore();
const { account } = storeToRefs(cryptoStore);
const loading = useLoading();
const route = useRoute();
const router = useRouter();
const state = ref({ eventDetails: null });
const donationsList = ref(null);
const commiteeDecisionsList = ref(null);

//computed

const percentage = computed(() => {
  if (process.client) {
    return (state.value?.collected_amount / state.value?.target_amount) * 100;
  }
});

// mounted

onMounted(async () => {
  loading.isLoading = true;
  state.value = await getEventDetail(route.params.id);
  donationsList.value = await getEventDonationList(route.params.id);
  commiteeDecisionsList.value = await getCommitteeDecision(
    state.value.committee_id
  );
  loading.isLoading = false;
});

//methods

const donationHandler = async () => {
  // validation

  if (state.value.status != "APPROVED") {
    ElNotification({
      title: "Error",
      message: h("i", "error: This Event is not approved!"),
      type: "error",
    });
  } else if (state.value.collected_amount >= state.value.target_amount) {
    ElNotification({
      title: "Error",
      message: h("i", "error: Fund raising is over!"),
      type: "error",
    });
  } else {
    router.push(`/donate/${route.params.id}`);
  }
};
const handleVote = (e) => {
  commiteeDecisionsList.value.members.map((item) => {
    if (
      item.member_wallet_address?.toLocaleLowerCase() ==
      account.value?.toLocaleLowerCase()
    ) {
      item.has_voted = true;
      item.feedback = e;
    }
  });
};
const convertDate = (item) => {
  console.log(item);
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
const copyTextToClipboard = async (item) => {
  try {
    await navigator.clipboard.writeText(item.creator_wallet_address);
    item.isCopied = true;
    console.log("Copying to clipboard was successful!");
    setTimeout(() => {
      item.isCopied = false;
    }, 5000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

//watcher

watch(state, (newValue) => {
  useSeoMeta({
    title: () => newValue?.name,
    ogTitle: () => newValue?.name,
    // and other stuff
  });
});
</script>
