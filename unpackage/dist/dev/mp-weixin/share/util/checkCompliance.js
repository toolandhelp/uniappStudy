"use strict";
var share_util_message = require("./message.js");
const amount = /(^[1-9]([0-9]*)(\.[0-9]+)?$)|(^[0-9]{1}(\.[0-9]+)?$)/;
const seat = /^\d{0,14}(\.\d{1,2})?$/;
function priceCheck(val) {
  if (val) {
    if (!amount.test(val)) {
      share_util_message.showErrorToast("\u6570\u636E\u683C\u5F0F\u9519\u8BEF\u8BF7\u91CD\u65B0\u8F93\u5165");
      return false;
    }
    if (!seat.test(val)) {
      share_util_message.showErrorToast("\u4EC5\u652F\u6301\u5C0F\u6570\u4F4D\u524D\u6700\u591A14\u4F4D\u540E\u6700\u591A2\u4F4D");
      return false;
    }
  }
  return true;
}
exports.priceCheck = priceCheck;
