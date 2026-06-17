<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const router = useRouter()
await router.replace('/dashboard')
</script>
