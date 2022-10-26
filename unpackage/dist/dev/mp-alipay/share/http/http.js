"use strict";
var common_vendor = require("../../common/vendor.js");
var service_enumeration_fileTypeEnum = require("../../service/enumeration/fileTypeEnum.js");
const requestMethod = {
  post: "post",
  get: "get",
  put: "put",
  delete: "delete"
};
function httpRequest(url, header, method, data) {
  if (!requestMethod.hasOwnProperty(method))
    throw `\u65E0\u6548\u7684\u8BF7\u6C42\u7C7B\u578B-${method}`;
  return new Promise(function(resolve, reject) {
    common_vendor.index.request({
      url,
      header,
      method,
      data,
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(res);
          return;
        }
        resolve(res);
      },
      fail: (res) => reject(res)
    });
  });
}
function httpUploadFile(url, header, fileType, filePath) {
  if (!service_enumeration_fileTypeEnum.fileTypeEnum.hasOwnProperty(fileType))
    throw `\u65E0\u6548\u7684\u6587\u4EF6\u7C7B\u578B-${fileType}`;
  return new Promise(function(resolve, reject) {
    dd.uploadFile({
      url,
      fileType,
      fileName: "ddfile",
      header,
      filePath,
      success: (res) => {
        res.data = JSON.parse(res.data);
        if (res.statusCode !== 200 || res.success !== true) {
          reject(res);
          return;
        }
        resolve(res);
      },
      fail: (res) => reject(res)
    });
  });
}
exports.httpRequest = httpRequest;
exports.httpUploadFile = httpUploadFile;
exports.requestMethod = requestMethod;
