var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.50049 12.9995L10.0005 17.4995L21.0005 6.49951L16.5005 1.99951L5.50049 12.9995Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M10.0005 17.4995L5.50049 12.9995M10.0005 17.4995L7.58628 19.9139C7.21121 20.289 6.70247 20.4998 6.17201 20.4998H2.49976L2.50035 16.8277C2.50044 16.2974 2.71115 15.7889 3.08614 15.4139L5.50049 12.9995M10.0005 17.4995L21.0005 6.49951L16.5005 1.99951L5.50049 12.9995" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M5 3L5.33234 3.66766L6 4L5.33234 4.33234L5 5L4.66766 4.33234L4 4L4.66766 3.66766L5 3Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M12.75 20L12.9993 20.5007L13.5 20.75L12.9993 20.9993L12.75 21.5L12.5007 20.9993L12 20.75L12.5007 20.5007L12.75 20Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M19.5 14L20.1223 15.3777L21.5 16L20.1223 16.6223L19.5 18L18.8777 16.6223L17.5 16L18.8777 15.3777L19.5 14Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});
