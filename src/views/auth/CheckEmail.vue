<script setup>
    import { ref } from 'vue'
    import { useRoute } from 'vue-router'
    import { push } from 'notivue'
    import { useAuthStore } from '@/stores/auth'
    
    const route = useRoute()
    const auth = useAuthStore()
    const canResend = ref(true)
    const timer = ref(0)

    const email = route.query.email
    const type = route.query.type

    const messages = {
        register: {
            title: 'Controlla la tua email 📩',
            text: 'Ti abbiamo inviato un link per attivare il tuo account a'
        },
        reset: {
            title: 'Controlla la tua email 🔑',
            text: 'Ti abbiamo inviato un link per reimpostare la password a'
        }
    }

    const resendEmail = async() => {
        if (!canResend.value) return

        canResend.value = false
        timer.value = 30

        const interval = setInterval(() => {
            timer.value--
            if (timer.value <= 0) {
                clearInterval(interval)
                canResend.value = true
            }

        }, 1000)

        try {
            await auth.resendEmail(email)
            push.success({
                title: 'Email inviata',
                message: 'Controlla la tua casella di posta'
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
    <div class="container-custom text-center">
        <h3 class="mb-3">{{ messages[type]?.title }}</h3>

        <p class="text-muted">
            {{ messages[type]?.text }} <strong>{{ email }}</strong>
        </p>

        <div class="alert alert-success mt-4">
            Se non trovi l’email, controlla anche la cartella spam.
        </div>

        <button class="btn btn-outline-success mt-3" @click="resendEmail" :disabled="!canResend">
            {{ canResend ? 'Reinvia email' : `Attendi ${timer}s` }}
        </button>

        <div class="mt-4">
            <p>Hai già attivato l’account?
                <RouterLink to="/login" class="text-success text-decoration-none fw-semibold">Accedi</RouterLink>
            </p>
            
        </div>
    </div>
</template>