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
  <header class="main-header">
    <img src="@/assets/head-background.png" alt="head-background" class="header-background">
    <div class="container">
      <nav class="main-header-nav">
        <div class="icon">
          <img src="@/assets/fire.svg" alt="fire" loading="lazy">
        </div>
        <b>Печать ереси</b>
      </nav>
      <section class="header-contents contents">
        <h2 class="hidden">Предложение проветриться</h2>
        <section class="header-content content">
          <h2 class="hidden">Описание предложения</h2>
          <section class="header-content-text content-text">
            <div class="header-content-title">
              <h1>Печать ереси WEB SDK</h1>
            </div>
            <ul class="content-list">
              <li class="content-list-item">
                Сделай селфи и узнай насколько ты еретик.
              </li>
              <li class="content-list-item">
                Умная система биометрии проверит
                энергитические поля, проведет анализ
                ауры и выдаст рекомендации к очищению.
              </li>
            </ul>
            <button class="button-submit" @click="startCamera">Провериться</button>
          </section>
        </section>
        <section class="header-content content">
          <h2 class="hidden">Вид проветривания</h2>
          <img class="header-content-image" src="@/assets/iphone-2.png" alt="iphone" loading="lazy">
        </section>
      </section>
    </div>
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
</template>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 40px;
}

.main-header {
  position: relative;
  min-height: 100vh;
  text-align: center;
  background-color: #f9f9ff;
  background-image: url('@/assets/smoke-header.jpg');
  background-position: 0 165%;
  background-repeat: no-repeat;
  overflow: hidden;
}

.main-header * {
  z-index: 1;
}

.header-background {
  position: absolute;
  z-index: 0;
  top: 0;
  right: 0; 
}

.main-header::after {
  content: '';
  display: block;
  width: 85%;
  height: 1px;
  background-color: #dbdbdb;
  position: absolute;
  bottom: 9%;
  left: 0;
  z-index: 0;
}

.main-header-nav {
  display: flex;
  align-items: center;
  margin-bottom: 12%;
}

.main-header-nav b {
  display: inline-block;
  font-weight: bold;
}

.main-header-nav .icon {
  margin-right: 10px;
}

.header-content-text {
  text-align: left;
}

.header-content-title {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 30px;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .header-content-title {
    font-size: 0.5em;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .header-content-title {
    font-size: 0.6em;
  }
}

@media (min-width: 1025px) {
  .header-content-title {
    font-size: 1em;
  }
}


.header-content-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 20%;
  height: 5px;
  background: var(--gradient-line);
  transform: translateX(-25%);
}

.header-content-title h1 {
  margin: 0;
}

.header-content .header-content-image {
  border-radius: 20px;
  box-shadow: -20px 19px 68px 21px rgba(34, 60, 80, 0.15);
}

.button-submit {
  padding: 1em;
  color: #ffffff;
  background: var(--gradient-button);
  border-radius: 50px;
}

.contents {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2em 0;
}

.content-list-item:first-child {
  margin-bottom: 10px;
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

.hidden {
  display: none;
}
</style>