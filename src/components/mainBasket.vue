<template>
    <div  class="cardbook cardbook__container">
        <ul v-for="cart in BookStore.search_basket" :key="cart.id">
            <li>{{ cart.title }}</li>
            <li><img class="cardbook__image" :src="cart.img" alt="Book cover" /></li>
            <li>{{cart.author}}</li>
            <li ><button @click="BookStore.remove_forever(cart.id)" class="button is-danger is-rounded">Delete</button></li>
            <li ><button @click="BookStore.returnToGallery(cart.id)" class="button is-danger is-rounded">Return</button></li>
        </ul>
    </div>
</template>

<script setup>
import {useBookStore} from '@/store/index.js';
const BookStore = useBookStore();
</script>

<style>

</style>
