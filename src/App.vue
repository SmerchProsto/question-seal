<script setup lang="ts">
import { ref } from 'vue';

const showCamera = ref(false);
const showMainHeader = ref(true);
const countdown = ref(10);
let countdownInterval: number | null = null;
const form = ref({ name: '', email: '', phone: '', token: 'randomToken' });
const errors = ref<{ [key: string]: string }>({});
const agreeChecked = ref(false);
const randomHeresyLevel = ref(Math.floor(Math.random() * 101));

const startCamera = () => {
  if (agreeChecked.value) {
    showCamera.value = true;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = document.querySelector('video');
        if (video) video.srcObject = stream;
      })
      .catch(err => console.error("Error accessing camera: ", err));
  } else {
    const agreeElement = document.querySelector('.main-header-agree');
    if (agreeElement) {
      agreeElement.classList.add('animate-agree');
      setTimeout(() => {
        agreeElement.classList.remove('animate-agree');
      }, 2000);
    }
  }
};

const closeCamera = () => {
  showCamera.value = false;
  showMainHeader.value = false;
  countdown.value = 10;
  randomHeresyLevel.value = Math.floor(Math.random() * 101);
  // Остановить поток видео
  const video = document.querySelector('video');
  if (video && video.srcObject) {
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach(track => {
      track.stop();
    });
    video.srcObject = null;
  }

  countdownInterval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval!);
      showMainHeader.value = true;
    }
  }, 1000);
};

const submitForm = async () => {
  try {
    const response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : {};
    if (result.result) {
      alert('Форма успешно отправлена!');
      form.value = { name: '', email: '', phone: '', token: 'randomToken' };
      errors.value = {};
    } else {
      errors.value = result.warnings;
    }
  } catch (error) {
    console.error("Error submitting form: ", error);
  }
};
</script>

<template>
  <header class="main-header" v-if="showMainHeader">
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
            <ul class="content-list">
              <li class="content-list-item main-header-agree">
                <label>
                  <input type="checkbox" name="agree" v-model="agreeChecked">
                  <span>Я согласен гореть в аду в случае 
                    высокого уровня ереси в крови</span>
                </label>
              </li>
            </ul>
          </section>
        </section>
        <section class="header-content content">
          <h2 class="hidden">Вид проветривания</h2>
          <img class="header-content-image" src="@/assets/iphone-2.png" alt="iphone" loading="lazy">
        </section>
      </section>
    </div>
  </header>
  <div v-else class="background-placeholder">
    <div class="placeholder-content">
      <h2>Анализ завершен успешно!</h2>
      <p>Ваш уровень ереси:</p>
      <p class="heresy-level"><b>{{ randomHeresyLevel }}%</b></p>
      <div class="countdown">До возврата: {{ countdown }} сек</div>
      <p>У вас высокий уровень ереси! 
        Вы должны посетить храм и оплатить  прощение. 
        В противном случае будет наложен административный штраф до 30 тыс.руб</p>
    </div>
  </div>
  <section class="camera" v-if="showCamera">
    <h2 class="hidden">Камера проверки</h2>
    <div class="camera-wrapper">
      <video ref="video" autoplay></video>
    </div>
    <button class="camera-close" @click="closeCamera">
      X
    </button>
  </section>
  <main>
    <div class="container">
      <section class="heresy-statiscs contents">
        <h2 class="hidden">Положения</h2>
        <section class="heresy-statiscs-text content">
          <h2>Снижаем уровень ереси с XIII века.</h2>
        </section>
        <div class="content">
          <section class="features-column">
          <h2 class="hidden">Цифры и факты</h2>
          <section class="feature-column">
            <b>1478</b>
            <p>Год основания компании в европе</p>
          </section>
          <section class="feature-column">
            <b>3687</b>
            <p>Клиентов довольных нами</p>
          </section>
        </section>
        </div>
      </section>
      <section class="heresy-features contents">
        <h2 class="hidden">Преимущества</h2>
        <div class="content">
          <section class="feature-row">
            <h2 class="hidden">Преимущество</h2>
            <img src="@/assets/rocket-icon.svg" alt="rocket">
            <ul class="content-list">
              <li class="content-list-item"><strong class="heresy-feature-title">Точность и технологии</strong></li>
              <li class="content-list-item">
                Наша уникальная технология анализа основана на вере 
                и глубоких убеждениях, что гарантирует стабильность 
                и достоверность результатов. 
              </li>
              <li class="content-list-item">
                Точность результата оценивается в 146% всеми
                Проповедниками нашего культа.
              </li>
            </ul>
          </section>
        </div>
        <div class="content">
          <section class="feature-row">
            <h2 class="hidden">Преимущество</h2>
            <img src="@/assets/graphic-icon.svg" alt="graphic">
            <ul class="content-list">
              <li class="content-list-item"><strong class="heresy-feature-title">Держи свой уровень греха на нуле</strong></li>
              <li class="content-list-item">
                Установи уникальное приложение "Печать ереси" на свой смартфон и будь всегда в курсе своего состояния.
              </li>
              <li class="content-list-item">
                Заходи в наш официальный интернет магазин, приобретай иконки и свечки, и снижай свой статус ереси online!
              </li>
            </ul>
          </section>
        </div>
      </section>
      <section class="heresy-features contents">
        <h2 class="hidden">Преимущества</h2>
        <div class="content">
            <section class="feature-row">
              <h2 class="hidden">Преимущество</h2>
              <img src="@/assets/lamp-icon.svg" alt="lamp">
              <ul class="content-list">
                <li class="content-list-item"><strong class="heresy-feature-title">Интеграция со всеми храмами</strong></li>
                <li class="content-list-item">
                  Результаты проверки незамедоительно попадут в БД братства.
                </li>
                <li class="content-list-item">
                  Просто посетив ближайшую церковь, вам предоставят прайс лист с подхотящими именно Вам решениями для оцищения от ереси.
                </li>
              </ul>
            </section>
        </div>
        <div class="content">
          <section class="feature-row">
            <h2 class="hidden">Преимущество</h2>
            <img src="@/assets/like-icon.svg" alt="like">
            <ul class="content-list">
              <li class="content-list-item"><strong class="heresy-feature-title">Безопасность</strong></li>
              <li class="content-list-item">
                Ваши данные в надежных руках!
              </li>
              <li class="content-list-item">
                Мы гарантируем безопасную передачу ваших личных данных в любые другие организации по нашему усмотрению.
              </li>
            </ul>
          </section>
        </div>
      </section>
    </div>
  </main>
  <footer class="main-footer">
    <form class="form-container main-footer-form" @submit.prevent="submitForm">
      <div class="form-wrapper">
        <div class="form-wrapper-text">
          <h2>Форма заявки</h2>
          <p>Заказать очищение.</p>
        </div>
        <div class="form-wrapper-fields">
          <input type="text" v-model="form.name" placeholder="Ваше ФИО" />
          <p v-if="errors.name" class="error-msg">{{ errors.name }}</p>
          <input type="email" v-model="form.email" placeholder="Email" />
          <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
          <input type="tel" v-model="form.phone" placeholder="Телефон" />
          <p v-if="errors.phone" class="error-msg">{{ errors.phone }}</p>
        </div>
        <button class="button-submit" type="submit">Заказать очищение</button>
      </div>
  </form>
  </footer>
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

