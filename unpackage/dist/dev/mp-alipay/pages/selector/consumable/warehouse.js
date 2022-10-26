"use strict";
var service_controller_consumable_basicDataController = require("../../../service/controller/consumable/basicDataController.js");
var common_vendor = require("../../../common/vendor.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
require("../../../service/controller/controllerBase/consumableControllerBase.js");
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
const mixTree = () => "../../../components/mix-tree/mix-tree.js";
const _sfc_main = {
  components: {
    "mix-tree": mixTree
  },
  props: {
    isPower: {},
    isLast: {},
    multiple: {},
    ids: {},
    disableOrg: {}
  },
  setup({
    isPower = "1",
    isLast = "0",
    multiple = "0",
    ids = "",
    disableOrg = "0"
  }) {
    const list = common_vendor.ref(null);
    const insideIsLast = isLast === "1";
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];
    const insideDisableOrg = disableOrg === "1";
    share_util_message.showLoading();
    service_controller_consumable_basicDataController.BasicDataController.getWarehouseTree(insideIsPower, insideDisableOrg).then((_d) => list.value = _d).finally(share_util_message.clearLoading);
    function treeDone(item) {
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.consumableWarehouseBack, item);
      share_redirect_index.navigateBack();
    }
    return {
      list,
      treeDone,
      insideIsLast,
      insideMultiple,
      insideIds
    };
  }
};
if (!Array) {
  const _easycom_mix_tree2 = common_vendor.resolveComponent("mix-tree");
  _easycom_mix_tree2();
}
const _easycom_mix_tree = () => "../../../components/mix-tree/mix-tree.js";
if (!Math) {
  _easycom_mix_tree();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.treeDone),
    b: common_vendor.p({
      list: $setup.list,
      idKey: "id",
      nameKey: "label",
      parentIdKey: "parent_id",
      childrenKey: "children",
      itemDisabledKey: "isDisabled",
      isLast: $setup.insideIsLast,
      multiple: $setup.insideMultiple,
      initIds: $setup.insideIds
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/pages/selector/consumable/warehouse.vue"]]);
my.createPage(MiniProgramPage);
