var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 2H21L20 19.5L12 22.5L4 19.5L3 2Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 2H21L20 19.5L12 22.5L4 19.5L3 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M16.5 6H17.2714L17.2709 6.00771L16.5 6ZM16.5 6H6.72852L7.03576 11.3768L11.2549 11.3768L16.9641 11.3768L16.6569 16.7537L12 18.5L7.34301 16.7536L7.2662 15.4094L7.2566 15.2414M7.2566 15.2414L7.24699 15.0734H7.25L7.2566 15.2414Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
