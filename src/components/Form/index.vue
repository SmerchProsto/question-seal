<script setup lang="ts">
import { reactive } from 'vue';
import FormFields from './FormFields/index.vue';
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
    { type: 'text', model: 'name', placeholder: 'Ваше ФИО', error: '' },
    { type: 'email', model: 'email', placeholder: 'Email', error: '' },
    { type: 'tel', model: 'phone', placeholder: 'Телефон', error: '' }
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
    const response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
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
form {
  display: flex;
  flex-direction: column;
}
.form-container {
  max-width: 1200px;
  margin: 0 0 0 auto;
  padding: 30px 40px;
}
.main-footer-form {
  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 5px;
  background: var(--gradient-line);
} 
</style>