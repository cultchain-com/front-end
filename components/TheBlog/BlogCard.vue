<template>
  <NuxtLink
    :to="`/blog/${state?.id}`"
    class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl overflow-hidden flex flex-col card cursor-pointer"
  >
    <div class="h-[196px] overflow-hidden">
      <img
        :src="state.header_image"
        class="w-full h-full object-cover main-image"
      />
    </div>

    <div class="p-5 pt-2 pl-2 flex flex-col gap-2">
      <div class="flex justify-between items-center">
        <span
          class="bg-Primary bg-opacity-25 text-Gray-b5 dark:text-LightGray-b5 px-2 py-1 rounded-lg text-xs font-medium w-fit"
          >{{ state.category }}
        </span>
        <span
          class="text-[10px] text-Gray-b4 dark:text-LightGray-b4 font-normal"
          >{{ convertDate(state.updated_at) }}</span
        >
      </div>
      <h3
        class="text-Gray-b5 dark:text-LightGray-b5 text-base font-medium line-clamp-2"
      >
        {{ state.title }}
      </h3>
      <div class="flex justify-between items-center">
        <div class="flex gap-1 items-center">
          <p class="text-xs text-Gray-b4 dark:text-LightGray-b4 font-medium">
            {{ state.author_name }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
//props

const props = defineProps({
  state: null,
});

const { state } = props;

//methods

const convertDate = (item) => {
  let date = new Date(item);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // add leading zero if needed
  let day = ("0" + date.getDate()).slice(-2); // add leading zero if needed

  let dateString = year + "-" + month + "-" + day; // format as date string
  return dateString;
};
</script>

<style lang="scss" scoped>
.card:hover {
  .main-image {
    @apply scale-110;
  }
}
</style>
