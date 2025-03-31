var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10H22V22H16V16H8V22H2V10Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M10 22V18H14V22H10Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M21 2H9V4H10V8H20V4H21V2ZM15.0039 4.99805V7.00195H13V4.99805H15.0039Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
