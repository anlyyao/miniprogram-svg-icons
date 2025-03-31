var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21L21 21L21 15.5L15.7092 15.5C15.1159 16.9659 13.6787 18 12 18C10.3213 18 8.88415 16.9659 8.29076 15.5L3 15.5L3 21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 21V3L3 3L3 21M21 21H3M21 21L21 15.5H15.7092C15.1159 16.9659 13.6787 18 12 18C10.3213 18 8.88415 16.9659 8.29076 15.5H3L3 21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 9.5L12 6.5L15 9.5M12 13V7.25" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
