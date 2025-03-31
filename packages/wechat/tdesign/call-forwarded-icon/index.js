var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M21 22C17.2007 22 13.6618 20.8848 10.6929 18.964C8.43077 17.5005 6.49953 15.5692 5.03601 13.3071C3.11515 10.3382 2 6.79932 2 3H8.77778L9.97148 8.37167L7.94713 10.396C9.28619 12.7542 11.2458 14.7138 13.604 16.0529L15.6283 14.0285L21 15.2222V22Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M21 22C17.2007 22 13.6618 20.8848 10.6929 18.964C8.43077 17.5005 6.49953 15.5692 5.03601 13.3071C3.11515 10.3382 2 6.79932 2 3H8.77778L9.97148 8.37167L7.94713 10.396C9.28619 12.7542 11.2458 14.7138 13.604 16.0529L15.6283 14.0285L21 15.2222V22Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.717 6.83558L20.6426 3.37446L17.1815 3.30005M19.8406 4.17646L16.3999 7.61749" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
