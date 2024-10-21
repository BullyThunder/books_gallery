<template>
    <div class="cardbook">
        <ul v-for="book in BookStore.books" :key="book.id">
            <li class="cardbook__title">{{ book.title }}</li>
            <li><img class="cardbook__image" :src="book.img" alt="Book cover" /></li>
            <li>{{ book.author }}</li>
            <li>{{ book.rating }}</li>
            <li>{{ book.is_read }}</li>
        </ul>
        <ul>
        </ul>
    </div>
</template>

<script setup>
import {useBookStore} from '@/store/index.js';
const BookStore = useBookStore();
</script>

<style>

</style>