<template>
  <div class="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800">

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div
          v-if="toast.visible"
          class="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-5 py-3 shadow-lg text-sm font-semibold text-indigo-700"
        >
          <CheckCircle2 class="w-4 h-4 shrink-0" />
          {{ toast.message }}
        </div>
      </Transition>
    </Teleport>

    <AppSidebar />

    <div class="flex-1 lg:pl-64">
      <AppHeader />

      <main class="p-6 sm:p-10 max-w-[1200px]">
        <div class="mb-10">
          <h1 class="text-3xl font-extrabold tracking-tight text-slate-900">{{ $t('servicePage.title') }}</h1>
          <p class="mt-1 text-slate-400">{{ $t('servicePage.subtitle') }}</p>
        </div>

        <!-- Active services -->
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-lg font-bold text-slate-800">{{ $t('servicePage.connected_services') }}</h2>
            <span class="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 uppercase">
              {{ $t('servicePage.active_count') }}
            </span>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Promised payment -->
            <div class="flex items-center justify-between rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                  <Clock class="h-7 w-7" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-800">{{ $t('servicePage.promised_payment') }}</h3>
                  <p class="mt-1 text-xs text-slate-400 leading-relaxed">{{ $t('servicePage.promised_payment_desc') }}</p>
                  <div class="mt-3 text-[10px] font-black tracking-widest text-indigo-500 uppercase">
                    {{ $t('servicePage.renewable') }}
                  </div>
                </div>
              </div>
              <button class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                {{ $t('servicePage.manage') }}
              </button>
            </div>

            <!-- Turbo speed -->
            <div class="flex items-center justify-between rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start gap-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                  <Zap class="h-7 w-7" />
                </div>
                <div>
                  <h3 class="font-bold text-slate-800">{{ $t('servicePage.turbo_speed') }}</h3>
                  <p class="mt-1 text-xs text-slate-400 leading-relaxed">{{ $t('servicePage.turbo_speed_desc') }}</p>
                  <div class="mt-3 text-[10px] font-black tracking-widest text-indigo-500 uppercase">
                    {{ $t('servicePage.active_for_12h') }}
                  </div>
                </div>
              </div>
              <button class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                {{ $t('servicePage.settings') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Service catalog -->
        <div>
          <div class="mb-8 flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-800">{{ $t('servicePage.service_catalog') }}</h2>
            <div class="flex gap-1 rounded-xl bg-slate-100 p-1">
              <button
                v-for="tab in tabs"
                :key="tab"
                @click="activeTab = tab"
                :class="activeTab === tab ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                class="px-4 py-1.5 text-xs font-bold transition-all rounded-lg"
              >
                {{ $t(`servicePage.${tab}`) }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="service in filteredCatalog"
              :key="service.id"
              class="group relative flex flex-col rounded-[32px] border border-slate-100 bg-white p-2 shadow-sm transition-all hover:shadow-xl"
            >
              <div class="relative h-48 w-full overflow-hidden rounded-[26px]">
                <img :src="service.img" class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span v-if="service.badge" class="absolute left-4 top-4 rounded-lg bg-indigo-600 px-3 py-1 text-[9px] font-black tracking-widest text-white uppercase">
                  {{ $t('servicePage.most_popular') }}
                </span>
              </div>
              <div class="p-5 flex-1">
                <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <ShieldCheck v-if="service.icon === 'shield'" class="h-3.5 w-3.5" />
                  <Tv v-else-if="service.icon === 'tv'" class="h-3.5 w-3.5" />
                  <Zap v-else-if="service.icon === 'zap'" class="h-3.5 w-3.5" />
                  <Cloud v-else-if="service.icon === 'cloud'" class="h-3.5 w-3.5" />
                  {{ resolveKey(service.labelKey) }}
                </div>
                <h3 class="text-lg font-bold text-slate-800">{{ resolveKey(service.nameKey) }}</h3>
                <p class="mt-2 text-xs text-slate-400 leading-relaxed">{{ resolveKey(service.descKey) }}</p>
              </div>
              <div class="flex items-center justify-between p-5 pt-0 mt-auto">
                <div>
                  <span class="text-xl font-black text-slate-800">{{ service.price }}</span>
                  <span class="text-[10px] font-bold text-slate-400 uppercase ml-1">/{{ $t('servicePage.month') }}</span>
                </div>
                <button
                  @click="connectService(service.id, resolveKey(service.nameKey))"
                  :class="isConnected(service.id)
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
                  class="rounded-xl px-5 py-2.5 text-xs font-bold transition-all"
                >
                  {{ isConnected(service.id) ? $t('servicePage.connected') : $t('servicePage.connect') }}
                </button>
              </div>
            </div>

            <!-- Custom plan -->
            <div v-if="activeTab === 'all'" class="relative rounded-[32px] bg-gradient-to-br from-[#1b1e3d] to-[#0f112b] p-8 shadow-2xl overflow-hidden flex flex-col justify-between border border-white/5">
              <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 20px 20px;" />
              <div class="relative z-10">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
                  <CheckCircle2 class="h-6 w-6" />
                </div>
                <h3 class="text-2xl font-bold text-white mt-6">{{ $t('servicePage.custom_plan') }}</h3>
                <p class="mt-3 text-sm text-slate-400 leading-relaxed">{{ $t('servicePage.custom_plan_desc') }}</p>
              </div>
              <div class="relative z-10 mt-8">
                <button class="w-full rounded-2xl bg-[#7c5cff] py-4 text-sm font-black text-white shadow-xl shadow-indigo-600/20 hover:bg-[#6946ff] transition-all">
                  {{ $t('servicePage.contact_us') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Clock, Zap, ShieldCheck, Tv, Cloud, CheckCircle2 } from 'lucide-vue-next'
import { useUserStore } from '~/stores/userStore'
import type { CatalogService } from '~/types'

definePageMeta({ middleware: 'auth' })

const { t } = useI18n()
useLanguage()

const userStore = useUserStore()

onMounted(() => {
  userStore.loadFromStorage()
  const saved = localStorage.getItem('connected-services')
  if (saved) connectedServices.value = JSON.parse(saved)
})

// Toast
const toast = ref<{ message: string; visible: boolean }>({ message: '', visible: false })
let toastTimer: ReturnType<typeof setTimeout>

function showToast(message: string): void {
  clearTimeout(toastTimer)
  toast.value = { message, visible: true }
  toastTimer = setTimeout(() => { toast.value.visible = false }, 3000)
}

// Services state
const connectedServices = ref<string[]>([])

function connectService(serviceId: string, serviceName: string): void {
  if (connectedServices.value.includes(serviceId)) {
    connectedServices.value = connectedServices.value.filter((id) => id !== serviceId)
    showToast(`«${serviceName}» отключён`)
  } else {
    connectedServices.value.push(serviceId)
    showToast(`«${serviceName}» подключён! ✓`)
  }
  localStorage.setItem('connected-services', JSON.stringify(connectedServices.value))
}

function isConnected(serviceId: string): boolean {
  return connectedServices.value.includes(serviceId)
}

// Catalog
const tabs = ['all', 'internet', 'tv', 'security', 'cloud'] as const
type Tab = (typeof tabs)[number]
const activeTab = ref<Tab>('all')

const catalog: CatalogService[] = [
  { id: 'vpn', category: 'security', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400', badge: true, icon: 'shield', labelKey: 'servicePage.security', nameKey: 'SafeFlow VPN', descKey: 'Bank-grade encryption for all your home devices.', price: '$4.99' },
  { id: 'tv', category: 'tv', img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=400', badge: false, icon: 'tv', labelKey: 'servicePage.entertainment', nameKey: 'servicePage.ultrastream_tv', descKey: 'servicePage.ultrastream_tv_desc', price: '$12.50' },
  { id: 'security', category: 'security', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400', badge: false, icon: 'shield', labelKey: 'servicePage.security', nameKey: 'servicePage.home_guardian', descKey: 'servicePage.home_guardian_desc', price: '$19.99' },
  { id: 'gaming', category: 'internet', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400', badge: false, icon: 'zap', labelKey: 'servicePage.internet', nameKey: 'servicePage.unlimited_gaming', descKey: 'servicePage.unlimited_gaming_desc', price: '$7.00' },
  { id: 'cloud', category: 'cloud', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400', badge: false, icon: 'cloud', labelKey: 'servicePage.cloud', nameKey: 'servicePage.cloud_backup', descKey: 'servicePage.cloud_backup_desc', price: '$5.50' },
]

const filteredCatalog = computed(() =>
  activeTab.value === 'all'
    ? catalog
    : catalog.filter((s) => s.category === activeTab.value),
)

function resolveKey(key: string): string {
  return key.startsWith('servicePage.') ? t(key) : key
}
</script>
