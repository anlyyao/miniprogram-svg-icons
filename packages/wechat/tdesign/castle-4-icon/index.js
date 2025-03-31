var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M12 9C14.7614 9 17 11.2386 17 14V21H7V14C7 11.2386 9.23858 9 12 9Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 20.9999V18.3428M3 21H7V14C7 12.3643 7.78565 10.9122 9 10V3H3V21ZM21 3V21H17V14C17 12.3644 16.2142 10.9122 15 10V3H21Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M17 14.8V21H7V14.8M12 9C14.7614 9 17 11.2386 17 14H7C7 11.2386 9.23858 9 12 9ZM12 9V8" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M21 21V3H15V10C16.2142 10.9122 17 12.3644 17 14V21H21Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M3 21H7V14C7 12.3643 7.78565 10.9122 9 10V3H3V21Z" fill="{{fillColor2 || 'transparent'}}" /></g></g></svg>`,
  },
});
