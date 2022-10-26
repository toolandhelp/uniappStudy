"use strict";
var share_util_index = require("./index.js");
function getCurrentDate() {
  let date = new Date();
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  date.getHours();
  date.getMinutes();
  date.getSeconds();
  return y + "-" + MM + "-" + d;
}
function timeConvertDate(tiem) {
  if (share_util_index.stringIsNull(tiem))
    return "";
  if (tiem.length <= 10)
    return tiem;
  return tiem.substr(0, 10);
}
exports.getCurrentDate = getCurrentDate;
exports.timeConvertDate = timeConvertDate;
