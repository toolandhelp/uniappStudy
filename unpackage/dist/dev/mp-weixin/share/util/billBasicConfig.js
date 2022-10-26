"use strict";
var share_redirect_index = require("../redirect/index.js");
var share_http_serveUrl = require("../http/serveUrl.js");
var share_util_image = require("./image.js");
const uniSwipeActionItemRightOptions = [
  { text: "\u53D6\u6D88", style: { backgroundColor: "#007aff" } },
  { text: "\u5220\u9664", style: { backgroundColor: "#F56C6C" } }
];
const fabPattern = {
  color: "#7A7E83",
  backgroundColor: "#fff",
  selectedColor: "#007AFF",
  buttonColor: "#007AFF",
  iconColor: "#fff"
};
const fabContent = [
  {
    iconPath: "/static/icon/sys.png",
    selectedIconPath: "/static/icon/sys.png",
    text: "\u626B\u7801",
    active: false
  },
  {
    iconPath: "/static/icon/edit.png",
    selectedIconPath: "/static/icon/edit.png",
    text: "\u68C0\u7D22",
    active: false
  },
  {
    iconPath: "/static/icon/asset_mingxi.png",
    selectedIconPath: "/static/icon/asset_mingxi.png",
    text: "\u660E\u7EC6",
    active: false
  },
  {
    iconPath: "/static/icon/asset_fujian.png",
    selectedIconPath: "/static/icon/asset_fujian.png",
    text: "\u9644\u4EF6",
    active: false
  }
];
function billStatusColor(v) {
  let colorText = {
    "border-color": "rgba(0,0,0,.0)",
    "color": "rgba(0,0,0,.0)"
  };
  switch (v) {
    case 1:
      colorText["border-color"] = "#444";
      colorText.color = "#444";
      break;
    case 2:
      colorText["border-color"] = "#ffc067";
      colorText.color = "#ffc067";
      break;
    case 3:
      colorText["border-color"] = "#f06a70";
      colorText.color = "#f06a70";
      break;
    case 4:
      colorText["border-color"] = "#ff5404";
      colorText.color = "#ff5404";
      break;
    case 5:
      colorText["border-color"] = "red";
      colorText.color = "red";
      break;
    case 7:
      colorText["border-color"] = "#00cffe";
      colorText.color = "#00cffe";
      break;
    case 8:
      colorText["border-color"] = "#83ca1d";
      colorText.color = "#83ca1d";
      break;
  }
  return colorText;
}
function assetStatusColor(v) {
  let colorText = {
    "border-color": "rgba(0,0,0,.0)",
    "color": "rgba(0,0,0,.0)"
  };
  switch (v) {
    case 1:
      colorText["border-color"] = "#c2c7ca";
      colorText.color = "#c2c7ca";
      break;
    case 2:
      colorText["border-color"] = "#00bc4b";
      colorText.color = "#00bc4b";
      break;
    case 3:
      colorText["border-color"] = "#feae4b";
      colorText.color = "#feae4b";
      break;
    case 4:
      colorText["border-color"] = "#ff5306";
      colorText.color = "#ff5306";
      break;
  }
  return colorText;
}
function viewAttachmentContent({ url }) {
  const format = url.slice(url.lastIndexOf(".") + 1);
  if (format == "jpg" || format == "png" || format == "jpeg") {
    share_util_image.previewImg(share_http_serveUrl.getFileUrl(url));
    return;
  }
  if (format == "pdf") {
    share_redirect_index.navigateTo(`/subcontract/mine/help/onlinePDF?filePath=${url}`);
  }
}
exports.assetStatusColor = assetStatusColor;
exports.billStatusColor = billStatusColor;
exports.fabContent = fabContent;
exports.fabPattern = fabPattern;
exports.uniSwipeActionItemRightOptions = uniSwipeActionItemRightOptions;
exports.viewAttachmentContent = viewAttachmentContent;
