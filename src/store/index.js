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
       const ratings = books.value.reduce((acc,book)=>{
            acc[book.id] = book.rating;
            return acc;  
        }, {});
        localStorage.setItem('Booksrating',JSON.stringify(ratings));
    }
    const loadRating =() =>{
       const store_rating = localStorage.getItem('Booksrating');
       if(store_rating){
       const parse_rating = JSON.parse(store_rating);
        books.value.forEach(book => {
            if( parse_rating[book.id] !== undefined){
                book.rating = parse_rating[book.id]
            }
        });
       }
    }
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