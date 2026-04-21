<script setup>
    import { useRoute } from 'vue-router'
    import { watch, computed, ref } from 'vue';
    import { useWishlistsStore } from '../stores/wishlistsStore';
    import { useWishlistItemsStore } from '../stores/wishlistItemsStore';
    import { useModalStore } from '@/stores/modalStore';
    import WishlistItemCard from '../componentes/WishlistItemCard.vue';
    import AddItemModal from '../componentes/AddItemModal.vue';
    import EditItemModal from '../componentes/EditItemModal.vue';

    const route = useRoute()
    const wishlists = useWishlistsStore()
    const items = useWishlistItemsStore()
    const modal = useModalStore()
    const search = ref('')

    const id = computed(() => route.params.id)
    const wishlist = computed(() => wishlists.getById(id.value))

    watch(wishlist, async (val) => {
        if (val && !items.itemsByWishlist[id.value]) {
            await items.fetchWishlistItems(id.value)
        }
    }, { immediate: true })

    const filteredItems = computed(() =>
        items.getItems(id.value).filter(item =>
            item.item_id?.title?.toLowerCase().includes(search.value.toLowerCase())
        )
    )

    const addItem = async(value) => {
        await items.addItem(value, id.value)
    }

    const updateItem = async(value) => {
        await items.updateItem(value.data, value.id, id.value)
    }

    const deleteItem = async(value) => {
        await items.removeItem(value?.item_id.id, id.value)
    }
</script>

<template>
    <div v-if="wishlist">
        <!-- header -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h4 style="font-size: 16px; font-weight: 500; margin: 0;">{{ wishlist.title }}</h4>

            <div class="d-flex gap-2">
                <button class="icon-btn" title="Condividi">
                    <i class="fi fi-br-share-square"></i>
                </button>
                <button class="icon-btn" title="Impostazioni">
                    <i class="fi fi-br-menu-dots-vertical"></i>
                </button>
            </div>
        </div>

        <!-- toolbar -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <button class="btn-action" @click="modal.open('addItem')">
                + Aggiungi articolo
            </button>

            <input
                v-model="search"
                type="search"
                class="search-input"
                placeholder="Cerca nella lista"
            />
        </div>

        <!-- griglia -->
        <div v-if="filteredItems.length" class="app-grid">
            <WishlistItemCard
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
                @delete="deleteItem"
            />
        </div>

        <div v-else class="empty-state">
            <p>{{ search ? 'Nessun articolo trovato.' : 'Nessun articolo nella lista. Aggiungine uno!' }}</p>
        </div>

        <AddItemModal @save="addItem" />
        <EditItemModal @save="updateItem" />
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