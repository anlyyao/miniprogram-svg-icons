const ci = require('miniprogram-ci');
const { wxDescription, ciProject } = require('./config');

const project = new ci.Project(ciProject);

async function preview() {
  await ci.preview({
    project,
    desc: wxDescription, // 此备注将显示在"小程序助手"开发版列表中
    setting: {
      es6: true,
      minify: true,
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: process.cwd() + '/miniprogram-ci/qrcode.jpg',
    // onProgressUpdate: console.log,
    pagePath: 'pages/index/index', // 预览页面
  });
}

preview();

module.exports = {
  preview,
};
