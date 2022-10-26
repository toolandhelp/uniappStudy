"use strict";
var share_util_index = require("./index.js");
const events = /* @__PURE__ */ new Map();
function emit(eventName, ...s) {
  if (events.has(eventName)) {
    return events.get(eventName)(...s);
  }
}
function emitPromise(eventName, ...s) {
  const res = emit(eventName, ...s);
  if (share_util_index.isPromise(res))
    return res;
  console.warn("\u89E6\u53D1\u4E86\u5F02\u6B65\u4E8B\u4EF6\uFF0C\u4F46\u8FD4\u56DE\u503C\u975EPromise\u3002\u5DF2\u517C\u5BB9\u5904\u7406\uFF1A\u521B\u5EFA\u4E86\u4E00\u4E2A\u7A7APromise");
  return Promise.resolve();
}
function only(eventName, callback) {
  events.set(eventName, callback);
}
exports.emit = emit;
exports.emitPromise = emitPromise;
exports.only = only;
