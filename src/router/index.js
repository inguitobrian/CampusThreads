import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import HomePage from '@/views/auth/HomePage.vue'
import CcisPage from '@/views/auth/CcisPage.vue'
import CaaPage from '@/views/auth/CaaPage.vue'
import CedPage from '@/views/auth/CedPage.vue'
import CegsPage from '@/views/auth/CegsPage.vue'
import ChassPage from '@/views/auth/ChassPage.vue'
import CmnsPage from '@/views/auth/CmnsPage.vue'
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
      path: '/caa',
      name: 'caa',
      component: CaaPage,
    },
    {
      path: '/ced',
      name: 'ced',
      component: CedPage,
    },
    {
      path: '/cegs',
      name: 'cegs',
      component: CegsPage,
    },
    {
      path: '/chass',
      name: 'chass',
      component: ChassPage,
    },
    {
      path: '/',
      name: 'cmns',
      component: CmnsPage,
    },
  ],
})

export default router
