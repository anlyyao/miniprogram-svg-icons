var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5Z" fill="{{fillColor2 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 19.5996V19C18.5 16.7909 16.7091 15 14.5 15H9.5C7.29086 15 5.5 16.7909 5.5 19V19.5996C7.24803 21.0961 9.51846 22 12 22C14.4815 22 16.752 21.0961 18.5 19.5996Z" fill="{{fillColor2 || 'transparent'}}" /></g><g><path d="M15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 19.5996V19C18.5 16.7909 16.7091 15 14.5 15H9.5C7.29086 15 5.5 16.7909 5.5 19V19.5996C7.24803 21.0961 9.51846 22 12 22C14.4815 22 16.752 21.0961 18.5 19.5996Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></g></svg>`,
  },
});
