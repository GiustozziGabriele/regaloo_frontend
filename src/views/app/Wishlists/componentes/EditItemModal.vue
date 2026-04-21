<!-- EditItemModal.vue -->
<script setup>
    import { ref, watch } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { uploadImage } from '@/lib/storage'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import FormField from '@/components/functional components/formField.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'

    const emit = defineEmits(['save'])
    const modal = useModalStore()

    const id = ref('')
    const title = ref('')
    const url = ref('')
    const price = ref('')
    const image_url = ref('')

    const imageFile = ref(null)

    // pre-popola quando il modal si apre con i dati dell'item
    watch(() => modal.props, (payload) => {
        if (!payload) return
        id.value = payload.item_id?.id
        title.value = payload.item_id?.title || ''
        url.value = payload.item_id?.url || ''
        price.value = payload.item_id?.price.toString() || ''
        image_url.value = payload.item_id?.image_url || ''
    })

    const submit = async() => {
        if (!title.value) return
        if (imageFile.value) {
            image_url.value = await uploadImage(imageFile.value, 'items')
        }

        emit('save', {data:{ title: title.value, url: url.value, price: Number(price.value), image_url: image_url.value }, id: id.value})
        modal.close()
    }

    const reset = () => {
        id.value = ''
        title.value = ''
        url.value = ''
        price.value = ''
        image_url.value = ''
        imageFile.value = null
    }

    const catchImg = ({ file }) => {
        imageFile.value = file
    }
</script>

<template>
    <BaseModal name="editItem" title="Modifica articolo" @close="reset">
        <div class="d-flex flex-row align-items-center gap-3 mb-2">
            <ImageInput variant="cover" :initial-url="image_url" @image-selected="catchImg" />

            <div class="d-flex flex-column flex-grow-1">
                <FormField v-model="title" label="Nome articolo" placeholder="Es. iPhone 15" class="flex-grow-1" />
                <FormField v-model="price" label="Prezzo" placeholder="0.00" class="flex-grow-1" />
            </div>  
        </div>
        
        <FormField v-model="url" label="Link prodotto" placeholder="https://amazon.it/..." />

        <template #footer>
            <button class="btn-action" style="background:#1a1a1a; color:#fff;" :disabled="!title" @click="submit">
                Salva
            </button>
        </template>
    </BaseModal>
</template>