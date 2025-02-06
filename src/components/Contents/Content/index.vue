<script setup lang="ts">
import type { IClassesForComponent } from '../../../models/IClassesForComponent';

const props = defineProps<IClassesForComponent>();
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