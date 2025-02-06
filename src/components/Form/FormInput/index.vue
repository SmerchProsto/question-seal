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
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  padding: 0.625em 3em 0.625em 2em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 50px;
  background-color: #f9f9ff;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: calc(100% - 25px) center;
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 0.25em;
}
</style>