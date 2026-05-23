const ci = require('miniprogram-ci');

async function npmBuild() {
  await ci.packNpmManually({
    packageJsonPath: process.cwd() + '/package.json',
    miniprogramNpmDistDir: process.cwd() + '/',
  });
}

npmBuild();
