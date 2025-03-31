var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21.962 6.28235L17.7197 2.04004L9.94034 8.39867L7.81896 6.27728L3.57422 10.522L13.4737 20.4215L17.7185 16.1768L15.5972 14.0555L21.962 6.28235Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2.16016 21.8358L8.52412 15.4718M17.7197 2.04004L21.9621 6.28235L15.5973 14.0555L17.7185 16.1768L13.4738 20.4215L3.57431 10.522L7.81905 6.27728L9.94043 8.39867L17.7197 2.04004Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
