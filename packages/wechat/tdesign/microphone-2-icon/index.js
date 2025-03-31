var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 8C22 11.3137 19.3137 14 16 14C12.6863 14 10 11.3137 10 8C10 4.68629 12.6863 2 16 2C19.3137 2 22 4.68629 22 8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10 8C10 11.3137 12.6863 14 16 14L6.50007 21.5002C6.50007 21.5002 5.45836 22.457 3.50007 20.5002C1.54178 18.5433 2.50007 17.5002 2.50007 17.5002L10 8Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M16 14C12.6863 14 10 11.3137 10 8M16 14L6.50007 21.5002C6.50007 21.5002 5.45836 22.457 3.50007 20.5002C1.54178 18.5433 2.50007 17.5002 2.50007 17.5002L10 8M16 14C19.3137 14 22 11.3137 22 8C22 4.68629 19.3137 2 16 2C12.6863 2 10 4.68629 10 8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M9 15L8 16" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
