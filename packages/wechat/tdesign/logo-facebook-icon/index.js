var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M18 1H14C11.2386 1 9 3.23858 9 6V9.5H5.25V14H9V23H14V14H17L18 9.5H14V6.5C14 5.94772 14.4477 5.5 15 5.5H18V1Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M18 1H14C11.2386 1 9 3.23858 9 6V9.5H5.25V14H9V23H14V14H17L18 9.5H14V6.5C14 5.94772 14.4477 5.5 15 5.5H18V1Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
