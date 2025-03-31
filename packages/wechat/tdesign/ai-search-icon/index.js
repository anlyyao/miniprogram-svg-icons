var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_365_141)"><path d="M16.75 2.5L17.2697 3.73028L18.5 4.25L17.2697 4.76972L16.75 6L16.2303 4.76972L15 4.25L16.2303 3.73028L16.75 2.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M15.8027 15.8037L21.106 21.107M15.8027 15.8037C12.8738 18.7327 8.12563 18.7323 5.1967 15.8033C2.26777 12.8744 2.26777 8.12565 5.1967 5.19672C6.53393 3.85949 8.25048 3.13278 10 3.0166M15.8027 15.8037C17.14 14.4664 17.8669 12.7497 17.9831 11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
