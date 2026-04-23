<!-- FormField.vue -->
<script setup>
    defineProps({
        label:       { type: String, required: true },
        modelValue:  { type: String, default: '' },
        placeholder: { type: String, default: '' },
        type:        { type: String, default: 'text' },
    })

    defineEmits(['update:modelValue'])
</script>

<template>
    <div class="field">
        <label>{{ label }}</label>
        <input
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<style scoped>
    .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .field label {
        font-size: 11px;
        color: #888780;
    }
    .field input {
        font-size: 13px;
        padding: 7px 10px;
        border-radius: 8px;
        border: 0.5px solid rgba(0,0,0,0.15);
        outline: none;
        color: #1a1a1a;
        transition: border-color 0.12s;
    }
    .field input:focus  { border-color: rgba(0,0,0,0.35); }
    .field input::placeholder { color: #b4b2a9; }
</style>