var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M21 18C21 19.3807 19.8807 20.5 18.5 20.5C17.1193 20.5 16 19.3807 16 18C16 16.6193 17.1193 15.5 18.5 15.5C19.8807 15.5 21 16.6193 21 18Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 6C8 7.38071 6.88071 8.5 5.5 8.5C4.11929 8.5 3 7.38071 3 6C3 4.61929 4.11929 3.5 5.5 3.5C6.88071 3.5 8 4.61929 8 6Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M8 18C8 19.3807 6.88071 20.5 5.5 20.5C4.11929 20.5 3 19.3807 3 18C3 16.6193 4.11929 15.5 5.5 15.5C6.88071 15.5 8 16.6193 8 18Z" fill="{{fillColor1 || 'transparent'}}" /></g><path d="M5.5 9V15M8 6C8 7.38071 6.88071 8.5 5.5 8.5C4.11929 8.5 3 7.38071 3 6C3 4.61929 4.11929 3.5 5.5 3.5C6.88071 3.5 8 4.61929 8 6ZM8 18C8 19.3807 6.88071 20.5 5.5 20.5C4.11929 20.5 3 19.3807 3 18C3 16.6193 4.11929 15.5 5.5 15.5C6.88071 15.5 8 16.6193 8 18Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M18.5 15V6H13M15 3L12 6L15 9M21 18C21 19.3807 19.8807 20.5 18.5 20.5C17.1193 20.5 16 19.3807 16 18C16 16.6193 17.1193 15.5 18.5 15.5C19.8807 15.5 21 16.6193 21 18Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
