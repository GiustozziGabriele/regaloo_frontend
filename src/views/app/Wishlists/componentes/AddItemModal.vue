<!-- AddItemModal.vue -->
<script setup>
    import { ref } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { uploadImage } from '@/lib/storage'
    import { getHostname } from '@/lib/utils'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'

    const emit = defineEmits(['save'])
    const modal = useModalStore()

    const title = ref('')
    const url = ref('')
    const price = ref('')
    const imageFile = ref(null)

    const reset = () => {
        title.value = ''
        url.value = ''
        price.value = ''
        imageFile.value = null
    }

    const catchImg = ({ file }) => {
        imageFile.value = file
    }

    const submit = async () => {
        if (!title.value) return

        let image_url = null
        if (imageFile.value) {
            image_url = await uploadImage(imageFile.value, 'items')
        }

        emit('save', {
            title: title.value,
            url: url.value,
            price: Number(price.value),
            image_url,
        })

        modal.close()
        reset()
    }
</script>

<template>
  <BaseModal
    name="addItem"
    title="Aggiungi articolo"
    subtitle="Incolla un link oppure inserisci manualmente"
    @close="reset"
  >

    <div class="mb-3">
        <label class="form-label small text-muted">Nome articolo</label>
        <input v-model="title" type="text" class="form-control" placeholder="Es. iPhone 15" />
    </div>

    <div class="d-flex gap-3 mb-3">
        <div class="flex-grow-1">
            <label class="form-label small text-muted">Link prodotto</label>
            <input v-model="url" type="text" class="form-control" placeholder="https://amazon.it/..." />
        </div>
        <div>
            <label class="form-label small text-muted">Prezzo <span class="text-muted">(opzionale)</span></label>
            <div class="input-group">
                <input v-model="price" type="text" class="form-control" placeholder="0.00" />
                <span class="input-group-text">€</span>
            </div>
        </div>
    </div>

    <div v-if="title" class="preview-box p-2 rounded mb-1">
        <small class="text-muted">Anteprima</small>
        <div class="d-flex align-items-center gap-2 mt-1">
            <ImageInput @image-selected="catchImg" />
            <div class="d-flex justify-content-between align-items-start w-100">
                <div>
                    <p class="fw-semibold small mb-0 text-truncate">{{ title }}</p>
                    <small class="text-muted">{{ getHostname(url) ?? '—' }}</small>
                </div>
                <small class="fw-semibold text-nowrap">{{ price }} €</small>
            </div>
        </div>
    </div>

    <template #footer>
        <button class="btn-action" style="background:#1a1a1a; color:#fff;" :disabled="!title" @click="submit">
            Aggiungi
        </button>
    </template>

  </BaseModal>
</template>

<style scoped>
    .preview-box { background: #f5f4f0; }
</style>