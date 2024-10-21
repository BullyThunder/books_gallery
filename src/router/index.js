import { createRouter, createWebHashHistory } from 'vue-router';
import mainPage from '../views/mainPage.vue';
import galleryPage from '../views/galleryPage.vue';
import basketPage from '../views/basketPage.vue';
const routes = [
  {
    path: '/',
    name: 'mainPage',
    component: mainPage
  },
  {
    path: '/galleryPage',
    name: 'gallery',
    component: galleryPage
  },
  {
    path: '/basketPage',
    name: 'basket',
    component: basketPage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
