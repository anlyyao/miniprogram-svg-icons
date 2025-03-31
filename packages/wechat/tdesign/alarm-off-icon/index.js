var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_543_8039)"><path d="M22.5 6.5L18.5 2.5M9.77637 4.27671C10.4875 4.09603 11.2323 4.00001 11.9997 4.00001C16.9702 4.00001 20.9997 8.02944 20.9997 13C20.9997 13.7673 20.9036 14.5122 20.7229 15.2233M5.5 2.5L1.5 6.5M18.8445 18.8443C17.1938 20.7757 14.7399 22 12 22C7.02944 22 3 17.9706 3 13C3 10.2601 4.22433 7.80619 6.15573 6.15547L18.8445 18.8443Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M2 2L22 22" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
