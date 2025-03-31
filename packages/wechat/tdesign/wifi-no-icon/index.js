var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M2.10059 9.10077C3.80544 7.39592 5.84059 6.22268 8.00006 5.58106M16.0001 5.58105C18.1595 6.22267 20.1947 7.39591 21.8996 9.10077M6.69688 13.697C7.1 13.2939 7.53759 12.9463 8.00017 12.6541M16.0002 12.6541C16.4628 12.9463 16.9004 13.2939 17.3035 13.697" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 3.00024V14.0002M11.293 18.2929C11.6835 17.9024 12.3167 17.9024 12.7072 18.2929L12.0001 19L11.293 18.2929Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /></g></svg>`,
  },
});
