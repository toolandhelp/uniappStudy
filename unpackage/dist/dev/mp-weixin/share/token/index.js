"use strict";
var share_util_storage = require("../util/storage.js");
const tokenKey = "X-Token";
function setToken(text) {
  share_util_storage.setStorage(tokenKey, text, true);
}
function getToken() {
  return share_util_storage.getStorage(tokenKey);
}
exports.getToken = getToken;
exports.setToken = setToken;
exports.tokenKey = tokenKey;
