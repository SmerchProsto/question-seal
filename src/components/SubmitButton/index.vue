<script setup lang="ts">
import type { IClassesForComponent } from '../../models/IClassesForComponent';

interface Props extends IClassesForComponent {
    text: string;
    onClick: () => void;
}

const props = defineProps<Props>();
</script>
<template>
    <button :class="['submit-button', ...(props.customClasses || [])]" @click="onClick">
        {{ text }}
    </button>
</template>

<style scoped>

.submit-button {
  padding: 1em;
  color: #ffffff;
  background: var(--gradient-button);
  border-radius: 50px;
  margin-bottom: 1em;
}
</style>