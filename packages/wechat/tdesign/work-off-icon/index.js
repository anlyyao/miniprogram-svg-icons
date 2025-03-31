var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8211)"><path d="M14.001 7.50198H13.001L13 7.50098L14.001 7.50198ZM14.001 7.50198L21 7.501V14.501M21 14.501V15.501L21.001 15.502L21 14.501ZM8.5 3.5H15.5V7.5M8.5 3.5L8.5 3.67297L8.49902 3.67197L8.5 3.5ZM3 7.5H7.5L20.5 20.5H3V7.5Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M22 22L2 2" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
