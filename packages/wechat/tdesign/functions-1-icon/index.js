var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 4H4C3.44772 4 3 4.44772 3 5V12M3 12H11M3 12V20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M21 11L21 12.1363C21 12.4345 20.8669 12.7171 20.6371 12.9071L17.5 15.5M14 11L14 12.1363C14 12.4345 14.1331 12.7171 14.3629 12.9071L17.5 15.5M17.5 15.5L14.3629 18.0929C14.1331 18.2829 14 18.5655 14 18.8637L14 20M17.5 15.5L20.6371 18.0929C20.8669 18.2829 21 18.5655 21 18.8637L21 20" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
