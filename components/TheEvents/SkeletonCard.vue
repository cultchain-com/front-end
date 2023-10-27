<template>
  <div class="skeleton-card">
    <div class="cover-image-skeleton"></div>
    <div class="skeleton-loader"></div>
    <div class="avatar-skeleton"></div>
    <div class="skeleton-loader"></div>
    <!-- Second skeleton loader -->
    <div class="skeleton-loader"></div>
    <!-- Third skeleton loader -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.skeleton-card {
  @apply bg-Gray-b2 rounded-xl lg:min-w-full md:min-w-[50%] min-w-[300px];
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.skeleton-loader {
  height: 20px;
  background: linear-gradient(90deg, #464646 25%, #5a5a5a 50%, #464646 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite ease-in-out;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.avatar-skeleton {
  width: 40px;
  height: 40px;
  background: linear-gradient(90deg, #464646 25%, #5a5a5a 50%, #464646 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite ease-in-out;
  border-radius: 50%;
  margin-bottom: 20px;
  margin-left: 20px;
}

.cover-image-skeleton {
  width: 100%;
  height: 200px;
  background: linear-gradient(90deg, #464646 25%, #5a5a5a 50%, #464646 75%);
  background-size: 200% 100%;
  animation: loading 2s infinite ease-in-out;
  border-radius: 8px;
  margin-bottom: 20px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
