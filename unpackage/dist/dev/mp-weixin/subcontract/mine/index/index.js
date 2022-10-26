"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_util_storage = require("../../../share/util/storage.js");
require("../../../service/controller/system/userController.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/redirect/index.js");
require("../../../share/util/index.js");
require("../../../share/util/message.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const _sfc_main = {
  setup() {
    const userName = share_util_storage.getStorage("UserName");
    const jobNo = share_util_storage.getStorage("UserCode");
    const headPhoto = "/static/images/touxiang.png";
    const contentDatas = [
      {
        lable: "\u5DE5\u53F7",
        text: jobNo
      },
      {
        lable: "\u6240\u5C5E\u90E8\u95E8",
        text: share_util_storage.getStorage("OrgName")
      }
    ];
    return {
      userName,
      jobNo,
      contentDatas,
      headPhoto
    };
  },
  components: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.headPhoto,
    b: common_vendor.t($setup.userName),
    c: common_vendor.f($setup.contentDatas, (value, index, i0) => {
      return {
        a: common_vendor.t(value.lable),
        b: common_vendor.t(value.text)
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d516a44"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/index/index.vue"]]);
wx.createPage(MiniProgramPage);
