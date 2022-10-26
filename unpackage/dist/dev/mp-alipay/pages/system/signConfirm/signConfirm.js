"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_resources_confirm = require("../../../share/resources/confirm.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var share_http_axios = require("../../../share/http/axios.js");
var share_util_websocket = require("../../../share/util/websocket.js");
var share_util_imageTools = require("../../../share/util/image-tools.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../share/redirect/index.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/util/index.js");
require("../../../share/util/message.js");
require("../../../share/http/http.js");
require("../../../share/util/page.js");
const _sfc_main = {
  data() {
    return {
      signShow: false,
      key: "",
      billID: "",
      apiPath: "",
      filePath: "/Attachment/Upload",
      type: 0
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
        console.log(target);
        share_http_axios.send(this.apiPath, {
          ID: parseInt(this.billID),
          IsPass: true,
          SignPictureUrl: target.UploadedFileInfo.FileUrl
        }).then(() => {
          if (this.type == 0) {
            let wsMsg = {
              target: 0,
              billType: this.key
            };
            common_vendor.index.sendSocketMessage({
              data: JSON.stringify(wsMsg)
            });
          }
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.signBack).then(() => share_redirect_index.navigateBack());
        });
      });
    }
  },
  mounted() {
    var _a;
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    this.type = (_a = options.type) != null ? _a : 0;
    this.key = options.key;
    this.billID = options.billID;
    if (this.type == 0) {
      share_util_websocket.createSocket();
      let that = this;
      common_vendor.index.scanCode({
        cancel: () => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        },
        success: function(res) {
          let result = res.result;
          if (result.substring(0, 3).toLowerCase() == "##t") {
            var patten = /T=(1|2|10|3|100|101|102|103|104|105|106|107|108|109|110|111|112|200|201|202|203|204|205|206|207|208|209|210|211|212|213)&V=(\d+)/g;
            if (!patten.test(result)) {
              common_vendor.index.showToast({
                title: "\u4E8C\u7EF4\u7801\u65E0\u6548",
                icon: "error"
              });
              return;
            }
            that.key = RegExp.$1;
            that.billID = RegExp.$2;
            that.apiPath = share_resources_confirm.GetFullUrlByKey(that.key);
            that.signShow = true;
          } else {
            common_vendor.index.showToast({
              title: "\u4E8C\u7EF4\u7801\u65E0\u6548",
              icon: "error"
            });
          }
        }
      });
    }
    if (this.type == 1) {
      this.apiPath = share_resources_confirm.GetFullUrlByKey(this.key);
      this.signShow = true;
    }
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/pages/system/signConfirm/signConfirm.vue"]]);
my.createPage(MiniProgramPage);
