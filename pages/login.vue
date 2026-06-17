<template>
  <div class="flex min-h-screen bg-[#060814] text-white font-sans antialiased selection:bg-cyan-500 selection:text-black">

    <!-- Left panel (desktop) -->
    <div class="hidden lg:flex lg:w-1/2 relative flex-col justify-between px-20 py-12 overflow-hidden bg-gradient-to-b from-[#0b0e26] to-[#060814] border-r border-white/5">
      <div class="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/10 blur-[150px] rounded-full" />
      <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full" />

      <div class="relative z-10 flex items-center gap-3">
        <div class="h-10 w-10 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Globe class="h-5 w-5 text-white" />
        </div>
        <div>
          <span class="font-black tracking-wider text-lg uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">FiberFlow</span>
          <span class="text-xs block text-cyan-400 font-semibold tracking-widest uppercase -mt-1">Internet Provider</span>
        </div>
      </div>

      <div class="relative z-10 my-auto max-w-lg">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Все системы работают в штатном режиме
        </div>
        <h1 class="text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          Личный кабинет <br />
          <span class="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">абонента</span>
        </h1>
        <p class="text-slate-400 text-base leading-relaxed mb-10">
          Управляйте тарифом, проверяйте баланс в реальном времени, подключайте ТВ и цифровые сервисы в один клик.
        </p>
        <div class="space-y-6">
          <div v-for="feature in features" :key="feature.title" class="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
            <div :class="['p-2.5 rounded-xl', feature.bg]">
              <component :is="feature.icon" class="h-5 w-5" :class="feature.iconColor" />
            </div>
            <div>
              <h3 class="font-semibold text-sm text-slate-200">{{ feature.title }}</h3>
              <p class="text-xs text-slate-500">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 flex justify-between items-center text-xs text-slate-600">
        <span>© 2026 FIBERFLOW ISP. Все права защищены.</span>
        <a href="#" class="hover:text-slate-400 transition-colors">Поддержка:+992 755 55 56</a>
      </div>
    </div>

    <!-- Right panel: login form -->
    <div class="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 bg-[#060814]">

      <!-- Mobile logo -->
      <div class="flex lg:hidden items-center justify-between w-full max-w-md mx-auto mb-8">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Globe class="h-4 w-4" />
          </div>
          <span class="font-bold tracking-wider text-sm uppercase">FiberFlow</span>
        </div>
        <span class="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Сеть ок
        </span>
      </div>

      <div class="w-full max-w-md mx-auto my-auto">
        <div class="bg-[#0e1131] border border-white/5 rounded-[32px] p-8 sm:p-10 shadow-2xl relative">

          <!-- Tab toggle -->
          <div class="flex p-1 bg-[#060814] rounded-xl mb-8 border border-white/5">
            <button
              @click="loginType = 'contract'"
              :class="loginType === 'contract' ? 'bg-[#7c5cff] text-white shadow-lg' : 'text-slate-400 hover:text-white'"
              class="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all"
            >
              № Договора
            </button>
            <button
              @click="loginType = 'phone'"
              :class="loginType === 'phone' ? 'bg-[#7c5cff] text-white shadow-lg' : 'text-slate-400 hover:text-white'"
              class="flex-1 py-2.5 text-xs font-bold rounded-lg transition-all"
            >
              Номер телефона
            </button>
          </div>

          <div class="mb-6">
            <h2 class="text-2xl font-bold mb-1">Вход в личный кабинет</h2>
            <p class="text-sm text-slate-400">Введите ваши данные для управления услугами</p>
          </div>

          <!-- Error -->
          <div v-if="errorMsg" class="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            {{ errorMsg }}
          </div>

      
          <form @submit.prevent="handleLogin" class="space-y-5">
            <div v-if="loginType === 'contract'">
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Лицевой счет / Номер договора</label>
              <div class="relative">
                <FileText class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  v-model="contractNumber"
                  type="text"
                  placeholder="Например 123456"
                  class="w-full bg-[#060814] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>

            <div v-else>
              <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Номер телефона</label>
              <div class="relative">
                <Phone class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  v-model="phone"
                  type="tel"
                  placeholder="+992 "
                  class="w-full bg-[#060814] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <div class="flex justify-between mb-2">
                <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Пароль</label>
                <a href="#" class="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Забыли пароль?</a>
              </div>
              <div class="relative">
                <Lock class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full bg-[#060814] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-indigo-500 transition-all text-sm"
                />
              </div>
            </div>

            <div class="flex items-center gap-2.5 py-1">
              <input type="checkbox" id="remember" class="accent-indigo-500 h-4 w-4 rounded border-white/10 bg-transparent" />
              <label for="remember" class="text-xs text-slate-400 cursor-pointer select-none">Запомнить этот личный кабинет</label>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-[#7c5cff] to-[#633fff] hover:from-[#6946ff] hover:to-[#502ce6] py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/10 mt-2"
            >
              Войти в кабинет <ArrowRight class="h-4 w-4" />
            </button>
          </form>

          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5" /></div>
            <div class="relative flex justify-center"><span class="bg-[#0e1131] px-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">Быстрые действия</span></div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 bg-[#141842] hover:bg-[#1a1e54] py-3 rounded-xl transition-all border border-white/5 text-xs font-semibold text-slate-200">
              <CreditCard class="h-4 w-4 text-cyan-400" /> Быстрая оплата
            </button>
            <button class="flex items-center justify-center gap-2 bg-[#141842] hover:bg-[#1a1e54] py-3 rounded-xl transition-all border border-white/5 text-xs font-semibold text-slate-200">
              <Gauge class="h-4 w-4 text-indigo-400" /> Тест скорости
            </button>
          </div>

          <p class="text-center mt-8 text-xs text-slate-400">
            Еще не подключены к FiberFlow? <br class="sm:hidden" />
            <NuxtLink to="/register" class="text-cyan-400 font-bold hover:underline ml-1">Оставить заявку</NuxtLink>
          </p>
        </div>
      </div>

      <div class="mt-8 text-center text-[11px] text-slate-600 lg:hidden">
        © 2026 FIBERFLOW ISP. +992 755 55 55 56
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Globe, Zap, Wallet, Tv, Phone, Lock, ArrowRight, CreditCard, FileText, Gauge } from 'lucide-vue-next'

definePageMeta({ layout: false })

const router = useRouter()

const loginType = ref<'contract' | 'phone'>('contract')
const contractNumber = ref('')
const phone = ref('')
const password = ref('')
const errorMsg = ref('')
const savedContractHint = ref('')

// При монтировании — показываем подсказку с номером договора если он есть
onMounted(() => {
  const contract = localStorage.getItem('user-contract')
  if (contract) {
    savedContractHint.value = contract
  }
})

const features = [
  {
    icon: Zap,
    title: 'Управление скоростью',
    desc: 'Меняйте тарифный план или активируйте «Турбо-кнопку» мгновенно.',
    bg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Wallet,
    title: 'Обещанный платеж',
    desc: 'Интернет закончился в неудобный момент? Продлите доступ на 3 дня.',
    bg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Tv,
    title: 'Интерактивное ТВ и Умный Дом',
    desc: 'Управляйте всеми услугами и подписками в едином интерфейсе.',
    bg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
]

function handleLogin() {
  errorMsg.value = ''

  const identifier = loginType.value === 'contract' ? contractNumber.value.trim() : phone.value.trim()
  const pwd = password.value

  if (!identifier || !pwd) {
    errorMsg.value = 'Пожалуйста, заполните все поля'
    return
  }

  // Очищаем идентификатор от лишних символов (оставляем только цифры), 
  // если это номер телефона
  const cleanIdentifier = loginType.value === 'phone' 
    ? identifier.replace(/\D/g, '') 
    : identifier;

  const savedPhone = (localStorage.getItem('user-phone') || '').replace(/\D/g, '');
  const savedPassword = localStorage.getItem('user-password') ?? '';
  const savedContract = localStorage.getItem('user-contract') ?? '';

  const passwordMatch = pwd === savedPassword;
  
  // Проверяем соответствие
  const isMatch = (loginType.value === 'contract' && identifier === savedContract) ||
                  (loginType.value === 'phone' && cleanIdentifier === savedPhone);

  if (!passwordMatch || !isMatch) {
    errorMsg.value = 'Неверный логин или пароль'
    return
  }

  // ... дальше твой код успешного входа
  localStorage.setItem('user-token', 'fake-provider-jwt');
  router.push('/dashboard');
}
</script>
