<script setup>
    import Image from '@/components/UI components/Image.vue';

    defineProps({
        wishlist: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="wishlist-card">

        <div class="wishlist-card__img">
            <Image :src="wishlist.image_url" size="full" />
        </div>

        <div class="wishlist-card__body">
            <p class="wishlist-card__title">{{ wishlist.title }}</p>
            <RouterLink class="wishlist-card__btn" :to="`/app/wishlists/${wishlist.id}`">
                Apri
            </RouterLink>
        </div>

    </div>
</template>

<style scoped>
    .wishlist-card {
        background: #fff;
        border: 0.5px solid rgba(0,0,0,0.12);
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: border-color 0.15s;
    }
    .wishlist-card:hover { border-color: rgba(0,0,0,0.25); }

    .wishlist-card__img {
        height: 160px;
        overflow: hidden;
        flex-shrink: 0;
    }

    .wishlist-card__body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        gap: 10px;
    }

    .wishlist-card__title {
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

    .wishlist-card__btn {
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
    .wishlist-card__btn:hover { background: #f5f4f0; }
</style>