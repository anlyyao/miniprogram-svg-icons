var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16 19L16 5.5C16 5.22386 15.7761 5 15.5 5L8.5 5C8.22386 5 8 5.22386 8 5.5L8 18.5C8 18.7761 8.22386 19 8.5 19H16ZM16 19H17.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
