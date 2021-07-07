"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _utils = require("./utils");

var _command = require("./command");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 命令列表
const actionMap = {
  create: {
    description: 'Create a project from a templatee',
    command: 'create <projectName>'
  },
  link: {
    description: 'Link your project to GitHub',
    command: 'link <gitUrl>'
  }
};
Object.keys(actionMap).forEach(action => {
  _commander.default.command(actionMap[action].command).description(actionMap[action].description).action(name => {
    switch (action) {
      case 'create':
        (0, _command.create)(name);
        break;

      case 'link':
        (0, _command.link)(name);
        break;
    }
  });
}); // 设置版本

_commander.default.version(_utils.VERSION, '-v, --version').parse(process.argv);