<template>
  <div
    class="rounded-xl flex flex-col justify-end hover:shadow-xl w-full min-h-[400px] bg-no-repeat bg-center bg-contain bg-Gray-b5 dark:bg-LightGray-b5"
    :style="`background-image:url(${
      state.image ? state.image : '/no-image.png'
    })`"
  >
    <section class="p-5 pt-2 max-w-[300px]">
      <div class="flex flex-col justify-between gap-2">
        <div class="flex justify-between">
          <h5
            class="lg:text-lg text-base text-start text-Gray-b1 dark:text-LightGray-b1 line-clamp-1 font-semibold"
          >
            {{ state.related_object.name }}
          </h5>
          <span
            class="text-xs text-Gray-b1 dark:text-LightGray-b1 text-end flex items-center font-normal"
            >{{ convertDate(state.related_object.end_date) }}</span
          >
        </div>
        <div class="flex justify-between items-center">
          <img
            src="/trending-collections/mrfox-avatar.png"
            class="h-10 w-10 rounded-full"
          />
          <span
            class="rounded-xl px-2 text-sm text-Gray-b5 dark:text-LightGray-b5"
            :class="
              props.state.related_object.status == 'APPROVED'
                ? ' bg-green-800'
                : props.state.related_object.status == 'PENDING'
                ? 'bg-orange-700'
                : ''
            "
            >{{ props.state.related_object.status }}</span
          >
        </div>
      </div>
      <div class="flex justify-between items-center mt-4">
        <div class="flex flex-col gap-2 items-start">
          <div class="flex items-center gap-2">
            <div class="flex gap-1 items-center text-green-800">
              <i class="text-xl isax isax-like-1 text-green-800" />{{
                props.state.yes_votes
              }}
            </div>
            <div class="flex gap-1 items-center text-red-800">
              <i class="text-xl isax isax-dislike text-red-800" />{{
                props.state.no_votes
              }}
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2 items-start">
          <p
            class="md:text-sm text-xs dark:text-Gray-b5 text-LightGray-b5 flex items-center gap-2"
          >
            <i class="text-xl isax isax-people" />{{
              props.state.total_members
            }}
          </p>
        </div>
      </div>
      <!-- <div class=" mt-2 h-[50px] flex">
        <NuxtLink
          :to="'/events/' + state.eventId"
          class="border-Primary border-2 text-Primary font-semibold p-5 py-3 rounded-xl hover:bg-Primary hover:text-Gray-b5 dark:text-LightGray-b5 transition-all"
          >View Event</NuxtLink
        >
      </div> -->
    </section>
  </div>
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
