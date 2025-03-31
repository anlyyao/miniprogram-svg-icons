var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11 5H21M21 10.0001H11M3 15H21M3 20H21" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M7 3H3.5C3.22386 3 3 3.22386 3 3.5V6C3 6.27614 3.22386 6.5 3.5 6.5H6.5C6.77614 6.5 7 6.72386 7 7V9.5C7 9.77614 6.77614 10 6.5 10H3" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
