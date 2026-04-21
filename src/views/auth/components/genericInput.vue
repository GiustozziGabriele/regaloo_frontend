<script setup>
    const props = defineProps({
        inputType: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        help: {
            type: String,
            default: ''
        }
    })

    const model = defineModel()
</script>

<template>
    <div class="form-floating">
        <input :type="inputType" class="form-control" :id="`floating${label}`" :placeholder="placeholder" v-model="model">
        <label :for="`floating${label}`">{{ placeholder }}</label>
        <div :id="`help_div_${help}`" class="form-text" v-if="props.help">{{ help }}</div>
    </div>  
</template>