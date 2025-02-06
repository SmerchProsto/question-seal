<script setup lang="ts">
import { defineProps } from 'vue';
import type { IFeatureColumn } from './models/IFeatureColumn';

const props = defineProps<IFeatureColumn>();
</script>

<template>
    <section class="feature-column">
        <h2 class="hidden">{{ props.title }}</h2>
        <b>{{ props.name }}</b>
        <p>{{ props.description }}</p>
    </section>
</template>
<style scoped>
.features-column {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>