# FiberFlow — Nuxt 3 ISP Portal

Порт проекта `personal-account-fixed` с Vue 3 + Vite на **Nuxt 3**.

## Стек технологий

| | |
|---|---|
| Framework | **Nuxt 3** |
| Language | **TypeScript** (strict) |
| State | **Pinia** (`stores/userStore.ts`, `stores/accountStore.ts`) |
| Styling | **Tailwind CSS** |
| i18n | **@nuxtjs/i18n** (RU / EN) |
| Icons | **lucide-vue-next** |

## Структура

```
fiberflow/
├── pages/
│   ├── index.vue        # Редирект → /dashboard
│   ├── login.vue        # Вход (по договору или телефону)
│   ├── register.vue     # Регистрация
│   ├── dashboard.vue    # Главная с балансом и тарифом
│   ├── myTariff.vue     # Управление тарифом + PlanCard
│   └── services.vue     # Каталог услуг с тостами
├── stores/
│   ├── userStore.ts     # Пinia: имя, идентификатор, logout
│   └── accountStore.ts  # Pinia: баланс, тариф, changePlan
├── components/
│   ├── AppSidebar.vue   # Боковое меню
│   ├── AppHeader.vue    # Шапка с поиском и сменой языка
│   ├── PlanCard.vue     # Карточка тарифного плана
│   └── ui/BaseButton.vue
├── composables/
│   └── useLanguage.ts   # locale + toggleLanguage
├── middleware/
│   └── auth.ts          # Защита роутов
├── i18n.config.ts       # Переводы RU / EN
└── nuxt.config.ts
```

## Запуск

```bash
npm install
npm run dev
# → http://localhost:3000
```

Сначала зарегистрируйтесь на `/register`, запомните номер договора, затем войдите на `/login`.

## Отличия от оригинала (Vue 3 + Vite)

| Было | Стало |
|---|---|
| `vue-router` вручную | Nuxt file-based routing |
| `createI18n` в main.ts | `@nuxtjs/i18n` модуль |
| `import.meta.env` | `nuxt.config.ts` |
| `<router-link>` | `<NuxtLink>` |
| `useRouter()` из vue-router | `useRouter()` из Nuxt auto-imports |
| localStorage напрямую | Обёрнуто в `import.meta.client` |
| `definePageMeta` отсутствовал | Добавлен на каждую страницу |

## Важно — версии зависимостей

Все версии зафиксированы точно (без `^`) чтобы избежать конфликта `unhead` с Nuxt:

```bash
npm install --legacy-peer-deps
npm run dev
```
