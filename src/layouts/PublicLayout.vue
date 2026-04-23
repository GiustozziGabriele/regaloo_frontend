<script setup>
    import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-layout">
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
  .app-layout {
    display: flex;
    min-height: 100vh;
  }

  .app-main {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }
</style>

<style>
  /* AppLayout.vue — non scoped */
  @media (max-width: 768px) {
    .app-main {
      padding-bottom: calc(60px + env(safe-area-inset-bottom));
    }
  }
</style>