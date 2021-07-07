"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(url) {
  const cwd = process.cwd();

  const gitPath = _path.default.join(cwd, '.git');

  if (_fsExtra.default.existsSync(gitPath)) {
    await _fsExtra.default.remove(gitPath);
    console.log(_logSymbols.default.success, _chalk.default.green('The directory: .git has been removed!'));
  }

  await (0, _utils.execCmd)('git init'); // git@github.com:Atlanstis/gypso-cli.git

  await (0, _utils.updateJsonFile)('package.json', {
    repository: {
      type: 'git',
      url: url.replace('git@', 'https://')
    }
  });
  await (0, _utils.execCmd)('git add .');
  await (0, _utils.execCmd)(['git', 'commit', '-m', 'initialized']);
  await (0, _utils.execCmd)('git branch -M main');
  await (0, _utils.execCmd)(`git remote add origin ${url}`);
  await (0, _utils.execCmd)('git push -u origin main');
  console.log(_logSymbols.default.success, _chalk.default.green('Git link succeeded'));
}