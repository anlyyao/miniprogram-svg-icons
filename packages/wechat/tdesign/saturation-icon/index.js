var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M5.63603 20.3882C9.15075 23.8697 14.8492 23.8697 18.364 20.3882C21.8787 16.9067 21.8787 11.262 18.364 7.78044L12 1.47656L5.63603 7.78044C2.12131 11.262 2.12131 16.9067 5.63603 20.3882Z" fill="{{fillColor1 || 'transparent'}}" /><path d="M12 10.0349C14.4751 10.0349 16.4816 12.0413 16.4816 14.5164C16.4816 16.9916 14.4751 18.998 12 18.998C12.0001 17.1752 12 12.7109 12 10.0349Z" fill="{{fillColor2 || 'transparent'}}" /><path d="M5.63603 20.3882C9.15075 23.8697 14.8492 23.8697 18.364 20.3882C21.8787 16.9067 21.8787 11.262 18.364 7.78044L12 1.47656L5.63603 7.78044C2.12131 11.262 2.12131 16.9067 5.63603 20.3882Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" stroke-linecap="square" /><path d="M12 10.0349C14.4751 10.0349 16.4816 12.0413 16.4816 14.5164C16.4816 16.9916 14.4751 18.998 12 18.998C12.0001 17.1752 12 12.7109 12 10.0349Z" stroke="{{strokeColor2 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
