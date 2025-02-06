<script setup lang="ts">
import type { INavItem } from './models/INavItem';

interface Props {
    items: Array<INavItem>;
}

const props = defineProps<Props>();
</script>
<template>
    <nav class="main-header-nav">
        <div v-for="item in props.items" :key="item.name" class="icon">
          <img :src="item.src" :alt="item.name" loading="lazy">
          <b>{{ item.name }}</b>
        </div>
    </nav>
</template>

<style scoped>
.main-header-nav {
  display: flex;
  align-items: center;
  margin-bottom: 12%;
}

.main-header-nav b {
  display: inline-block;
  font-weight: bold;
}

.main-header-nav .icon {
  margin-right: 10px;
}
</style>
