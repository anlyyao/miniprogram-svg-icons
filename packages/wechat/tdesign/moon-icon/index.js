var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M20.5387 14.8522C20.0408 14.9492 19.5263 15 19 15C14.5817 15 11 11.4183 11 7C11 5.54296 11.3194 4.17663 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.9737 21 19.3459 18.4248 20.5387 14.8522Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
