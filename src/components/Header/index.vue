<script setup lang="ts">
import { ref, computed, markRaw } from 'vue';
import Camera from '../Camera/index.vue';
import HeresyResult from '../HeresyResult/index.vue';
import Container from '../Container/index.vue';
import Navigation from '../Navigation/index.vue';
import Contents from '../Contents/index.vue';
import Content from '../Contents/Content/index.vue';
import ContentText from '../Contents/ContentText/index.vue';
import ContentList from '../Contents/ContentList/index.vue';
import SubmitButton from '../SubmitButton/index.vue';
import AgreeBlock from '../AgreeBlock/index.vue';
import fireIcon from '@/assets/fire.svg';

import type { INavItem } from '../Navigation/models/INavItem';
import type { IContentListItem } from '../Contents/ContentList/models/ContentListItem';

const showCamera = ref<boolean>(false);
const showMainHeader = ref<boolean>(true);
const showAgreeAnimation = ref<boolean>(false);
const agreeChecked = ref<boolean>(false);
const countdown = ref<number>(10);
const randomHeresyLevel = ref<number>(Math.floor(Math.random() * 101));
let countdownInterval: number | null = null;


const agreeBlockClasses = computed(() => {
  return showAgreeAnimation.value ? ['main-header-agree', 'animate-agree'] : ['main-header-agree'];
});

const items: Array<INavItem> = [
  { name: 'Печать ереси', src: fireIcon }
];
const listHeaderContent: Array<IContentListItem> = [
  { description: 'Сделай селфи и узнай насколько ты еретик.'},
  { description: 'Умная система биометрии проверит энергитические поля, проведет анализ ауры и выдаст рекомендации к очищению.' },
];

const listHeaderAgree = ref([
    {
      element: markRaw(AgreeBlock),
        props: {
            modelValue: agreeChecked,
            "onUpdate:modelValue": (v: boolean) => { agreeChecked.value = v; }
        },
        customClasses: agreeBlockClasses
    }
]);

const setHeaderPreview = () => {

  showCamera.value = false;
  showMainHeader.value = false;
  countdown.value = 10;
  randomHeresyLevel.value = Math.floor(Math.random() * 101);

  countdownInterval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval!);
      showMainHeader.value = true;
    }
  }, 1000);
}

const startCamera = () => {
  if (agreeChecked.value) {
    showCamera.value = true;
  } else { 
      showAgreeAnimation.value = true;
      setTimeout(() => {
        showAgreeAnimation.value = false;
      }, 2000);
  }
};
</script>

<template>
  <header class="main-header" v-if="showMainHeader">
    <img src="@/assets/head-background.png" alt="head-background" class="header-background">
    <Container>
      <Navigation :items="items" />
      <Contents :customClasses="['header-contents']">
        <h2 class="hidden">Предложение проветриться</h2>
        <Content :customClasses="['header-content']">
          <ContentText :customClasses="['header-content-text']" :title="'Печать ереси WEB SDK'" :classesForTitle="['header-content-title']">
            <ContentList :list="listHeaderContent" />
            <SubmitButton text="Провериться" @click="startCamera" />
            <ContentList :list="listHeaderAgree" />
          </ContentText>
        </Content>
        <Content :customClasses="['header-content']">
          <h2 class="hidden">Вид проветривания</h2>
          <img class="header-content-image" src="@/assets/iphone-2.png" alt="iphone" loading="lazy">
        </Content>
      </Contents>
    </Container>
  </header>
  <HeresyResult :random-heresy-level="randomHeresyLevel" :countdown="countdown" v-else />
  <Camera v-if="showCamera" :setHeaderPreview="setHeaderPreview"/>
</template>

<style scoped>
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
  width: 60%;
}

.main-header::after {
  content: '';
  display: block;
  width: 85%;
  height: 0.1em;
  background-color: #dbdbdb;
  position: absolute;
  bottom: 9%;
  left: 0;
  z-index: 0;
}

</style>
<style>
.header-content-title {
  position: relative;
  margin-bottom: 1.875em;
  padding-bottom: 1.875em;
  text-transform: uppercase;
}

.header-content-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 20%;
  height: 0.3125em;
  background: var(--gradient-line);
  transform: translateX(-25%);
}

.header-content-title h1 {
  margin: 0;
}

.header-content .header-content-image {
  border-radius: 1.25em;
  box-shadow: -1.25em 1.1875em 4.25em 1.3125em rgba(34, 60, 80, 0.15);
}

.header-content-text {
  text-align: left;
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
</style>
