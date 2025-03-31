var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12.0001 22L3.33984 17V7L12.0001 2L20.6604 7V17L12.0001 22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12.0001 12L20.6604 7M12.0001 12L12.0001 22M12.0001 12L3.33984 7M20.6604 7L12.0001 2L3.33984 7M20.6604 7V17L12.0001 22M12.0001 22L3.33984 17V7M20.6604 12.0059L16.3398 14.5003V19.4948L20.6604 17.0003V12.0059ZM12 2L16.3302 4.5L12 7L7.66992 4.5L12 2ZM3.33984 17.0003V12.0059L7.66035 14.5003V19.4947L3.33984 17.0003Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="round" /><g><path fill-rule="evenodd" clip-rule="evenodd" d="M20.6604 12.0059L16.3398 14.5003V19.4948L20.6604 17.0003V12.0059Z" fill="{{fillColor2 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M16.3302 4.5L12 2L7.66992 4.5L12 7L16.3302 4.5Z" fill="{{fillColor2 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M7.66035 19.4947V14.5003L3.33984 12.0059V17.0003L7.66035 19.4947Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});
