var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 22.5C20.4853 22.5 22.5 20.4853 22.5 18C22.5 15.5147 20.4853 13.5 18 13.5C15.5147 13.5 13.5 15.5147 13.5 18C13.5 20.4853 15.5147 22.5 18 22.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20 10V7L15 2H4V22H10M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.4749 15.5251L15.5251 20.4749M21.182 21.182C19.4246 22.9393 16.5754 22.9393 14.818 21.182C13.0607 19.4246 13.0607 16.5754 14.818 14.818C16.5754 13.0607 19.4246 13.0607 21.182 14.818C22.9393 16.5754 22.9393 19.4246 21.182 21.182Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
