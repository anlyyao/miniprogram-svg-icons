var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 12C2 17.5228 6.47715 22 12 22V2C6.47715 2 2 6.47715 2 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 12C22 17.5228 17.5228 22 12 22V2C17.5228 2 22 6.47715 22 12Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M12 6.57241L17.2945 3.51562M12 12.9233L21.0341 7.70745M12 19.2742L21.8773 13.5715M12 2V22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
