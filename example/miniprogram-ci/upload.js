const ci = require('miniprogram-ci');

const { wxDescription, ciProject, wxVersion } = require('./config');

const project = new ci.Project(ciProject);

async function upload() {
  await ci.upload({
    project,
    version: wxVersion,
    description: wxDescription,
    setting: {
      es6: true,
      minify: true,
    },
    // onProgressUpdate: console.log,
  });
}

upload();
