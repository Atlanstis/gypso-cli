"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _ora = _interopRequireDefault(require("ora"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DownloadGit {
  constructor(template, projectName) {
    this.url = `${template.url}#${template.branch}`;
    this.projectName = projectName;
  }

  async download() {
    const _this = this;

    return new Promise((resolve, reject) => {
      let loading = (0, _ora.default)('Download template ...');
      loading.start();
      (0, _downloadGitRepo.default)(this.url, this.projectName, function (err) {
        if (err) {
          loading.fail('Download failed:');
          console.log(err);
          reject();
        } else {
          loading.succeed('Download successful!');

          _this.successHandle();

          resolve();
        }
      });
    });
  }

  async successHandle() {
    return new Promise((resolve, reject) => {
      try {
        console.log(_chalk.default.cyan('File initialization!')); //修改项目文件夹中 package.json 文件

        const packageJson = `${this.projectName}/package.json`;
        (0, _utils.updateJsonFile)(packageJson, {
          name: this.projectName
        });
        console.log(_logSymbols.default.success, _chalk.default.green('package.json initialization succeeded!')); // 修改 README.md

        const README = `${this.projectName}/README.md`;

        _fsExtra.default.writeFileSync(README, `# ${this.projectName}`, 'utf-8');

        console.log(_logSymbols.default.success, _chalk.default.green('README.md initialization succeeded!'));
        console.log(_chalk.default.cyan('File initialization succeeded!'));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

}

var _default = DownloadGit;
exports.default = _default;