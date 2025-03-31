var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 8C16.6944 8 20.5 6.88071 20.5 5.5V6L14 14V17C14 19.2091 12.2091 21 10 21V14L3.5 6V5.5C3.5 6.88071 7.30558 8 12 8Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.5 5.5C20.5 6.88071 16.6944 8 12 8C7.30558 8 3.5 6.88071 3.5 5.5C3.5 4.11929 7.30558 3 12 3C16.6944 3 20.5 4.11929 20.5 5.5Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M20.5 5.5C20.5 6.88071 16.6944 8 12 8C7.30558 8 3.5 6.88071 3.5 5.5M20.5 5.5C20.5 4.11929 16.6944 3 12 3C7.30558 3 3.5 4.11929 3.5 5.5M20.5 5.5V6L14 14V17C14 19.2091 12.2091 21 10 21V14L3.5 6V5.5" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
