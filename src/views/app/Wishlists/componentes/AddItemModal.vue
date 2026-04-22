<!-- AddItemModal.vue -->
<script setup>
    import { ref, watch } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { useWishlistItemsStore } from '../stores/wishlistItemsStore'
    import { uploadImage } from '@/lib/storage'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'
    import FormField from '@/components/functional components/formField.vue'

    const emit = defineEmits(['save', 'save-items'])
    const props = defineProps({
        wishlistId: { type: String, required: true }
    })

    const modal = useModalStore()
    const items = useWishlistItemsStore()

    const activeTab = ref('create')
    const selectedItems = ref([])

    const title = ref('')
    const url = ref('')
    const price = ref('')
    const imageFile = ref(null)

    const reset = () => {
        title.value = ''
        url.value = ''
        price.value = ''
        imageFile.value = null
        selectedItems.value = []
    }

    const catchImg = ({ file }) => {
        imageFile.value = file
    }

    const submit = async () => {
        if (activeTab.value === 'create') {
            if (!title.value) return
            let image_url = null
            if (imageFile.value) image_url = await uploadImage(imageFile.value, 'items')
            emit('save', { title: title.value, url: url.value, price: Number(price.value), image_url })

        } else {
            if (!selectedItems.value.length) return
            emit('save-items', selectedItems.value)
        }
        modal.close()
        reset()
    }

    watch(activeTab, async(val) => {
        if(val === 'existing') {
            await items.fetchAvailableItems(props.wishlistId)
        }
    })
</script>

<template>
  <BaseModal
    name="addItem"
    title="Aggiungi articoli"
    @close="reset"
  >
    <!-- tabs -->
    <div class="tabs">
      <button :class="['tab', { 'tab--active': activeTab === 'create' }]" @click="activeTab = 'create'">Nuovo</button>
      <button :class="['tab', { 'tab--active': activeTab === 'existing' }]" @click="activeTab = 'existing'">I tuoi articoli</button>
    </div>

    <!-- tab: nuovo -->
    <div v-if="activeTab === 'create'" class="d-flex flex-column gap-3">
      <div class="d-flex gap-3 align-items-center">
        <ImageInput @image-selected="catchImg" size="xl"/>
        <div class="d-flex flex-column gap-1 flex-grow-1">
          <FormField v-model="title" label="Nome articolo" placeholder="Es. iPhone 15" />
          <FormField v-model="price" label="Prezzo" placeholder="0.00" />
        </div>
      </div>
      <FormField v-model="url" label="Link prodotto" placeholder="https://amazon.it/..." />
    </div>

    <!-- tab: esistenti -->
    <div v-else class="available-list">
      <div v-if="!items.availableItems.length" class="empty-state">
        Nessun articolo disponibile.
      </div>

      <label
        v-for="item in items.availableItems"
        :key="item.id"
        class="available-item"
        :class="{ 'available-item--selected': selectedItems.find(i => i.id === item.id) }"
      >
        <img v-if="item.image_url" :src="item.image_url" class="available-item__img" />
        <div v-else class="available-item__img available-item__img--placeholder" />

        <div class="available-item__info">
          <p class="available-item__title">{{ item.title }}</p>
          <p class="available-item__price">{{ item.price }} €</p>
        </div>

        <input type="checkbox" :value="item.id" v-model="selectedItems" class="available-item__check" />
      </label>
    </div>

    <template #footer>
      <button
        class="btn-confirm"
        :disabled="activeTab === 'create' ? !title : !selectedItems.length"
        @click="submit"
      >
        {{ activeTab === 'create' ? 'Aggiungi' : `Aggiungi (${selectedItems.length})` }}
      </button>
    </template>
  </BaseModal>
</template>

<style scoped>
    .tabs {
        display: flex;
        gap: 4px;
        margin-bottom: 16px;
        border-bottom: 0.5px solid rgba(0,0,0,0.08);
        padding-bottom: 8px;
    }
    .tab {
        font-size: 12px;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 8px;
        border: none;
        background: transparent;
        color: #888780;
        cursor: pointer;
        transition: background 0.12s, color 0.12s;
    }
    .tab:hover { background: #f5f4f0; color: #1a1a1a; }
    .tab--active { background: #f5f4f0; color: #1a1a1a; }

    .available-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: 280px;
        overflow-y: auto;
    }
    .available-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 8px;
        border: 0.5px solid transparent;
        cursor: pointer;
        transition: background 0.12s, border-color 0.12s;
    }
    .available-item:hover { background: #f5f4f0; }
    .available-item--selected { background: #EAF3DE; border-color: #97C459; }

    .available-item__img {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        object-fit: contain;
        background: #f5f4f0;
        flex-shrink: 0;
    }
    .available-item__img--placeholder { background: #e9e8e4; }

    .available-item__info {
        flex: 1;
        overflow: hidden;
    }
    .available-item__title {
        font-size: 13px;
        font-weight: 500;
        color: #1a1a1a;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
    }
    .available-item__price {
        font-size: 11px;
        color: #888780;
        margin: 0;
    }

    .available-item__check {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .empty-state {
        text-align: center;
        padding: 2rem 0;
        font-size: 13px;
        color: #888780;
    }
</style>