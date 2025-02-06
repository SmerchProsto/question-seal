
<script setup lang="ts">
import FeatureColumn from '../index.vue';
import type { IFeatureColumn } from '../models/IFeatureColumn';
interface FeatureColumnListProps {
    items: Array<IFeatureColumn>;
}

const props = defineProps<FeatureColumnListProps>();
</script>

<template>
    <div class="features-column">
        <FeatureColumn v-for="item in props.items" :key="item.name" :title="item.title" :name="item.name" :description="item.description" />
    </div>
</template>

<style scoped>
.features-column {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>
