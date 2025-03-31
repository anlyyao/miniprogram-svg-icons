var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.9858 8.75736L15.5312 3.30273L7.28857 11.5454L12.7432 17L20.9858 8.75736Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M7.2888 11.5454L3.16748 15.6667L8.6292 21.1284L12.7434 17M7.2888 11.5454L15.5314 3.30273L20.9861 8.75736L12.7434 17M7.2888 11.5454L12.7434 17" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 17H19M21 21H14" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
