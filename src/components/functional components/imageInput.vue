<script setup>
    import { ref, defineEmits } from 'vue'
    import Image from '../UI components/Image.vue'

    const emit = defineEmits(['imageSelected'])

    const fileInput = ref(null)
    const previewUrl = ref(null)

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
    <!-- input nascosto -->
    <input
        ref="fileInput"
        type="file"
        class="d-none"
        accept="image/*"
        @change="handleImage"
    />

    <!-- UI cliccabile -->
    <div class="image-picker flex-shrink-0" @click="openPicker">

        <!-- preview -->
        <Image v-if="previewUrl" :src="previewUrl"/>

        <!-- placeholder -->
        <div v-else>
            <i class="fi fi-br-plus"></i>
        </div>
    </div>
</template>

<style scoped>
    .image-picker {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        background: #dee2e6;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-picker img {
        object-fit: cover;
    }

    .placeholder {
        font-size: 20px;
        color: #6c757d;
    }
</style>