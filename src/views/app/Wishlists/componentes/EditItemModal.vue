<!-- EditItemModal.vue -->
<script setup>
    import { ref, watch } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import BaseModal from '@/components/UI components/BaseModal.vue'

    const emit = defineEmits(['save'])
    const modal = useModalStore()

    const id = ref('')
    const title = ref('')
    const url = ref('')
    const price = ref('')

    // pre-popola quando il modal si apre con i dati dell'item
    watch(() => modal.props, (payload) => {
        if (!payload) return
        id.value = payload.item_id?.id
        title.value = payload.item_id?.title || ''
        url.value = payload.item_id?.url || ''
        price.value = payload.item_id?.price || ''
    })

    const submit = () => {
        if (!title.value) return
        emit('save', {data:{ title: title.value, url: url.value, price: Number(price.value) }, id: id.value})
        modal.close()
    }

    const reset = () => {
        title.value = ''
        url.value = ''
        price.value = ''
    }
</script>

<template>
    <BaseModal name="editItem" title="Modifica articolo" @close="reset">
        <div class="mb-3">
            <label class="form-label small text-muted">Nome articolo</label>
            <input v-model="title" type="text" class="form-control" />
        </div>

        <div class="d-flex gap-3 mb-3">
            <div class="flex-grow-1">
                <label class="form-label small text-muted">Link prodotto</label>
                <input v-model="url" type="text" class="form-control" />
            </div>
            <div>
                <label class="form-label small text-muted">Prezzo</label>
                <div class="input-group">
                <input v-model="price" type="text" class="form-control" />
                <span class="input-group-text">€</span>
                </div>
            </div>
        </div>

        <template #footer>
            <button class="btn-action" style="background:#1a1a1a; color:#fff;" :disabled="!title" @click="submit">
                Salva
            </button>
        </template>
    </BaseModal>
</template>