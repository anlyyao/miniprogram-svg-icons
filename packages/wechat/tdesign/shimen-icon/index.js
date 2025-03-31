var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M1.99902 4.00098L11.999 3.00098L21.999 4.00098V7.00098C18.6657 7.33431 15.3324 7.66764 11.999 8.00098L1.99902 7.00098V4.00098Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M1.99902 4.00098L11.999 3.00098L21.999 4.00098V7.00098C18.6657 7.33431 15.3324 7.66764 11.999 8.00098L1.99902 7.00098V4.00098Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M3.99902 21.0008L4.99902 7.30078L7.99902 7.60078L8.99902 21.0008H3.99902Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M19.999 21.0008L18.999 7.30078C17.9605 7.40464 17.1041 7.50075 16.1038 7.60078L14.999 21.0008H19.999Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M3.99902 21.0008L4.99902 7.30078L7.99902 7.60078L8.99902 21.0008H3.99902Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M19.999 21.0008L18.999 7.30078C17.9605 7.40464 17.1041 7.50075 16.1038 7.60078L14.999 21.0008H19.999Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});
