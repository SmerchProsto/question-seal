<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { IFormInput } from '../models/IFormInput';

const props = defineProps<IFormInput & { value: string }>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
        <input 
            :type="props.type" 
            :value="props.value" 
            :placeholder="props.placeholder" 
            @input="(event) => emit('update:modelValue', (event.target as HTMLInputElement)?.value ?? '')" 
            :class="{ 'input-error': props.error }" 
        />
        <span v-if="props.error" class="error-message">{{ props.error }}</span>
</template>


<style scoped>
input {
  margin-bottom: 0.625em;
  padding: 0.625em;
  font-size: 1em;
  width: 100%;
  padding: 0.625em 3em 0.625em 2em;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #f9f9ff;
  background-size: 1.25em;
  background-repeat: no-repeat;
  background-position: calc(100% - 1.5625em) center;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 0.25em;
}
</style>