"use strict";
var common_vendor = require("../../common/vendor.js");
function previewImgs(urls, i) {
  common_vendor.index.previewImage({
    current: urls[i],
    urls
  });
}
function previewImg(url) {
  common_vendor.index.previewImage({
    urls: [url]
  });
}
exports.previewImg = previewImg;
exports.previewImgs = previewImgs;
