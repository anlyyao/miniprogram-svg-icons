var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 10V7L15 2H4V22H20M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 13V19M11 19H10.5C9.94772 19 9.5 18.5523 9.5 18V14C9.5 13.4477 9.94772 13 10.5 13H11M19 19V13H21C21.5523 13 22 13.4477 22 14V19M13.5 14V18C13.5 18.5523 13.9477 19 14.5 19H15.5C16.0523 19 16.5 18.5523 16.5 18V14C16.5 13.4477 16.0523 13 15.5 13H14.5C13.9477 13 13.5 13.4477 13.5 14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
