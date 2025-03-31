var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M11.878 22.0207L1.97852 12.1212L11.878 2.22168L21.0704 2.92879L21.7775 12.1212L11.878 22.0207Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M13.9998 7.17075C14.7809 6.3897 16.0472 6.3897 16.8283 7.17075C17.6093 7.9518 17.6093 9.21813 16.8283 9.99917C16.0472 10.7802 14.7809 10.7802 13.9998 9.99917C13.2188 9.21813 13.2188 7.9518 13.9998 7.17075Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M11.878 22.0207L1.97852 12.1212L11.878 2.22168L21.0704 2.92879L21.7775 12.1212L11.878 22.0207Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M13.9998 7.17075C14.7809 6.3897 16.0472 6.3897 16.8283 7.17075C17.6093 7.9518 17.6093 9.21813 16.8283 9.99917C16.0472 10.7802 14.7809 10.7802 13.9998 9.99917C13.2188 9.21813 13.2188 7.9518 13.9998 7.17075Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
