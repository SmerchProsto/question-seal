<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import FormInput from '../FormInput/index.vue';
import type { IFormInput } from '../models/IFormInput';

const props = defineProps<{
    fields: IFormInput[];
    form: Record<string, string>;
    errors: Record<string, string>;
}>();

const emit = defineEmits(['update:field']);
</script>

<template>
    <div class="form-wrapper-fields">
        <FormInput 
            v-for="field in props.fields" 
            :key="field.model" 
            :type="field.type" 
            :model="field.model" 
            :placeholder="field.placeholder" 
            :error="props.errors[field.model]"
            :value="props.form[field.model]"
            @update:modelValue="(value) => emit('update:field', field.model, value)"
        />
    </div>
</template>


<style scoped>
.form-wrapper-fields {
  max-width: 60%;
}
</style>