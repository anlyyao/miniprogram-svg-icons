<template>
  <div class="icons-view" :key="configuration.currentType">
    <!-- 头部：标题和搜索 -->
    <div class="icons-view__header">
      <div class="header-content">
        <div class="header-title">
          <h1>SVG 图标库</h1>
          <span class="icon-count">
            {{ filteredCount }} / {{ currentTotalCount }} 个{{ configuration.currentType === 'outline' ? '描边' : '填充' }}图标
          </span>
        </div>
        <t-input
          v-model="searchStr"
          placeholder="搜索图标名称..."
          clearable
          size="large"
          class="search-input"
        >
          <template #prefix-icon>
            <search-icon />
          </template>
        </t-input>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="icons-view__body">
      <!-- 中间图标展示区 -->
      <div class="icons-view__content" @mousemove="handleHoverIcon">
        <!-- 品牌分类展示 -->
        <template v-for="brandData in filteredBrands" :key="brandData.brand">
          <div class="brand-section" v-if="brandData.icons.length > 0">
            <div class="brand-title" @mouseenter="hidePopover">
              <span class="brand-name">{{ brandData.brand }}</span>
              <span class="brand-count">({{ brandData.icons.length }})</span>
            </div>
            <div class="icons-grid">
              <div
                v-for="iconName in brandData.icons"
                :key="`${brandData.brand}-${iconName}`"
                class="icon-wrapper"
                :id="`${brandData.brand}-${iconName}`"
                :data-brand="brandData.brand"
                :data-name="iconName"
              >
                <svg
                  class="icon-svg"
                  :style="{ 
                    width: `${configuration.iconSize}px`, 
                    height: `${configuration.iconSize}px`,
                    color: 'var(--td-text-color-primary)'
                  }"
                >
                  <use :href="`#icon-${brandData.brand}-${iconName}`" />
                </svg>
                <div class="icon-name">{{ iconName }}</div>
              </div>
            </div>
          </div>
        </template>

        <!-- 空状态 -->
        <div v-if="filteredCount === 0" class="icons-view__empty">
          <p class="empty-title">未找到匹配的图标</p>
          <p class="empty-description">请尝试其他关键词</p>
        </div>
      </div>

      <!-- 右侧操作栏 -->
      <div class="icons-view__operations" @mouseenter="hidePopover">
        <t-space direction="vertical" size="24px" style="width: 100%">
          <!-- 图标类型切换 -->
          <div class="operation-section">
            <div class="operation-label">图标类型</div>
            <t-radio-group
              v-model="configuration.currentType"
              variant="default-filled"
            >
              <t-radio-button value="outline">描边</t-radio-button>
              <t-radio-button value="filled">填充</t-radio-button>
            </t-radio-group>
          </div>

          <!-- 图标大小 -->
          <div class="operation-section">
            <div class="operation-label">图标大小</div>
            <t-slider
              v-model="configuration.iconSize"
              :step="4"
              :min="16"
              :max="64"
              :marks="{ 16: '16', 24: '24', 32: '32', 48: '48', 64: '64' }"
            />
          </div>

          <!-- 描边图标设置 -->
          <template v-if="configuration.currentType === 'outline'">
            <!-- 线条粗细 -->
            <div class="operation-section">
              <div class="operation-label">线条粗细</div>
              <t-slider
                v-model="configuration.strokeWidth"
                :step="0.5"
                :min="0.5"
                :max="2.5"
                :marks="{ 0.5: '0.5', 1: '1', 1.5: '1.5', 2: '2', 2.5: '2.5' }"
              />
            </div>

            <!-- Icon 类型 -->
            <div class="operation-section">
              <div class="operation-label">Icon 类型</div>
              <t-radio-group
                v-model="configuration.strokeTypes"
                variant="default-filled"
              >
                <t-radio-button value="outline">描边</t-radio-button>
                <t-radio-button value="outlineFilled">描边-填充</t-radio-button>
              </t-radio-group>
            </div>

            <!-- 图标颜色 -->
            <div class="operation-section">
              <div class="operation-label">图标颜色</div>
              <t-radio-group
                v-model="configuration.colorType"
                variant="default-filled"
                :key="configuration.strokeTypes"
              >
                <t-radio-button 
                  value="single"
                  v-if="configuration.strokeTypes === 'outline'"
                >单色</t-radio-button>
                <t-radio-button value="double">双色</t-radio-button>
                <t-radio-button 
                  value="multiple"
                  v-if="configuration.strokeTypes === 'outlineFilled'"
                >多色</t-radio-button>
              </t-radio-group>
            </div>

            <!-- 填充颜色（仅描边-填充模式显示） -->
            <div 
              class="operation-section color-pickers"
              v-if="configuration.strokeTypes === 'outlineFilled'"
            >
              <div class="color-picker-item">
                <div class="color-label">填充颜色1</div>
                <t-color-picker
                  v-model="configuration.fillColor1"
                  :color-modes="['monochrome']"
                  format="HEX"
                />
              </div>
              <div 
                class="color-picker-item"
                v-if="configuration.colorType === 'multiple'"
              >
                <div class="color-label">填充颜色2</div>
                <t-color-picker
                  v-model="configuration.fillColor2"
                  :color-modes="['monochrome']"
                  format="HEX"
                />
              </div>
            </div>

            <!-- 线条颜色 -->
            <div class="operation-section color-pickers">
              <div class="color-picker-item">
                <div class="color-label">线条颜色1</div>
                <t-color-picker
                  v-model="configuration.strokeColor1"
                  :color-modes="['monochrome']"
                  format="HEX"
                />
              </div>
              <div 
                class="color-picker-item"
                v-if="(configuration.colorType === 'double' && configuration.strokeTypes === 'outline') || configuration.colorType === 'multiple'"
              >
                <div class="color-label">线条颜色2</div>
                <t-color-picker
                  v-model="configuration.strokeColor2"
                  :color-modes="['monochrome']"
                  format="HEX"
                />
              </div>
            </div>
          </template>

          <!-- 填充图标设置 -->
          <template v-if="configuration.currentType === 'filled'">
            <!-- 填充颜色 -->
            <div class="operation-section color-pickers">
              <div class="color-picker-item">
                <div class="color-label">填充颜色1</div>
                <t-color-picker
                  v-model="configuration.fillColor1"
                  :color-modes="['monochrome']"
                  format="HEX"
                />
              </div>
            </div>
          </template>

          <!-- 重置按钮 -->
          <t-button 
            theme="default" 
            block 
            @click="handleReset"
            style="border-color: var(--td-border-level-2-color)"
          >
            重置
          </t-button>
        </t-space>
      </div>
    </div>

    <!-- 悬浮操作菜单 -->
    <div
      class="icons-view__popover"
      id="icon-popover"
      role="tooltip"
      style="display: none"
    >
      <div class="popover-item" @click="() => handleCopyIcon('svg')">
        复制 SVG
      </div>
      <div class="popover-item" @click="() => handleCopyIcon('name')">
        复制图标名
      </div>
      <t-divider style="margin: 4px 0" />
      <div class="popover-item" @click="() => handleDownloadIcon('svg')">
        下载 SVG
      </div>
      <div class="popover-item" @click="() => handleDownloadIcon('png')">
        下载 PNG
      </div>
    </div>

    <!-- SVG Sprite (对齐 tdesign-icons：直接传递 configuration 中的颜色值) -->
    <svg-sprite
      :icon-type="configuration.currentType"
      :stroke-width="configuration.strokeWidth"
      :stroke-color1="configuration.strokeColor1"
      :stroke-color2="configuration.strokeColor2"
      :fill-color1="configuration.fillColor1"
      :fill-color2="configuration.fillColor2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import debounce from 'lodash-es/debounce';

