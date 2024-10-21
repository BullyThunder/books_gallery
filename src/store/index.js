import { createPinia } from 'pinia';
import {ref} from 'vue';

export const myStore = createPinia('gallery', ()=>{
    const books =ref([
        {id:1, title: "Fire_and_sword",img:'../assets/img/fire_and_sword.jpg',author: "Senkevich",rating:0,is_read:false},
        {id:2, title: "War and Peace",img:'../assets/img/war_and_peace.jfif',author: "Tolstoy",rating:0,is_read:false},
        {id:3, title: "The truth about the Harry Quebert case",img:'../assets/img/true_about_diccer.jpg',author: "Dicker",rating:0,is_read:false},
    ]);

    function add_to_book(newBook) {
        books.value.push(newBook);
    }

    function remove_book(itemId){
        books.value = books.value.filter(item => item.id !== itemId)
    }
    return {books,add_to_book,remove_book}
});