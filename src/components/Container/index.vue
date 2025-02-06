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
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 40px;
}
</style>
