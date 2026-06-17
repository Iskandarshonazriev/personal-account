<template>
  <button
    :disabled="disabled"
    @click="emit('click')"
    :class="[
      'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-colors',
      size === 'sm' && 'px-3 py-1.5 text-[11px]',
      size === 'md' && 'px-5 py-2.5 text-xs',
      size === 'lg' && 'px-6 py-3 text-sm',
      variant === 'primary' && 'bg-[#7c5cff] text-white hover:bg-[#6946ff] shadow-md shadow-indigo-500/20',
      variant === 'secondary' && 'border border-indigo-200 bg-white text-indigo-600 hover:bg-indigo-50',
      variant === 'danger' && 'bg-red-50 text-red-600 hover:bg-red-100',
      variant === 'ghost' && 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
      fullWidth && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
})

const emit = defineEmits<{ click: [] }>()
</script>
