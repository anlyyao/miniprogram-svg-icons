var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><g><path d="M16.625 4L16.6692 4.08081L16.75 4.125L16.6692 4.16919L16.625 4.25L16.5808 4.16919L16.5 4.125L16.5808 4.08081L16.625 4Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /><path d="M20.5 8.5L20.6768 8.82322L21 9L20.6768 9.17678L20.5 9.5L20.3232 9.17678L20 9L20.3232 8.82322L20.5 8.5Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></g></svg>`,
  },
});