import SvgSprite from './components/SvgSprite.vue';
import { manifest, outlineCount, filledCount } from './data/icons';

// 搜索字符串
const searchStr = ref('');

// 当前悬浮的图标信息
const currentIcon = ref<{ brand: string; name: string } | null>(null);

// Popper 实例
let popperInstance: PopperInstance | null = null;

// 是否已初始化（用于避免首次加载时触发 watch）
const initialized = ref(false);

// 默认配置（对齐 tdesign-icons）
const initConfiguration = {
  currentType: 'outline' as 'outline' | 'filled',
  colorType: 'single' as 'single' | 'double' | 'multiple',
  strokeTypes: 'outline' as 'outline' | 'outlineFilled',
  iconSize: 32,
  strokeWidth: 2,
  fillColor1: 'transparent',
  fillColor2: 'transparent',
  strokeColor1: 'currentColor',
  strokeColor2: 'currentColor',
};

// 配置状态
const configuration = reactive({
  ...initConfiguration,
});

// 监听图标类型变化（对齐 tdesign-icons）
watch(
  () => configuration.currentType,
  (newType) => {
    if (!initialized.value) return;
    if (newType === 'filled' && configuration.fillColor1 === 'transparent') {
      configuration.fillColor1 = 'currentColor';
    } else if (newType === 'outline' && configuration.fillColor1 === 'currentColor') {
      configuration.fillColor1 = 'transparent';
    }
  }
);

