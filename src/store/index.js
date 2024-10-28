import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useBookStore = defineStore('gallery', ()=>{
    const books =ref([
        {id:1, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:2,is_read:false},
        {id:2, title: "War and Peace",img: new URL('@/assets/img/war_and_peace.jfif', import.meta.url).href,author: "Tolstoy",rating:0,is_read:false},
        {id:3, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:4, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
    ]);
    const savedBooks  = () => {
        const rating = books.value.reduce((acc,book)=>{
            acc[book.id] = book.rating;
            return acc;
        }, {});
        localStorage.setItem("rating",JSON.stringify(rating));
    }
    const loadRating =() =>{
        const get_rating = JSON.parse(localStorage.getItem('rating'));
        if(get_rating){
        books.value.forEach(book => {
        if(get_rating[book.id] !== undefined){
            book.rating = get_rating[book.id];
        }
        });
        }
       };
    const add_to_book = (newBook) =>{
        books.value.push(newBook);
    };

    const remove_book = (itemId) =>{
        books.value = books.value.filter(item => item.id !== itemId)
    };

    const edit_star = (n,book) => {
        book.rating = n;
        savedBooks();
};
loadRating();
  return {books,add_to_book,remove_book,edit_star,loadRating};
});