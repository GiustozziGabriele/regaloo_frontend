<script setup>
    import { onMounted } from 'vue';
    import { useProfileStore } from './stores/profileStore';

    const profileStore = useProfileStore()
    const profile = {}


    onMounted(async() => {
        await profileStore.fetchProfile()
    })
</script>

<template>
    {{ profileStore.profile }}
</template>