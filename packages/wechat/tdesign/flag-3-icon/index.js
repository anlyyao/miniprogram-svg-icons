var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 9.99998L9 16.9282L9 3.07178L21 9.99998Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5 2L5 22M21 9.99998L9 16.9282L9 3.07178L21 9.99998Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
