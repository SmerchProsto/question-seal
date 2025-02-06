<script setup lang="ts">
import type { IClassesForComponent } from '../../../models/IClassesForComponent';

interface Props extends IClassesForComponent {
    title: string;
    classesForTitle?: string[];
}

const props = defineProps<Props>();
</script>
<template>
    <div :class="['content-text', ...(props.customClasses || [])]">
        <div :class="['content-title', ...(props.classesForTitle || [])]">
              <h1>{{ props.title }}</h1>
        </div>
        <slot></slot>
    </div>
</template>