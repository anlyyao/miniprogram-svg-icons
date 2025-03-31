var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.10059 9.10049C7.56793 3.63315 16.4323 3.63319 21.8996 9.10049M6.69678 13.6967C9.62572 10.7677 14.3745 10.7678 17.3034 13.6967M11.293 18.2929C11.6835 17.9024 12.3167 17.9024 12.7072 18.2929L12.0001 19L11.293 18.2929Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
