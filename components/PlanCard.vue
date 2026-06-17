<template>
  <!-- Recommended (dark card) -->
  <div
    v-if="isRecommended"
    class="relative rounded-[24px] bg-[#0f112b] p-7 shadow-xl flex flex-col justify-between border border-white/5 ring-4 ring-indigo-500/10 overflow-hidden transform md:-translate-y-2"
  >
    <div class="absolute right-0 top-0 bg-[#7c5cff] text-white px-5 py-1 text-[9px] font-black tracking-widest uppercase rounded-bl-xl shadow-md">
      {{ $t('recommended') }}
    </div>

    <div>
      <h3 class="text-xl font-bold text-white mt-5">{{ plan.name }}</h3>
      <ul class="mt-6 space-y-3.5 text-xs font-semibold text-slate-300">
        <li class="flex items-center gap-2.5">
          <Gauge class="h-4 w-4 text-indigo-400" />
          {{ $t('tariff.speed_1gb') }}
        </li>
        <li class="flex items-center gap-2.5">
          <Tv class="h-4 w-4 text-indigo-400" />
          {{ $t('tariff.premium_tv') }}
        </li>
        <li class="flex items-center gap-2.5">
          <Wifi class="h-4 w-4 text-indigo-400" />
          {{ $t('tariff.wifi_bundle') }}
        </li>
      </ul>
    </div>

    <div class="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
      <div>
        <span class="text-2xl font-black text-white">${{ displayPrice }}</span>
        <span class="text-[10px] text-slate-500 font-bold">/{{ $t('month') }}</span>
      </div>
      <button
        @click="emit('select', plan)"
        class="rounded-xl bg-[#7c5cff] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-[#6946ff] transition-colors"
      >
        {{ $t('select') }}
      </button>
    </div>
  </div>

  <!-- Regular (light card) -->
  <div
    v-else
    class="rounded-[24px] border border-slate-100 bg-white p-7 shadow-sm flex flex-col justify-between transition-all hover:shadow-md"
  >
    <div>
      <h3 class="text-xl font-bold text-slate-800 mt-5">{{ plan.name }}</h3>
      <ul class="mt-6 space-y-3.5 text-xs font-semibold text-slate-600">
        <li class="flex items-center gap-2.5">
          <Gauge class="h-4 w-4 text-slate-400" />
          {{ plan.downloadSpeed }}
        </li>
        <li v-if="plan.tier === 'ultimate'" class="flex items-center gap-2.5">
          <Tv class="h-4 w-4 text-slate-400" />
          {{ $t('tariff.max_pack') }}
        </li>
        <li v-if="plan.tier === 'ultimate'" class="flex items-center gap-2.5">
          <ShieldAlert class="h-4 w-4 text-slate-400" />
          {{ $t('tariff.security_guard') }}
        </li>
        <li v-if="plan.tier === 'entry'" class="flex items-center gap-2.5">
          <Tv class="h-4 w-4 text-slate-400" />
          {{ $t('tariff.basic_tv') }}
        </li>
        <li v-if="plan.tier === 'entry'" class="flex items-center gap-2.5">
          <Wifi class="h-4 w-4 text-slate-400" />
          {{ $t('tariff.standard_wifi') }}
        </li>
      </ul>
    </div>

    <div class="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between">
      <div>
        <span class="text-2xl font-black text-slate-800">${{ displayPrice }}</span>
        <span class="text-[10px] text-slate-400 font-bold">/{{ $t('month') }}</span>
      </div>
      <button
        @click="emit('select', plan)"
        class="rounded-xl border border-indigo-200 bg-white px-5 py-2.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
      >
        {{ $t('select') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Gauge, Tv, Wifi, ShieldAlert } from 'lucide-vue-next'
import type { TariffPlan, BillingCycle } from '~/types'

interface Props {
  plan: TariffPlan
  billingCycle: BillingCycle
  isRecommended?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isRecommended: false,
})

const emit = defineEmits<{
  select: [plan: TariffPlan]
}>()

const displayPrice = computed(() =>
  props.billingCycle === 'yearly'
    ? (Number(props.plan.price) * 0.85).toFixed(2)
    : props.plan.price,
)
</script>
