"use strict";
var common_vendor = require("../../../common/vendor.js");
require("../../../share/util/platform.js");
var service_controller_mine_MineController = require("../../../service/controller/mine/MineController.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_storage = require("../../../share/util/storage.js");
require("../../../service/enumeration/platformEnum.js");
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
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const _sfc_main = {
  setup() {
    const printerList = common_vendor.ref([]);
    const selectPrinterName = common_vendor.ref("");
    const templateList = common_vendor.ref([]);
    const selectTemplateName = common_vendor.ref("");
    selectTemplateName.value = typeof share_util_storage.getStorage("SelectLabelTemplate") === "object" ? share_util_storage.getStorage("SelectLabelTemplate").LabelName : "";
    selectPrinterName.value = typeof share_util_storage.getStorage("SelectPrinter") === "object" ? share_util_storage.getStorage("SelectPrinter").name : "";
    if (selectPrinterName.value) {
      testOpenPrinter(selectPrinterName.value);
    }
    async function selectPrinterFunc() {
      share_util_message.showLoading();
      try {
        const list = await api.getPrinters();
        if (list.length > 0) {
          printerList.value = list;
          common_vendor.index.showActionSheet({
            itemList: list.map((item) => item.name),
            success: function(res) {
              selectPrinterName.value = printerList.value[res.tapIndex].name;
              share_util_storage.setStorage("SelectPrinter", printerList.value[res.tapIndex]);
              testOpenPrinter(selectPrinterName.value);
            },
            fail: function(res) {
              console.log(res.errMsg);
            }
          });
        } else {
          share_util_message.showErrorToast("\u672A\u68C0\u6D4B\u5230\u6253\u5370\u673A");
        }
      } finally {
        share_util_message.clearLoading();
      }
    }
    function testOpenPrinter(printerName) {
      api.openPrinter(printerName, (value) => {
        if (value) {
          console.log("\u6253\u5370\u673A\u8FDE\u63A5\u6210\u529F");
          share_util_message.showOkToast("\u6253\u5370\u673A\u8FDE\u63A5\u6210\u529F");
        } else {
          console.log("\u6253\u5370\u673A\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\uFF01");
          share_util_message.showErrorToast("\u6253\u5370\u673A\u8FDE\u63A5\u5931\u8D25");
        }
      });
    }
    function selectTemplateFunc() {
      share_util_message.showLoading();
      service_controller_mine_MineController.mineController.getWithinLimitsByType(1).then((data) => {
        if (data.length > 0) {
          templateList.value = data;
          common_vendor.index.showActionSheet({
            itemList: data.map((item) => item.LabelName),
            success: function(res) {
              selectTemplateName.value = templateList.value[res.tapIndex].LabelName;
              share_util_storage.setStorage("SelectLabelTemplate", templateList.value[res.tapIndex]);
            },
            fail: function(res) {
              console.log(res.errMsg);
            }
          });
        } else {
          share_util_message.showErrorToast("\u65E0\u53EF\u7528\u6A21\u677F");
        }
      }).catch((err) => {
        share_util_message.showErrorToast(err);
      }).finally(() => share_util_message.clearLoading());
    }
    async function testPrinterFunc() {
      const width = 45;
      const height = 20;
      if (await api.isPrinterOpened()) {
        await api.startJob({ width, height });
        await api.drawLine({
          x1: 0,
          y1: 5,
          x2: width,
          y2: 5,
          lineWidth: 0.5
        });
        await api.drawDashLine({
          x1: 0,
          y1: 10,
          x2: width,
          y2: 10,
          dashLen: [0.5, 0.5],
          lineWidth: 0.5
        });
        await api.drawDashLine({
          x1: 0,
          y1: 15,
          x2: width,
          y2: 15,
          dashLen: [0.5, 0.75, 1],
          lineWidth: 0.5
        });
        await api.commitJob();
      }
    }
    function refreshFunc() {
      testOpenPrinter(selectPrinterName.value);
    }
    return {
      printerList,
      selectPrinterFunc,
      selectPrinterName,
      templateList,
      selectTemplateFunc,
      selectTemplateName,
      refreshFunc,
      testPrinterFunc
    };
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.selectPrinterFunc),
    b: common_vendor.p({
      title: "\u84DD\u7259\u6253\u5370\u673A\u5217\u8868",
      clickable: true,
      showArrow: true,
      rightText: `${$setup.selectPrinterName}`
    }),
    c: common_vendor.o($setup.selectTemplateFunc),
    d: common_vendor.p({
      title: "\u6807\u7B7E\u6A21\u677F",
      clickable: true,
      showArrow: true,
      rightText: `${$setup.selectTemplateName}`
    }),
    e: common_vendor.o((...args) => $setup.refreshFunc && $setup.refreshFunc(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4720b5cc"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/printer/index.vue"]]);
wx.createPage(MiniProgramPage);
