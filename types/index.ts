// types/index.ts
export interface User {
  name: string
  identifier: string
  avatar: string
}

export interface TariffPlan {
  id: string
  name: string
  price: string
  downloadSpeed: string
  uploadSpeed: string
  tier: 'entry' | 'power' | 'ultimate'
}

export interface CatalogService {
  id: string
  category: 'internet' | 'tv' | 'security' | 'payment' | 'cloud'
  img: string
  badge: boolean
  icon: 'shield' | 'tv' | 'zap' | 'cloud'
  labelKey: string
  nameKey: string
  descKey: string
  price: string
}

export interface ConnectedService {
  name: string
  descKey: string
  iconBg: string
}

export type BillingCycle = 'monthly' | 'yearly'
