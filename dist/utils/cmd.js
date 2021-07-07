"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.execCmd = void 0;

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 执行 command 命令
const execCmd = function (command, message = command) {
  if (typeof command === 'string') {
    command = command.split(' ');
  } else if (Array.isArray(command)) {
    message = command.join(' ');
  }

  let loading = (0, _ora.default)(message);
  const [first, ...rest] = command;
  return new Promise(resolve => {
    const child = (0, _crossSpawn.default)(first, rest, {
      stdio: 'inherit'
    }); // 监听执行结果

    child.on('close', function (code) {
      if (code !== 0) {
        // 执行失败
        loading.fail(`${message}: fail!`);
        process.exit(1);
      } else {
        // 执行成功
        loading.succeed(`${message}: success!`);
        resolve();
      }
    });
  });
};

exports.execCmd = execCmd;