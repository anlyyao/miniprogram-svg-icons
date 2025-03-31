var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M8.06595 2.49951L15.936 2.49951L21.501 8.06448V15.9345L15.936 21.4995H8.06595L2.50098 15.9345L2.50098 8.06448L8.06595 2.49951Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8.06497 2.49963L15.935 2.49963L21.5 8.06461V15.9347L15.935 21.4996H8.06497L2.5 15.9347L2.5 8.06461L8.06497 2.49963Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M15.1823 8.818L12.0007 11.9996M12.0007 11.9996L8.81836 15.182M12.0007 11.9996L15.1823 15.1813M12.0007 11.9996L8.81836 8.81732" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
