<template>
  <main class="flex flex-col gap-8 py-[80px]">
    <h6 class="lg:text-xl text-base text-Primary text-center">
      DONATE TRANSPARENTLY
    </h6>
    <h1
      class="lg:text-3xl text-xl text-Gray-b5 font-bold text-center lg:leading-[40px] leading-10"
    >
      We Bring Trust and Transparency to NGOs
    </h1>
    <p class="text-Gray-b5 text-sm leading-8 text-center">
      Donors should know how their donation are spended. This is the most
      important challenge that each traditional NGO or Charity is faced.
    </p>
    <ul class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 mt-8">
      <li
        v-for="(item, index) in cardOptions"
        :key="index"
        class="px-6 pb-6 bg-Gray-b2 rounded-xl relative hover:scale-95"
      >
        <div
          class="w-[50px] h-[50px] relative top-[-25px] flex items-center justify-center mx-auto bg-gradient-to-r from-Primary to-[#a259ff52] rounded-xl"
        >
          <i class="isax text-2xl text-Gray-b5" :class="'isax-' + item.icon" />
        </div>
        <div class="flex flex-col justify-between h-[calc(100%-50px)]">
          <h3 class="text-Gray-b5 lg:text-xl text-lg text-center pb-6">
            {{ item.title }}
          </h3>
          <p class="text-Gray-b5 lg:text-base text-sm text-center">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup>
const cardOptions = [
  {
    icon: "direct-send",
    title: "Transparency",
    description:
      "Web3 is about transparent world and communication, specially in financial activities.",
  },
  {
    icon: "lock",
    title: "Trust Based",
    description:
      "Transparency can assure Trust, an open ecosystem is more reliable.",
  },
  {
    icon: "refresh",
    title: "Community Proof",
    description:
      "Community Driven Ecosystem gives power to the engaged people and they decide about it",
  },
  {
    icon: "wallet-check4",
    title: "Open to NGOs",
    description: "Our Platform is also open to other NGOs and Charities.",
  },
  {
    icon: "setting-2",
    title: "NFT Power",
    description:
      "We incentivize good acts by donating Non-Fungible Tokens, Users can earn this badges as a proof for social benefit tasks.",
  },
  {
    icon: "element-4",
    title: "Corporate Social Responsibilites",
    description:
      "We offer CSR packages for corporate users and help others on behalf of the corporations",
  },
];
</script>
