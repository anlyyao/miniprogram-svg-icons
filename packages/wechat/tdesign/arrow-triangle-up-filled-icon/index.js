var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12H19.5L12 2L4.5 12H9V22H15V12Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
