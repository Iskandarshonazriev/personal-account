<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f3ff] px-4 py-12 font-sans antialiased selection:bg-indigo-200">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />

    <div class="relative w-full max-w-[520px] text-center z-10">
      <div class="mb-8 flex flex-col items-center">
        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
          <svg class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-indigo-900">FiberFlow</h1>
        <p class="mt-1 text-sm font-medium text-slate-500">Experience the future of connectivity</p>
      </div>

      <div class="rounded-[28px] border border-white/60 bg-white/80 p-8 shadow-[0_20px_50px_rgba(99,102,241,0.05)] backdrop-blur-xl sm:p-10">
        <h2 class="text-left text-2xl font-bold text-slate-800">Create Account</h2>
        <p class="mt-1 text-left text-sm text-slate-400">Join the high-speed network today.</p>

        <form @submit.prevent="handleSubmit" class="mt-8 space-y-5 text-left">
          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
            <div class="relative">
              <User class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Alex Rivers"
                class="w-full rounded-xl border border-slate-200/80 bg-[#f5f6ff]/50 py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <div class="relative">
                <Mail class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="alex@flow.com"
                  class="w-full rounded-xl border border-slate-200/80 bg-[#f5f6ff]/50 py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
              <div class="relative">
                <Phone class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
           <input
  v-model="form.phone"
  type="tel"
  placeholder="92XXXXXXX"
  maxlength="9"
  oninput="this.value = this.value.replace(/[^0-9]/g, '')"
  class="w-full rounded-xl border border-slate-200/80 bg-[#f5f6ff]/50 py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
/>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <div class="relative">
              <Lock class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full rounded-xl border border-slate-200/80 bg-[#f5f6ff]/50 py-3.5 pl-12 pr-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Confirm Password</label>
            <div class="relative">
              <RefreshCw class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                class="w-full rounded-xl border border-slate-200/80 bg-[#f5f6ff]/50 py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                required
              />
            </div>
          </div>

          <div v-if="passwordError" class="text-xs text-red-500 font-semibold">{{ passwordError }}</div>

          <div class="flex items-start pt-1">
            <div class="flex h-5 items-center">
              <input
                v-model="form.agreeToTerms"
                id="terms"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20"
                required
              />
            </div>
            <label for="terms" class="ml-3 text-sm text-slate-500 select-none cursor-pointer">
              I agree to the <a href="#" class="text-indigo-600 font-medium hover:underline">Terms of Service</a> and <a href="#" class="text-indigo-600 font-medium hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            class="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-[#6946ff] hover:shadow-xl hover:shadow-indigo-600/30 active:scale-[0.99]"
          >
            Create Account
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div class="relative my-8 flex items-center justify-center">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-100" />
          </div>
          <span class="relative bg-white px-4 text-[11px] font-bold tracking-widest text-slate-400 uppercase">Already have an account?</span>
        </div>

        <button
          @click="navigateTo('/login')"
          class="w-full rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800"
        >
          Sign In
        </button>
      </div>

      <div class="mt-8 flex flex-col items-center justify-between gap-4 text-xs font-medium text-slate-400 sm:flex-row px-2">
        <div class="flex items-center gap-1.5">
          <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Bank-level security
        </div>
        <div class="flex gap-4">
          <a href="#" class="hover:text-slate-600 transition-colors">Support</a>
          <a href="#" class="hover:text-slate-600 transition-colors">Help</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Mail, Phone, Lock, Eye, EyeOff, RefreshCw, ArrowRight } from 'lucide-vue-next'

definePageMeta({ layout: false })

const router = useRouter()
const showPassword = ref(false)
const passwordError = ref('')

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
})

function handleSubmit() {
  passwordError.value = ''
  if (form.password !== form.confirmPassword) {
    passwordError.value = 'Passwords do not match'
    return
  }
  if (form.phone.length !== 9) {
    alert('Номер телефона должен состоять ровно из 9 цифр')
    return
  }

if (form.phone.length !== 9) {
    alert('Номер телефона должен состоять ровно из 9 цифр')
    return
  }

  if (form.password !== form.confirmPassword) {
    passwordError.value = 'Passwords do not match'
    return
  }
  const contractNumber = Math.floor(100000000 + Math.random() * 900000000).toString()

  localStorage.setItem('user-name', form.fullName)
  localStorage.setItem('user-email', form.email)
  localStorage.setItem('user-phone', form.phone)
  localStorage.setItem('user-password', form.password)
  localStorage.setItem('user-contract', contractNumber)
  localStorage.setItem('balance', '0')
  localStorage.setItem('plan', 'Start Fiber 100')
  localStorage.setItem('price', '19.99')

  alert(`Ваш номер договора: ${contractNumber}`)
  router.push('/login')
  localStorage.setItem('user-phone', form.phone)
}
</script>
