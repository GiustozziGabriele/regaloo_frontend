<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { supabase } from '@/lib/supabase'

    const router = useRouter()

    onMounted(async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.push('/login')
        return
      }

      router.push('/app/dashboard')
    })
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" role="status"></div>
      <p class="mb-0">Accesso in corso...</p>
    </div>
  </div>
</template>