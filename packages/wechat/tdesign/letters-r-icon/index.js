var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8 12V5H15.5C15.7761 5 16 5.22386 16 5.5V11.5C16 11.7761 15.7761 12 15.5 12H10M8 12V19M8 12H10M16.5 19V17.7319C16.5 17.5848 16.4352 17.4452 16.323 17.3502L10 12" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