.main-header-agree {
  font-size: var(--font-size-p-sm);
  max-width: 50%;
  color: #878787;
  cursor: pointer;
  transition: color 0.5s ease;
}

.animate-agree {
  color: red;
}

.button-submit {
  padding: 1em;
  color: #ffffff;
  background: var(--gradient-button);
  border-radius: 50px;
  margin-bottom: 1em;
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
  background-color: #333333;
}

.camera-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.camera-wrapper::before {
  content: '';
  position: absolute;
  width: 25%;
  height: 40vw;
  max-height: 60vh;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  border: 0.5vw solid rgba(255, 0, 0, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.camera-wrapper::after {
  content: 'Убедитесь, что все важные элементы головы: рога, тентакли и т.д. внутри овала';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20vw;
  text-align: center;
  color: #ffffff;
  font-size: 1.2em;
}

@media (max-width: 1200px) {
  .camera-wrapper::after {
    font-size: 1em;
  }
}

@media (max-width: 992px) {
  .camera-wrapper::after {
    font-size: 0.9em;
  }
}

@media (max-width: 768px) {
  .camera-wrapper::after {
    font-size: 0.8em;
  }
}

@media (max-width: 576px) {
  .camera-wrapper::after {
    font-size: 0.7em;
  }
}

.camera-wrapper video {
  width: 100%;
  height: 100%;
}

.camera-close {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  background-color: transparent;
  color: rgba(255, 0, 0, 0.5);
  border-radius: 50%;
  font-size: 2em;
  border: none;
  outline: none;
  cursor: pointer;
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

.background-placeholder {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ffffff;
  background-image: url('@/assets/low-opacity-result.jpg');
  background-color: rgba(0, 0, 0, 0.8);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
  text-align: center;
}

.background-placeholder * {
  margin: 0;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
}

.heresy-level {
  font-size: 4em;
  color: #ff9e17;
}

.countdown {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1.2em;
  color: #ff9e17;
}

main {
  color: #ffffff;
  background-image: url('@/assets/low-opacity-result.jpg');
  background-color: rgba(0, 0, 0, 0.8);
  background-size: cover;
  background-repeat: no-repeat;
  padding: 20px;
}

.features-column {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.feature-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.heresy-statiscs {
  margin-bottom: 3em;
  padding-bottom: 4em;
  border-bottom: 1px solid #ffffff;
}

.heresy-statiscs .feature-column p {
  font-size: 1em;
}

  .heresy-statiscs .feature-column b {
    font-size: 4em;
  }

@media (max-width: 550px) {
  .heresy-statiscs .feature-column b {
    font-size: 2em;
  }
  .heresy-statiscs .feature-column p {
    font-size: 0.6em;
    padding-left: 0.7em;
  }
}

.heresy-statiscs .feature-column p {
  max-width: 50%;
}

.heresy-statiscs-text {
  padding-right: 1em;
}

.heresy-features .feature-row .content-list {
  padding-left: 1.5em;
  padding-right: 1.5em;
}

.heresy-features {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  font-size: 1em;
}

.heresy-feature-title {
  font-size: 1.2em;
}


.main-footer {
  color: #ffffff;
  background-image: url('@/assets/low-form-bg.jpg');
  background-size: contain;
  background-repeat: no-repeat;
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

.form-wrapper-fields {
  max-width: 70%;
}

.form-wrapper input {
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

.form-wrapper input:nth-child(1) {
  background-image: url('@/assets/person.svg');

}
.form-wrapper input:nth-child(2) {
  background-image: url('@/assets/message.svg');
}
.form-wrapper input:nth-child(3) {
  background-image: url('@/assets/phone.svg');
}

.error-msg {
  color: red;
  font-size: 0.8em;
  margin-top: 0.25em;
}

</style>
