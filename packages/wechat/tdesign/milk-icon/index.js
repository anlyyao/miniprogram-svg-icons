var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16.85 4.8V2H12H7.15V4.8L5 9.7V22H19V9.7L16.85 4.8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15.05 22H19V9.7L16.85 4.8V2H7.15V4.8L5 9.7V22H15.05ZM15.05 22V9.7L16.625 5.4125M5.5 9.7H14.55M7.65 4.8H16.35" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 18V14H8.001L10 16L11.99 14H12V18" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
