<template>
  <div 
    class="icon-card" 
    :id="iconId"
    @click="handleClick"
  >
    <svg 
      class="icon-svg" 
      :style="{ 
        width: `${size}px`, 
        height: `${size}px`,
        color: strokeColor
      }"
    >
      <use :href="`#icon-${brand}-${name}`" />
    </svg>
    <div class="icon-name" :title="name">{{ name }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  name: string;
  brand: string;
  size?: number;
  strokeColor?: string;
}>();

const emit = defineEmits<{
  (e: 'click', data: { name: string; brand: string }): void;
}>();

const iconId = computed(() => `${props.brand}-${props.name}`);

const handleClick = () => {
  emit('click', { name: props.name, brand: props.brand });
};
</script>

<style scoped>
.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 100px;
}

.icon-card:hover {
  background-color: var(--td-bg-color-container-hover);
}

.icon-svg {
  margin-bottom: 8px;
}

.icon-name {
  font-size: 12px;
  color: var(--td-text-color-secondary);
  text-align: center;
  word-break: break-all;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
