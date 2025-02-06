<script setup lang="ts">
import type { IClassesForComponent } from '../../models/IClassesForComponent';

interface Props extends IClassesForComponent {
}

const props = defineProps<Props>();
</script>
<template>
    <div :class="['container', ...(props.customClasses || [])]">
        <slot></slot>
    </div>
</template>

<style scoped>
.container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.875em 2.5em;
}
</style>
