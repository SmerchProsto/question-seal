<script setup lang="ts">
import Header from './components/Header/index.vue';
import Main from './components/Main/index.vue';
import Footer from './components/Footer/index.vue';
</script>

<template>
  <Header />
  <Main />
  <Footer />
</template>

<style scoped>
@media (max-width: 600px) {
  .app {
    padding: 10px;
  }
}
</style>
