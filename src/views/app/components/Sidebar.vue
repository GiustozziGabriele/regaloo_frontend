<!-- AppSidebar.vue -->
<script setup>
    import { RouterLink, useRoute } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    const route = useRoute()
    const auth = useAuthStore()

    const links = [
        { to: '/app/dashboard', label: 'Dashboard' },
        { to: '/app/wishlists', label: 'Wishlists' },
        { to: '/app/events',    label: 'Events' },
        { to: '/app/people',    label: 'People' },
    ]

    const isActive = (item) => route.path.startsWith(item.to)
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__brand">Regaloo</div>

        <nav class="sidebar__nav">
            <RouterLink
                v-for="item in links"
                :key="item.to"
                :to="item.to"
                class="sidebar__link"
                :class="{ 'sidebar__link--active': isActive(item) }"
            >
                {{ item.label }}
            </RouterLink>
        </nav>

        <RouterLink
            to="/app/profile"
            class="sidebar__link sidebar__profile"
            :class="{ 'sidebar__link--active': route.path.startsWith('/app/profile') }"
        >
            Profilo
        </RouterLink>
        <button class="btn-action text-danger" @click="auth.logout">
            Logout
        </button>
    </aside>

    <!-- BOTTOM BAR mobile -->
    <nav class="bottom-bar">
        <RouterLink
            v-for="item in links"
            :key="item.to"
            :to="item.to"
            class="bottom-bar__link"
            :class="{ 'bottom-bar__link--active': isActive(item) }"
        >
            {{ item.label }}
        </RouterLink>
        <RouterLink
            to="/app/profile"
            class="bottom-bar__link"
            :class="{ 'bottom-bar__link--active': route.path.startsWith('/app/profile') }"
        >
            Profilo
        </RouterLink>
        <button class="btn-action text-danger" @click="auth.logout">
            Logout
        </button>
    </nav>
</template>

<style scoped>
/* ── SIDEBAR (desktop) ── */
.sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 0.5px solid rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  gap: 4px;
  background: #fff;
}

.sidebar__brand {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  padding: 0 8px;
  margin-bottom: 1.5rem;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.sidebar__link {
  font-size: 13px;
  font-weight: 500;
  color: #5f5e5a;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background 0.12s, color 0.12s;
}
.sidebar__link:hover          { background: #f5f4f0; color: #1a1a1a; }
.sidebar__link--active        { background: #f5f4f0; color: #1a1a1a; }

.sidebar__profile {
  margin-top: auto;
  border-top: 0.5px solid rgba(0,0,0,0.08);
  padding-top: 12px;
  margin-top: 1rem;
}

/* ── BOTTOM BAR (mobile) ── */
.bottom-bar {
  display: none;
}

@media (max-width: 768px) {
  .sidebar   { display: none; }

  .bottom-bar {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 0.5px solid rgba(0,0,0,0.1);
    border-radius: 8px 8px 0 0;  
    padding: 8px 0;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
    z-index: 100;
  }

  .bottom-bar__link {
    flex: 1;
    text-align: center;
    font-size: 11px;
    font-weight: 500;
    color: #888780;
    text-decoration: none;
    padding: 6px 4px;
    transition: color 0.12s;
  }
  .bottom-bar__link--active { color: #1a1a1a; }

  .app-main {
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
}
</style>