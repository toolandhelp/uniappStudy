"use strict";
var common_vendor = require("../../common/vendor.js");
function showOkToast(text) {
  common_vendor.index.hideLoading({
    complete: function(hide) {
      if (text.length > 7) {
        common_vendor.index.showToast({
          "title": text,
          "icon": "none"
        });
        return;
      }
      common_vendor.index.showToast({
        "title": text,
        "icon": "success"
      });
    }
  });
}
function showErrorToast(text) {
  common_vendor.index.hideLoading({
    complete: function(hide) {
      if (text.length > 7) {
        common_vendor.index.showToast({
          "title": text,
          "icon": "none"
        });
        return;
      }
      common_vendor.index.showToast({
        "title": text,
        "icon": "error"
      });
    }
  });
}
function showLoading() {
  common_vendor.index.showLoading({
    mask: true,
    title: "\u52A0\u8F7D\u4E2D"
  });
}
function clearLoading() {
  common_vendor.index.hideLoading();
}
function openConfirm(content, title = "\u786E\u8BA4\u63D0\u9192") {
  return new Promise(function(resolve, reject) {
    common_vendor.index.showModal({
      title,
      content,
      showCancel: true,
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u5B9A",
      cancelColor: "#000",
      confirmColor: "#007aff",
      success: ({ confirm, cancel }) => {
        if (confirm) {
          resolve();
          return;
        }
        if (cancel) {
          reject("\u5DF2\u53D6\u6D88\uFF1A" + content);
          return;
        }
        reject();
      },
      fail: reject
    });
  });
}
exports.clearLoading = clearLoading;
exports.openConfirm = openConfirm;
exports.showErrorToast = showErrorToast;
exports.showLoading = showLoading;
exports.showOkToast = showOkToast;
