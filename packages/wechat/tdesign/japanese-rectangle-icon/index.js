var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4V20H2L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4V20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M14 12.2143V9H17.5C17.7761 9 18 9.19188 18 9.42857V11.7857C18 12.0224 17.7761 12.2143 17.5 12.2143H14ZM14 12.2143V15M6 15H9.6C9.82091 15 10 14.9041 10 14.7857V9H7.5" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
