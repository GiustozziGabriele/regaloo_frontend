<!-- CreateWishlistModal.vue -->
<script setup>
    import { ref } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { uploadImage } from '@/lib/storage'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'
    import FormField from '@/components/functional components/formField.vue'

    const emit = defineEmits(['save'])
    const modal = useModalStore()

    const title = ref('')
    const imageFile = ref(null)

    const reset = () => {
        title.value = ''
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
            image_url,
            user_id: ''
        })

        modal.close()
        reset()
    }
</script>

<template>
    <BaseModal name="createWishlist" title="Crea wishlist" @close="reset">
        <div class="d-flex flex-row align-items-start gap-3">
            <ImageInput size="lg" @image-selected="catchImg" />

            <FormField v-model="title" label="Titolo" placeholder="Es. Libri da comprare" class="flex-grow-1"/>
        </div>

        <template #footer>
            <button
                class="btn-confirm"
                :disabled="!title"
                @click="submit"
            >
                Crea
            </button>
        </template>
    </BaseModal>
</template>