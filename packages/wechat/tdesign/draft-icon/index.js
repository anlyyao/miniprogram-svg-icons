var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 17C13.8638 17 15.4299 15.7252 15.874 14H22V21H2V14H8.12602C8.57006 15.7252 10.1362 17 12 17Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 17C13.8638 17 15.4299 15.7252 15.874 14L20 14V3H4V14L8.12602 14C8.57006 15.7252 10.1362 17 12 17Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M4 14V3H20V14M15.874 14C15.4299 15.7252 13.8638 17 12 17C10.1362 17 8.57006 15.7252 8.12602 14H2V21H22V14H15.874Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8 7H16M8 11H12" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
