<script setup>
    const props = defineProps({
        src: String,
        size: {
            type: String,
            default: 'md' // sm | md | lg | xl | full
        }
    })

    
    const fallbackImage = `https://picsum.photos/400/300?random=${Math.random()}`
    const sizeClass = {
        sm: 'img-sm',
        md: 'img-md',
        lg: 'img-lg',
        xl: 'img-xl',
        full: 'img-full',
    }[props.size]
</script>

<template>
  <div :class="['img-box', sizeClass]">
    <img :src="src || fallbackImage" />
  </div>
</template>

<style scoped>
    .img-box {
        overflow: hidden;
        border-radius: 10px;
        background: #dee2e6;
        flex-shrink: 0;
    }

    .img-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* VARIANTI UNIFICATE */
    .img-sm { width: 48px; height: 48px; }
    .img-md { width: 80px; height: 80px; }
    .img-lg { width: 160px; height: 160px; }
    .img-xl { width: 100%; height: 180px; }
    .img-full { width: 100%;  height: 100%; border-radius: 0; }
</style>