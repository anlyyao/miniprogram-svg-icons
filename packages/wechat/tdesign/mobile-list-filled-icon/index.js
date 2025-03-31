var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 1H20V5H18V3H6V17H18V15H20V23H4V1ZM13.0039 19H11V21.0039H13.0039V19Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M24 7H13V9H24V7Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M21 11H13V13H21V11Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
