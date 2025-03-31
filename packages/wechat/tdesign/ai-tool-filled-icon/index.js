var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 22H2V13H11V22Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 22H13V13H22V22Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M11 11H2V2H11V11Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M19.4551 4.54395L22.6797 6L19.4551 7.45508L18 10.6797L16.5439 7.45508L13.3203 6L16.5439 4.54395L18 1.32031L19.4551 4.54395Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
