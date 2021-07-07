"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  updateJsonFile: true
};
exports.updateJsonFile = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _constants = require("./constants");

Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

var _cmd = require("./cmd");

Object.keys(_cmd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _cmd[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cmd[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 更新json配置文件
const updateJsonFile = (fileName, obj) => {
  return new Promise(resolve => {
    if (_fsExtra.default.existsSync(fileName)) {
      const data = _fsExtra.default.readFileSync(fileName).toString();

      let json = JSON.parse(data);
      Object.keys(obj).forEach(key => {
        json[key] = obj[key];
      });

      _fsExtra.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

      resolve();
    }
  });
};

exports.updateJsonFile = updateJsonFile;