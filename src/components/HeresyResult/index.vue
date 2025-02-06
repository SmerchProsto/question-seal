<script setup lang="ts">

interface Props {
    countdown: number;
    randomHeresyLevel: number;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="background-placeholder">
        <div class="placeholder-content">
        <h2>Анализ завершен успешно!</h2>
        <p>Ваш уровень ереси:</p>
        <p class="heresy-level"><b>{{ props.randomHeresyLevel }}%</b></p>
        <div class="countdown">До возврата: {{ props.countdown }} сек</div>
        <p>У вас высокий уровень ереси! 
            Вы должны посетить храм и оплатить  прощение. 
            В противном случае будет наложен административный штраф до 30 тыс.руб</p>
        </div>
    </div>
</template>

<style scoped>
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
</style>