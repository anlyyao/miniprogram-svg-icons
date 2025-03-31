var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16 8.5L14 9.62501L14 10L16 11.5M8 8.5L10 9.62501L10 10L8.00001 11.5M7.5 16.5C7.5 15.3954 8.39542 14.5 9.5 14.5C10.0332 14.5 10.5177 14.7087 10.8763 15.0488C11.1352 15.2945 11.4523 15.5 11.8092 15.5H12.1908C12.5477 15.5 12.8648 15.2945 13.1237 15.0488C13.4823 14.7087 13.9668 14.5 14.5 14.5C15.6046 14.5 16.5 15.3954 16.5 16.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
