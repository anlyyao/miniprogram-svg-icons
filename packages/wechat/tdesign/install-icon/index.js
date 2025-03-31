var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3 21H21V15H3V21Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 3.00012H3V21.0001H21V3.00012H16M21 21H3V15H21V21ZM6.99805 17.9981H7.00195V18.002H6.99805V17.9981ZM9.99805 17.9981H10.002V18.002H9.99805V17.9981Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.5 8.04385L12 11.5041L15.5 8.04385M12 10.3V3" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
