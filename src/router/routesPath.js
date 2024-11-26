import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'
import AdminDashboard from '@/views/system/AdminDashboard.vue'
import Stocks from '@/views/system/Stocks.vue'
import Merchandises from '@/views/auth/Merchandises.vue'
import AddMerchandise from '@/views/system/AddMerchandise.vue'
import OrderHistory from '@/views/system/order-history/OrderHistory.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import HomePage from '@/views/auth/HomePage.vue'
import CcisPage from '@/views/auth/CcisPage.vue'
import CaaPage from '@/views/auth/CaaPage.vue'
import CedPage from '@/views/auth/CedPage.vue'
import CegsPage from '@/views/auth/CegsPage.vue'
import ChassPage from '@/views/auth/ChassPage.vue'
import CmnsPage from '@/views/auth/CmnsPage.vue'
import CofesPage from '@/views/auth/CofesPage.vue'

export const routes = [
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
    path: '/settings',
    name: 'settings',
    component: AccountSettingsView,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboard,
    meta: { requiresAuth: false, allowedRoles: ['Admin'] }, // No access for Student or LSG
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: Stocks,
    meta: { requiresAuth: true, allowedRoles: ['LSG'] },
  },
  {
    path: '/merchs',
    name: 'merchs',
    component: Merchandises,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/addmerch',
    name: 'addmerch',
    component: AddMerchandise,
    meta: { requiresAuth: true, allowedRoles: ['LSG'] },
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderHistory,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView,
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/caa',
    name: 'caa',
    component: CaaPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/ccis',
    name: 'ccis',
    component: CcisPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/ced',
    name: 'ced',
    component: CedPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/cegs',
    name: 'cegs',
    component: CegsPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/chass',
    name: 'chass',
    component: ChassPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/cmns',
    name: 'cmns',
    component: CmnsPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/cofes',
    name: 'cofes',
    component: CofesPage,
    meta: { requiresAuth: true, allowedRoles: ['Student', 'LSG', 'Admin'] },
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  },
]
