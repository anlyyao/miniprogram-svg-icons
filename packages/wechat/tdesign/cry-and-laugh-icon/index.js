var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M15 14C14.6561 15.7252 13.4434 17 12 17C10.5566 17 9.34387 15.7252 9 14L15 14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 10H16M16 10H15M16 10V13M9 10H8M8 10H7M8 10V13M12 17C13.4434 17 14.6561 15.7252 15 14L9 14C9.34387 15.7252 10.5566 17 12 17Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
