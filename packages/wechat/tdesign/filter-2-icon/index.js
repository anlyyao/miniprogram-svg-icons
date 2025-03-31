var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M3.56348 18.4913L7.29802 22.2259L17.5542 11.9696L13.8197 8.23511L3.56348 18.4913Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.9728 8.55095L17.2383 4.81641L13.8195 8.23514L17.5541 11.9697L20.9728 8.55095Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M17.2384 4.81641L20.973 8.55095M17.2384 4.81641L3.56348 18.4914L7.29802 22.2259L20.973 8.55095M17.2384 4.81641L13.8197 8.23514L17.5542 11.9697L20.973 8.55095" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><g><path d="M7.75 3.5L8.16543 4.33457L9 4.75L8.16543 5.16543L7.75 6L7.33457 5.16543L6.5 4.75L7.33457 4.33457L7.75 3.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M21.625 3L21.6665 3.08346L21.75 3.125L21.6665 3.16654L21.625 3.25L21.5835 3.16654L21.5 3.125L21.5835 3.08346L21.625 3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});
