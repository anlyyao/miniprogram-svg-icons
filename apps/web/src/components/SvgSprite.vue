<template>
  <!-- 使用 v-html 渲染处理后的 SVG Sprite，添加 key 强制重新渲染 -->
  <div :key="spriteKey" v-html="processedSprite" style="display: none;"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { outlineSvgSprite, filledSvgSprite } from '../data/svg-sprite';

const props = withDefaults(defineProps<{
  iconType?: 'outline' | 'filled';
  strokeWidth?: number;
  strokeColor1?: string;
  strokeColor2?: string;
  fillColor1?: string;
  fillColor2?: string;
}>(), {
  iconType: 'outline',
  strokeWidth: 2,
  strokeColor1: 'currentColor',
  strokeColor2: 'currentColor',
  fillColor1: 'transparent',
  fillColor2: 'transparent',
});

// 生成唯一的 key，确保在 props 变化时重新渲染
const spriteKey = computed(() => {
  return `${props.iconType}-${props.strokeWidth}-${props.strokeColor1}-${props.strokeColor2}-${props.fillColor1}-${props.fillColor2}`;
});

/**
 * 处理 SVG Sprite，替换 CSS 变量为实际值
 */
const processedSprite = computed(() => {
  const sprite = props.iconType === 'outline' ? outlineSvgSprite : filledSvgSprite;
  
  // 替换 CSS 变量为实际值
  return sprite
    .replace(/var\(--svg-stroke-width,\s*[^)]+\)/g, String(props.strokeWidth))
    .replace(/var\(--svg-stroke-color-1,\s*[^)]+\)/g, props.strokeColor1)
    .replace(/var\(--svg-stroke-color-2,\s*[^)]+\)/g, props.strokeColor2)
    .replace(/var\(--svg-fill-color-1,\s*[^)]+\)/g, props.fillColor1)
    .replace(/var\(--svg-fill-color-2,\s*[^)]+\)/g, props.fillColor2);
});
</script>
