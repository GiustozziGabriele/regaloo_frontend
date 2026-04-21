<script setup>
    import { onMounted } from 'vue';
    import { useWishlistsStore } from '../stores/wishlistsStore';
    import { useAuthStore } from '@/stores/auth';
    import WishlistCard from '../componentes/WishlistCard.vue';

    const wishlists = useWishlistsStore()
    const auth = useAuthStore()

    onMounted(async() => {
        console.log(auth.user)
        await wishlists.fetchWishlists()
    })
</script>

<template>
    <div class="app-grid">
        <WishlistCard v-for="w in wishlists.wishlists" :wishlist="w" :key="w.id"/>
    </div>
</template>