<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import FormFields from './FormFields/index.vue';
import personIcon from '@/assets/person.svg';
import messageIcon from '@/assets/message.svg';
import phoneIcon from '@/assets/phone.svg';
import SubmitButton from '../SubmitButton/index.vue';
import type { IFormInput } from './models/IFormInput';

interface Form {
  name: string;
  email: string;
  phone: string;
  token: string;
}

interface Errors {
  name: string;
  email: string;
  phone: string;
}

const form = reactive<Form>({ name: '', email: '', phone: '', token: 'randomToken' });
const errors = reactive<Errors>({ name: '', email: '', phone: '' });
const fields = reactive<IFormInput[]>([
    { type: 'text', model: 'name', placeholder: 'Ваше ФИО', error: '', icon: personIcon, value: '', iconAlt: 'person' },
    { type: 'email', model: 'email', placeholder: 'Email', error: '', icon: messageIcon, value: '', iconAlt: 'message' },
    { type: 'tel', model: 'phone', placeholder: 'Телефон', error: '', icon: phoneIcon, value: '', iconAlt: 'phone' }
]);

const props = defineProps<{
    title: string;
    description: string;
}>();

const updateField = (model: keyof Form, value: string) => {
  form[model] = value;
};



const submitForm = async () => {
  try {
    const response = await axios.post('/api', form, {
      headers: { 'Content-Type': 'application/json' }
    });
    const result = response.data;
    if (result.result) {
      alert('Форма успешно отправлена!');
      Object.assign(form, { name: '', email: '', phone: '', token: 'randomToken' });
      Object.assign(errors, { name: '', email: '', phone: '' });
    } else {
      Object.assign(errors, result.warnings);
    }
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
};
</script>

<template>
    <form class="form-container main-footer-form" @submit.prevent="submitForm">
      <div class="form-wrapper">
        <div class="form-wrapper-text">
          <h2>{{ props.title }}</h2>
          <p>{{ props.description }}</p>
        </div>
        <FormFields :fields="fields" :form="form" :errors="errors" @update:field="updateField" />
        <SubmitButton :type="'submit'" :text="'Заказать очищение'" />
      </div>
  </form>
</template>


<style scoped>
.form-container {
  max-width: 75rem;
  margin: 0 0 0 auto;
  padding: 1.875em 2.5em;
}
.main-footer-form {
  background-color: #ffffff;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000000;
}

.form-wrapper-text {
  text-align: center;
}

.form-wrapper-text h2 {
  margin-bottom: 0;
}

.form-wrapper-text p {
  position: relative;
  font-size: 3.5em;
  margin: 0 0 1em 0;
}

.form-wrapper-text p::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  display: block;
  width: 55%;
  height: 0.1em;
  background: var(--gradient-line);
} 
</style>