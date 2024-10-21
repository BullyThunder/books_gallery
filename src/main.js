import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";


const app = createApp(App); // Создание экземпляра приложения

const pinia = createPinia(); // Создание экземпляра Pinia

app.use(router).use(pinia).mount('#app'); // Подключение роутера к приложению
