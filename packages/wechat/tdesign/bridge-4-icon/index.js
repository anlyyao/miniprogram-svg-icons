var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21.0004V8.00021L3.10005 3.50027M8 21.0004V8.00021L8.9 3.50027M20 21V8L20.9 3.5M16 21.0004V8.00021L15.1 3.50002M2 3.00042L9 3.00028C9.90938 3.00033 13.8757 2.99995 15 3.00001L22 3.00042" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
