var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.25 16.75C22.25 20.0035 18.5 22.5 18.5 22.5C18.5 22.5 14.75 20.0035 14.75 16.75C14.75 14.6789 16.4289 13 18.5 13C20.5711 13 22.25 14.6789 22.25 16.75Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 10V3H2V17H11M4 21H11" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.25 17H18.75M22.25 16.75C22.25 20.0035 18.5 22.5 18.5 22.5C18.5 22.5 14.75 20.0035 14.75 16.75C14.75 14.6789 16.4289 13 18.5 13C20.5711 13 22.25 14.6789 22.25 16.75Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
