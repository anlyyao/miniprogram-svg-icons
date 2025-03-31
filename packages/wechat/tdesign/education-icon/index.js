var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2 8.5L12 2L22 8.5L18 11.1L12 15L6 11.1L2 8.5Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M6 17.4996V11.0996L12 14.9996L18 11.0996V17.4996C18 19.4326 15.3137 20.9996 12 20.9996C8.68629 20.9996 6 19.4326 6 17.4996Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M21 9.15039V15.0004M6 11.0996V17.4996C6 19.4326 8.68629 20.9996 12 20.9996C15.3137 20.9996 18 19.4326 18 17.4996V11.0996L12 14.9996L6 11.0996ZM12 2L2 8.5L12 15L22 8.5L12 2Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
