<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { watch, computed, ref } from 'vue';
    import { useWishlistsStore } from '../stores/wishlistsStore';
    import { useWishlistItemsStore } from '../stores/wishlistItemsStore';
    import { useModalStore } from '@/stores/modalStore';
    import { shareWishlist } from '@/lib/utils';
    import ItemCardPrivate from '@/components/UI components/ItemCardPrivate.vue';
    import AddItemModal from '../componentes/AddItemModal.vue';
    import EditItemModal from '../componentes/EditItemModal.vue';
    import Dropdown from '@/components/UI components/Dropdown.vue';



    const route = useRoute()
    const router = useRouter()
    const wishlists = useWishlistsStore()
    const items = useWishlistItemsStore()
    const modal = useModalStore()
    const search = ref('')

    const id = computed(() => route.params.id)
    const wishlist = computed(() => wishlists.getById(id.value))

    watch(wishlist, async(val) => {
        if (val && !items.itemsByWishlist[id.value]) {
            await items.fetchWishlistItems(id.value)
        }
    }, { immediate: true })

    const filteredItems = computed(() =>
        items.getItems(id.value).filter(item =>
            item.item_id?.title?.toLowerCase().includes(search.value.toLowerCase())
        )
    )

    const addItem = async(value) => await items.addItem(value, id.value)
    const updateItem = async(value) => await items.updateItem(value.data, value.id, id.value)
    const deleteItem = async(value) => await items.removeItem(value?.item_id.id, id.value)

    const addItems = async(value) => await items.addAvailableItems(value, id.value)

    const deleteWIshlist = async() => {
        const res = await wishlists.deleteWishlist(id.value)
        if(res) router.push('/app/wishlists')
    }

    const share = async() => await shareWishlist(id.value, wishlist.value.title)
</script>

<template>
    <div v-if="wishlist">
        <!-- header -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <h4 style="font-size: 16px; font-weight: 500; margin: 0;">{{ wishlist.title }}</h4>

            <div class="d-flex gap-2">
                <button class="icon-btn" title="Condividi" @click="share">
                    <i class="fi fi-br-share-square"></i>
                </button>

                <Dropdown>
                    <template #trigger>
                        <button class="icon-btn" title="Impostazioni">
                            <i class="fi fi-br-menu-dots-vertical"></i>
                        </button>
                    </template>

                    <button class="btn-action">
                        Modifica
                    </button>

                    <button class="btn-action text-danger" @click="deleteWIshlist">
                        Elimina
                    </button>
                </Dropdown>
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
            <ItemCardPrivate 
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
                @delete="deleteItem"
            />
        </div>

        <div v-else class="empty-state">
            <p>{{ search ? 'Nessun articolo trovato.' : 'Nessun articolo nella lista. Aggiungine uno!' }}</p>
        </div>

        <AddItemModal :wishlist-id="id" @save="addItem" @save-items="addItems" />
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