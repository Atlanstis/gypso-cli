"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VERSION", {
  enumerable: true,
  get: function () {
    return _package.version;
  }
});
exports.TEMPLATE_LIST = void 0;

var _package = require("../../package.json");

// 当前项目版本号
// 模板列表
const TEMPLATE_LIST = [{
  name: 'gypso-cli-template',
  url: 'Atlanstis/gypso-cli-template',
  branch: 'main'
}];
exports.TEMPLATE_LIST = TEMPLATE_LIST;