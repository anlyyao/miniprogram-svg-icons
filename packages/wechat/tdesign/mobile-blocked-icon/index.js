var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M14.818 15.182C16.5754 16.9393 19.4246 16.9393 21.182 15.182C22.9393 13.4246 22.9393 10.5754 21.182 8.81802C19.4246 7.06066 16.5754 7.06066 14.818 8.81802C13.0607 10.5754 13.0607 13.4246 14.818 15.182Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M19 20V22H5V2H19V4M12 18H12.0039V18.0039H12V18Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M20.4749 9.52514L15.5251 14.4749M21.182 15.182C19.4246 16.9393 16.5754 16.9393 14.818 15.182C13.0607 13.4246 13.0607 10.5754 14.818 8.81802C16.5754 7.06066 19.4246 7.06066 21.182 8.81802C22.9393 10.5754 22.9393 13.4246 21.182 15.182Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
