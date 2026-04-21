<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        placeholder: {
            type: String,
            default: 'Password'
        }
    })

    const password = defineModel()
    const show = ref(false)

</script>

<template>
    <div class="form-floating position-relative">
        <input :type="[show ? 'text' : 'password']" class="form-control" id="floatingPassword" :placeholder="placeholder" v-model="password">
        <label for="floatingPassword">{{ placeholder }}</label>
        <i 
            :class="['fi position-absolute top-50 end-0 translate-middle-y me-4', 
            !show ? 'fi-ss-eye' : 'fi-sr-eye-crossed']"
            @click="show = !show"
            style="cursor: pointer;"
        ></i>
    </div>  
</template>