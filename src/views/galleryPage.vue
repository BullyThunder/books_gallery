<template>
    <div>
      <mainHeader/>
      <mainGallery/>
    </div>
  </template>
  <style lang="scss">
  @import "@/assets/css/style.css";
  </style>
  <script setup>
  // @ is an alias to /src
  import mainHeader from '@/components/mainHeader.vue';
  import mainGallery from '@/components/mainGallery.vue';
  </script>