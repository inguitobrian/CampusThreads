import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePage from '@/views/auth/HomePage.vue'
import CcisPage from '@/views/auth/CcisPage.vue'
import CaaPage from '@/views/auth/CaaPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/home',
      name: 'home', 
      component: HomePage,
    },
    {
      path: '/ccis',
      name: 'ccis',
      component: CcisPage,
    },
    {
      path: '/',
      name: 'caa',
      component: CaaPage,
    }
  ],
})

export default router
