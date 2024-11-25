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

  console.log(`Navigating to: ${to.name}`)
  console.log(`User is ${isLoggedIn ? 'logged in' : 'not logged in'}`)

  // Prevent logged-in users from accessing login or register pages
  if (isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    console.log('Redirecting to home because user is already logged in')
    return { name: 'home' }
  }

  // Allow unauthenticated users to access the homepage
  if (to.name === 'home') {
    console.log('Allowing access to homepage without authentication')
    return true
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && to.meta.requiresAuth) {
    console.log('Redirecting to login because user is not authenticated')
    return { name: 'login' }
  }

  // If logged in, verify role-based access
  if (isLoggedIn) {
    if (!authStore.userData) {
      console.log('Fetching user information...')
      await authStore.getUserInformation()
    }

    const userRole = authStore.userData.role
    console.log(`User role: ${userRole}`)

    const allowedRoles = to.meta.allowedRoles || []
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      console.log('Access forbidden: Role not allowed')
      return { name: 'forbidden' }
    }
  }

  console.log('Navigation allowed')
  return true
})

export default router
