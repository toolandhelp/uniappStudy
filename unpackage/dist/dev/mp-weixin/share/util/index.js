"use strict";
require("../../common/vendor.js");
function stringIsNull(str) {
  return str === "" || str === null || str === void 0;
}
function awaitDelay(millisecond = 0) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({});
    }, millisecond);
  });
}
function isPromise(obj) {
  if (obj === null || obj === void 0)
    return false;
  const b1 = Promise.prototype;
  const b2 = Object.getPrototypeOf(obj);
  return b1 === b2 || b1.toString() === b2.toString();
}
function _getMenuCode(code, menus) {
  for (const menu of menus) {
    if (menu.Code === code) {
      return menu;
    }
    if (menu.Children && menu.Children.length) {
      const _menu = _getMenuCode(code, menu.Children);
      if (_menu)
        return _menu;
    }
  }
}
function getMenuCode(code, products) {
  for (const product of products) {
    const _menu = _getMenuCode(code, product.Menus);
    if (_menu)
      return _menu;
  }
  return false;
}
function getUrlValue(name, url) {
  var url = decodeURIComponent(url);
  var csi = url.indexOf(name + "=");
  if (csi === -1)
    return "";
  var jsfi = url.indexOf("&", csi);
  if (jsfi === -1)
    jsfi = void 0;
  var v = url.substring(csi, jsfi).split("=")[1];
  if (v)
    return v;
  else
    return "";
}
function getScanCode(v) {
  if (v.startsWith("http")) {
    return getUrlValue("Code", v);
  }
  return v;
}
exports.awaitDelay = awaitDelay;
exports.getMenuCode = getMenuCode;
exports.getScanCode = getScanCode;
exports.isPromise = isPromise;
exports.stringIsNull = stringIsNull;
