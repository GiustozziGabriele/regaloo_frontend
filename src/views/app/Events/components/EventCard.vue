<script setup>
    import Image from '@/components/UI components/Image.vue';
    import { eventTypeMap } from '@/lib/eventTypes';

    const props = defineProps({
        event: {
            type: Object,
            required: true
        }
    })

    const placeholderIcon = computed(() => eventTypeMap[props.event.type]?.icon ?? '🎁')
    const placeholderBg   = computed(() => eventTypeMap[props.event.type]?.bg   ?? '#f5f4f0')
</script>

<template>
    <div class="event-card">

        <div class="event-card__img">
            <div
                v-if="!event.image_url"
                class="event-card__placeholder"
                :style="{ background: placeholderBg }"
            >
                <span>{{ placeholderIcon }}</span>
            </div>
            <Image :src="event.image_url" size="full" />
        </div>

        <div class="event-card__body">
            <p class="event-card__title">{{ event.title }}</p>
            <RouterLink class="event-card__btn" :to="`/app/events/${event.id}`">
                Apri
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
    .event-card {
        background: #fff;
        border: 0.5px solid rgba(0,0,0,0.12);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: border-color 0.15s;
    }
    .event-card:hover { border-color: rgba(0,0,0,0.25); }

    .event-card__img {
        height: 160px;
        overflow: hidden;
        flex-shrink: 0;
    }

    .event-card__body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        gap: 10px;
    }

    .event-card__title {
        font-size: 13px;
        font-weight: 500;
        color: #1a1a1a;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        line-height: 1.45;
        height: calc(1.45em * 2);
        margin: 0;
    }

    .event-card__btn {
        display: block;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        padding: 6px 12px;
        border-radius: 8px;
        border: 0.5px solid rgba(0,0,0,0.18);
        background: transparent;
        color: #1a1a1a;
        text-decoration: none;
        transition: background 0.12s;
    }
    .event-card__btn:hover { background: #f5f4f0; }

    .event-card__placeholder {
        width: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
    }
</style>