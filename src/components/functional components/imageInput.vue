<script setup>
    import { ref, watch, defineEmits } from 'vue'
    import Image from '../UI components/Image.vue'

    const emit = defineEmits(['imageSelected'])

    const props = defineProps({
        size: { type: String, default: 'md' }, // sm | md | lg | xl | full

        initialUrl: { type: String, default: null }
    })

    const fileInput = ref(null)
    const previewUrl = ref(props.initialUrl)

    watch(() => props.initialUrl, (val) => {
        previewUrl.value = val
    })

    const openPicker = () => {
        fileInput.value.click()
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        previewUrl.value = url

        emit('imageSelected', { file, url })
    }
</script>

<template>
    <input
        ref="fileInput"
        type="file"
        class="d-none"
        accept="image/*"
        @change="handleImage"
    />

    <div
        :class="['image-picker',`image-picker--${size}`]"
        @click="openPicker"
    >
        <Image
            v-if="previewUrl"
            :src="previewUrl"
            :size="size === 'full' ? 'full' : 'md'"
        />

        <div v-else class="image-picker__placeholder">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
            </svg>

            <span v-if="size === 'xl' || size === 'full'">
                Aggiungi immagine
            </span>
        </div>
    </div>
</template>

<style scoped>
    /* BASE */
    .image-picker {
        border-radius: 8px;
        background: #f5f4f0;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.12s, border 0.12s;
    }

    .image-picker:hover {
        background: #ebe9e5;
    }

    /* SIZES */
    .image-picker--sm {
        width: 40px;
        height: 40px;
    }

    .image-picker--md {
        width: 48px;
        height: 48px;
    }

    .image-picker--lg {
        width: 80px;
        height: 80px;
    }

    .image-picker--xl {
        width: 120px;
        height: 120px;
    }

    /* FULL / COVER */
    .image-picker--full {
        width: 100%;
        min-height: 180px;
        height: 100%;
        border-radius: 10px;
        border: 0.5px dashed rgba(0,0,0,0.2);
        flex-direction: column;
        gap: 6px;
    }

    .image-picker--full:hover {
        border-color: rgba(0,0,0,0.35);
    }

    /* PLACEHOLDER */
    .image-picker__placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        color: #b4b2a9;
    }

    .image-picker__placeholder span {
        font-size: 11px;
    }

    /* IMAGE FIT */
    .image-picker img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>