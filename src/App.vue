<script setup lang="ts">
import { ref } from 'vue';

const showCamera = ref(false);
const form = ref({ name: '', email: '', phone: '', token: 'randomToken' });
const errors = ref<string[]>([]);

const startCamera = () => {
  showCamera.value = true;
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.querySelector('video');
      if (video) video.srcObject = stream;
    })
    .catch(err => console.error("Error accessing camera: ", err));
};

const submitForm = async () => {
  try {
    const response = await fetch('https://api-demo.rednosed.agency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    const result = await response.json();
    if (result.result) {
      alert('Форма успешно отправлена!');
      form.value = { name: '', email: '', phone: '', token: 'randomToken' };
      errors.value = [];
    } else {
      errors.value = Object.values(result.warnings);
    }
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
};
</script>

<template>
  <div class="app">
    <header>
      <h1>Печать ереси WEB SDK</h1>
      <button @click="startCamera">Провериться</button>
    </header>
    <section class="camera" v-if="showCamera">
      <video ref="video" autoplay></video>
    </section>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="form.name" placeholder="Ваше имя" />
      <input type="email" v-model="form.email" placeholder="Email" />
      <input type="tel" v-model="form.phone" placeholder="Телефон" />
      <button type="submit">Заказать очищение</button>
    </form>
    <div v-if="errors.length">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
}

.camera {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 600px) {
  .app {
    padding: 10px;
  }
}
</style>
