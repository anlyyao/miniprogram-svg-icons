var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 20V18H22V20H12ZM12 13V11L22 11V13L12 13ZM12 6V4H22V6H12Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M2 10L2 2L10 2V10H2Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M2 22L2 14H10V22H2Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
