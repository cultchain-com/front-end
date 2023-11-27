<template>
  <div
    class="bg-Gray-b2 dark:bg-LightGray-b2 rounded-xl flex flex-col hover:shadow-xl w-full"
  >
    <div
      class="overflow-hidden w-full h-[200px] bg-Gray-b5 dark:bg-LightGray-b5 rounded-t-xl"
    >
      <img
        :src="state.image ? state.image : '/no-image.png'"
        class="w-full h-full rounded-xl object-contain ml-auto hover:scale-105"
      />
    </div>
    <section class="p-5 pt-2">
      <div class="flex flex-col justify-between gap-1">
        <div class="flex justify-between">
          <NuxtLink :to="'/events/' + props.state.related_object.id"
            ><h5
              class="lg:text-base text-md font-medium text-Gray-b5 dark:text-LightGray-b5 line-clamp-1 text-start"
            >
              {{ props.state.related_object.name }}
            </h5></NuxtLink
          >

          <span
            class="text-xs text-Gray-b4 dark:text-LightGray-b4 text-end flex items-center"
            >{{ convertDate(props.state.related_object.end_date) }}</span
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
      <div class="flex justify-between items-center mt-1">
        <div class="flex flex-col gap-1 items-center">
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
        <div class="flex flex-col gap-1 items-center">
          <p
            class="md:text-sm text-xs text-Gray-b5 dark:text-LightGray-b5 flex items-center gap-2"
          >
            <i class="text-xl isax isax-people" />{{
              props.state.total_members
            }}
          </p>
        </div>
      </div>
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
