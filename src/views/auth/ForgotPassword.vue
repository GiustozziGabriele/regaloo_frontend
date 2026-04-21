<script setup>
    import { reactive } from 'vue';
    import { useLoadingStore } from '@/stores/loadingStore';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import { push } from 'notivue';
    import GenericInput from './components/genericInput.vue';

    const loading = useLoadingStore()
    const auth = useAuthStore()
    const router = useRouter()

    const form = reactive({
        email: ''
    })

    const onSubmit = async() => {
        if(!form.email) {
            push.warning({
                title: 'Email mancante',
                message: 'Inserisci la tua email per continuare'
            })
            return
        }

        try {
            await auth.resetPassword(form.email)
            push.success({
                title: 'Email inviata',
                message: 'Controlla la tua casella di posta'
            })
            router.push({
                path: '/check-email',
                query: {
                    type: 'reset',
                    email: form.email
                }
            })

        } catch (err) {
            push.error({
                title: 'Errore',
                message: err || 'Qualcosa è andato storto'
            })
        }
    }
</script>

<template>
    <div class="container-custom">
        <h4 class="fw-bold text-center mb-3">PASSWORD DIMENTICATA</h4>

        <form @submit.prevent="onSubmit" class="d-flex flex-column">
            <GenericInput 
                :input-type="'email'" 
                :label="'Email'" 
                :placeholder="'Email'" 
                class="mb-3"
                v-model="form.email" 
            />

            <button 
                type="submit" 
                class="btn btn-success"
                :disabled="loading.loading"
            >
                {{ loading.loading ? 'Loading...' : 'Invia email di recupero' }}
            </button>
        </form>
    </div>
</template>