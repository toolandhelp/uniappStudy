"use strict";
var service_enumeration_businessStatusCode = require("../../service/enumeration/businessStatusCode.js");
var service_model_ajaxResult = require("../../service/model/ajaxResult.js");
var share_token_index = require("../token/index.js");
var share_http_serveUrl = require("./serveUrl.js");
var share_redirect_index = require("../redirect/index.js");
var share_util_index = require("../util/index.js");
var share_util_message = require("../util/message.js");
var share_http_http = require("./http.js");
var share_util_page = require("../util/page.js");
const ignorePaths = [
  "pages/login/login",
  "pages/login/appletLogin"
];
function sendAjax(product, _url, data) {
  const { header, url } = getUtilHttpOptions(product, _url);
  return http(url, header, data);
}
function send(_url, data) {
  const token = share_token_index.getToken();
  if (!ignorePaths.includes(share_util_page.getThisPagePath())) {
    if (share_util_index.stringIsNull(token)) {
      share_redirect_index.logout();
      return;
    }
  }
  const header = {
    [share_token_index.tokenKey]: token
  };
  return http(_url, header, data);
}
function sendUpload(product, _url, fileType, filePath) {
  const { header, url } = getUtilHttpOptions(product, _url);
  return uploadFile(url, header, fileType, filePath);
}
function getUtilHttpOptions(product, url) {
  const token = share_token_index.getToken();
  const header = {
    [share_token_index.tokenKey]: token
  };
  if (!ignorePaths.includes(share_util_page.getThisPagePath())) {
    if (share_util_index.stringIsNull(token)) {
      share_redirect_index.logout();
      return;
    }
  }
  url = share_http_serveUrl.ServiceUrl.get(product) + url;
  return { header, url };
}
function http(url, header, data) {
  return new Promise(function(resolve, reject) {
    share_http_http.httpRequest(url, header, share_http_http.requestMethod.post, { Data: data }).then((d) => httpSuccess(d, resolve, reject)).catch((d) => httpError(url, d, reject));
  });
}
function uploadFile(url, header, fileType, filePath) {
  return new Promise(function(resolve, reject) {
    share_http_http.httpUploadFile(url, header, fileType, filePath).then((d) => httpSuccess(d, resolve, reject)).catch((d) => httpError(url, d, reject));
  });
}
function httpSuccess({ data }, resolve, reject) {
  const result = new service_model_ajaxResult.AjaxResult(data);
  if (result.Code === service_enumeration_businessStatusCode.BusinessStatusCode.TokenNoExist || result.Code === service_enumeration_businessStatusCode.BusinessStatusCode.TokenInvalid) {
    share_redirect_index.logout();
    reject({});
    return;
  }
  if (result.Code !== service_enumeration_businessStatusCode.BusinessStatusCode.OK) {
    share_util_message.showErrorToast(result.Message);
    reject(result.Data);
    return;
  }
  resolve(result.Data);
}
function httpError(url, res, reject) {
  share_util_message.showErrorToast(`\u5730\u5740\u3010${url}\u3011\u65E0\u6CD5\u8BBF\u95EE,\u8BF7\u68C0\u67E5\u7F51\u7EDC\u6216\u8054\u7CFB\u7BA1\u7406\u5458`);
  reject(res);
  return;
}
exports.send = send;
exports.sendAjax = sendAjax;
exports.sendUpload = sendUpload;
