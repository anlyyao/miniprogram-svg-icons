var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M4 21.3135H20V22.3135H4V21.3135Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.414 1.41406L20.8993 9.89934L12.414 18.3846L3.92871 9.89934L12.414 1.41406Z" fill="{{fillColor1 || 'transparent'}}" /><g><path d="M12.414 1.41406L20.8993 9.89934L12.414 18.3846L3.92871 9.89934L12.414 1.41406Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6.75725 12.7275L9.58568 15.556L8.17147 16.9702H5.34304L3.92883 15.556L6.75725 12.7275Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});
