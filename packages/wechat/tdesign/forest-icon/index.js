var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 15.9995L7 2.99951L2 15.9999L12 15.9995Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 15.9995L17 2.99951L22 15.9999L12 15.9995Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 15.9995L17 2.99951L22 15.9999L12 15.9995ZM12 15.9995L7 2.99951L2 15.9999L12 15.9995ZM7 4L7 21M17 4V21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