// 监听填充颜色1变化（同步到颜色2）
watch(
  () => configuration.fillColor1,
  (newColor) => {
    if (!initialized.value) return;
    if (configuration.colorType === 'single') {
      configuration.fillColor2 = newColor;
    } else if (configuration.colorType === 'double' && configuration.strokeTypes === 'outlineFilled') {
      configuration.fillColor2 = newColor;
    }
  }
);

// 监听线条颜色1变化（同步到颜色2）
watch(
  () => configuration.strokeColor1,
  (newColor) => {
    if (!initialized.value) return;
    if (configuration.colorType === 'single') {
      configuration.strokeColor2 = newColor;
    } else if (configuration.colorType === 'double' && configuration.strokeTypes === 'outlineFilled') {
      configuration.strokeColor2 = newColor;
    }
  }
);

// 监听 Icon 类型变化
watch(
  () => configuration.strokeTypes,
  (newType) => {
    if (!initialized.value) return;
    configuration.colorType = 'double';
    if (newType === 'outlineFilled') {
      configuration.fillColor1 = '#bbd3fb';
      configuration.fillColor2 = '#bbd3fb';
      configuration.strokeColor2 = configuration.strokeColor1;
    } else {
      configuration.fillColor1 = 'transparent';
      configuration.fillColor2 = 'transparent';
    }
  }
);

// 监听颜色类型变化
watch(
  () => configuration.colorType,
  (newColorType) => {
    if (!initialized.value) return;
    if (newColorType === 'single') {
      configuration.strokeColor2 = configuration.strokeColor1;
    }
    if (newColorType === 'double') {
      if (configuration.strokeTypes === 'outlineFilled') {
        configuration.fillColor2 = configuration.fillColor1;
        configuration.strokeColor2 = configuration.strokeColor1;
      } else {
        configuration.strokeColor2 = '#0052d9';
      }
    }
    if (newColorType === 'multiple') {
      configuration.fillColor2 = '#f78d94';
      configuration.strokeColor2 = '#0052d9';
    }
  }
);

// 当前类型的总图标数
const currentTotalCount = computed(() => {
  return configuration.currentType === 'outline' ? outlineCount : filledCount;
});

// 当前类型的图标清单
const currentManifest = computed(() => {
  return configuration.currentType === 'outline' ? manifest.outline : manifest.filled;
});

// 过滤后的品牌和图标
const filteredBrands = computed(() => {
  const search = searchStr.value.toLowerCase().trim();
  
  if (!search) {
    return currentManifest.value;
  }
  
  return currentManifest.value.map(brandData => ({
    brand: brandData.brand,
    count: brandData.icons.filter(name => 
      name.toLowerCase().includes(search)
    ).length,
    icons: brandData.icons.filter(name => 
      name.toLowerCase().includes(search)
    ),
  })).filter(brandData => brandData.icons.length > 0);
});

