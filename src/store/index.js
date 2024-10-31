import { defineStore } from 'pinia';
import {ref} from 'vue';

export const useBookStore = defineStore('gallery', ()=>{
    const books =ref([
        {id:1, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:2,is_read:false},
        {id:2, title: "War and Peace",img: new URL('@/assets/img/war_and_peace.jfif', import.meta.url).href,author: "Tolstoy",rating:0,is_read:false},
        {id:3, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:4, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:5, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:6, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:2,is_read:false}
    ]);
    const basket_cart = ref([]);
    const savedBooks  = () => {
        const rating = books.value.reduce((acc,book)=>{
            acc[book.id] = book.rating;
            return acc;
        }, {});
        localStorage.setItem("rating",JSON.stringify(rating));
    }

    const add_to_book = (newBook) =>{
        books.value.push(newBook);
    };

    const remove_book = (itemId) =>{
        const selected_card = books.value.find(item => item.id === itemId)
        if(selected_card){
            basket_cart.value.push(selected_card);
            localStorage.setItem("basket_cart",JSON.stringify(basket_cart.value));
           books.value = books.value.filter(item => item.id !== itemId);
           localStorage.setItem("books",JSON.stringify(books.value));
        }
    };
    const remove_forever = (itemId) =>{
        basket_cart.value = basket_cart.value.filter(item =>item.id !== itemId);
        localStorage.setItem("basket_cart",JSON.stringify(basket_cart.value));
    }
    
    const load_page = () =>{
        const get_rating = JSON.parse(localStorage.getItem('rating'));
        if(get_rating){
        books.value.forEach(book => {
        if(get_rating[book.id] !== undefined){
            book.rating = get_rating[book.id];
        }
        });
        }
        const saved_books = JSON.parse(localStorage.getItem("books"));
        if(Array.isArray(saved_books)){
         books.value = saved_books;
        }
       const saved_basket = JSON.parse(localStorage.getItem("basket_cart"));
       if(Array.isArray(saved_basket)){
        basket_cart.value = saved_basket;
       }
       }


    const edit_star = (n,book) => {
        book.rating = n;
        savedBooks();
};
const resetLocalStorage = () => {
    localStorage.removeItem("basket_cart");
    localStorage.removeItem("rating");
    localStorage.removeItem("books"); // Удаляем все, связанные с книгами
};
   load_page(); 
  return {books,add_to_book,remove_book,edit_star,load_page,basket_cart,remove_forever,resetLocalStorage};
});