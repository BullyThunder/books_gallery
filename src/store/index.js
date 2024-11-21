import { defineStore } from 'pinia';
import {ref,computed,watch} from 'vue';

export const useBookStore = defineStore('gallery', ()=>{
    const initial_books = [
        {id:1, title: "Fire and sword", img: new URL('@/assets/img/fire_and_sword.jpg', import.meta.url).href,author: "Senkevich",rating:0,is_read:0},
        {id:2, title: "War and Peace",img: new URL('@/assets/img/war_and_peace.jfif', import.meta.url).href,author: "Tolstoy",rating:0,is_read:1},
        {id:3, title: "The truth about the Harry Quebert case",img: new URL('@/assets/img/true_about_diccer.jpg', import.meta.url).href,author: "Dicker",rating:0,is_read:0},
        {id:4, title: "Transfering reality",img: new URL('@/assets/img/tranfer.jfif', import.meta.url).href,author: "Zelland",rating:0,is_read:0},
        {id:5, title: "Importants times",img: new URL('@/assets/img/important_times.png', import.meta.url).href,author: "Jay",rating:0,is_read:0},
        {id:6, title: "Darkness where the hills",img: new URL('@/assets/img/there_monutain.jfif', import.meta.url).href,author: "Ishiguro",rating:0,is_read:0},
    ];
    const books = ref([...initial_books]);
    const basket_cart = ref([]);
    const savedBooks  = () => {
        const rating = books.value.reduce((acc,book)=>{
            acc[book.id] = book.rating || 0;
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
    const SavedStatus = () =>{
        const status ={};
        books.value.forEach((book)=>{
            status[book.id] = book.is_read;
        });
        localStorage.setItem('status',JSON.stringify(status))
    }
    const EditStatus = (book) =>{

    if(book.is_read===0){
       book.is_read = 1;
    }
    else if(book.is_read===1){
        book.is_read = 0;
    }
    SavedStatus();
    }
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

    // action when page is loading
    const load_page = () => {
        try {
        /*
            const get_rating = localStorage.getItem('rating');
            if (get_rating !==null) {
                const parsedRating = JSON.parse(get_rating);
                books.value.forEach(book => {
                    if (parsedRating[book.id] !== undefined) {
                        book.rating = parsedRating[book.id];
                    }
                });
            }*/
            const get_status = localStorage.getItem('status');
            if(get_status !== null){
                    const parsedStatus = JSON.parse(get_status);
                    books.value.forEach(stat => {
                        if (parsedStatus[stat.id] !== undefined) {
                            stat.is_read = parsedStatus[stat.id];
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
            
           
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    };

    // reset data in gallery
       const resetGallery = () =>{
        books.value = [...initial_books];
        basket_cart.value = [];
        localStorage.setItem("books", JSON.stringify(books.value));
        localStorage.removeItem("basket_cart");
        localStorage.clear();
       }
       let isVisible_book = ref(false);
       let isVisible_basket = ref(false);
       let search_temp = ref("");
       const filteredCard = ref([]);
       const search_gallery = computed(() => {
        if (!search_temp.value.trim()) {
            return books.value; 
        } else {
            return books.value.filter((item) =>
                item.title.toLowerCase().includes(search_temp.value.trim().toLowerCase())
            );
        }
    });

    // search in basket
    let basket_temp = ref("");
        const search_basket = computed (()=>{
            if(!basket_temp.value.trim()){
                
                return basket_cart.value;
            }
            else{
                
                return basket_cart.value.filter((items)=>
                    items.title.toLowerCase().includes(basket_temp.value.trim().toLowerCase()))
            }
        })

    watch(books, (newBooks) => {
        localStorage.setItem("books",JSON.stringify(newBooks));
    }, { deep: true });  
    /*
    watch(search_basket, (newBasket) => {
        localStorage.setItem("search_basket",JSON.stringify(newBasket));
    }, { deep: true });
    */  
  return {books,load_page,savedBooks,remove_book,edit_star,basket_cart,remove_forever,
    returnToGallery,resetGallery,search_gallery,
    search_temp,filteredCard,isVisible_book,search_basket,
    isVisible_basket,basket_temp,EditStatus,SavedStatus
    };
});