var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.2739 11.5454L14.0312 3.30273L5.78857 11.5454L14.0312 19.788L22.2739 11.5454Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M5.78828 11.5454L14.0309 3.30273L22.2736 11.5454L14.0309 19.788M5.78828 11.5454L14.0309 19.788M5.78828 11.5454L3.78835 13.5456C2.61678 14.7171 2.61677 16.6166 3.78835 17.7882L7.16212 21.162L12.6572 21.162M14.0309 19.788L12.6572 21.162M12.6572 21.162H18.9998" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