// 过滤后的图标总数
const filteredCount = computed(() => {
  return filteredBrands.value.reduce((sum, brand) => sum + brand.icons.length, 0);
});

// 重置配置
const handleReset = () => {
  configuration.iconSize = initConfiguration.iconSize;
  configuration.strokeWidth = initConfiguration.strokeWidth;
  configuration.fillColor1 = configuration.currentType === 'filled' ? 'currentColor' : 'transparent';
  configuration.fillColor2 = initConfiguration.fillColor2;
  configuration.strokeColor1 = initConfiguration.strokeColor1;
  configuration.strokeColor2 = initConfiguration.strokeColor2;
};

// 隐藏弹出层
const hidePopover = () => {
  const popover = document.getElementById('icon-popover');
  if (popover && popperInstance) {
    popover.style.display = 'none';
    popperInstance.destroy();
    popperInstance = null;
  }
};

// 处理图标悬浮
const handleHoverIcon = (e: MouseEvent) => {
  let target = e.target as HTMLElement;
  
  // 向上查找 icon-wrapper 元素
  while (target && !target.classList.contains('icon-wrapper')) {
    target = target.parentNode as HTMLElement;
    if (!target || target === document.body) return;
  }
  
  if (!target || !target.classList.contains('icon-wrapper')) return;
  
  const brand = target.dataset.brand;
  const name = target.dataset.name;
  
  if (!brand || !name) return;
  
  currentIcon.value = { brand, name };
  
  const popover = document.getElementById('icon-popover');
  if (!popover) return;
  
  popover.style.display = 'block';
  
  popperInstance = createPopper(target, popover, {
    placement: 'right-start',
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left-start', 'right', 'left'],
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
};

// 获取当前图标的 SVG 字符串
const getCurrentSvg = (): string => {
  if (!currentIcon.value) return '';
  
  const { brand, name } = currentIcon.value;
  const symbolId = `icon-${brand}-${name}`;
  const symbol = document.getElementById(symbolId);
  
  if (!symbol) return '';
  
  const viewBox = symbol.getAttribute('viewBox') || '0 0 24 24';
  const content = symbol.innerHTML;
  
  return `<svg width="24" height="24" viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
};

// 复制图标
const handleCopyIcon = async (type: 'name' | 'svg') => {
  if (!currentIcon.value) return;
  
  try {
    if (type === 'name') {
      await navigator.clipboard.writeText(currentIcon.value.name);
    } else {
      const svgString = getCurrentSvg();
      await navigator.clipboard.writeText(svgString);
    }
    MessagePlugin.success('复制成功');
  } catch {
    MessagePlugin.error('复制失败');
  }
  
  hidePopover();
};

// 下载图标
const handleDownloadIcon = (type: 'svg' | 'png') => {
  if (!currentIcon.value) return;
  
  const svgString = getCurrentSvg();
  const { name } = currentIcon.value;
  
  try {
    if (type === 'svg') {
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = `${name}.svg`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // 转换为 PNG
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const canvas = document.createElement('canvas');
      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext('2d');
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      
      img.onload = () => {
        ctx?.drawImage(img, 0, 0, 48, 48);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.download = `${name}.png`;
        a.href = pngUrl;
        a.click();
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
    MessagePlugin.success('下载成功');
  } catch {
    MessagePlugin.error('下载失败');
  }
  
  hidePopover();
};

// 保存配置到 localStorage
const saveConfig = debounce(() => {
  localStorage.setItem('mp-svg-icons-config', JSON.stringify(configuration));
}, 500);

// 监听配置变化
watch(configuration, saveConfig, { deep: true });

// 监听点击事件，隐藏弹出层
onMounted(() => {
  document.addEventListener('click', (e) => {
    const content = document.querySelector('.icons-view__content');
    const popover = document.getElementById('icon-popover');
    
    if (
      content &&
      !content.contains(e.target as Node) &&
      popover &&
      !popover.contains(e.target as Node)
    ) {
      hidePopover();
    }
  });
  
  // 从 localStorage 恢复配置（对齐 tdesign-icons：不恢复 currentType）
  const savedConfig = localStorage.getItem('mp-svg-icons-config');
  if (savedConfig) {
    try {
      const config = JSON.parse(savedConfig);
      // 对齐 tdesign-icons：只恢复特定字段，不恢复 currentType
      configuration.colorType = config.colorType || initConfiguration.colorType;
      configuration.strokeTypes = config.strokeTypes || initConfiguration.strokeTypes;
      configuration.strokeWidth = config.strokeWidth ?? initConfiguration.strokeWidth;
      configuration.iconSize = config.iconSize ?? initConfiguration.iconSize;
      configuration.strokeColor1 = config.strokeColor1 || initConfiguration.strokeColor1;
      configuration.strokeColor2 = config.strokeColor2 || initConfiguration.strokeColor2;
      configuration.fillColor1 = config.fillColor1 || initConfiguration.fillColor1;
      configuration.fillColor2 = config.fillColor2 || initConfiguration.fillColor2;
    } catch {}
  }
  
  // 验证配置一致性：确保描边模式下的 fillColor 为 transparent
  if (configuration.currentType === 'outline' && configuration.strokeTypes === 'outline') {
    configuration.fillColor1 = 'transparent';
    configuration.fillColor2 = 'transparent';
  }
  
  // 标记为已初始化
  nextTick(() => {
    initialized.value = true;
  });
});
</script>

<style scoped>
.icons-view {
  min-height: 100vh;
  background-color: var(--td-bg-color-container);
}

/* 头部 */
.icons-view__header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--td-bg-color-container);
  border-bottom: 1px solid var(--td-component-border);
  padding: 16px 24px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.header-title h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--td-text-color-primary);
  margin: 0;
}

.icon-count {
  font-size: 14px;
  color: var(--td-text-color-secondary);
}

.search-input {
  width: 320px;
}

/* 主体 */
.icons-view__body {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 80px;
}

/* 图标内容区 */
.icons-view__content {
  flex: 1;
  padding: 24px;
  padding-right: 340px;
}

/* 品牌区块 */
.brand-section {
  margin-bottom: 32px;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--td-component-border);
}

.brand-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--td-text-color-primary);
}

.brand-count {
  font-size: 14px;
  color: var(--td-text-color-secondary);
}

/* 图标网格 */
.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
}

.icon-wrapper {
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

.icon-wrapper:hover {
  background-color: var(--td-bg-color-container-hover);
}

.icon-svg {
  margin-bottom: 8px;
  color: var(--td-text-color-primary);
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

/* 右侧操作栏 */
.icons-view__operations {
  position: fixed;
  right: max(24px, calc((100vw - 1400px) / 2));
  top: 100px;
  width: 280px;
  padding: 24px;
  background-color: var(--td-bg-color-secondarycontainer);
  border-radius: 8px;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
}

.operation-section {
  width: 100%;
}

.operation-label {
  font-size: 14px;
  color: var(--td-text-color-primary);
  margin-bottom: 12px;
}

/* 颜色选择器组 */
.color-pickers {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.color-picker-item {
  flex: 1;
  min-width: 100px;
}

.color-label {
  font-size: 12px;
  color: var(--td-text-color-secondary);
  margin-bottom: 8px;
}

/* 弹出操作菜单 */
.icons-view__popover {
  background-color: var(--td-bg-color-container);
  border: 1px solid var(--td-component-border);
  border-radius: 6px;
  padding: 6px;
  box-shadow: var(--td-shadow-2);
  z-index: 200;
}

.popover-item {
  padding: 8px 12px;
  font-size: 14px;
  color: var(--td-text-color-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.popover-item:hover {
  background-color: var(--td-bg-color-container-hover);
  color: var(--td-brand-color);
}

/* 空状态 */
.icons-view__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--td-text-color-primary);
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 14px;
  color: var(--td-text-color-secondary);
  margin: 0;
}

/* 响应式 */
@media screen and (max-width: 1200px) {
  .icons-view__content {
    padding-right: 24px;
  }
  
  .icons-view__operations {
    display: none;
  }
}
</style>
