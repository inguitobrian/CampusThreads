import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routesPath'
import { useAuthUserStore } from '@/stores/authUser'
import { isAuthenticated } from '@/utils/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async to => {
  const authStore = useAuthUserStore()
  const isLoggedIn = await isAuthenticated()

  // Redirect to dashboard or login based on authentication status
  if (to.name === 'home') {
    return isLoggedIn ? { name: 'dashboard' } : { name: 'login' }
  }

  // Prevent logged-in users from accessing login or register pages
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    return { name: 'dashboard' }
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && to.meta.requiresAuth) {
    return { name: 'login' }
  }

  // If logged in, verify role-based access
  if (isLoggedIn) {
    if (!authStore.userData) {
      await authStore.getUserInformation()
    }

    const userRole = authStore.userData.role
    const allowedRoles = to.meta.allowedRoles || []

    // Allow access if the route allows all roles or if the user's role is in allowedRoles
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return { name: 'forbidden' }
    }
  }

  return true
})

export default router
