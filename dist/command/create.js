"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _utils = require("../utils");

var _downloadGit = _interopRequireDefault(require("../lib/download-git"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function _default(projectName) {
  const cwd = process.cwd();

  const targetAir = _path.default.join(cwd, projectName); // 判断目录存在


  if (_fsExtra.default.existsSync(targetAir)) {
    //项目已经存在，询问是否覆盖
    let {
      action
    } = await _inquirer.default.prompt([{
      name: 'action',
      type: 'list',
      message: 'The target directory already exists. Please select an operation:',
      choices: [{
        name: 'Overwrite',
        value: 'overwrite'
      }, {
        name: 'Cancel',
        value: false
      }]
    }]);

    if (!action) {
      console.log(_logSymbols.default.warning, _chalk.default.yellow('The target directory already exists. Exit the operation!'));
      return;
    } else if (action === 'overwrite') {
      // 移除已存在的目录
      await _fsExtra.default.remove(targetAir);
      console.log(_logSymbols.default.success, _chalk.default.green('The target directory has been removed!'));
    }
  } // 选择模版


  const {
    template
  } = await _inquirer.default.prompt([{
    name: 'template',
    type: 'list',
    message: 'Please select a template to create the project:',
    choices: _utils.TEMPLATE_LIST.map(temp => {
      return {
        name: temp.name,
        value: temp
      };
    })
  }]); // 下载模板

  const git = new _downloadGit.default(template, projectName);
  await git.download();
}