var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 22L4 22L4 2L20 2L20 22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20 22L4 22L4 2L20 2L20 22Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M8 14C8 11.7909 9.79086 10 12 10C14.2091 10 16 11.7909 16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M12 6H11.9961V5.99609H12V6Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});
