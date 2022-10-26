"use strict";
var common_vendor = require("../../common/vendor.js");
function setStorage(key, data, isSync = false) {
  if (isSync) {
    common_vendor.index.setStorageSync(key, data);
    return;
  }
  common_vendor.index.setStorage({
    key,
    data
  });
}
function getStorage(key, isAsync = false) {
  if (isAsync) {
    return new Promise(function(resolve, reject) {
      common_vendor.index.getStorage({
        key,
        success: ({
          data
        }) => resolve(data),
        fail: (res) => reject(res)
      });
    });
  }
  return common_vendor.index.getStorageSync(key);
}
function clearStorage(isSync = false) {
  if (isSync) {
    common_vendor.index.clearStorageSync();
    return;
  }
  common_vendor.index.clearStorage();
}
exports.clearStorage = clearStorage;
exports.getStorage = getStorage;
exports.setStorage = setStorage;
