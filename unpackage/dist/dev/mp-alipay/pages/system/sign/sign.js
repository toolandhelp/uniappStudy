"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_resources_confirm = require("../../../share/resources/confirm.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_http_axios = require("../../../share/http/axios.js");
var share_util_imageTools = require("../../../share/util/image-tools.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/redirect/index.js");
require("../../../share/util/index.js");
require("../../../share/util/message.js");
require("../../../share/http/http.js");
require("../../../share/util/page.js");
const _sfc_main = {
  data() {
    return {
      signShow: false,
      ID: "",
      SignPictureUrl: "",
      ProductType: "",
      BillType: "",
      ActivityID: "",
      ActivityName: "",
      apiPath: "/BillApproval/ApprovalFlow/Sign"
    };
  },
  methods: {
    cancel() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    async success(file) {
      let base64str = file.tempFilePath;
      base64str = await share_util_imageTools.pathToBase64(file.tempFilePath);
      console.log(base64str);
      service_controller_asset_assetController.assetController.uploadSignImageByBase64(base64str).then((res) => {
        let target = res;
        let data = {
          ID: parseInt(this.ID),
          SignPictureUrl: target.UploadedFileInfo.FileUrl,
          ProductType: this.ProductType,
          BillType: this.BillType,
          ActivityID: this.ActivityID,
          ActivityName: this.ActivityName
        };
        share_http_axios.send(this.apiPath, data).then(() => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        });
      });
    }
  },
  mounted() {
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    this.ID = options.ID;
    this.ProductType = options.ProductType;
    this.BillType = options.BillType;
    this.ActivityID = options.ActivityID;
    this.ActivityName = options.ActivityName;
    this.apiPath = share_resources_confirm.GetSignPath(this.apiPath);
    this.signShow = true;
  }
};
if (!Array) {
  const _easycom_cj_signed_version2 = common_vendor.resolveComponent("cj-signed-version");
  _easycom_cj_signed_version2();
}
const _easycom_cj_signed_version = () => "../../../components/cj-signed-version/cj-signed-version.js";
if (!Math) {
  _easycom_cj_signed_version();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.signShow
  }, $data.signShow ? {
    b: common_vendor.o($options.success),
    c: common_vendor.o($options.cancel)
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/pages/system/sign/sign.vue"]]);
my.createPage(MiniProgramPage);
