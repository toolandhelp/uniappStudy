"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class BusinessStatusCode {
}
__publicField(BusinessStatusCode, "TokenNoExist", -201);
__publicField(BusinessStatusCode, "TokenInvalid", 202);
__publicField(BusinessStatusCode, "OK", 0);
exports.BusinessStatusCode = BusinessStatusCode;
