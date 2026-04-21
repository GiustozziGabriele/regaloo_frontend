<script setup>
    import { reactive } from 'vue';
    import { useLoadingStore } from '@/stores/loadingStore';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import { RouterLink } from 'vue-router';
    import { push } from 'notivue';
    import PasswordInput from './components/passwordInput.vue';
    import GenericInput from './components/genericInput.vue';

    const loading = useLoadingStore()
    const auth = useAuthStore()
    const router = useRouter()

    const form = reactive({
        email: '',
        password: '',
    })

    const onSubmit = async() => {
        if(!form.email || !form.password) {
            push.warning({
                title: 'Ops 👀!',
                message: 'Devi inserire email e password per continuare'
            })
            return
        }

        try {
            await auth.login(form.email, form.password)
            push.success({
                title: 'Accesso effettuato',
                message: 'Bentornato!'
            })
            router.push('/app')

        } catch (err) {
            push.error({
                title: 'Login fallito',
                message: 'Controlla le credenziali'
            })
        }
    }
</script>

<template>
    <div class="container-custom">
        <h4 class="fw-bold text-center mb-3">BENTORNATO</h4>

        <form @submit.prevent="onSubmit" class="d-flex flex-column">
            <div class="w-100">
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
            </div>

            <p class=" text-secondary">Non hai ancora un account? 
                <RouterLink to="/register" class="text-success text-decoration-none fw-semibold">Registrati</RouterLink>
            </p>

            <p class="mb-3 text-secondary">Password dimenticata?
                <RouterLink to="/register" class="text-success text-decoration-none fw-semibold">Reimpostala!</RouterLink>
            </p>

            <button 
                type="submit" 
                class="btn btn-success"
                :disabled="loading.loading"
            >
                {{ loading.loading ? 'Loading...' : 'Accedi' }}
            </button>
        </form>
    </div>
</template>