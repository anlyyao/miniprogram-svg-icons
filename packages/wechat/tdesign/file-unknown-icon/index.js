var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20 10.5V7L15 2H4V22H13.5M14 2V8H20" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.5 16.2489C15.5 15.0069 16.6193 14 18 14C19.3807 14 20.5 15.0069 20.5 16.2489C20.5 16.8593 20.2296 17.413 19.7907 17.8182L18 19.5073V19.6223M17.999 22.9961H18.0029V23H17.999V22.9961Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
