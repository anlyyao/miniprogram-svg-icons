var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2V8H22V2H2ZM4 4H6.00391V6.00391H4V4Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M2 10.0005V22.0005H22V10.0005H2ZM5 13.0005L19 13.0005V15.0005L5 15.0005V13.0005ZM5 17.0005H11V19.0005H5V17.0005Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
