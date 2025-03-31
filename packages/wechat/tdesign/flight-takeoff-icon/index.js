var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M6.10495 4.01764L8.0368 3.5L14.7438 9.98507L20.2496 8.50981C21.0498 8.29539 21.8723 8.77027 22.0867 9.57047C22.3011 10.3707 21.8262 11.1932 21.026 11.4076L4.12233 15.9369L1.8623 11.3661L3.31119 10.9779L4.98794 12.5991L10.1073 11.2274L6.10495 4.01764Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6.10495 4.01764L8.0368 3.5L14.7438 9.98507L20.2496 8.50981C21.0498 8.29539 21.8723 8.77027 22.0867 9.57047C22.3011 10.3707 21.8262 11.1932 21.026 11.4076L4.12233 15.9369L1.8623 11.3661L3.31119 10.9779L4.98794 12.5991L10.1073 11.2274L6.10495 4.01764Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M3 20H21" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
