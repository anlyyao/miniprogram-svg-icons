var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.6604 7L12.0001 2L3.33984 7L3.33984 17L12.0001 22L20.6604 17L20.6604 7Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0001 20.95L12.0001 12.75M19.751 7.525L12.0001 12L4.24916 7.52501M20.6604 7L12.0001 2L3.33984 7L3.33984 17L12.0001 22L20.6604 17L20.6604 7Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12.0001 6L12.0001 8M15.464 14L17.1961 15M8.53625 14L6.8042 15" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
