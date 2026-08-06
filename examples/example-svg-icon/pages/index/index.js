const { manifest } = require('./icons-data');

// 初始配置
const initConfiguration = {
  iconSize: 24,
  iconCategory: 'outline', // 图标分类：outline（描边） | filled（填充）
  panelIconType: 'outline', // 操作面板中的图标填充类型
  colorType: 'single', // single（单色） | double（双色） | multiple（多色，仅描边+填充时可选）
  strokeWidth: 2, // 实际线条粗细值（0.5-2.5）
  fillColor1: 'transparent', // 填充颜色1
  fillColor2: 'transparent', // 填充颜色2
  strokeColor1: 'currentColor', // 线条颜色1
  strokeColor2: 'currentColor', // 线条颜色2
};

// 每次加载的分类数量
const CATEGORY_PAGE_SIZE = 3;

Page({
  data: {
    // 配置状态
    ...initConfiguration,

    // 弹窗控制
    popupVisible: false,

    // ColorPicker 弹窗控制
    colorPickerPopupProps: {
      zIndex: 115002,
      overlayProps: {
        zIndex: 115001,
      },
    },
    colorPickerVisible: false,
    activeColorKey: '', // 当前编辑的颜色字段名（fillColor1/fillColor2/strokeColor1/strokeColor2）
    activeColorValue: '', // 当前编辑的颜色值

    // 图标列表（分类展示）
    iconCategories: [],

    // 懒加载状态
    isLoadingMore: false,
    hasMoreCategories: true,

    // 传递给 t-icon 的计算属性
    iconStrokeColor: '#000000',
    iconFillColor: 'transparent',

    // ========== 方案一（<use> 引用 mask）验证专区 ==========
    // 这些图标经检测存在几何重叠的多层 alpha 填充，编译期会注入 mask（方案一用
    // <use> 引用可视层节点、而非克隆几何）。这里对它们同时赋予半透明的填充色与
    // 描边色：若 mask 正确生效，描边与填充的重叠区域不会出现透明度叠加变深；
    // 若 mask 失效（如<use>兼容性问题），重叠区会明显加深。
    overlapDemoIcons: ['ability-open', 'abstract', 'accessibility', 'add-circle', 'browse-off', 'robot-2'],
    // 半透明红色填充 + 半透明蓝色描边，重叠区最易观察是否叠加变深/变色
    demoFillColor: ['rgba(255, 0, 0, 0.34)', 'rgba(237, 28, 230, 1)'],
    demoStrokeColor: ['rgba(0, 0, 255, 0.5)', 'rgba(178, 224, 42, 0.44)'],
  },

  // 所有分类数据缓存
  _allCategories: [],
  // 当前已加载的分类索引
  _loadedCategoryIndex: 0,

  onLoad() {
    this.initIconList();
    this.updateIconColors();
  },

  // ========== 图标列表初始化 ==========
  initIconList(category) {
    const iconCategory = category || this.data.iconCategory;
    const typeData = manifest[iconCategory] || {};

    // 与桌面端保持一致：对分类键进行字母排序
    this._allCategories = Object.keys(typeData)
      .sort()
      .map((key) => ({
        key,
        labelCN: typeData[key].labelCN,
        icons: typeData[key].icons.map((icon) => icon.name),
      }));
    this._loadedCategoryIndex = 0;

    console.log('[initIconList] _allCategories:', this._allCategories.length, 'categories');
    if (this._allCategories.length > 0) {
      console.log('[initIconList] first category icons sample:', this._allCategories[0].icons.slice(0, 3));
    }

    // 清空已有数据，重新加载
    this.setData(
      {
        iconCategories: [],
        hasMoreCategories: true,
      },
      () => {
        // 首次加载前几个分类
        this.loadMoreCategories();
      },
    );
  },

  // ========== 加载更多分类 ==========
  loadMoreCategories() {
    if (this.data.isLoadingMore || !this.data.hasMoreCategories) return;

    const startIndex = this._loadedCategoryIndex;
    const endIndex = Math.min(startIndex + CATEGORY_PAGE_SIZE, this._allCategories.length);

    console.log('[loadMoreCategories] startIndex:', startIndex, 'endIndex:', endIndex);

    if (startIndex >= this._allCategories.length) {
      this.setData({ hasMoreCategories: false });
      return;
    }

    this.setData({ isLoadingMore: true });

    // 使用 setTimeout 分片加载，避免阻塞主线程
    setTimeout(() => {
      const newCategories = this._allCategories.slice(startIndex, endIndex);
      const currentCategories = this.data.iconCategories;

      console.log(
        '[loadMoreCategories] newCategories:',
        newCategories.map((c) => c.key),
      );
      if (newCategories.length > 0 && newCategories[0].icons.length > 0) {
        console.log('[loadMoreCategories] first icon name:', newCategories[0].icons[0]);
      }

      this._loadedCategoryIndex = endIndex;

      this.setData({
        iconCategories: [...currentCategories, ...newCategories],
        isLoadingMore: false,
        hasMoreCategories: endIndex < this._allCategories.length,
      });
    }, 50);
  },

  // ========== 滚动到底部加载更多 ==========
  onScrollToLower() {
    this.loadMoreCategories();
  },

  // ========== 颜色计算 ==========
  updateIconColors() {
    const { iconCategory, panelIconType, colorType, strokeColor1, strokeColor2, fillColor1, fillColor2 } = this.data;

    let iconStrokeColor;
    let iconFillColor;

    if (iconCategory === 'filled') {
      // 填充图标：只有填充颜色，线条颜色使用 currentColor（不覆盖模板默认值）
      iconStrokeColor = 'currentColor';
      iconFillColor = fillColor1;
    } else {
      // 描边图标(outline)：根据面板配置决定颜色
      if (panelIconType === 'outline') {
        // 描边图标模式
        if (colorType === 'single') {
          // 单色：线条颜色只有1种
          iconStrokeColor = strokeColor1;
        } else {
          // 双色：线条颜色有2种
          iconStrokeColor = [strokeColor1, strokeColor2];
        }
        iconFillColor = 'transparent';
      } else {
        // 描边+填充图标模式
        if (colorType === 'double') {
          // 双色：线条颜色1种，填充颜色1种
          iconStrokeColor = strokeColor1;
          iconFillColor = fillColor1;
        } else {
          // 多色：线条颜色2种，填充颜色2种
          iconStrokeColor = [strokeColor1, strokeColor2];
          iconFillColor = [fillColor1, fillColor2];
        }
      }
    }

    this.setData({ iconStrokeColor, iconFillColor });
  },

  // ========== 弹窗控制 ==========
  onShowPopup() {
    this.setData({ popupVisible: true });
  },

  onPopupVisibleChange(e) {
    this.setData({ popupVisible: e.detail.visible });
  },

  // 阻止 slider 触摸事件冒泡到 scroll-view
  catchTouchMove() {
    // 空函数，仅用于阻止事件冒泡
  },

  // ========== 图标分类切换（影响页面图标展示）==========
  onIconCategoryChange(e) {
    const iconCategory = e.detail.value;
    const { fillColor1 } = this.data;
    const updates = { iconCategory };

    // 切换图标分类时自动调整 fillColor1
    if (iconCategory === 'filled' && fillColor1 === 'transparent') {
      // 切换到填充图标时，fillColor1 自动设为 currentColor
      updates.fillColor1 = 'currentColor';
    } else if (iconCategory === 'outline' && fillColor1 === 'currentColor') {
      // 切换到描边图标时，fillColor1 自动设为 transparent
      updates.fillColor1 = 'transparent';
    }

    this.setData(updates);
    // 重新加载对应分类的图标列表
    this.initIconList(iconCategory);
    // 更新图标颜色
    this.updateIconColors();
  },

  // ========== ColorPicker 弹窗控制 ==========
  // 每次打开设置初始色并显示弹窗。wxml 中通过 wx:if 重建组件实例，
  // 组件以非受控 default-value 回填 activeColorValue，避免受控 value
  // 反复触发内部 init 导致 alpha(透明度) 滑轨无法拖动。
  openColorPicker(activeColorKey, activeColorValue) {
    this.setData({
      activeColorKey,
      activeColorValue,
      colorPickerVisible: true,
    });
  },

  onShowFillColor1Picker() {
    const fillColor1 = this.data.fillColor1;
    this.openColorPicker(
      'fillColor1',
      fillColor1 === 'transparent' || fillColor1 === 'currentColor' ? '#000000' : fillColor1,
    );
  },

  onShowFillColor2Picker() {
    this.openColorPicker('fillColor2', this.data.fillColor2 === 'transparent' ? '#000000' : this.data.fillColor2);
  },

  onShowStrokeColor1Picker() {
    this.openColorPicker('strokeColor1', this.data.strokeColor1);
  },

  onShowStrokeColor2Picker() {
    this.openColorPicker('strokeColor2', this.data.strokeColor2);
  },

  onColorPickerChange(e) {
    const value = e.detail.value;
    const { activeColorKey } = this.data;
    // 实时回传颜色（受控 value + format=HEX8 包含透明度）。
    // 同步更新对应颜色配置并刷新图标预览，拖动时即可看到实时效果。
    const updates = { activeColorValue: value };
    if (activeColorKey) {
      updates[activeColorKey] = value;
    }
    this.setData(updates, () => this.updateIconColors());
  },

  onPaletteBarChange(e) {
    const { color } = e.detail;
    console.log('[onPaletteBarChange] color:', color);
  },

  onColorPickerClose() {
    const { activeColorKey, activeColorValue } = this.data;

    // 关闭时将颜色值更新到实际配置
    if (activeColorKey && activeColorValue) {
      this.setData({
        [activeColorKey]: activeColorValue,
        colorPickerVisible: false,
        activeColorKey: '',
      });
      this.updateIconColors();
    } else {
      this.setData({
        colorPickerVisible: false,
        activeColorKey: '',
      });
    }
  },

  // ========== 面板图标类型切换（仅影响颜色选项显示）==========
  onPanelIconTypeChange(e) {
    const panelIconType = e.detail.value;
    const updates = { panelIconType };

    // 描边图标的颜色类型：单色、双色
    // 描边+填充图标的颜色类型：双色、多色
    if (panelIconType === 'outline') {
      // 切换到描边图标时，如果是 multiple，改为 double
      if (this.data.colorType === 'multiple') {
        updates.colorType = 'double';
      }
      // 切换到描边图标时，填充颜色设为 transparent
      updates.fillColor1 = 'transparent';
      updates.fillColor2 = 'transparent';
    } else {
      // 切换到描边+填充图标时，如果是 single，改为 double
      if (this.data.colorType === 'single') {
        updates.colorType = 'double';
      }
      // 切换到描边+填充图标时，自动设置默认填充颜色
      updates.fillColor1 = '#bbd3fb';
      updates.fillColor2 = '#bbd3fb';
      updates.strokeColor2 = this.data.strokeColor1;
    }

    this.setData(updates);
    this.updateIconColors();
  },

  // ========== 颜色类型切换（single / double / multiple）==========
  onColorTypeChange(e) {
    const colorType = e.detail.value;
    const { panelIconType, strokeColor1, fillColor1 } = this.data;
    const updates = { colorType };

    if (colorType === 'single') {
      // 单色模式：strokeColor2 同步为 strokeColor1
      updates.strokeColor2 = strokeColor1;
    } else if (colorType === 'double') {
      if (panelIconType === 'outlineFilled') {
        // 描边+填充双色模式：fillColor2 同步 fillColor1，strokeColor2 同步 strokeColor1
        updates.fillColor2 = fillColor1;
        updates.strokeColor2 = strokeColor1;
      } else {
        // 描边双色模式：strokeColor2 设为蓝色
        updates.strokeColor2 = '#0052d9';
      }
    } else if (colorType === 'multiple') {
      // 多色模式：fillColor2 设为粉色，strokeColor2 设为蓝色
      updates.fillColor2 = '#f78d94';
      updates.strokeColor2 = '#0052d9';
    }

    this.setData(updates);
    this.updateIconColors();
  },

  // ========== 线条粗细 ==========
  onStrokeWidthChange(e) {
    const sliderValue = e.detail.value;
    this.setData({
      strokeWidth: sliderValue,
    });
  },

  // ========== 重置配置 ==========
  onResetConfig() {
    // 与桌面端 handleReset 保持一致
    const fillColor1 = this.data.iconCategory === 'filled' ? 'currentColor' : initConfiguration.fillColor1;

    // 重置所有配置到初始值
    this.setData({
      fillColor1: fillColor1,
      fillColor2: initConfiguration.fillColor2,
      strokeColor1: initConfiguration.strokeColor1,
      strokeColor2: initConfiguration.strokeColor2,
      strokeWidth: initConfiguration.strokeWidth,
    });
    this.updateIconColors();

    // 重新加载当前分类的图标列表，强制重建图标组件以确保颜色正确应用
    this.initIconList(this.data.iconCategory);
  },
});
