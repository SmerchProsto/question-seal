<script setup lang="ts">
import type { IClassesForComponent } from '../../../models/IClassesForComponent';
import type { IContentListItem } from './models/ContentListItem';

interface Props extends IClassesForComponent {
    list: IContentListItem[];
}

const props = defineProps<Props>();
</script>

<template>
    <ul :class="['content-list', ...(props.customClasses || [])]">
        <li v-for="item in list" :class="['content-list-item', ...(item.customClasses || [])]">
            <component v-if="item.element" :is="item.element" v-bind="item.props"></component>
            <span v-if="item.description" :class="{'bold-title': item.isTitle}">{{ item.description }}</span>
        </li>
    </ul>
</template>

<style scoped>

.content-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.2em 0;
}

.content-list-item:first-child {
  margin-bottom: 10px;
}

.bold-title {
  font-size: 1.2em;
  font-weight: bold;
}
</style>