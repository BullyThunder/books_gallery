import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useBookStore = defineStore('gallery', ()=>{
    const books =ref([
        {id:1, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:0,is_read:false},
        {id:2, title: "War and Peace",img: new URL('@/assets/img/war_and_peace.jfif', import.meta.url).href,author: "Tolstoy",rating:0,is_read:false},
        {id:3, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
    ]);

    function add_to_book(newBook) {
        books.value.push(newBook);
    }

    function remove_book(itemId){
        books.value = books.value.filter(item => item.id !== itemId)
    }
    return {books,add_to_book,remove_book}
});