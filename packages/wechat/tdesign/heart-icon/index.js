var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M4.19633 12.1965C2.15461 10.1548 2.15461 6.84451 4.19634 4.80278C6.23806 2.76105 9.54836 2.76105 11.5901 4.80278L12.0008 5.21354L12.4108 4.80429C14.4525 2.76256 17.7628 2.76256 19.8046 4.80429C21.8463 6.84602 21.8463 10.1563 19.8046 12.198L12 20.0011L4.19633 12.1965Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M4.19633 12.1965C2.15461 10.1548 2.15461 6.84451 4.19634 4.80278C6.23806 2.76105 9.54836 2.76105 11.5901 4.80278L12.0008 5.21354L12.4108 4.80429C14.4525 2.76256 17.7628 2.76256 19.8046 4.80429C21.8463 6.84602 21.8463 10.1563 19.8046 12.198L12 20.0011L4.19633 12.1965Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
