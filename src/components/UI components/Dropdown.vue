<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    const isOpen = ref(false)
    const dropdownRef = ref(null)

    const toggle = () => {
        isOpen.value = !isOpen.value
    }

    const close = () => {
        isOpen.value = false
    }

    // chiusura click outside
    const handleClickOutside = (e) => {
        if (!dropdownRef.value?.contains(e.target)) {
            close()
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside)
    })
</script>

<template>
    <div class="dropdown-wrapper" ref="dropdownRef">
        
        <!-- trigger -->
        <div @click.stop="toggle">
            <slot name="trigger" />
        </div>

        <!-- menu -->
        <div v-if="isOpen" class="dropdown-menu-custom d-flex flex-column">
            <slot />
        </div>

    </div>
</template>

<style scoped>
    .dropdown-wrapper {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu-custom {
        position: absolute;
        top: 100%;
        right: 0;
        min-width: 160px;
        background: white;
        border-radius: 8px;
        border: 0.5px solid rgba(0,0,0,0.18);
        padding: 6px;
        z-index: 1000;
    }
</style>