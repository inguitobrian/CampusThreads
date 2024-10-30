import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePage from '@/views/auth/HomePage.vue'
import CcisPage from '@/views/auth/CcisPage.vue'
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
      path: '/',
      name: 'ccis',
      component: CcisPage,
    },
  ],
})

export default router
