<template>
  <div class="">
    <img
      src="/landing/about-us.svg"
      class="h-[400px] object-cover float-left mr-4"
    />
    <h2 class="italic text-3xl text-Gray-b5 dark:text-LightGray-b5 font-medium my-8">About Us</h2>
    <p
      class="text-base text-Gray-b4 dark:text-LightGray-b4 leading-10 italic text-justify delay-1000 ease-linear"
    >
      {{ description.slice(0, 340) }}
      <span
        :class="
          isShowMore ? 'opacity-100' : 'absolute left-[-1000px] -z-30 opacity-0'
        "
        >{{ description.slice(340) }}</span
      >
      <a
        class="text-blue-600 underline underline-offset-4 font-medium cursor-pointer"
        href="javascript:void(0)"
        @click="isShowMore = !isShowMore"
        >{{ isShowMore ? "Show Less" : "Show More" }}</a
      >
    </p>
  </div>
</template>

<script setup>
const description = ref(
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, earum ipsam! Quae expedita sed incidunt repudiandae tempora ipsa rem facere laboriosam facilis obcaecati perspiciatis aut dignissimos, deleniti eos similique error veniam at? Inventore alias numquam ad illum voluptatibus adipisci voluptate dolore magni quo, illo fuga rem repudiandae harum quaerat possimus molestias ipsam quas! Praesentium est, voluptates vero quos obcaecati error laborum dignissimos aspernatur sint rem deleniti quo ipsa deserunt at accusamus maxime quibusdam ipsam quisquam! Distinctio ullam fugit rerum doloremque hic, neque necessitatibus ut alias voluptas, amet temporibus odio aut, harum consequuntur similique nihil quod facere error quos ipsum ab! Ut rem quidem dignissimos, rerum repellat consequuntur et laudantium in laborum aut quos odio minima beatae quasi quia necessitatibus sapiente! rem repudiandae harum quaerat possimus molestias ipsam quas! Praesentium est, voluptates vero quos obcaecati error laborum dignissimos aspernatur sint rem deleniti quo ipsa deserunt at accusamus maxime quibusdam ipsam quisquam! Distinctio ullam fugit rerum doloremque hic, neque necessitatibus ut alias voluptas, amet temporibus odio aut, harum consequuntur similique nihil quod facere error quos ipsum ab! Ut rem quidem dignissimos, rerum repellat consequuntur et laudantium in laborum aut quos odio minima beatae quasi quia necessitatibus sapiente! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis corporis commodi dolorum libero suscipit reprehenderit nobis, ipsa, rem consequuntur dignissimos dolor quidem, quasi quod officia? Repudiandae delectus facilis aut tempore tempora pariatur sit et inventore quia, laudantium illo consequatur qui nobis, harum, asperiores eaque quae. Facere, minima dolorum autem aperiam quos temporibus tempore eaque quis obcaecati, dicta harum eum ab iure in, molestiae quas doloremque iusto delectus quo esse illum! Dolorem rerum error fugit, dicta commodi deserunt aliquam mollitia fuga ex laboriosam quae cumque ullam quam nulla! Ea explicabo sit facere molestiae eveniet modi incidunt fuga quod accusantium, necessitatibus deserunt, natus ratione nam, tenetur ipsa corrupti maxime. Corporis corrupti recusandae id molestias illo facilis quae quod saepe doloremque aliquam maxime sequi, fugiat aspernatur officia iure dolore suscipit alias odio ab autem placeat nam vitae assumenda. Sapiente laborum voluptatibus, hic totam repudiandae impedit esse quisquam numquam omnis excepturi distinctio ipsam corrupti enim soluta, ratione ullam mollitia deleniti illum quam inventore eveniet voluptatem maxime architecto. Quasi consequuntur nostrum iusto eveniet necessitatibus praesentium expedita molestiae quas laudantium mollitia cupiditate neque sequi, quaerat aliquam ab. Cum iste voluptate quo, perspiciatis sequi sit eos ex veritatis dolore eveniet! Exercitationem pariatur quia assumenda eos eveniet nihil eius nam repellendus tempora"
);
const isShowMore = ref(false);
</script>
