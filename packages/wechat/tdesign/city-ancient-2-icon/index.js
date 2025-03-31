var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M16.0006 4.63921V10H15.9997L20.001 13H20.002V21H4.00195V13H4.00098L7.99966 10H8.00063V4.63901L11.9996 2L16.0006 4.63921Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 18V21M12.0023 5.99805H12.0063V6.00195H12.0023V5.99805Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M8.00065 5.15V10M8.00065 10H16.0007M8.00065 10L4.00195 13M16.0007 5.15V10M16.0007 10L20.002 13M20.002 13H4.00195M20.002 13V21H4.00195V13M20.002 13H21.002M4.00195 13H3.00195M7.33398 5.07895L11.9996 2L16.6673 5.07895" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
