<template>
  <div class="gallery gallery__padding gallery__container">
    <mainBook/>
    <button class="button gallery_btn-padding is-danger is-rounded" @click="BookStore.resetGallery">Reset Gallery</button>
  </div>
</template>

<script setup>
import mainBook from './cardBook.vue';
import {useBookStore} from '@/store/index.js';
const BookStore = useBookStore();
</script>

<style>

</style>