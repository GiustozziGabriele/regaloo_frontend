<script setup>
    import { RouterView, useRoute } from 'vue-router';
    import { Notivue, Notification } from 'notivue'
    import Loading from './components/micro components/loading.vue';
</script>

<template>
  <!-- TOAST GLOBALI -->
  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>

  <!-- LOADING GLOBALE -->
  <Loading />

  <!-- ROUTER -->
  <RouterView />
</template>
