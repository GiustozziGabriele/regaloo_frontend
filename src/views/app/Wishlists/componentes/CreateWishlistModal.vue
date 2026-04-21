<!-- CreateWishlistModal.vue -->
<script setup>
    import { ref } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { uploadImage } from '@/lib/storage'
    import { getHostname } from '@/lib/utils'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'
import Image from '@/components/UI components/Image.vue'
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
    <BaseModal name="createWishlist" title="Crea wishlist" @close="reset">
        <div class="d-flex flex-row align-items-start gap-3">
            <ImageInput variant="cover" @image-selected="catchImg" />

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

<style scoped>
    .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .field label {
        font-size: 11px;
        color: #888780;
    }
    .field input {
        font-size: 13px;
        padding: 7px 10px;
        border-radius: 8px;
        border: 0.5px solid rgba(0,0,0,0.15);
        outline: none;
        color: #1a1a1a;
        transition: border-color 0.12s;
    }
    .field input:focus { border-color: rgba(0,0,0,0.35); }
    .field input::placeholder { color: #b4b2a9; }

    .btn-confirm {
        font-size: 12px;
        font-weight: 500;
        padding: 6px 14px;
        border-radius: 8px;
        border: none;
        background: #1a1a1a;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.12s;
    }
    .btn-confirm:disabled { opacity: 0.4; cursor: not-allowed; }
</style>