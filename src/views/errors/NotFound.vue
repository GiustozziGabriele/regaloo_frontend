<!-- views/errors/NotFound.vue -->
<script setup>
    import { useErrorStore } from '@/stores/errorStore'
    import { onUnmounted } from 'vue'

    const error = useErrorStore()
    onUnmounted(() => error.clear())
</script>

<template>
    <div class="error-page">
        <h1>404</h1>
        <p>{{ error.message ?? 'Pagina non trovata' }}</p>
        <RouterLink to="/app/dashboard" class="btn-action">
            Torna alla home
        </RouterLink>
    </div>
</template>

<style scoped>
    .error-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        gap: 12px;
        text-align: center;
    }
    h1 {
        font-size: 64px;
        font-weight: 500;
        color: #1a1a1a;
    }
    p {
        font-size: 14px;
        color: #888780;
    }
</style>