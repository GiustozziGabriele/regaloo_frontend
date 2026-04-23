<script setup>
    import { computed } from 'vue';
    import { getHostname } from '@/lib/utils';
    import Image from '@/components/UI components/Image.vue';
    import statusBadge from '@/components/micro components/statusBadge.vue';


    const props = defineProps({
        item: {
            type: Object,
            required: true
        },
        isOwner: {
            type: Boolean,
            default: true
        }
    })

    const tag = computed(() => props.item.item_id?.url ? 'a' : 'span')
    const isReserved = computed(() => props.item.status === 'reserved')
</script>

<template>
  <div class="base-card">
    <div class="card__img">
        <Image :src="item.item_id?.image_url" :size="'full'"/>

        <statusBadge :status="item?.status" class="card__badge" v-if="!isOwner"/>
    </div>

    <div class="card__body">
      <component
        :is="tag"
        :href="item.item_id?.url || undefined"
        target="_blank"
        class="card__title"
      >
        {{ item.item_id?.title || 'Titolo prodotto' }}
      </component>

      <p class="card__meta">{{ getHostname(item.item_id?.url) ?? '—' }}</p>

      <div class="card__footer">
        <span class="card__price">{{ item.item_id?.price }} €</span>

        <div v-if="!isOwner">
            <template v-if="isReserved">
                <span class="card__reserved-by">
                    {{ isOwner ? `da ${item.reserved_by_user_id}` : 'Già prenotato' }}
                </span>
            </template>
            <button v-else class="btn-action" @click="$emit('reserve', item)">
                Prenota
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .card__img {
        position: relative;
        background: #f5f4f0;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .card__img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 16px;
    }
    .card__badge { position: absolute; top: 8px; left: 8px; }
    .card__actions { position: absolute; top: 8px; right: 8px; display: flex; flex-direction: column; gap: 4px; }

    .card__body { padding: 12px; display: flex; flex-direction: column; justify-content: space-between; flex: 1; }

    .card__title {
        font-size: 13px;
        font-weight: 500;
        color: #1a1a1a;
        text-decoration: none;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2; 
        line-height: 1.45;
        height: calc(1.45em * 2); /* ← fisso, non min-height */
    }
    .card__meta { font-size: 11px; color: #888780; }

    .card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 10px;
        border-top: 0.5px solid rgba(0,0,0,0.08);
    }
    .card__price { font-size: 15px; font-weight: 500; }
</style>

