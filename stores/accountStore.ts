// stores/accountStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TariffPlan, BillingCycle } from '~/types'

export const useAccountStore = defineStore('account', () => {
  const balance = ref<number>(0)
  const currentPlan = ref<string>('Start Fiber 100')
  const currentPrice = ref<string>('19.99')

  function loadFromStorage(): void {
    if (!import.meta.client) return
    const savedBalance = localStorage.getItem('balance')
    const savedPlan = localStorage.getItem('plan')
    const savedPrice = localStorage.getItem('price')
    if (savedBalance !== null) balance.value = Number(savedBalance)
    if (savedPlan) currentPlan.value = savedPlan
    if (savedPrice) currentPrice.value = savedPrice
  }

  function topUp(amount: number): void {
    if (amount <= 0) return
    balance.value += amount
    if (import.meta.client) {
      localStorage.setItem('balance', balance.value.toString())
    }
  }

  function changePlan(plan: TariffPlan, billingCycle: BillingCycle): boolean {
    const price =
      billingCycle === 'yearly'
        ? (Number(plan.price) * 0.85).toFixed(2)
        : plan.price

    if (balance.value < Number(price)) return false

    balance.value -= Number(price)
    currentPlan.value = plan.name
    currentPrice.value = price

    if (import.meta.client) {
      localStorage.setItem('balance', balance.value.toString())
      localStorage.setItem('plan', plan.name)
      localStorage.setItem('price', price)
    }

    return true
  }

  return { balance, currentPlan, currentPrice, loadFromStorage, topUp, changePlan }
})
