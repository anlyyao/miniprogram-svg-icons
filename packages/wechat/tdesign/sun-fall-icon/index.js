var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 14H2M5.63679 7.63484L4.92969 6.92773M12 4V5M19.0704 6.92773L18.3633 7.63484M22 14H21M7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M2 18H9L12 20L15 18H22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
