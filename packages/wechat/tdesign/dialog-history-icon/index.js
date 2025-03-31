var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 14C11 17.3137 13.6863 20 17 20C20.3137 20 23 17.3137 23 14C23 10.6863 20.3137 8 17 8C13.6863 8 11 10.6863 11 14Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M1 4H23M1 9H7M1 14H7M1 19H7" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 12.336V13.9999L18.3333 15.3334M17 20C13.6863 20 11 17.3137 11 14C11 10.6863 13.6863 8 17 8C20.3137 8 23 10.6863 23 14C23 17.3137 20.3137 20 17 20Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
