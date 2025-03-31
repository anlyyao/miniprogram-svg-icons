var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 3H23V21H1V3ZM5 11V13H11V11H5ZM5 15V17H19V15H5ZM16.502 8.6875L19 10.75L19 5L14.0039 5V10.75L16.502 8.6875Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
