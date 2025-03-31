var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M9.70802 2.5C10.0938 1.61705 10.9748 1 12 1C13.0252 1 13.9062 1.61705 14.292 2.5H20.5V21.5H3.5V2.5H9.70802Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M9.70802 2.5C10.0938 1.61705 10.9748 1 12 1C13.0252 1 13.9062 1.61705 14.292 2.5H20.5V21.5H3.5V2.5H9.70802Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 8.5V12.5M12 15.9961H12.0039V16H12V15.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
