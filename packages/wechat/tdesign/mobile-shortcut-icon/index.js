var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 19V22H5V2H19V5M12 18H12.0039V18.0039H12V18Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M16.0571 13.0567L15.7058 12.3509L15 11.9996L15.7058 11.6483L16.0571 10.9426L16.4084 11.6483L17.1141 11.9996L16.4084 12.3509L16.0571 13.0567Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.1052 8.39062L21.1403 8.46114L21.2108 8.49624L21.1403 8.53134L21.1052 8.60185L21.0701 8.53134L20.9996 8.49624L21.0701 8.46114L21.1052 8.39062Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21.1052 15.4004L21.1403 15.4709L21.2108 15.506L21.1403 15.5411L21.1052 15.6116L21.0701 15.5411L20.9996 15.506L21.0701 15.4709L21.1052 15.4004Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});
