var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 9.53158L12 1.19824L2 9.53158V22H7.5V13.5H16.5V22H22V9.53158Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M14.5 22H9.5V15.5H14.5V22Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
