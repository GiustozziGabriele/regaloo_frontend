<!-- BaseModal.vue -->
<script setup>
    import { ref, watch, onMounted } from 'vue'
    import * as bootstrap from 'bootstrap'
    import { useModalStore } from '@/stores/modalStore'

    const props = defineProps({
        name:  { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, default: null },
    })

    const emit = defineEmits(['submit', 'close'])

    const modal = useModalStore()
    const modalRef = ref(null)
    let instance = null

    onMounted(() => {
        instance = new bootstrap.Modal(modalRef.value)

        modalRef.value.addEventListener('hide.bs.modal', () => {
            document.activeElement?.blur()
        })

        modalRef.value.addEventListener('hidden.bs.modal', () => {
            modal.close()
            emit('close')
        })
    })

    watch(() => modal.current, (name) => {
        if (name === props.name) instance.show()
        else instance.hide()
    })
</script>

<template>
    <div class="modal fade" tabindex="-1" ref="modalRef">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h5 class="modal-title">{{ title }}</h5>
                        <small v-if="subtitle" class="modal-subtitle">{{ subtitle }}</small>
                    </div>
                    <button class="close-btn" @click="modal.close()">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M1 1l10 10M11 1L1 11"/>
                        </svg>
                    </button>
                </div>

                <div class="modal-body">
                    <slot />
                </div>

                <div class="modal-footer">
                    <button class="btn-action" @click="modal.close()">Annulla</button>
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-content {
        border-radius: 16px;
        border: 0.5px solid rgba(0,0,0,0.1);
        padding: 0;
        overflow: hidden;
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 0;
        border: none;
    }
    .modal-title {
        font-size: 15px;
        font-weight: 500;
        margin: 0;
    }
    .modal-subtitle {
        font-size: 12px;
        color: #888780;
    }
    .close-btn {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        border: 0.5px solid rgba(0,0,0,0.15);
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #5f5e5a;
        flex-shrink: 0;
        transition: background 0.12s, color 0.12s;
    }
    .close-btn:hover { background: #f5f4f0; color: #1a1a1a; }

    .modal-body  { padding: 16px; }
    .modal-footer {
        padding: 0 16px 16px;
        border: none;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
    }
</style>