var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 4V20H2L2 4L22 4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 4V20L2 20L2 4L22 4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M10 9H6.5C6.22386 9 6 9.19188 6 9.42857V12M6 12H10M6 12V14.5714C6 14.8081 6.22386 15 6.5 15H10M14 15V9H17.5556C17.801 9 18 9.19188 18 9.42857V15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
