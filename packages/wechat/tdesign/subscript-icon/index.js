var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M9 12.7352L4.01 20H4L9 12.7352ZM9 12.7352L10 11.2793M10 11.2793L15 4H14.99L10 11.2793ZM10 12.7352L14.99 20H15L10 12.7352ZM10 12.7352L8.98605 11.259M8.98605 11.259L4 4H4.01L8.98605 11.259Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M19.25 15H21.5C21.7761 15 22 15.2239 22 15.5V17C22 17.2761 21.7761 17.5 21.5 17.5H19.5C19.2239 17.5 19 17.7239 19 18V20H21.75" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
