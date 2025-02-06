<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import Header from './components/Header/index.vue';

const form: Ref<{ name: string; email: string; phone: string; token: string }> = ref({ name: '', email: '', phone: '', token: 'randomToken' });
const errors: Ref<{ [key: string]: string }> = ref({});


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
  <Header />
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
