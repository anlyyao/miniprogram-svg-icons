var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 11V7L15 2H4V22H11M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M14 19C14 21.2091 15.7909 23 18 23C20.2091 23 22 21.2091 22 19C22 16.7909 20.2091 15 18 15H15.75M17 13L15 15L17 17" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
