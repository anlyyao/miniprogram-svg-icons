var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.4965 5L1.97021 21.5H11.4965V5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M11.4965 6V21M11.4965 11H14.5002M11.4965 14.5H16.5002M11.4965 18H18.5002M11.4965 5L21.0228 21.5H1.97021L11.4965 5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.25 3L19.7697 4.23028L21 4.75L19.7697 5.26972L19.25 6.5L18.7303 5.26972L17.5 4.75L18.7303 4.23028L19.25 3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
