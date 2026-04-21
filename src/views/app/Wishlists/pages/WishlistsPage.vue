<script setup>
    import { onMounted } from 'vue';
    import { useWishlistsStore } from '../stores/wishlistsStore';
    import WishlistCard from '../componentes/WishlistCard.vue';

    const wishlists = useWishlistsStore()

    onMounted(async() => {
        await wishlists.fetchWishlists()
    })
</script>

<template>
    <div class="app-grid">
        <WishlistCard v-for="w in wishlists.wishlists" :wishlist="w" :key="w.id"/>
    </div>
</template>