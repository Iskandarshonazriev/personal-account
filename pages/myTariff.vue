<template>
  <div class="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800">
    <AppSidebar />

    <div class="flex-1 lg:pl-64">
      <AppHeader />

      <main class="p-6 sm:p-10 max-w-[1400px]">
        <div class="mb-8">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900">{{ $t('tariff.manage_my_plan') }}</h1>
          <p class="mt-1 text-sm text-slate-400">{{ $t('tariff.subscription_desc') }}</p>
        </div>

        <!-- Current plan + analytics -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">

          <!-- Current plan -->
          <div class="relative overflow-hidden rounded-[24px] border border-white bg-white p-8 shadow-[0_16px_36px_rgba(99,102,241,0.03)] lg:col-span-2 flex flex-col justify-between min-h-[240px]">
            <div>
              <span class="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold tracking-wider text-indigo-600 uppercase">
                {{ $t('tariff.active_plan') }}
              </span>
              <h2 class="mt-3 text-4xl font-extrabold tracking-tight text-indigo-900">
                {{ accountStore.currentPlan }}
              </h2>
              <div class="mt-6 flex gap-12 border-b border-slate-100 pb-6">
                <div>
                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">{{ $t('dashboard.download') }}</span>
                  <p class="text-2xl font-bold text-slate-800 mt-0.5">500 Mbps</p>
                </div>
                <div>
                  <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400">{{ $t('dashboard.upload') }}</span>
                  <p class="text-2xl font-bold text-slate-800 mt-0.5">500 Mbps</p>
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-center gap-3">
                <div class="flex -space-x-1.5">
                  <div class="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-600 border-2 border-white text-xs font-bold">TV</div>
                  <div class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 border-2 border-white text-xs font-bold">4K</div>
                  <div class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600 border-2 border-white text-xs font-bold">WI</div>
                </div>
                <span class="text-xs font-semibold text-slate-500">180+ {{ $t('tariff.channels') }}</span>
              </div>
              <div class="relative pr-4">
                <div class="absolute -right-4 -top-6 h-20 w-20 rounded-full bg-slate-50 z-0" />
                <div class="relative z-10 text-right">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{{ $t('tariff.monthly_cost') }}</span>
                  <span class="text-3xl font-black text-slate-800">${{ accountStore.currentPrice }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Analytics -->
          <div class="rounded-[24px] border border-white bg-white p-8 shadow-[0_16px_36px_rgba(99,102,241,0.03)] flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-bold text-slate-800">{{ $t('tariff.analytics') }}</h3>
              <div class="mt-6">
                <div class="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div class="h-full w-[70%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
                <div class="mt-3 flex justify-between text-xs font-semibold">
                  <span class="text-slate-400">{{ $t('tariff.data_used') }}</span>
                  <span class="text-indigo-600 font-bold">{{ $t('tariff.unlimited') }}</span>
                </div>
              </div>
            </div>
            <ul class="space-y-3 mt-6 border-t border-slate-100 pt-5">
              <li class="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <CheckCircle2 class="h-4 w-4 text-indigo-500" /> {{ $t('tariff.static_ip') }}
              </li>
              <li class="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <CheckCircle2 class="h-4 w-4 text-indigo-500" /> {{ $t('tariff.priority_support') }}
              </li>
              <li class="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                <CheckCircle2 class="h-4 w-4 text-indigo-500" /> {{ $t('tariff.wifi_included') }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Plan selector -->
        <div>
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold text-slate-800">{{ $t('tariff.upgrade_title') }}</h2>
              <p class="text-xs text-slate-400 mt-0.5">{{ $t('tariff.upgrade_desc') }}</p>
            </div>
            <div class="flex p-1 bg-slate-100 rounded-xl border border-slate-200/40">
              <button
                @click="billingCycle = 'monthly'"
                :class="billingCycle === 'monthly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                class="rounded-lg px-4 py-1.5 text-xs font-bold transition-all"
              >
                {{ $t('monthly') }}
              </button>
              <button
                @click="billingCycle = 'yearly'"
                :class="billingCycle === 'yearly' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'"
                class="rounded-lg px-4 py-1.5 text-xs font-bold transition-all flex items-center gap-1"
              >
                {{ $t('yearly') }} <span class="text-[10px] text-emerald-500 font-black">(-15%)</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
            <PlanCard
              v-for="plan in plans"
              :key="plan.id"
              :plan="plan"
              :billing-cycle="billingCycle"
              :is-recommended="plan.tier === 'power'"
              @select="selectPlan"
            />
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Confirm modal -->
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
    >
      <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl mx-4">
        <h3 class="text-xl font-bold text-slate-800">{{ $t('tariff.modal_title') }}</h3>
        <p class="text-sm text-slate-500 mt-2">
          {{ $t('tariff.modal_desc', { plan: selectedPlan?.name, price: selectedPlan ? displayPrice(selectedPlan) : '' }) }}
        </p>

        <div
          v-if="modalError"
          class="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-semibold text-red-600"
        >
          {{ $t('tariff.modal_insufficient') }}
        </div>

        <div class="flex gap-3 mt-8">
          <button
            @click="showModal = false"
            class="flex-1 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            {{ $t('tariff.modal_cancel') }}
          </button>
          <button
            @click="confirmChangePlan"
            class="flex-1 px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            {{ $t('tariff.modal_confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import { useAccountStore } from '~/stores/accountStore'
import { useUserStore } from '~/stores/userStore'
import type { TariffPlan, BillingCycle } from '~/types'

definePageMeta({ middleware: 'auth' })

useLanguage()

const accountStore = useAccountStore()
const userStore = useUserStore()

onMounted(() => {
  accountStore.loadFromStorage()
  userStore.loadFromStorage()
})

const plans: TariffPlan[] = [
  { id: 'core200', name: 'Fiber Core 200', price: '44.99', downloadSpeed: '200 Mbps Symmetric', uploadSpeed: '200 Mbps', tier: 'entry' },
  { id: 'proGig', name: 'Fiber Pro GIG', price: '89.99', downloadSpeed: '1000 Mbps (1 Gbps)', uploadSpeed: '1000 Mbps', tier: 'power' },
  { id: 'titan2g', name: 'Fiber Titan 2G', price: '129.99', downloadSpeed: '2000 Mbps Symmetric', uploadSpeed: '2000 Mbps', tier: 'ultimate' },
]

const billingCycle = ref<BillingCycle>('monthly')
const showModal = ref(false)
const modalError = ref(false)
const selectedPlan = ref<TariffPlan | null>(null)

function selectPlan(plan: TariffPlan): void {
  selectedPlan.value = plan
  modalError.value = false
  showModal.value = true
}

function confirmChangePlan(): void {
  if (!selectedPlan.value) return
  const success = accountStore.changePlan(selectedPlan.value, billingCycle.value)
  if (!success) {
    modalError.value = true
    return
  }
  showModal.value = false
}

function displayPrice(plan: TariffPlan): string {
  return billingCycle.value === 'yearly'
    ? (Number(plan.price) * 0.85).toFixed(2)
    : plan.price
}
</script>
