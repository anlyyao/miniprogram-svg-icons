var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 4H22V20H2V4Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M2 4H22V20H2V4Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M6 16H18M5.99609 11.5H6V11.5039H5.99609V11.5ZM9.99609 11.5H10V11.5039H9.99609V11.5ZM13.9961 11.5H14V11.5039H13.9961V11.5ZM17.9961 8.5H18V8.50391H17.9961V8.5ZM17.9961 11.5H18V11.5039H17.9961V11.5ZM13.9961 8.5H14V8.50391H13.9961V8.5ZM9.99609 8.5H10V8.50391H9.99609V8.5ZM5.99609 8.5H6V8.50391H5.99609V8.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
