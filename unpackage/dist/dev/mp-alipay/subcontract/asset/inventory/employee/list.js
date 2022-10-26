"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_asset_inventoryController = require("../../../../service/controller/asset/inventoryController.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
var share_util_message = require("../../../../share/util/message.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
require("../../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/serveUrl.js");
require("../../../../service/enumeration/productEnum.js");
require("../../../../share/util/index.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
const _sfc_main = {
  setup() {
    const qst = common_vendor.ref("");
    const list = common_vendor.ref([]);
    async function search() {
      share_util_message.showLoading();
      common_vendor.index.showNavigationBarLoading();
      const { Items } = await service_controller_asset_inventoryController.inventoryController.employeeList(qst.value);
      list.value = Items;
      share_util_message.clearLoading();
      common_vendor.index.stopPullDownRefresh();
      common_vendor.index.hideNavigationBarLoading();
    }
    {
      search();
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeInvDetailBack, search);
    }
    common_vendor.onPullDownRefresh(() => {
      search();
    });
    function itemClick(id, title, taskCode, employeeTaskID) {
      title = decodeURIComponent(title);
      share_redirect_index.navigateTo(`./detail?id=${id}&code=${taskCode}&employeeTaskID=${employeeTaskID}&title=${title}`);
    }
    return { qst, list, search, itemClick };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_easyinput2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_easyinput = () => "../../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_list_item = () => "../../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.search),
    b: common_vendor.o($setup.search),
    c: common_vendor.o($setup.search),
    d: common_vendor.o(($event) => $setup.qst = $event),
    e: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u76D8\u70B9\u4E3B\u9898/\u76D8\u70B9\u5355\u53F7",
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    f: common_vendor.f($setup.list, ({
      Title,
      WaitingCheck,
      AlreadyCheck,
      BillerEmployeeName,
      BillDatetime,
      TaskCode,
      TaskID,
      AllQty,
      EmployeeTaskID
    }, k0, i0) => {
      return {
        a: common_vendor.t(Title),
        b: common_vendor.t(TaskCode),
        c: common_vendor.t(WaitingCheck),
        d: common_vendor.t(AllQty),
        e: common_vendor.t(AlreadyCheck),
        f: common_vendor.t(BillerEmployeeName),
        g: common_vendor.t(BillDatetime),
        h: TaskID,
        i: common_vendor.o(($event) => $setup.itemClick(TaskID, Title, TaskCode, EmployeeTaskID)),
        j: "5e23a632-2-" + i0 + ",5e23a632-1"
      };
    }),
    g: common_vendor.p({
      link: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5e23a632"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/inventory/employee/list.vue"]]);
my.createPage(MiniProgramPage);
