<script setup lang="ts">
import FeatureRow from '../Feature/FeatureRow/index.vue';
import Contents from '../Contents/index.vue';
import Content from '../Contents/Content/index.vue';
import type { IHeresyFeatures } from './models/IHeresyFeatures';

const props = defineProps<IHeresyFeatures>();
</script>

<template>
    <Contents v-for="(content, index) in props.contents" :key="index" :custom-classes="['heresy-features']">
        <h2 class="hidden">{{ props.title }}</h2>
        <Content v-for="featureRow in content.featureRows" :key="featureRow.title">
            <FeatureRow :title="featureRow.title" :src="featureRow.src" :alt="featureRow.alt"
                :items="featureRow.items" />

        </Content>
    </Contents>
</template>

<style scoped>
.heresy-features {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    font-size: 1em;
}

@media (max-width: 992px) {
    .heresy-features {
        grid-template-columns: 1fr;
    }
}
</style>

<style>
.heresy-features .feature-row .content-list {
    padding-left: 1.5em;
    padding-right: 1.5em;
}
</style>
