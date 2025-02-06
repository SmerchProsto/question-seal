<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { IFormInput } from '../models/IFormInput';

const props = defineProps<IFormInput>();
const emit = defineEmits(['update:modelValue']);
</script>

<template>
        <div class="form-input">
          <input 
            :type="props.type" 
            :value="props.value" 
            :placeholder="props.placeholder" 
            @input="(event) => emit('update:modelValue', (event.target as HTMLInputElement)?.value ?? '')" 
            :class="{ 'input-error': props.error }" 
        />
        <img class="input-icon" :src="props.icon" :alt="props.iconAlt">
        <span v-if="props.error" class="error-message">{{ props.error }}</span>
        </div>
</template>


<style scoped>
.form-input {
  position: relative;
}

input {
  margin-bottom: 0.625em;
  padding: 0.625em;
  font-size: 1em;
  width: 100%;
  padding: 0.625em 3em 0.625em 2em;
  border: 1px solid #ccc;
  border-radius: 1.5em;
  background-color: #f9f9ff;
}

.input-icon {
  position: absolute;
  width: 1.25em;
  top: 1.25em;
  right: 1.5625em;
  transform: translateY(-50%);
}

.error-message {
  color: red;
  font-size: 0.8em;
  margin-top: 0.2em;
}
</style>