<template>
    <div v-if="BookStore.search_temp.trim() === ''" class="cardbook cardbook__container">
        <ul  v-for="book in BookStore.books" :key="book.id">
            <li class="cardbook__title">{{ book.title }}</li>
            <li><img class="cardbook__image" :src="book.img" alt="Book cover" /></li>
            <li>{{ book.author }}</li>
            <li ><i v-for="n in 5" :key="n" :class="n<=book.rating 
            ? 'fa-solid fa-star ' : 'fa-regular fa-star '" @click="BookStore.edit_star(n,book)">
                </i></li>
            <li>{{ book.is_read }}</li>
            <li><button @click="BookStore.remove_book(book.id)" class="button is-danger is-rounded">Delete</button></li>
        </ul>
    </div>
</template>

<script setup>
import {useBookStore} from '@/store/index.js';
const BookStore = useBookStore();

</script>

<style>

</style>