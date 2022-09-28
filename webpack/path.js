const path = require('path');
const rootDir = process.cwd();
const resolveApp = (resolvePath) => {
  return path.resolve(rootDir, resolvePath);
};
module.exports = resolveApp;
