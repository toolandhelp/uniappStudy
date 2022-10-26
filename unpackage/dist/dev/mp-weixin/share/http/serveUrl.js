"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var service_enumeration_productEnum = require("../../service/enumeration/productEnum.js");
const _ServiceUrl = class {
  static get(product) {
    switch (product) {
      case service_enumeration_productEnum.productEnum.asset:
        return _ServiceUrl.asset;
      case service_enumeration_productEnum.productEnum.consumable:
        return _ServiceUrl.consumable;
      case service_enumeration_productEnum.productEnum.file:
        return _ServiceUrl.file;
      case service_enumeration_productEnum.productEnum.myWork:
        return _ServiceUrl.myWork;
      case service_enumeration_productEnum.productEnum.system:
        return _ServiceUrl.system;
      case product.OBPProject:
        return _ServiceUrl.OBPProject;
      default:
        throw `\u627E\u4E0D\u5230\u4EA7\u54C1-${product}`;
    }
  }
  static set(product, url) {
    switch (product) {
      case service_enumeration_productEnum.productEnum.asset:
        _ServiceUrl.asset = url;
        return;
      case service_enumeration_productEnum.productEnum.consumable:
        _ServiceUrl.consumable = url;
        return;
      case service_enumeration_productEnum.productEnum.file:
        _ServiceUrl.file = url;
        return;
      case service_enumeration_productEnum.productEnum.myWork:
        _ServiceUrl.myWork = url;
        return;
      case service_enumeration_productEnum.productEnum.system:
        _ServiceUrl.system = url;
        return;
      case service_enumeration_productEnum.productEnum.OBPProject:
        _ServiceUrl.OBPProject = url;
      default:
        throw `\u627E\u4E0D\u5230\u4EA7\u54C1-${product}`;
    }
  }
};
let ServiceUrl = _ServiceUrl;
__publicField(ServiceUrl, "system", "http://192.168.0.215:8001");
__publicField(ServiceUrl, "asset", "http://192.168.0.215:8002");
__publicField(ServiceUrl, "consumable", "http://192.168.0.215:8004");
__publicField(ServiceUrl, "file", "http://192.168.0.215:8003");
__publicField(ServiceUrl, "myWork", "http://192.168.0.215:8006");
__publicField(ServiceUrl, "ws", "ws://192.168.0.215:8002");
__publicField(ServiceUrl, "OBPProject", "http://192.168.0.215:8013");
function getFileUrl(url) {
  return ServiceUrl.file + url;
}
function getAPIUrlByEnum(productEnum, apiPath) {
  let root = ServiceUrl.get(productEnum) + apiPath;
  return root;
}
exports.ServiceUrl = ServiceUrl;
exports.getAPIUrlByEnum = getAPIUrlByEnum;
exports.getFileUrl = getFileUrl;
