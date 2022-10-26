"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class AjaxResult {
  constructor({ Code, Message, Data }) {
    __publicField(this, "Code");
    __publicField(this, "Message");
    __publicField(this, "Data");
    this.Code = Code;
    this.Message = Message;
    this.Data = Data;
  }
}
exports.AjaxResult = AjaxResult;
