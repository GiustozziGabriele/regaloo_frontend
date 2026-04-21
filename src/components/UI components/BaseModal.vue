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
            <div class="modal-content p-2">

                <div class="modal-header border-0">
                    <div>
                        <h5 class="mb-0" style="font-size: 15px; font-weight: 500;">{{ title }}</h5>
                        <small v-if="subtitle" class="text-muted">{{ subtitle }}</small>
                    </div>
                    <button class="btn-close" @click="modal.close()" />
                </div>

                <div class="modal-body">
                    <slot />
                </div>

                <div class="modal-footer border-0">
                    <button class="btn-action" @click="modal.close()">Annulla</button>
                    <slot name="footer" />
                </div>

            </div>
        </div>
    </div>
</template>