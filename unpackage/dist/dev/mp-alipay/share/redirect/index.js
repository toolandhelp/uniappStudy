"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_storage = require("../util/storage.js");
function navigateTo(url) {
  url = formatAddress(url);
  common_vendor.index.navigateTo({
    url
  });
}
function redirectTo(url) {
  url = formatAddress(url);
  common_vendor.index.redirectTo({
    url
  });
}
function reLaunch(url) {
  url = formatAddress(url);
  common_vendor.index.reLaunch({
    url
  });
}
function navigateBack(delta) {
  common_vendor.index.navigateBack({ delta });
}
function logout() {
  share_util_storage.clearStorage();
  reLaunch("pages/login/login");
}
function formatAddress(url) {
  if (!(url.startsWith(".") || url.startsWith("/"))) {
    return "/" + url;
  }
  return url;
}
exports.logout = logout;
exports.navigateBack = navigateBack;
exports.navigateTo = navigateTo;
exports.reLaunch = reLaunch;
exports.redirectTo = redirectTo;
