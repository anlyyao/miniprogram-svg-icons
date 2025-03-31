var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2V4H9V2H11V4H13V2H15V4H17V2H19V14H21V13H23V22H15.5V14H8.5V22H1V13H3V14H5V2H7Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M13.5 22V16H10.5V22H13.5Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
