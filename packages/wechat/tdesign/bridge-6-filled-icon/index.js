var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.0005 1.75439L12.0002 11.6546L1 1.75439V21H3V14H5V21H7V14H17V21H19V14H21V21H23L23.0005 1.75439Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
