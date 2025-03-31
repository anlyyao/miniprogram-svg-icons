var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.9999 3L21.5262 19.5H2.47363L11.9999 3Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.9999 3L21.5262 19.5H2.47363L11.9999 3Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10V13M12 13L9 15.5M12 13L15 15.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
