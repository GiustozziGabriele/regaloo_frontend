<script setup>
    import { reactive } from 'vue';
    import { useLoadingStore } from '@/stores/loadingStore';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import { push } from 'notivue';
    import PasswordInput from './components/passwordInput.vue';

    const loading = useLoadingStore()
    const auth = useAuthStore()
    const router = useRouter()

    const form = reactive({
        password: '',
        password_confirm: ''
    })

    const onSubmit = async() => {
        if(!form.password || !form.password_confirm) {
            push.warning({
                title: 'Ops 👀!',
                message: 'Scegli le nuove password'
            })
            return
        }

        if(form.password !== form.password_confirm) {
            push.warning({
                title: 'Ops 👀!',
                message: 'Le password non coincidono'
            })
            return
        }

        try {
            await auth.updatePassword(form.password)
            push.success({
                title: 'Password aggiornata',
                message: 'Puoi accedere con la nuova password'
            })
            router.push('/login')

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
        <h4 class="fw-bold text-center mb-3">REIMPOSTA PASSWORD</h4>

        <form @submit.prevent="onSubmit" class="d-flex flex-column">
            <PasswordInput 
                v-model="form.password"
                class="mb-3"
            />

            <PasswordInput 
                v-model="form.password_confirm" 
                :placeholder="'Conferma Password'"
                class="mb-3"
            />

            <button 
                type="submit" 
                class="btn btn-success"
                :disabled="loading.loading"
            >
                {{ loading.loading ? 'Loading...' : 'Reimposta password' }}
            </button>
        </form>
    </div>
</template>