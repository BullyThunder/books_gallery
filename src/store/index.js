import { defineStore } from 'pinia';
import {ref,computed} from 'vue';

export const useBookStore = defineStore('gallery', ()=>{
    const initial_books = [
        {id:1, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:2,is_read:false},
        {id:2, title: "War and Peace",img: new URL('@/assets/img/war_and_peace.jfif', import.meta.url).href,author: "Tolstoy",rating:0,is_read:false},
        {id:3, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:4, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:5, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:false},
        {id:6, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:2,is_read:false}
    ];
    const books = ref([...initial_books]);
    const basket_cart = ref([]);
    const savedBooks  = () => {
        const rating = books.value.reduce((acc,book)=>{
            acc[book.id] = book.rating;
            return acc;
        }, {});
        localStorage.setItem("rating",JSON.stringify(rating));
    }
    /*
    const add_to_book = (newBook) =>{
        books.value.push(newBook);
    };*/

    const remove_book = (itemId) =>{
        const selected_card = books.value.find(item => item.id === itemId)
        if(selected_card){
            basket_cart.value = basket_cart.value.filter(book => book !== null);
            basket_cart.value.push(selected_card);
            localStorage.setItem("basket_cart",JSON.stringify(basket_cart.value));
            books.value = books.value.filter(book => book !== null);
           books.value = books.value.filter(item => item.id !== itemId);
           localStorage.setItem("books",JSON.stringify(books.value));
        }
    };
    const remove_forever = (itemId) =>{
        basket_cart.value = basket_cart.value.filter(item =>item.id !== itemId);
        localStorage.setItem("basket_cart",JSON.stringify(basket_cart.value));
    }

    const edit_star = (n,book) => {
        book.rating = n;
        savedBooks();
};
    const returnToGallery = (itemId) =>{
        const temp_return = basket_cart.value.find(item => item.id === itemId);
        {
        books.value.push(temp_return);
        const selectedIndex = basket_cart.value.indexOf(temp_return);
        if(selectedIndex >-1){
            basket_cart.value.splice(selectedIndex,1);
        }
        localStorage.setItem("basket_cart",JSON.stringify(basket_cart.value));
        localStorage.setItem("books",JSON.stringify(books.value));
        }
    }
    const load_page = () => {
        try {
            const get_rating = localStorage.getItem('rating');
            if (get_rating) {
                const parsedRating = JSON.parse(get_rating);
                books.value.forEach(book => {
                    if (parsedRating[book.id] !== undefined) {
                        book.rating = parsedRating[book.id];
                    }
                });
            }
    
            const saved_books = localStorage.getItem("books");
            if (saved_books) {
                const parsedBooks = JSON.parse(saved_books);
                if (Array.isArray(parsedBooks)) {
                    books.value = parsedBooks;
                }
            }
    
            const saved_basket = localStorage.getItem("basket_cart");
            if (saved_basket) {
                const parsedBasket = JSON.parse(saved_basket);
                if (Array.isArray(parsedBasket)) {
                    basket_cart.value = parsedBasket;
                }
            }
    
            const update_gallery = localStorage.getItem("temp_return");
            if (update_gallery) {
                const parsedGallery = JSON.parse(update_gallery);
                if (Array.isArray(parsedGallery)) {
                    books.value = parsedGallery;
                }
            }
    
            // Удаляем все null значения после загрузки данных
            books.value = books.value.filter(book => book !== null);
            basket_cart.value = basket_cart.value.filter(book => book !== null);
    
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    };
       const resetGallery = () =>{
        books.value = [...initial_books];
        basket_cart.value = [];
        localStorage.setItem("books", JSON.stringify(books.value));
        localStorage.removeItem("basket_cart");
        localStorage.removeItem("rating");
       }
       let isVisible_book = ref(true);
       let isVisible_filtered = ref(false);
       let search_temp = ref("");
       const filteredCard = ref([]);

       const search_gallery = computed(() =>{
        if (!search_temp.value) {
            return books.value; // Показываем все книги, если поиск пуст
        }
               return filteredCard.value = books.value.filter(
                    item => item.name && item.name.toLowerCase().includes(search_temp.value.toLowerCase())
                );
            });
           
   load_page(); 
  return {books,remove_book,edit_star,load_page,basket_cart,remove_forever,
    returnToGallery,resetGallery,search_gallery,
    search_temp,filteredCard,isVisible_book,isVisible_filtered};
});