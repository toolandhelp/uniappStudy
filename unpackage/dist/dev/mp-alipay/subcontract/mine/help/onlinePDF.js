"use strict";
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
var common_vendor = require("../../../common/vendor.js");
var share_util_message = require("../../../share/util/message.js");
require("../../../share/util/platform.js");
require("../../../service/enumeration/productEnum.js");
require("../../../service/enumeration/platformEnum.js");
const _sfc_main = {
  props: {
    filePath: String
  },
  setup(filePath) {
    let hostPath = common_vendor.reactive("");
    hostPath = `${share_http_serveUrl.getFileUrl("")}/pdfjs/web/viewer.html?path=${encodeURIComponent(share_http_serveUrl.getFileUrl("") + "/static/\u8F85\u52A9\u5DE5\u5177\u64CD\u4F5C\u624B\u518C2021-06.pdf")}`;
    if (filePath && filePath.filePath) {
      hostPath = hostPath.split("=")[0] + "=" + encodeURIComponent(share_http_serveUrl.getFileUrl("") + filePath.filePath);
    } else {
      share_util_message.showErrorToast("\u672A\u914D\u7F6E\u6587\u4EF6");
    }
    console.warn(hostPath);
    return {
      hostPath,
      webviewStyles: {
        progress: {
          color: "#FF3333"
        }
      }
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.webviewStyles,
    b: $setup.hostPath
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/help/onlinePDF.vue"]]);
my.createPage(MiniProgramPage);
