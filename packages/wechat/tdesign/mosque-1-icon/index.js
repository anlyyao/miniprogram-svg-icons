var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M10 5.58569V7.68228C11.0749 6.06551 12.913 4.9999 15 4.9999C17.973 4.9999 20.4409 7.16219 20.917 9.9999H22V21.9999H2V5.58569L6 1.58569L10 5.58569Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13 15V21H17V15H13Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M6.00391 9V9.00391H6M13 21V15H17V21H13Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M9 21H3V6L6 3L9 6V11M9 21V11M9 21H21V11H20M9 11H10M10 11H20M10 11C10 8.23858 12.2386 6 15 6M20 11C20 8.23858 17.7614 6 15 6M15 6V4.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
