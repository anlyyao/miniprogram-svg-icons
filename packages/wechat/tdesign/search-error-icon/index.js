var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M15.8033 15.8033C18.7322 12.8744 18.7322 8.12563 15.8033 5.1967C12.8744 2.26777 8.12563 2.26777 5.1967 5.1967C3.73124 6.66216 2.99901 8.58319 3 10.5039M15.8033 15.8033L21.1066 21.1066M15.8033 15.8033C14.3388 17.2678 12.4194 18 10.5 18" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M1.67188 14.6716L4.5003 17.5001M4.5003 17.5001L7.32873 20.3285M4.5003 17.5001L1.67188 20.3285M4.5003 17.5001L7.32873 14.6716" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
