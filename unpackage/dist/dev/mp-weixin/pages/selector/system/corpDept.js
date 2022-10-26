"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_system_deptController = require("../../../service/controller/system/deptController.js");
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
const mixTree = () => "../../../components/mix-tree/mix-tree.js";
function checkDept(org, type) {
  if (type == "1") {
    if (org.Type === 2) {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u90E8\u95E8(\u5F53\u524D\u9009\u62E9\u4E0D\u5E94\u8BE5\u5305\u542B\u516C\u53F8)");
      return false;
    }
  } else if (type == "2") {
    if (org.Type !== 2) {
      share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u516C\u53F8(\u5F53\u524D\u9009\u62E9\u4E0D\u5E94\u8BE5\u5305\u542B\u90E8\u95E8)");
      return false;
    }
  }
}
const _sfc_main = {
  components: {
    "mix-tree": mixTree
  },
  props: {
    isPower: {},
    isLast: {},
    multiple: {},
    ids: {},
    type: {}
  },
  setup({
    isPower = "1",
    isLast = "0",
    multiple = "0",
    ids = "",
    type = null
  }) {
    const list = common_vendor.ref(null);
    const insideIsLast = isLast === "1";
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];
    const insideType = type ? type : null;
    if (insideType === "1") {
      common_vendor.index.setNavigationBarTitle({ title: "\u8BF7\u9009\u62E9\u90E8\u95E8" });
    } else if (insideType === "2") {
      common_vendor.index.setNavigationBarTitle({ title: "\u8BF7\u9009\u62E9\u516C\u53F8" });
    }
    share_util_message.showLoading();
    service_controller_system_deptController.deptController.getDeptTree(insideIsPower, insideType).then((d) => list.value = d).finally(share_util_message.clearLoading);
    function treeDone(item) {
      if (insideType !== null) {
        if (insideMultiple) {
          for (const one of item.items) {
            if (checkDept(one, insideType) === false) {
              return;
            }
          }
        } else {
          if (checkDept(item, insideType) === false) {
            return;
          }
        }
      }
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.deptSelectBack, item);
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
      isLast: $setup.insideIsLast,
      multiple: $setup.insideMultiple,
      initIds: $setup.insideIds
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/pages/selector/system/corpDept.vue"]]);
wx.createPage(MiniProgramPage);
