<script setup>
    import { useLoadingStore } from '@/stores/loadingStore';
    const loading = useLoadingStore()
</script>

<template>
    <transition name="fade">
        <div v-if="loading.loading" class="global-loader">
            <div class="spinner-border text-primary" role="status"></div>
        </div>
    </transition>
</template>
