<!-- AddItemModal.vue -->
<script setup>
    import { ref } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { uploadImage } from '@/lib/storage'
    import { getHostname } from '@/lib/utils'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'
import FormField from '@/components/functional components/formField.vue'

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

        <div class="d-flex flex-row align-items-center gap-3 mb-2">
            <ImageInput @image-selected="catchImg" variant="cover"/>

            <div class="d-flex flex-column flex-grow-1">
                <FormField v-model="title" label="Nome articolo" placeholder="Es. iPhone 15" class="flex-grow-1" />
                <FormField v-model="price" label="Prezzo" placeholder="0.00" class="flex-grow-1" />
            </div>  
        </div>
        
        <FormField v-model="url" label="Link prodotto" placeholder="https://amazon.it/..." />

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