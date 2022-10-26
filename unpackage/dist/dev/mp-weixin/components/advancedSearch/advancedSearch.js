"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_uniEvent = require("../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../share/redirect/index.js");
var service_controller_asset_assetController = require("../../service/controller/asset/assetController.js");
var share_util_platform = require("../../share/util/platform.js");
var service_enumeration_platformEnum = require("../../service/enumeration/platformEnum.js");
require("../../share/util/index.js");
require("../../share/util/storage.js");
require("../../service/controller/controllerBase/assetControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/token/index.js");
require("../../share/http/serveUrl.js");
require("../../service/enumeration/productEnum.js");
require("../../share/util/message.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
const DrawerAdvancedSearch = () => "../uni-drawer/components/uni-drawer/uni-drawer.js";
const UniPopupKeyword = () => "../uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.js";
const multiplePopupSelect = () => "../multiplePopupSelect/select.js";
const _sfc_main = {
  emits: ["closeDialog", "confirm"],
  components: {
    DrawerAdvancedSearch,
    UniPopupKeyword,
    multiplePopupSelect
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const conditionSearchPopup = common_vendor.ref(null);
    const advancedInputDialog = common_vendor.ref(null);
    const advancedInputVal = common_vendor.ref("");
    const advancedInputKey = common_vendor.ref("");
    const advancedSearch = common_vendor.ref({
      name: {
        hint: "\u8D44\u4EA7\u540D\u79F0",
        value: null
      },
      code: {
        hint: "\u8D44\u4EA7\u7F16\u7801",
        value: null
      },
      originalCode: {
        hint: "\u539F\u7F16\u7801",
        value: null
      },
      sn: {
        hint: "\u5E8F\u5217\u53F7",
        value: null
      },
      brand: {
        hint: "\u54C1\u724C",
        value: null
      },
      spec: {
        hint: "\u89C4\u683C",
        value: null
      },
      model: {
        hint: "\u578B\u53F7",
        value: null
      },
      category: {
        hint: "\u8D44\u4EA7\u5206\u7C7B",
        name: null,
        value: []
      },
      assetAttribute: {
        hint: "\u8D44\u4EA7\u6027\u8D28",
        name: null,
        value: [],
        options: []
      },
      supplier: {
        hint: "\u4F9B\u5E94\u5546",
        name: null,
        value: []
      },
      acquireWay: {
        hint: "\u53D6\u5F97\u65B9\u5F0F",
        name: null,
        value: [],
        options: []
      },
      dateOfPurchaseStart: {
        hint: "\u8D2D\u7F6E\u65E5\u671F(\u5F00\u59CB)",
        value: null
      },
      dateOfPurchaseEnd: {
        hint: "\u8D2D\u7F6E\u65E5\u671F(\u7ED3\u675F)",
        value: null
      },
      registerDateStart: {
        hint: "\u767B\u8BB0\u65E5\u671F(\u5F00\u59CB)",
        value: null
      },
      registerDateEnd: {
        hint: "\u767B\u8BB0\u65E5\u671F(\u7ED3\u675F)",
        value: null
      },
      kAO: {
        hint: "\u7BA1\u7406\u90E8\u95E8",
        name: null,
        value: []
      },
      kAE: {
        hint: "\u7BA1\u7406\u4EBA\u5458",
        name: null,
        value: []
      },
      uAO: {
        hint: "\u4F7F\u7528\u90E8\u95E8",
        name: null,
        value: []
      },
      uAE: {
        hint: "\u4F7F\u7528\u4EBA\u5458",
        name: null,
        value: []
      },
      location: {
        hint: "\u5B58\u653E\u4F4D\u7F6E",
        name: null,
        value: []
      },
      corp: {
        hint: "\u6240\u5C5E\u516C\u53F8",
        name: null,
        value: []
      },
      usage: {
        hint: "\u4F7F\u7528\u60C5\u51B5",
        name: null,
        value: [],
        options: []
      },
      status: {
        hint: "\u8D44\u4EA7\u72B6\u6001",
        name: "\u95F2\u7F6E,\u5728\u7528",
        value: [1, 2],
        options: []
      },
      kAEName: {
        hint: "\u7BA1\u7406\u4EBA\u5458\u59D3\u540D",
        value: null
      },
      uAEName: {
        hint: "\u4F7F\u7528\u4EBA\u5458\u59D3\u540D",
        value: null
      }
    });
    const windowHeights = common_vendor.ref(null);
    const bottomHeight = common_vendor.ref("");
    bottomHeight.value = share_util_platform.currentPlatform == service_enumeration_platformEnum.platformEnum.app ? 185 : 105;
    function advancedInputConfirm(val) {
      advancedSearch.value[advancedInputKey.value].value = val.trim();
    }
    function openAdvancedInputDialog(key) {
      advancedInputVal.value = advancedSearch.value[key].value;
      advancedInputKey.value = key;
      advancedInputDialog.value.open();
    }
    function removeAdvancedInput(key) {
      if (key == "category" || key == "supplier" || key == "corp" || key == "kAO" || key == "kAE" || key == "uAO" || key == "uAE" || key == "corp" || key == "location") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
      } else if (key == "assetAttribute" || key == "acquireWay" || key == "usage" || key == "status") {
        advancedSearch.value[key].value = [];
        advancedSearch.value[key].name = null;
      } else {
        advancedSearch.value[key].value = null;
      }
    }
    function inputChange({ value, text }, key) {
      advancedSearch.value[key].value = value;
      advancedSearch.value[key].name = text;
    }
    function conditionReset() {
      const data = advancedSearch.value;
      data.name.value = null;
      data.code.value = null;
      data.originalCode.value = null;
      data.sn.value = null;
      data.brand.value = null;
      data.spec.value = null;
      data.model.value = null;
      data.category.name = null;
      data.category.value = [];
      data.assetAttribute.value = [];
      data.supplier.name = null;
      data.supplier.value = [];
      data.acquireWay.name = null;
      data.acquireWay.value = [];
      data.dateOfPurchaseStart.value = null;
      data.dateOfPurchaseEnd.value = null;
      data.registerDateStart.value = null;
      data.registerDateEnd.value = null;
      data.kAO.name = null;
      data.kAO.value = [];
      data.kAE.name = null;
      data.kAE.value = [];
      data.uAO.name = null;
      data.uAO.value = [];
      data.uAE.name = null;
      data.uAE.value = [];
      data.location.name = null;
      data.location.value = [];
      data.corp.name = null;
      data.corp.value = [];
      data.usage.name = null;
      data.usage.value = [];
      data.status.name = "\u95F2\u7F6E,\u5728\u7528";
      data.status.value = [1, 2];
      data.kAEName.value = null;
      data.uAEName.value = null;
    }
    function categorySelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.assetCategorySelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/category?isLast=0&multiple=1&ids=${ids}`);
    }
    function supplierSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.supplierSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/supplier?isLast=0&multiple=1&ids=${ids}`);
    }
    function locationSelect() {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value.location.value = ids2;
        advancedSearch.value.location.name = names;
      });
      const ids = advancedSearch.value.location.value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=0&multiple=1&ids=${ids}`);
    }
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ ids: ids2, names }) => {
        advancedSearch.value[key].value = ids2;
        advancedSearch.value[key].name = names;
      });
      const ids = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=1&type=${key == "corp" ? 2 : null}&ids=${ids}`);
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ids, names }) => {
        advancedSearch.value[key].value = ids;
        advancedSearch.value[key].name = names;
      });
      const _id = advancedSearch.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=1&ids=${_id}`);
    }
    function close() {
      ctx.emit("closeDialog");
    }
    function querySearch() {
      const obj = advancedSearch.value;
      let conditions = [], KAENameText = "", UAENameText = "";
      for (let i in obj) {
        if (obj[i].value && obj[i].value.constructor == Array && obj[i].value.length > 0) {
          const val = obj[i].value.map((p) => {
            return {
              Value: p
            };
          });
          conditions.push({
            AssetPropertyCode: keyValue(i),
            Operator: 7,
            Values: val
          });
        } else if (obj[i].value && obj[i].value.constructor != Array) {
          if (i == "dateOfPurchaseStart" || i == "registerDateStart") {
            conditions.push({
              AssetPropertyCode: keyValue(i),
              Operator: 4,
              Values: [{ Value: obj[i].value }]
            });
          } else if (i == "dateOfPurchaseEnd" || i == "registerDateEnd") {
            conditions.push({
              AssetPropertyCode: keyValue(i),
              Operator: 6,
              Values: [{ Value: obj[i].value }]
            });
          } else if (i == "kAEName" || i == "uAEName") {
            if (i == "kAEName") {
              KAENameText = obj[i].value;
            } else {
              UAENameText = obj[i].value;
            }
          } else {
            conditions.push({
              AssetPropertyCode: keyValue(i),
              Operator: 7,
              Values: [{ Value: obj[i].value }]
            });
          }
        }
      }
      ctx.emit("confirm", conditions, KAENameText, UAENameText);
    }
    function keyValue(key) {
      let str = "";
      switch (key) {
        case "name":
          str = "Name";
          break;
        case "code":
          str = "Code";
          break;
        case "originalCode":
          str = "OriginalCode";
          break;
        case "sn":
          str = "SN";
          break;
        case "brand":
          str = "Brand";
          break;
        case "spec":
          str = "Spec";
          break;
        case "model":
          str = "Model";
          break;
        case "category":
          str = "AssetCategoryID";
          break;
        case "assetAttribute":
          str = "AssetAttributeID";
          break;
        case "supplier":
          str = "SupplierID";
          break;
        case "acquireWay":
          str = "AcquireWayID";
          break;
        case "dateOfPurchaseStart":
          str = "DateOfPurchase";
          break;
        case "dateOfPurchaseEnd":
          str = "DateOfPurchase";
          break;
        case "registerDateStart":
          str = "RegisterDatetime";
          break;
        case "registerDateEnd":
          str = "RegisterDatetime";
          break;
        case "kAO":
          str = "KAOID";
          break;
        case "kAE":
          str = "KAEID";
          break;
        case "uAO":
          str = "UAOID";
          break;
        case "uAE":
          str = "UAEID";
          break;
        case "location":
          str = "LocationID";
          break;
        case "corp":
          str = "CorpID";
          break;
        case "usage":
          str = "AssetUsage";
          break;
        case "status":
          str = "AssetStatus";
          break;
        case "kAENameText":
          str = "KAENameText";
          break;
        case "uAENameText":
          str = "UAENameText";
          break;
      }
      return str;
    }
    function scanInput(key) {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          advancedSearch.value[key].value = result;
        }
      });
    }
    {
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
      service_controller_asset_assetController.assetController.assetGetOptions().then(({ AssetEnums }) => {
        const { AcquireWay, AssetAttribute, AssetStatuses, AssetUsage } = AssetEnums;
        advancedSearch.value.acquireWay.options = AcquireWay.map((p) => {
          return { text: p.Value, value: p.Key };
        });
        advancedSearch.value.assetAttribute.options = AssetAttribute.map((p) => {
          return { text: p.Value, value: p.Key };
        });
        advancedSearch.value.status.options = AssetStatuses.map((p) => {
          return { text: p.Value, value: p.Key };
        });
        advancedSearch.value.usage.options = AssetUsage.map((p) => {
          return { text: p.Value, value: p.Key };
        });
      });
    }
    common_vendor.watch(() => props.show, (newVal) => {
      if (newVal) {
        conditionSearchPopup.value.open();
      } else {
        conditionSearchPopup.value.close();
      }
    });
    return {
      windowHeights,
      bottomHeight,
      conditionSearchPopup,
      advancedSearch,
      openAdvancedInputDialog,
      removeAdvancedInput,
      categorySelect,
      corpDeptSelect,
      locationSelect,
      personnelSelect,
      supplierSelect,
      advancedInputVal,
      advancedInputKey,
      advancedInputDialog,
      advancedInputConfirm,
      conditionReset,
      inputChange,
      close,
      dateTimeChange: ({ detail: { value } }, key) => {
        advancedSearch.value[key].value = value;
      },
      querySearch,
      scanInput
    };
  }
};
if (!Array) {
  const _component_uni_popup_keyword = common_vendor.resolveComponent("uni-popup-keyword");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _component_multiple_popup_select = common_vendor.resolveComponent("multiple-popup-select");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  (_component_uni_popup_keyword + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _component_multiple_popup_select + _easycom_uni_list2 + _component_DrawerAdvancedSearch)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "27e6af31-2,27e6af31-1"),
    b: common_vendor.o($setup.advancedInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u68C0\u7D22\u4FE1\u606F",
      value: $setup.advancedInputVal,
      placeholder: "\u8BF7\u8F93\u5165\u68C0\u7D22\u4FE1\u606F"
    }),
    d: common_vendor.sr("advancedInputDialog", "27e6af31-1,27e6af31-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    g: common_vendor.t($setup.advancedSearch.name.value ? $setup.advancedSearch.name.value : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0"),
    h: common_vendor.n($setup.advancedSearch.name.value ? "content_effective" : ""),
    i: common_vendor.o(($event) => $setup.openAdvancedInputDialog("name")),
    j: $setup.advancedSearch.name.value
  }, $setup.advancedSearch.name.value ? {
    k: common_vendor.o(($event) => $setup.removeAdvancedInput("name")),
    l: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    m: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u8D44\u4EA7\u7F16\u7801"),
    n: common_vendor.n($setup.advancedSearch.code.value ? "content_effective" : ""),
    o: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    p: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    q: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    r: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    s: common_vendor.o(($event) => $setup.scanInput("code")),
    t: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    v: common_vendor.t($setup.advancedSearch.originalCode.value ? $setup.advancedSearch.originalCode.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u539F\u7F16\u7801"),
    w: common_vendor.n($setup.advancedSearch.originalCode.value ? "content_effective" : ""),
    x: common_vendor.o(($event) => $setup.openAdvancedInputDialog("originalCode")),
    y: $setup.advancedSearch.originalCode.value
  }, $setup.advancedSearch.originalCode.value ? {
    z: common_vendor.o(($event) => $setup.removeAdvancedInput("originalCode")),
    A: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    B: common_vendor.o(($event) => $setup.scanInput("originalCode")),
    C: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    D: common_vendor.t($setup.advancedSearch.sn.value ? $setup.advancedSearch.sn.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u5E8F\u5217\u53F7"),
    E: common_vendor.n($setup.advancedSearch.sn.value ? "content_effective" : ""),
    F: common_vendor.o(($event) => $setup.openAdvancedInputDialog("sn")),
    G: $setup.advancedSearch.sn.value
  }, $setup.advancedSearch.sn.value ? {
    H: common_vendor.o(($event) => $setup.removeAdvancedInput("sn")),
    I: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    J: common_vendor.o(($event) => $setup.scanInput("sn")),
    K: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    L: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u8BF7\u8F93\u5165\u54C1\u724C"),
    M: common_vendor.n($setup.advancedSearch.brand.value ? "content_effective" : ""),
    N: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    O: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    P: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    Q: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    R: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u8BF7\u8F93\u5165\u89C4\u683C"),
    S: common_vendor.n($setup.advancedSearch.spec.value ? "content_effective" : ""),
    T: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    U: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    V: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    W: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    X: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u8BF7\u8F93\u5165\u578B\u53F7"),
    Y: common_vendor.n($setup.advancedSearch.model.value ? "content_effective" : ""),
    Z: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    aa: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    ab: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    ac: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ad: common_vendor.t($setup.advancedSearch.category.value.length > 0 ? $setup.advancedSearch.category.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u5206\u7C7B"),
    ae: common_vendor.n($setup.advancedSearch.category.value.length > 0 ? "content_effective" : ""),
    af: common_vendor.o(($event) => $setup.categorySelect("category")),
    ag: $setup.advancedSearch.category.value.length > 0
  }, $setup.advancedSearch.category.value.length > 0 ? {
    ah: common_vendor.o(($event) => $setup.removeAdvancedInput("category")),
    ai: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aj: common_vendor.t($setup.advancedSearch.assetAttribute.value.length ? $setup.advancedSearch.assetAttribute.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u6027\u8D28"),
    ak: common_vendor.n($setup.advancedSearch.assetAttribute.value.length ? "content_effective" : ""),
    al: common_vendor.o((val) => $setup.inputChange(val, "assetAttribute")),
    am: common_vendor.p({
      options: $setup.advancedSearch.assetAttribute.options,
      value: $setup.advancedSearch.assetAttribute.value
    }),
    an: $setup.advancedSearch.assetAttribute.value.length
  }, $setup.advancedSearch.assetAttribute.value.length ? {
    ao: common_vendor.o(($event) => $setup.removeAdvancedInput("assetAttribute")),
    ap: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aq: common_vendor.t($setup.advancedSearch.supplier.value.length > 0 ? $setup.advancedSearch.supplier.name : "\u8BF7\u8F93\u5165\u4F9B\u5E94\u5546"),
    ar: common_vendor.n($setup.advancedSearch.supplier.value.length > 0 ? "content_effective" : ""),
    as: common_vendor.o(($event) => $setup.supplierSelect("supplier")),
    at: $setup.advancedSearch.supplier.value.length > 0
  }, $setup.advancedSearch.supplier.value.length > 0 ? {
    av: common_vendor.o(($event) => $setup.removeAdvancedInput("supplier")),
    aw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ax: common_vendor.t($setup.advancedSearch.acquireWay.value.length ? $setup.advancedSearch.acquireWay.name : "\u8BF7\u8F93\u5165\u53D6\u5F97\u65B9\u5F0F"),
    ay: common_vendor.n($setup.advancedSearch.acquireWay.value.length ? "content_effective" : ""),
    az: common_vendor.o((val) => $setup.inputChange(val, "acquireWay")),
    aA: common_vendor.p({
      options: $setup.advancedSearch.acquireWay.options,
      value: $setup.advancedSearch.acquireWay.value
    }),
    aB: $setup.advancedSearch.acquireWay.value.length
  }, $setup.advancedSearch.acquireWay.value.length ? {
    aC: common_vendor.o(($event) => $setup.removeAdvancedInput("acquireWay")),
    aD: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aE: common_vendor.t($setup.advancedSearch.dateOfPurchaseStart.value ? $setup.advancedSearch.dateOfPurchaseStart.value : "\u8BF7\u8F93\u5165\u8D2D\u7F6E\u65E5\u671F(\u5F00\u59CB)"),
    aF: common_vendor.n($setup.advancedSearch.dateOfPurchaseStart.value ? "content_effective" : ""),
    aG: common_vendor.o((data) => $setup.dateTimeChange(data, "dateOfPurchaseStart")),
    aH: $setup.advancedSearch.dateOfPurchaseStart.value
  }, $setup.advancedSearch.dateOfPurchaseStart.value ? {
    aI: common_vendor.o(($event) => $setup.removeAdvancedInput("dateOfPurchaseStart")),
    aJ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aK: common_vendor.t($setup.advancedSearch.dateOfPurchaseEnd.value ? $setup.advancedSearch.dateOfPurchaseEnd.value : "\u8BF7\u8F93\u5165\u8D2D\u7F6E\u65E5\u671F(\u7ED3\u675F)"),
    aL: common_vendor.n($setup.advancedSearch.dateOfPurchaseEnd.value ? "content_effective" : ""),
    aM: common_vendor.o((data) => $setup.dateTimeChange(data, "dateOfPurchaseEnd")),
    aN: $setup.advancedSearch.dateOfPurchaseEnd.value
  }, $setup.advancedSearch.dateOfPurchaseEnd.value ? {
    aO: common_vendor.o(($event) => $setup.removeAdvancedInput("dateOfPurchaseEnd")),
    aP: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aQ: common_vendor.t($setup.advancedSearch.registerDateStart.value ? $setup.advancedSearch.registerDateStart.value : "\u8BF7\u8F93\u5165\u767B\u8BB0\u65E5\u671F(\u5F00\u59CB)"),
    aR: common_vendor.n($setup.advancedSearch.registerDateStart.value ? "content_effective" : ""),
    aS: common_vendor.o((data) => $setup.dateTimeChange(data, "registerDateStart")),
    aT: $setup.advancedSearch.registerDateStart.value
  }, $setup.advancedSearch.registerDateStart.value ? {
    aU: common_vendor.o(($event) => $setup.removeAdvancedInput("registerDateStart")),
    aV: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aW: common_vendor.t($setup.advancedSearch.registerDateEnd.value ? $setup.advancedSearch.registerDateEnd.value : "\u8BF7\u8F93\u5165\u767B\u8BB0\u65E5\u671F(\u7ED3\u675F)"),
    aX: common_vendor.n($setup.advancedSearch.registerDateEnd.value ? "content_effective" : ""),
    aY: common_vendor.o((data) => $setup.dateTimeChange(data, "registerDateEnd")),
    aZ: $setup.advancedSearch.registerDateEnd.value
  }, $setup.advancedSearch.registerDateEnd.value ? {
    ba: common_vendor.o(($event) => $setup.removeAdvancedInput("registerDateEnd")),
    bb: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bc: common_vendor.t($setup.advancedSearch.kAO.value.length > 0 ? $setup.advancedSearch.kAO.name : "\u8BF7\u8F93\u5165\u7BA1\u7406\u90E8\u95E8"),
    bd: common_vendor.n($setup.advancedSearch.kAO.value.length > 0 ? "content_effective" : ""),
    be: common_vendor.o(($event) => $setup.corpDeptSelect("kAO")),
    bf: $setup.advancedSearch.kAO.value.length > 0
  }, $setup.advancedSearch.kAO.value.length > 0 ? {
    bg: common_vendor.o(($event) => $setup.removeAdvancedInput("kAO")),
    bh: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bi: common_vendor.t($setup.advancedSearch.kAE.value.length > 0 ? $setup.advancedSearch.kAE.name : "\u8BF7\u8F93\u5165\u7BA1\u7406\u4EBA\u5458"),
    bj: common_vendor.n($setup.advancedSearch.kAE.value.length > 0 ? "content_effective" : ""),
    bk: common_vendor.o(($event) => $setup.personnelSelect("kAE")),
    bl: $setup.advancedSearch.kAE.value.length > 0
  }, $setup.advancedSearch.kAE.value.length > 0 ? {
    bm: common_vendor.o(($event) => $setup.removeAdvancedInput("kAE")),
    bn: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bo: common_vendor.t($setup.advancedSearch.uAO.value.length > 0 ? $setup.advancedSearch.uAO.name : "\u8BF7\u8F93\u5165\u4F7F\u7528\u90E8\u95E8"),
    bp: common_vendor.n($setup.advancedSearch.uAO.value.length > 0 ? "content_effective" : ""),
    bq: common_vendor.o(($event) => $setup.corpDeptSelect("uAO")),
    br: $setup.advancedSearch.uAO.value.length > 0
  }, $setup.advancedSearch.uAO.value.length > 0 ? {
    bs: common_vendor.o(($event) => $setup.removeAdvancedInput("uAO")),
    bt: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bv: common_vendor.t($setup.advancedSearch.uAE.value.length > 0 ? $setup.advancedSearch.uAE.name : "\u8BF7\u8F93\u5165\u4F7F\u7528\u4EBA\u5458"),
    bw: common_vendor.n($setup.advancedSearch.uAE.value.length > 0 ? "content_effective" : ""),
    bx: common_vendor.o(($event) => $setup.personnelSelect("uAE")),
    by: $setup.advancedSearch.uAE.value.length > 0
  }, $setup.advancedSearch.uAE.value.length > 0 ? {
    bz: common_vendor.o(($event) => $setup.removeAdvancedInput("uAE")),
    bA: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bB: common_vendor.t($setup.advancedSearch.location.value.length > 0 ? $setup.advancedSearch.location.name : "\u8BF7\u8F93\u5165\u5B58\u653E\u4F4D\u7F6E"),
    bC: common_vendor.n($setup.advancedSearch.location.value.length > 0 ? "content_effective" : ""),
    bD: common_vendor.o(($event) => $setup.locationSelect("location")),
    bE: $setup.advancedSearch.location.value.length > 0
  }, $setup.advancedSearch.location.value.length > 0 ? {
    bF: common_vendor.o(($event) => $setup.removeAdvancedInput("location")),
    bG: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bH: common_vendor.t($setup.advancedSearch.corp.value.length > 0 ? $setup.advancedSearch.corp.name : "\u8BF7\u8F93\u5165\u6240\u5C5E\u516C\u53F8"),
    bI: common_vendor.n($setup.advancedSearch.corp.value.length > 0 ? "content_effective" : ""),
    bJ: common_vendor.o(($event) => $setup.corpDeptSelect("corp")),
    bK: $setup.advancedSearch.corp.value.length > 0
  }, $setup.advancedSearch.corp.value.length > 0 ? {
    bL: common_vendor.o(($event) => $setup.removeAdvancedInput("corp")),
    bM: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bN: common_vendor.t($setup.advancedSearch.usage.value.length ? $setup.advancedSearch.usage.name : "\u4F7F\u7528\u60C5\u51B5"),
    bO: common_vendor.n($setup.advancedSearch.usage.value.length ? "content_effective" : ""),
    bP: common_vendor.o((val) => $setup.inputChange(val, "usage")),
    bQ: common_vendor.p({
      options: $setup.advancedSearch.usage.options,
      value: $setup.advancedSearch.usage.value
    }),
    bR: $setup.advancedSearch.usage.value.length
  }, $setup.advancedSearch.usage.value.length ? {
    bS: common_vendor.o(($event) => $setup.removeAdvancedInput("usage")),
    bT: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bU: common_vendor.t($setup.advancedSearch.status.value.length ? $setup.advancedSearch.status.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u72B6\u6001"),
    bV: common_vendor.n($setup.advancedSearch.status.value.length ? "content_effective" : ""),
    bW: common_vendor.o((val) => $setup.inputChange(val, "status")),
    bX: common_vendor.p({
      options: $setup.advancedSearch.status.options,
      value: $setup.advancedSearch.status.value
    }),
    bY: $setup.advancedSearch.status.value.length
  }, $setup.advancedSearch.status.value.length ? {
    bZ: common_vendor.o(($event) => $setup.removeAdvancedInput("status")),
    ca: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    cb: common_vendor.t($setup.advancedSearch.kAEName.value ? $setup.advancedSearch.kAEName.value : "\u8BF7\u8F93\u5165\u540D\u79F0"),
    cc: common_vendor.n($setup.advancedSearch.kAEName.value ? "content_effective" : ""),
    cd: common_vendor.o(($event) => $setup.openAdvancedInputDialog("kAEName")),
    ce: $setup.advancedSearch.kAEName.value
  }, $setup.advancedSearch.kAEName.value ? {
    cf: common_vendor.o(($event) => $setup.removeAdvancedInput("kAEName")),
    cg: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ch: common_vendor.t($setup.advancedSearch.uAEName.value ? $setup.advancedSearch.uAEName.value : "\u8BF7\u8F93\u5165\u540D\u79F0"),
    ci: common_vendor.n($setup.advancedSearch.uAEName.value ? "content_effective" : ""),
    cj: common_vendor.o(($event) => $setup.openAdvancedInputDialog("uAEName")),
    ck: $setup.advancedSearch.uAEName.value
  }, $setup.advancedSearch.uAEName.value ? {
    cl: common_vendor.o(($event) => $setup.removeAdvancedInput("uAEName")),
    cm: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    cn: common_vendor.s(`height:${$setup.windowHeights - $setup.bottomHeight}px`),
    co: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    cp: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    cq: common_vendor.o((...args) => $setup.close && $setup.close(...args)),
    cr: common_vendor.sr("conditionSearchPopup", "27e6af31-0"),
    cs: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: _ctx.windowWidths
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/components/advancedSearch/advancedSearch.vue"]]);
wx.createComponent(Component);
