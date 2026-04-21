<script setup>
    import { computed } from 'vue'
    const props = defineProps({
    status: {
        type: String,
        required: true,
        validator: v => ['hidden', 'available', 'reserved', 'purchased', 'delivered', 'archived'].includes(v)
    }
    })

    const config = {
        hidden: { label: 'Nascosto', class: 'badge--hidden' },
        available: { label: 'Disponibile', class: 'badge--available' },
        reserved: { label: 'Riservato', class: 'badge--reserved' },
        purchased: { label: 'Acquistato', class: 'badge--purchased' },
        delivered: { label: 'Spedito', class: 'badge--delivered' },
        archived: { label: 'Archiviato', class: 'badge--archived' }
    }

    const label = computed(() => config[props.status].label)
    const statusClass = computed(() => config[props.status].class)
</script>

<template>
  <span class="badge" :class="statusClass">
    {{ label }}
  </span>
</template>