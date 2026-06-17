<template>
  <aside class="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200/80 bg-white px-5 py-6">
    <!-- Logo -->
    <div class="flex items-center gap-2.5 px-3 mb-8">
      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
        <Globe class="h-5 w-5 text-white" />
      </div>
      <span class="text-xl font-bold tracking-tight text-indigo-900">FiberFlow</span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 space-y-1">
      <NuxtLink
        to="/dashboard"
        class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
        :class="route.path === '/dashboard'
          ? 'bg-[#7c5cff] text-white shadow-lg shadow-indigo-600/10'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
      >
        <Home class="h-5 w-5" />
        {{ $t('home') }}
      </NuxtLink>

      <NuxtLink
        to="/myTariff"
        class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
        :class="route.path === '/myTariff'
          ? 'bg-[#7c5cff] text-white shadow-lg shadow-indigo-600/10'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
      >
        <Gauge class="h-5 w-5" />
        {{ $t('myPlan') }}
      </NuxtLink>

      <NuxtLink
        to="/services"
        class="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors"
        :class="route.path === '/services'
          ? 'bg-[#7c5cff] text-white shadow-lg shadow-indigo-600/10'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
      >
        <RouterIcon class="h-5 w-5" />
        {{ $t('services') }}
      </NuxtLink>
    </nav>

    <!-- User + logout -->
    <div class="border-t border-slate-100 pt-4 mt-auto">
      <div class="flex items-center gap-3 px-2 mb-4">
        <div class="h-10 w-10 overflow-hidden rounded-full bg-slate-200 border border-slate-100 shrink-0">
          <img
            :src="userStore.user.avatar"
            alt="Avatar"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-sm font-bold text-slate-800 truncate">{{ userStore.user.name }}</span>
          <span class="text-[11px] font-medium text-slate-400 truncate">{{ userStore.user.identifier }}</span>
        </div>
      </div>

      <button
        @click="handleLogout"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut class="h-5 w-5" />
        {{ $t('logout') }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Globe, Home, Gauge, Router as RouterIcon, LogOut } from 'lucide-vue-next'
import { useUserStore } from '~/stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

function handleLogout(): void {
  userStore.logout()
  router.push('/login')
}
</script>
