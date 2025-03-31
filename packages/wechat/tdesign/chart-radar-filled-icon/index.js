var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0011 1.48999L1.81469 8.1643L11.0011 11.1491V1.48999Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M1.19604 10.0662L4.70517 20.8662L10.3831 13.0513L1.19604 10.0662Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M6.32406 22.0406H17.6781L12.0011 14.2268L6.32406 22.0406Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M19.2953 20.8638L22.8033 10.0671L13.6191 13.0513L19.2953 20.8638Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22.1857 8.16488L13.0011 1.49184V11.1491L22.1857 8.16488Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
