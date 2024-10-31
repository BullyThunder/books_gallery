<template>
    <div>
      <mainHeader/>
      <mainBasket/>
    </div>
  </template>
  <style lang="scss">
  @import "@/assets/css/style.css";
  </style>
  <script setup>
  // @ is an alias to /src
  import mainBasket from '@/components/mainBasket.vue';
  import mainHeader from '@/components/mainHeader.vue';
  </script>