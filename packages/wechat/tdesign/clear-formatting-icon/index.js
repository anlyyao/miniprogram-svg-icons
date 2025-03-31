var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.2739 11.5454L14.0312 3.30273L5.78861 11.5454L14.0312 19.788L22.2739 11.5454Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.78831 11.5454L1.66699 15.6667L7.16209 21.1618L18.9997 21.1618M5.78831 11.5454L14.031 3.30273L22.2736 11.5454L14.031 19.788L5.78831 11.5454ZM14.3561 19.4648L12.6696 21.1635L13.2251 20.6039" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
