<template>
  <header class="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-4 backdrop-blur-md sm:px-8">
    <div class="relative w-full max-w-md">
      <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        :placeholder="$t('search')"
        class="w-full rounded-xl bg-slate-100 py-2 pl-10 pr-4 text-xs text-slate-700 outline-none transition-all focus:bg-slate-200/70"
      />
    </div>

    <div class="flex items-center gap-3">
      <button
        @click="toggleLanguage"
        class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
      >
        {{ locale.toUpperCase() }}
      </button>

      <button class="relative rounded-xl p-2 text-slate-400 hover:bg-slate-50">
        <Bell class="h-5 w-5" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search, Bell } from 'lucide-vue-next'

const { locale, toggleLanguage } = useLanguage()
</script>
