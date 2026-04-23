<!-- CreateWishlistModal.vue -->
<script setup>
    import { ref } from 'vue'
    import { useModalStore } from '@/stores/modalStore'
    import { useAuthStore } from '@/stores/auth'
    import { uploadImage } from '@/lib/storage'
    import { eventTypeMap, eventTypes } from '@/lib/eventTypes'
    import BaseModal from '@/components/UI components/BaseModal.vue'
    import ImageInput from '@/components/functional components/imageInput.vue'
    import FormField from '@/components/functional components/formField.vue'

    const emit = defineEmits(['save'])
    const modal = useModalStore()
    const auth = useAuthStore()

    const title = ref('')
    const date = ref('')
    const imageFile = ref(null)
    const selected = ref(null)

    const year = new Date().getFullYear()

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

    const selectType = (type) => {
        selected.value = type.value
        
        const config = eventTypeMap[type.value]
        title.value = config.defaultTitle(year)
        date.value  = config.defaultDate(year, auth.user)
    }
</script>

<template>
    <BaseModal name="createEvent" title="Crea evento" @close="reset">
        <div class="d-flex flex-row align-items-start gap-3">
            <ImageInput size="xl" @image-selected="catchImg" />

            <div class="d-flex flex-column gap-2 flex-grow-1">
                <div class="event-types">
                    <button
                        v-for="type in eventTypes"
                        :key="type.value"
                        :class="['event-type', { 'event-type--active': selected === type.value }]"
                        @click="selectType(type)"
                    >
                        <span class="event-type__icon">{{ type.icon }}</span>
                        <span class="event-type__label">{{ type.label }}</span>
                    </button>
                </div>
                <FormField v-model="title" label="Nome dell'evento" placeholder="Natale 2026" class="flex-grow-1"/>
                <FormField v-model="date" label="Data dell'evento" placeholder="24/04/2026"/>
            </div>
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
    .event-types {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 8px;
    }

    .event-type {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 12px 8px;
        border-radius: 10px;
        border: 0.5px solid rgba(0,0,0,0.12);
        background: transparent;
        cursor: pointer;
        transition: background 0.12s, border-color 0.12s;
    }
    .event-type:hover { background: #f5f4f0; }
    .event-type--active {
        background: #EAF3DE;
        border-color: #97C459;
    }

    .event-type__icon  { font-size: 20px; line-height: 1; }
    .event-type__label { font-size: 11px; font-weight: 500; color: #1a1a1a; }
</style>