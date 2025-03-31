var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 3.11768C10.136 3.11768 8.625 4.61884 8.625 6.47062C8.625 8.32239 10.136 9.82356 12 9.82356C13.864 9.82356 15.375 8.32239 15.375 6.47062C15.375 4.61884 13.864 3.11768 12 3.11768Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 3.11765C10.136 3.11765 8.625 4.61881 8.625 6.47059C8.625 8.32237 10.136 9.82353 12 9.82353C13.864 9.82353 15.375 8.32237 15.375 6.47059C15.375 4.61881 13.864 3.11765 12 3.11765ZM12 3.11765V2M3 16L21 16M12 14V18M14.7762 9.2L21 21M9.22375 9.2L3 21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
