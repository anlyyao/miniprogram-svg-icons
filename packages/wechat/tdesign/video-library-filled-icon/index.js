var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.0001 2H6.00005V4H18.0001V2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M20.0001 5H4.00005V7H20.0001V5Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22.1612 8H1.83887L3.93887 22H20.0612L22.1612 8ZM15.1667 15L10.5 18.5V11.5L15.1667 15Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
