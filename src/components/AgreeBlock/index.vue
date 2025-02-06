<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';

interface AgreeBlockProps {
    modelValue: boolean;
}

interface AgreeBlockEmits {
    (e: 'update:modelValue', value: boolean): void;
}

const props = defineProps<AgreeBlockProps>();
const emit = defineEmits<AgreeBlockEmits>();

const localAgreeChecked = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emit('update:modelValue', value)
});

</script>

<template>
    <label>
        <input type="checkbox" name="agree" v-model="localAgreeChecked">
        <span>Я согласен гореть в аду в случае высокого уровня ереси в крови</span>
    </label>
</template>