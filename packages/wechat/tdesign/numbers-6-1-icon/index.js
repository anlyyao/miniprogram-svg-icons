var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.12587 13C7.88442 13.5337 7.75 14.1261 7.75 14.75C7.75 17.0972 9.65279 19 12 19C14.3472 19 16.25 17.0972 16.25 14.75C16.25 12.4028 14.3472 10.5 12 10.5C10.2766 10.5 8.79286 11.5257 8.12587 13ZM8.12587 13L13 4.5H13.003L8.12587 13Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
