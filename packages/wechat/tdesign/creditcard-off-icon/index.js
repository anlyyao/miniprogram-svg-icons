var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8010)"><path d="M17.001 10.0019H16.001L16 10.0009L17.001 10.0019ZM17.001 10.0019L22 10.001M22 10.001L22.001 10.0019L22 9.00096M22 10.001V9.00096M22 10.001V15.001M22 15.001V16.001L22.001 16.0019L22 15.001ZM11.001 4.00195H10.001L10 4.00095L11.001 4.00195ZM11.001 4.00195L22 4.00097V9.00096M6 15H9M2 10H9M4 4L2 4V20H20L4 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 22L2 2" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
