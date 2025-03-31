var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 1H15.4142L21 6.58579V23H3V1ZM14.5 3V7.5H19L14.5 3Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
