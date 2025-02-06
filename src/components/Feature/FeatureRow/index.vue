<script setup lang="ts">
import type { IFeatureRow } from './models/IFeatureRow';
import ContentList from '../../Contents/ContentList/index.vue';
const props = defineProps<IFeatureRow>();
</script>

<template>
   <section class="feature-row">
        <h2 class="hidden">{{props.title}}</h2>
        <img :src="props.src" :alt="props.alt">
        <ContentList :list="props.items" />
   </section>
</template>

<style scoped>

.feature-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
