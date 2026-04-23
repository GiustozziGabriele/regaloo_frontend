<script setup>
    import { reactive } from 'vue';
    import { useLoadingStore } from '@/stores/loadingStore';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/stores/auth';
    import { push } from 'notivue';
    import PasswordInput from './components/passwordInput.vue';
    import GenericInput from './components/genericInput.vue';

    const loading = useLoadingStore()
    const router = useRouter()
    const auth = useAuthStore()

    const form = reactive({
        email: '',
        password: '',
        password_confirm: '',
        name: '',
        surname: ''
    })


    const onSubmit = async() => {
        if(!form.email || !form.password || !form.name || !form.surname) {
            push.warning({
                title: 'Ops 👀!',
                message: 'Inserisci tutti i dati per continuare!'
            })
            return
        }

        if(form.password !== form.password_confirm) {
            push.warning({
                title: 'Le password non coincidono',
                message: 'Inserisci tutti i dati per continuare!'
            })
            return
        }

        try {
            await auth.register(form.email, form.password, form.name, form.surname)
            push.success({
                title: 'Registrazione completata',
                message: 'Controlla la tua casella di posta'
            })
            router.push({
                path: '/check-email',
                query: {
                    type: 'register',
                    email: form.email
                }
            })

        } catch (err) {
            console.error(err)
            push.error({
                title: 'Registrazione fallita',
                message:'Qualcosa è andato storto'
            })
        }
    }
</script>

<template>
    <div class="container-custom">
        <h4 class="fw-bold text-center mb-3">REGISTRATI</h4>

        <form @submit.prevent="onSubmit" class="d-flex flex-column">
            <div class="d-flex flex-row w-100">
                <GenericInput 
                    :label="'Name'" 
                    :placeholder="'Nome'"
                    class="mb-3 me-1"
                    v-model="form.name" 
                />

                <GenericInput 
                    :label="'Surname'" 
                    :placeholder="'Cognome'" 
                    class="mb-3 ms-1"
                    v-model="form.surname" 
                />
            </div>

            <div>
                <GenericInput 
                    :input-type="'email'" 
                    :label="'Email'" 
                    :placeholder="'Email'" 
                    class="mb-3"
                    v-model="form.email" 
                />

                <PasswordInput 
                    v-model="form.password"
                    class="mb-3"
                />

                <PasswordInput 
                    v-model="form.password_confirm" 
                    :placeholder="'Conferma Password'"
                    class="mb-3"
                />
            </div>
            

            <p class="mb-3 text-secondary">Hai già un account? 
                <RouterLink to="/login" class="text-success text-decoration-none fw-semibold">Accedi</RouterLink>
            </p>

            <button 
                type="submit" 
                class="btn btn-success"
                :disabled="loading.loading"
            >
                {{ loading.loading ? 'Loading...' : 'Registrati' }}
            </button>
        </form>
    </div>
</template>