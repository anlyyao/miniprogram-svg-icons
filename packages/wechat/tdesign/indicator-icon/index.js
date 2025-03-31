var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.9998 17.1113V13.1113H6.78924L4.05859 15.1113L6.78924 17.1113H20.9998Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M3 9V5H17.2105L19.9412 7L17.2105 9H3Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M9.35303 2V5M9.35303 9V13.1111M14.647 9V13.1111M9.35303 17.1113V22.0002M14.647 17.1113V22.0002M14.647 2V5M3 5V9H17.2105L19.9412 7L17.2105 5H3ZM21 13.1113V17.1113H6.78949L4.05884 15.1113L6.78949 13.1113H21Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
