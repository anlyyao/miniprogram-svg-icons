var useIcon = require("../../common/use-icon");

Component({
  behaviors: [useIcon],
  data: {
    svgContent: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M17.8237 9.34379L4.74219 4.7476L9.33838 17.8291L11.99 14.1168L17.8237 19.9504L19.945 17.8291L14.1114 11.9954L17.8237 9.34379Z" fill="{{fillColor1 || 'transparent'}}" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.8237 9.34375L4.74219 4.74756L9.33838 17.829L11.99 14.1167L17.8237 19.9504L19.945 17.829L14.1114 11.9954L17.8237 9.34375Z" stroke="{{strokeColor1 || 'currentColor'}}" stroke-width="{{strokeWidth}}" /></g></svg>`,
  },
});
