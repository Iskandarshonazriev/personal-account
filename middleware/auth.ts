// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const publicRoutes = ['/login', '/register']
  const token = localStorage.getItem('user-token')

  if (!token && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (token && publicRoutes.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})
