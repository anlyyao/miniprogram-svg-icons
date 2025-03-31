var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.1048 6.00427L4.78744 15.3216L3.99805 20.0001L8.67652 19.2107L17.9939 9.89336L14.1048 6.00427Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.9936 9.89339L21.0506 6.83635L17.1615 2.94727L14.1045 6.0043L17.9936 9.89339Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M14.1048 6.00427L4.78744 15.3216L3.99805 20.0001L8.67652 19.2107L17.9939 9.89336M14.1048 6.00427L17.9939 9.89336M14.1048 6.00427L17.1615 2.94727L21.0506 6.83635L17.9939 9.89336" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
