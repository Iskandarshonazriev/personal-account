// stores/userStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '~/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    name: 'Пользователь',
    identifier: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  })

  const isAuthenticated = computed(() => {
    if (import.meta.client) {
      return !!localStorage.getItem('user-token')
    }
    return false
  })

  function loadFromStorage(): void {
    if (!import.meta.client) return
    const savedName = localStorage.getItem('user-name')
    const savedId = localStorage.getItem('user-identifier')
    if (savedName) user.value.name = savedName
    if (savedId) user.value.identifier = savedId
  }

  function setUser(name: string, identifier: string): void {
    user.value.name = name
    user.value.identifier = identifier
    if (import.meta.client) {
      localStorage.setItem('user-name', name)
      localStorage.setItem('user-identifier', identifier)
    }
  }

  function logout(): void {
    if (import.meta.client) {
      localStorage.removeItem('user-token')
    }
  }

  return { user, isAuthenticated, loadFromStorage, setUser, logout }
})
