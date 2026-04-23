<script setup>
    import { useRoute } from 'vue-router'
    import { watch, computed, ref, onMounted } from 'vue';
    import { usePublicWishlistStore } from './publicWishlistStore';
    import ItemPublicCard from '@/components/UI components/ItemPublicCard.vue';


    const route = useRoute()
    const publicWishlistStore = usePublicWishlistStore()
    const search = ref('')

    const id = computed(() => route.params.id)

    onMounted(async() => {
        try {
            await publicWishlistStore.fetchWishlistItems(id.value) 
        } catch (error) {
            console.error(error)
        }
    })

    const filteredItems = computed(() =>
        publicWishlistStore.getItems(id.value).filter(item =>
            item.item_id?.title?.toLowerCase().includes(search.value.toLowerCase())
        )
    )
</script>

<template>
    <div v-if="publicWishlistStore.wishilistItems[id]">
        <!-- header -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h4 style="font-size: 16px; font-weight: 500; margin: 0;">{{ publicWishlistStore.wishilistItems[id][0]?.wishlist_id.title }}</h4>
        </div>

        <!-- toolbar -->
        <div class="d-flex align-items-center justify-content-end mb-3">
            <input
                v-model="search"
                type="search"
                class="search-input"
                placeholder="Cerca nella lista"
            />
        </div>

        <!-- griglia -->
        <div v-if="filteredItems.length" class="app-grid">
            <ItemPublicCard 
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
                :show-details="publicWishlistStore.showDetails"
            />
        </div>

        <div v-else class="empty-state">
            <p>{{ search ? 'Nessun articolo trovato.' : 'Nessun articolo nella lista. Aggiungine uno!' }}</p>
        </div>
    </div>
</template>

<style scoped>
    .empty-state {
        text-align: center;
        padding: 3rem 0;
        color: #888780;
        font-size: 13px;
    }
</style>