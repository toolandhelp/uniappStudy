"use strict";
var service_controller_system_employeeController = require("../../../service/controller/system/employeeController.js");
var common_vendor = require("../../../common/vendor.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const listDataSelect = () => "../../../components/list-data-select/list-data-select.js";
const _sfc_main = {
  components: { "list-data-select": listDataSelect },
  props: {
    isPower: {},
    multiple: {},
    ids: {},
    qse: {},
    corpID: {},
    isLeave: {},
    isUser: {},
    isChildrenCorp: {},
    enableEmployeeAccount: {}
  },
  setup({
    isPower = "1",
    multiple = "0",
    ids = null,
    qse = null,
    corpID = null,
    isLeave,
    isUser,
    isChildrenCorp,
    enableEmployeeAccount = null
  }) {
    const list = common_vendor.ref(null);
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];
    const insideIsLeave = isLeave ? isLeave === "1" : null;
    const insideIsUser = isUser ? isUser === "1" : null;
    const insideIsChildrenCorp = isChildrenCorp ? isChildrenCorp === "1" : null;
    const insideEnableEmployeeAccount = enableEmployeeAccount ? enableEmployeeAccount === "1" : null;
    search();
    function done(item) {
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.employeeSelectBack, item);
      share_redirect_index.navigateBack();
    }
    function search(v) {
      share_util_message.showLoading();
      service_controller_system_employeeController.employeeController.list({
        qst: v,
        qse,
        corpID,
        isPower: insideIsPower,
        isLeave: insideIsLeave,
        isUser: insideIsUser,
        isChildrenCorp: insideIsChildrenCorp,
        enableEmployeeAccount: insideEnableEmployeeAccount
      }).then(({ Items }) => list.value = Items).finally(share_util_message.clearLoading);
    }
    return {
      list,
      done,
      insideMultiple,
      insideIds,
      search
    };
  }
};
if (!Array) {
  const _easycom_list_data_select2 = common_vendor.resolveComponent("list-data-select");
  _easycom_list_data_select2();
}
const _easycom_list_data_select = () => "../../../components/list-data-select/list-data-select.js";
if (!Math) {
  _easycom_list_data_select();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.done),
    b: common_vendor.o($setup.search),
    c: common_vendor.p({
      list: $setup.list,
      idKey: "ID",
      nameKey: "Name",
      codeKey: "Code",
      multiple: $setup.insideMultiple,
      initIds: $setup.insideIds
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/pages/selector/system/employee.vue"]]);
wx.createPage(MiniProgramPage);
