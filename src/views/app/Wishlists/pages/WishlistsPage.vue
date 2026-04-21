<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useWishlistsStore } from '../stores/wishlistsStore';
    import { useAuthStore } from '@/stores/auth';
    import { useModalStore } from '@/stores/modalStore';
    import WishlistCard from '../componentes/WishlistCard.vue';
import CreateWishlistModal from '../componentes/CreateWishlistModal.vue';

    const wishlists = useWishlistsStore()
    const modal = useModalStore()

    
    const search = ref('')

    onMounted(async() => {
        await wishlists.fetchWishlists()
    })

    const filteredWishlists = computed(() =>
        wishlists.wishlists.filter(wishlist => wishlist?.title.toLowerCase().includes(search.value.toLowerCase()))
    )
</script>

<template>
    <div>
        <!-- toolbar -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <button class="btn-action" @click="modal.open('createWishlist')">
                + Crea nuova wishlist
            </button>

            <input
                v-model="search"
                type="search"
                class="search-input"
                placeholder="Cerca lista"
            />
        </div>

        <!-- griglia -->
        <div v-if="filteredWishlists.length" class="app-grid">
            <WishlistCard v-for="w in filteredWishlists" :wishlist="w" :key="w.id"/>
        </div>

        <CreateWishlistModal />
    </div>
</template>