var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M1 14.5C1 17.5376 3.46243 20 6.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 11.7994 21.0536 9.55346 18.4872 9.08835C18.2748 5.69029 15.4516 3 12 3C8.54842 3 5.72518 5.69029 5.51282 9.08835C2.94636 9.55346 1 11.7994 1 14.5Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M1 14.5C1 17.5376 3.46243 20 6.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 11.7994 21.0536 9.55346 18.4872 9.08835C18.2748 5.69029 15.4516 3 12 3C8.54842 3 5.72518 5.69029 5.51282 9.08835C2.94636 9.55346 1 11.7994 1 14.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15 11.5L12 8.5L9 11.5M12 16V13M12 13V9V12V13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
