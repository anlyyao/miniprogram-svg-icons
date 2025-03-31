var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7893 2.00053L22 8.21116V22.0001H2V2.00049L15.7893 2.00053ZM7 4.00027V9H11V4L7 4.00027ZM7 13V15H17V13H7ZM7 16V18H13V16H7Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
