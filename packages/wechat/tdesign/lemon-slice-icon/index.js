var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 10.4882C22 7.55726 19.935 3.90646 18 2L10.5 9.5L3 17C4.90646 18.9349 8.55725 21 11.4882 21C14.391 21 17.0189 19.8234 18.9212 17.9212C20.8234 16.0189 22 13.391 22 10.4882Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10.7632 9.76316L18.65 17.65M11.0391 9.54632L21.75 10.4668M10.5618 10.2188L11.4667 20.75M22 10.4882C22 7.55726 19.935 3.90646 18 2L3 17C4.90646 18.9349 8.55725 21 11.4882 21C17.2937 21 22 16.2937 22 10.4882Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
