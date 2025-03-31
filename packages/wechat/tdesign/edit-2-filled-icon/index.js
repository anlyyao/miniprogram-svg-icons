var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.0375 7.57319L16.4272 1.96289L12.2309 6.15922L17.8412 11.7695L22.0375 7.57319Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M16.427 13.1837L10.817 7.57373L1.99976 16.3904V22.0007L7.61005 22.0007L16.427 13.1837Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M12.6815 22.0007H22.2245V20.0007L12.6815 20.0007V22.0007Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
