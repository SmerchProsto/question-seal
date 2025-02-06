<script setup lang="ts">
import type { IClassesForComponent } from '../../../models/IClassesForComponent';

interface Props extends IClassesForComponent {
}

const props = defineProps<Props>();
</script>

<template>
    <section :class="['content', ...(props.customClasses || [])]">
        <slot></slot>
    </section>
</template>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>