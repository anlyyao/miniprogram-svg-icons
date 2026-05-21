const { appid } = require('../project.config.json');
const { version, description } = require('../package.json');
const privateKeyPath = process.cwd() + '/miniprogram-ci/private.wxb2fe5d252aec68ce.key';

const ciProject = {
  appid,
  type: 'miniProgram',
  projectPath: process.cwd(),
  privateKeyPath,
  ignores: ['node_modules/**/*', 'miniprogram-ci/**/*', 'package-lock.json', '51ed3222f40d111d00800539b728bfb4/**/*'],
};

module.exports = {
  wxVersion: version,
  wxDescription: description,
  wxAppId: appid,
  wxPrivateKeyPath: privateKeyPath,
  ciProject,
};
