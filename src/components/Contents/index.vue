<script setup lang="ts">
import type { IClassesForComponent } from '../../models/IClassesForComponent';

interface Props extends IClassesForComponent {
}

const props = defineProps<Props>();
</script>

<template>
    <section :class="['contents', ...(props.customClasses || [])]">
        <slot></slot>
    </section>
</template>

<style scoped>
.contents {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
}
</style>