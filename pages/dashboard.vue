<template>
  <div class="flex min-h-screen bg-[#f4f5fa] font-sans antialiased text-slate-800">
    <AppSidebar />

    <main class="flex-1 lg:pl-64">
      <AppHeader />

      <div class="p-4 sm:p-8 space-y-8 max-w-6xl">
        <!-- Welcome -->
        <div class="text-left">
          <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {{ $t('dashboard.welcome', { name: userStore.user.name }) }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">{{ $t('dashboard.status') }}</p>
        </div>

        <!-- Balance + Plan -->
        <div class="grid grid-cols-1 gap-6 md:grid-cols-12">
          <!-- Balance card -->
          <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:col-span-4 flex flex-col justify-between text-left">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                {{ $t('dashboard.balance') }}
              </span>
              <div class="mt-4">
                <span class="text-3xl font-black text-slate-800">
                  {{ accountStore.balance.toFixed(2) }} $
                </span>
              </div>
              <p class="text-[11px] text-slate-400 mt-1">{{ $t('dashboard.payment_date') }}</p>
            </div>
            <button
              @click="topUpBalance"
              class="mt-6 w-full rounded-xl bg-[#7c5cff] py-3 text-xs font-bold text-white shadow-md hover:bg-[#6946ff] flex items-center justify-center gap-1.5 transition-colors"
            >
              {{ $t('dashboard.top_up') }} <ArrowRight class="h-3.5 w-3.5" />
            </button>
          </div>

          <!-- Plan card -->
          <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div class="sm:col-span-8">
              <span class="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#7c5cff] text-[10px] font-bold uppercase">
                {{ $t('dashboard.active_plan') }}
              </span>
              <h3 class="text-xl font-bold text-slate-800 mt-2">{{ accountStore.currentPlan }}</h3>
              <div class="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <span class="text-[9px] text-slate-400 block uppercase">{{ $t('dashboard.download') }}</span>
                  <span class="text-lg font-extrabold text-indigo-600">1024</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block uppercase">{{ $t('dashboard.upload') }}</span>
                  <span class="text-lg font-extrabold text-purple-600">850</span>
                </div>
                <div>
                  <span class="text-[9px] text-slate-400 block uppercase">{{ $t('dashboard.ping') }}</span>
                  <span class="text-lg font-extrabold text-emerald-600">2</span>
                </div>
              </div>
            </div>

            <div class="sm:col-span-4 rounded-2xl bg-[#f4f5ff] p-5 flex flex-col justify-between items-center text-center">
              <span class="text-[10px] font-semibold text-slate-400">{{ $t('dashboard.monthly_fee') }}</span>
              <span class="text-2xl font-black text-slate-800">{{ accountStore.currentPrice }} $</span>
              <NuxtLink
                to="/myTariff"
                class="w-full mt-4 rounded-xl bg-white border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 text-center block"
              >
                {{ $t('dashboard.change_plan') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Connected Services -->
        <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm max-w-2xl">
          <div class="flex justify-between items-center mb-5">
            <h3 class="font-bold text-slate-800 text-base">{{ $t('dashboard.services_title') }}</h3>
            <NuxtLink to="/services" class="text-xs font-bold text-[#7c5cff] hover:underline">
              {{ $t('dashboard.manage_all') }}
            </NuxtLink>
          </div>
          <div class="space-y-3">
            <div
              v-for="(service, i) in services"
              :key="service.name"
              class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
            >
              <div class="flex items-center gap-3">
                <div :class="['p-2 rounded-xl text-white', service.iconBg]">
                  <component :is="serviceIcons[i]" class="h-4 w-4" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-slate-800">{{ service.name }}</h4>
                  <p class="text-[10px] text-slate-400 mt-0.5">{{ $t(service.descKey) }}</p>
                </div>
              </div>
              <span class="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {{ $t('dashboard.active') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Top-up modal -->
    <div
      v-if="showTopUp"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
      @click.self="showTopUp = false"
    >
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl mx-4">
        <h3 class="text-xl font-bold text-slate-800 mb-2">{{ $t('dashboard.top_up') }}</h3>
        <p class="text-sm text-slate-500 mb-4">Текущий баланс: {{ accountStore.balance.toFixed(2) }} $</p>
        <input
          v-model.number="topUpAmount"
          type="number"
          min="1"
          placeholder="Сумма пополнения"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 mb-4"
        />
        <div class="flex gap-3">
          <button @click="showTopUp = false" class="flex-1 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
            Отмена
          </button>
          <button @click="confirmTopUp" class="flex-1 py-2.5 text-sm font-bold text-white bg-[#7c5cff] rounded-xl hover:bg-[#6946ff] transition-colors">
            Пополнить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Shield, Tv, Cloud, ArrowRight } from 'lucide-vue-next'
import { useUserStore } from '~/stores/userStore'
import { useAccountStore } from '~/stores/accountStore'
import type { ConnectedService } from '~/types'

definePageMeta({ middleware: 'auth' })

const { locale } = useLanguage()

const userStore = useUserStore()
const accountStore = useAccountStore()

onMounted(() => {
  userStore.loadFromStorage()
  accountStore.loadFromStorage()
})

const showTopUp = ref(false)
const topUpAmount = ref<number | null>(null)

const services: ConnectedService[] = [
  { name: 'Cyber Guard Pro', descKey: 'dashboard.services.cyber_desc', iconBg: 'bg-emerald-500' },
  { name: 'StreamPass 4K', descKey: 'dashboard.services.tv_desc', iconBg: 'bg-indigo-500' },
  { name: 'Cloud Vault 1TB', descKey: 'dashboard.services.cloud_desc', iconBg: 'bg-purple-500' },
]

const serviceIcons = [Shield, Tv, Cloud]

function topUpBalance(): void {
  topUpAmount.value = null
  showTopUp.value = true
}

function confirmTopUp(): void {
  if (!topUpAmount.value || topUpAmount.value <= 0) return
  accountStore.topUp(topUpAmount.value)
  showTopUp.value = false
}
</script>
