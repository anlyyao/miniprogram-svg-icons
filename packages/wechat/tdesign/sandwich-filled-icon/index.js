var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.8 2.51531C14.6382 2.05807 15.6828 2.25718 16.2941 2.99074L21 8.63779H3V8.40621L13.8 2.51531Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M3 17.3677H21V21.9977H3V17.3677Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M21 10.6406H3V15.2706H21V10.6406Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
