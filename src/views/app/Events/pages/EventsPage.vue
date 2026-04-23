<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useModalStore } from '@/stores/modalStore';
    import { useEventsStore } from '../stores/eventsStore';
    import EventCard from '../components/EventCard.vue';
    import CreateEventModal from '../components/CreateEventModal.vue';


    const events = useEventsStore()
    const modal = useModalStore()

    const search = ref('')

    onMounted(async() => {
        await events.fetchEvents()
    })

    const filteredEvents = computed(() =>
        events.events.filter(wishlist => wishlist?.title.toLowerCase().includes(search.value.toLowerCase()))
    )

    const createEvent = async(value) => {
        await wishlists.createWishlist(value)
    }
</script>

<template>
    <div>
        <!-- toolbar -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            <button class="btn-action" @click="modal.open('createEvent')">
                + Crea nuovo evento
            </button>

            <input
                v-model="search"
                type="search"
                class="search-input"
                placeholder="Cerca lista"
            />
        </div>

        <!-- griglia -->
        <div v-if="filteredEvents.length" class="app-grid">
            <EventCard v-for="e in filteredEvents" :event="e" :key="e.id"/>
        </div>

        <div v-else class="empty-state">
            <p>{{ search ? 'Nessun evento trovato.' : 'Nessun evento nella lista. Creane uno!' }}</p>
        </div>

        <CreateEventModal @save="createEvent" />
    </div>
</template>