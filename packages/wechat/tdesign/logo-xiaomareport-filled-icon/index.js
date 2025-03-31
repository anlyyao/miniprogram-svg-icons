var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00774 21.0014H2V14.9956L7.00774 9.979V21.0014Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M22 21.0065H16.9923V9.91893L22 4.00193V21.0065Z" fill="{{fillColor1 || 'currentColor'}}" /><path d="M9.51717 3.99316L2.99447 3.99318L12.8191 13.2574L16.1576 9.91893L9.51717 3.99316Z" fill="{{fillColor1 || 'currentColor'}}" /></svg>`,
  },
});
