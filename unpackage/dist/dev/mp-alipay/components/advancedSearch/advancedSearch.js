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
const _sfc_main = {
  emits: ["closeDialog", "confirm"],
  components: {
    DrawerAdvancedSearch
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
        value: null,
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
        value: null,
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
        value: null,
        options: []
      },
      status: {
        hint: "\u8D44\u4EA7\u72B6\u6001",
        name: null,
        value: null,
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
    bottomHeight.value = share_util_platform.currentPlatform == service_enumeration_platformEnum.platformEnum.app ? 185 : 95;
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
      } else if (key == "assetAttrbute" || key == "acquireWay" || key == "usage" || key == "status") {
        advancedSearch.value[key].value = null;
        advancedSearch.value[key].name = null;
      } else {
        advancedSearch.value[key].value = null;
      }
    }
    function inputChange(val, key) {
      advancedSearch.value[key].value = val;
      advancedSearch.value[key].name = advancedSearch.value[key].options.filter((p) => p.value == val)[0].text;
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
      data.assetAttribute.value = null;
      data.supplier.name = null;
      data.supplier.value = [];
      data.acquireWay.name = null;
      data.acquireWay.value = null;
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
      data.usage.value = null;
      data.status.name = null;
      data.status.value = null;
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
      let conditions = [];
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
          } else {
            conditions.push({
              AssetPropertyCode: keyValue(i),
              Operator: 7,
              Values: [{ Value: obj[i].value }]
            });
          }
        }
      }
      ctx.emit("confirm", conditions);
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
        case "kAEName":
          str = "KAENameText";
          break;
        case "uAEName":
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
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_DrawerAdvancedSearch = common_vendor.resolveComponent("DrawerAdvancedSearch");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_data_picker2 + _easycom_uni_list2 + _component_DrawerAdvancedSearch)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_section = () => "../uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_data_picker + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.advancedInputConfirm),
    b: common_vendor.p({
      mode: "input",
      title: "\u5F55\u5165\u68C0\u7D22\u4FE1\u606F",
      value: $setup.advancedInputVal,
      placeholder: "\u8BF7\u8F93\u5165\u68C0\u7D22\u4FE1\u606F"
    }),
    c: common_vendor.p({
      type: "dialog"
    }),
    d: common_vendor.p({
      title: "\u9AD8\u7EA7\u641C\u7D22",
      type: "line"
    }),
    e: common_vendor.t($setup.advancedSearch.name.value ? $setup.advancedSearch.name.value : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u540D\u79F0"),
    f: common_vendor.n($setup.advancedSearch.name.value ? "info-item-color" : ""),
    g: common_vendor.o(($event) => $setup.openAdvancedInputDialog("name")),
    h: $setup.advancedSearch.name.value
  }, $setup.advancedSearch.name.value ? {
    i: common_vendor.o(($event) => $setup.removeAdvancedInput("name")),
    j: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    k: common_vendor.t($setup.advancedSearch.code.value ? $setup.advancedSearch.code.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u8D44\u4EA7\u7F16\u7801"),
    l: common_vendor.n($setup.advancedSearch.code.value ? "info-item-color" : ""),
    m: common_vendor.o(($event) => $setup.openAdvancedInputDialog("code")),
    n: $setup.advancedSearch.code.value
  }, $setup.advancedSearch.code.value ? {
    o: common_vendor.o(($event) => $setup.removeAdvancedInput("code")),
    p: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    q: common_vendor.o(($event) => $setup.scanInput("code")),
    r: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    s: common_vendor.t($setup.advancedSearch.originalCode.value ? $setup.advancedSearch.originalCode.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u539F\u7F16\u7801"),
    t: common_vendor.n($setup.advancedSearch.originalCode.value ? "info-item-color" : ""),
    v: common_vendor.o(($event) => $setup.openAdvancedInputDialog("originalCode")),
    w: $setup.advancedSearch.originalCode.value
  }, $setup.advancedSearch.originalCode.value ? {
    x: common_vendor.o(($event) => $setup.removeAdvancedInput("originalCode")),
    y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    z: common_vendor.o(($event) => $setup.scanInput("originalCode")),
    A: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    B: common_vendor.t($setup.advancedSearch.sn.value ? $setup.advancedSearch.sn.value : "\u8BF7\u626B\u63CF/\u8F93\u5165\u5E8F\u5217\u53F7"),
    C: common_vendor.n($setup.advancedSearch.sn.value ? "info-item-color" : ""),
    D: common_vendor.o(($event) => $setup.openAdvancedInputDialog("sn")),
    E: $setup.advancedSearch.sn.value
  }, $setup.advancedSearch.sn.value ? {
    F: common_vendor.o(($event) => $setup.removeAdvancedInput("sn")),
    G: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    H: common_vendor.o(($event) => $setup.scanInput("sn")),
    I: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    J: common_vendor.t($setup.advancedSearch.brand.value ? $setup.advancedSearch.brand.value : "\u8BF7\u8F93\u5165\u54C1\u724C"),
    K: common_vendor.n($setup.advancedSearch.brand.value ? "info-item-color" : ""),
    L: common_vendor.o(($event) => $setup.openAdvancedInputDialog("brand")),
    M: $setup.advancedSearch.brand.value
  }, $setup.advancedSearch.brand.value ? {
    N: common_vendor.o(($event) => $setup.removeAdvancedInput("brand")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.t($setup.advancedSearch.spec.value ? $setup.advancedSearch.spec.value : "\u8BF7\u8F93\u5165\u89C4\u683C"),
    Q: common_vendor.n($setup.advancedSearch.spec.value ? "info-item-color" : ""),
    R: common_vendor.o(($event) => $setup.openAdvancedInputDialog("spec")),
    S: $setup.advancedSearch.spec.value
  }, $setup.advancedSearch.spec.value ? {
    T: common_vendor.o(($event) => $setup.removeAdvancedInput("spec")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    V: common_vendor.t($setup.advancedSearch.model.value ? $setup.advancedSearch.model.value : "\u8BF7\u8F93\u5165\u578B\u53F7"),
    W: common_vendor.n($setup.advancedSearch.model.value ? "info-item-color" : ""),
    X: common_vendor.o(($event) => $setup.openAdvancedInputDialog("model")),
    Y: $setup.advancedSearch.model.value
  }, $setup.advancedSearch.model.value ? {
    Z: common_vendor.o(($event) => $setup.removeAdvancedInput("model")),
    aa: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ab: common_vendor.t($setup.advancedSearch.category.value.length > 0 ? $setup.advancedSearch.category.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u5206\u7C7B"),
    ac: common_vendor.n($setup.advancedSearch.category.value.length > 0 ? "info-item-color" : ""),
    ad: common_vendor.o(($event) => $setup.categorySelect("category")),
    ae: $setup.advancedSearch.category.value.length > 0
  }, $setup.advancedSearch.category.value.length > 0 ? {
    af: common_vendor.o(($event) => $setup.removeAdvancedInput("category")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ah: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "ah",
      vueId: "d4cb53f8-25,d4cb53f8-24"
    }),
    ai: common_vendor.t($setup.advancedSearch.assetAttribute.value ? $setup.advancedSearch.assetAttribute.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u6027\u8D28"),
    aj: common_vendor.n($setup.advancedSearch.assetAttribute.value ? "info-item-color" : ""),
    ak: common_vendor.o((val) => $setup.inputChange(val, "assetAttribute")),
    al: common_vendor.o(($event) => $setup.advancedSearch.assetAttribute.value = $event),
    am: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.assetAttribute.options,
      modelValue: $setup.advancedSearch.assetAttribute.value
    }),
    an: $setup.advancedSearch.assetAttribute.value
  }, $setup.advancedSearch.assetAttribute.value ? {
    ao: common_vendor.o(($event) => $setup.removeAdvancedInput("assetAttribute")),
    ap: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aq: common_vendor.t($setup.advancedSearch.supplier.value.length > 0 ? $setup.advancedSearch.supplier.name : "\u8BF7\u8F93\u5165\u4F9B\u5E94\u5546"),
    ar: common_vendor.n($setup.advancedSearch.supplier.value.length > 0 ? "info-item-color" : ""),
    as: common_vendor.o(($event) => $setup.supplierSelect("supplier")),
    at: $setup.advancedSearch.supplier.value.length > 0
  }, $setup.advancedSearch.supplier.value.length > 0 ? {
    av: common_vendor.o(($event) => $setup.removeAdvancedInput("supplier")),
    aw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ax: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "ax",
      vueId: "d4cb53f8-30,d4cb53f8-29"
    }),
    ay: common_vendor.t($setup.advancedSearch.acquireWay.value ? $setup.advancedSearch.acquireWay.name : "\u8BF7\u8F93\u5165\u53D6\u5F97\u65B9\u5F0F"),
    az: common_vendor.n($setup.advancedSearch.acquireWay.value ? "info-item-color" : ""),
    aA: common_vendor.o((val) => $setup.inputChange(val, "acquireWay")),
    aB: common_vendor.o(($event) => $setup.advancedSearch.acquireWay.value = $event),
    aC: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.acquireWay.options,
      modelValue: $setup.advancedSearch.acquireWay.value
    }),
    aD: $setup.advancedSearch.acquireWay.value
  }, $setup.advancedSearch.acquireWay.value ? {
    aE: common_vendor.o(($event) => $setup.removeAdvancedInput("acquireWay")),
    aF: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aG: common_vendor.t($setup.advancedSearch.dateOfPurchaseStart.value ? $setup.advancedSearch.dateOfPurchaseStart.value : "\u8BF7\u8F93\u5165\u8D2D\u7F6E\u65E5\u671F(\u5F00\u59CB)"),
    aH: common_vendor.n($setup.advancedSearch.dateOfPurchaseStart.value ? "info-item-color" : ""),
    aI: common_vendor.o((data) => $setup.dateTimeChange(data, "dateOfPurchaseStart")),
    aJ: $setup.advancedSearch.dateOfPurchaseStart.value
  }, $setup.advancedSearch.dateOfPurchaseStart.value ? {
    aK: common_vendor.o(($event) => $setup.removeAdvancedInput("dateOfPurchaseStart")),
    aL: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aM: common_vendor.t($setup.advancedSearch.dateOfPurchaseEnd.value ? $setup.advancedSearch.dateOfPurchaseEnd.value : "\u8BF7\u8F93\u5165\u8D2D\u7F6E\u65E5\u671F(\u7ED3\u675F)"),
    aN: common_vendor.n($setup.advancedSearch.dateOfPurchaseEnd.value ? "info-item-color" : ""),
    aO: common_vendor.o((data) => $setup.dateTimeChange(data, "dateOfPurchaseEnd")),
    aP: $setup.advancedSearch.dateOfPurchaseEnd.value
  }, $setup.advancedSearch.dateOfPurchaseEnd.value ? {
    aQ: common_vendor.o(($event) => $setup.removeAdvancedInput("dateOfPurchaseEnd")),
    aR: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aS: common_vendor.t($setup.advancedSearch.registerDateStart.value ? $setup.advancedSearch.registerDateStart.value : "\u8BF7\u8F93\u5165\u767B\u8BB0\u65E5\u671F(\u5F00\u59CB)"),
    aT: common_vendor.n($setup.advancedSearch.registerDateStart.value ? "info-item-color" : ""),
    aU: common_vendor.o((data) => $setup.dateTimeChange(data, "registerDateStart")),
    aV: $setup.advancedSearch.registerDateStart.value
  }, $setup.advancedSearch.registerDateStart.value ? {
    aW: common_vendor.o(($event) => $setup.removeAdvancedInput("registerDateStart")),
    aX: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aY: common_vendor.t($setup.advancedSearch.registerDateEnd.value ? $setup.advancedSearch.registerDateEnd.value : "\u8BF7\u8F93\u5165\u767B\u8BB0\u65E5\u671F(\u7ED3\u675F)"),
    aZ: common_vendor.n($setup.advancedSearch.registerDateEnd.value ? "info-item-color" : ""),
    ba: common_vendor.o((data) => $setup.dateTimeChange(data, "registerDateEnd")),
    bb: $setup.advancedSearch.registerDateEnd.value
  }, $setup.advancedSearch.registerDateEnd.value ? {
    bc: common_vendor.o(($event) => $setup.removeAdvancedInput("registerDateEnd")),
    bd: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    be: common_vendor.t($setup.advancedSearch.kAO.value.length > 0 ? $setup.advancedSearch.kAO.name : "\u8BF7\u8F93\u5165\u7BA1\u7406\u90E8\u95E8"),
    bf: common_vendor.n($setup.advancedSearch.kAO.value.length > 0 ? "info-item-color" : ""),
    bg: common_vendor.o(($event) => $setup.corpDeptSelect("kAO")),
    bh: $setup.advancedSearch.kAO.value.length > 0
  }, $setup.advancedSearch.kAO.value.length > 0 ? {
    bi: common_vendor.o(($event) => $setup.removeAdvancedInput("kAO")),
    bj: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bk: common_vendor.t($setup.advancedSearch.kAE.value.length > 0 ? $setup.advancedSearch.kAE.name : "\u8BF7\u8F93\u5165\u7BA1\u7406\u4EBA\u5458"),
    bl: common_vendor.n($setup.advancedSearch.kAE.value.length > 0 ? "info-item-color" : ""),
    bm: common_vendor.o(($event) => $setup.personnelSelect("kAE")),
    bn: $setup.advancedSearch.kAE.value.length > 0
  }, $setup.advancedSearch.kAE.value.length > 0 ? {
    bo: common_vendor.o(($event) => $setup.removeAdvancedInput("kAE")),
    bp: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bq: common_vendor.t($setup.advancedSearch.uAO.value.length > 0 ? $setup.advancedSearch.uAO.name : "\u8BF7\u8F93\u5165\u4F7F\u7528\u90E8\u95E8"),
    br: common_vendor.n($setup.advancedSearch.uAO.value.length > 0 ? "info-item-color" : ""),
    bs: common_vendor.o(($event) => $setup.corpDeptSelect("uAO")),
    bt: $setup.advancedSearch.uAO.value.length > 0
  }, $setup.advancedSearch.uAO.value.length > 0 ? {
    bv: common_vendor.o(($event) => $setup.removeAdvancedInput("uAO")),
    bw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bx: common_vendor.t($setup.advancedSearch.uAE.value.length > 0 ? $setup.advancedSearch.uAE.name : "\u8BF7\u8F93\u5165\u4F7F\u7528\u4EBA\u5458"),
    by: common_vendor.n($setup.advancedSearch.uAE.value.length > 0 ? "info-item-color" : ""),
    bz: common_vendor.o(($event) => $setup.personnelSelect("uAE")),
    bA: $setup.advancedSearch.uAE.value.length > 0
  }, $setup.advancedSearch.uAE.value.length > 0 ? {
    bB: common_vendor.o(($event) => $setup.removeAdvancedInput("uAE")),
    bC: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bD: common_vendor.t($setup.advancedSearch.location.value.length > 0 ? $setup.advancedSearch.location.name : "\u8BF7\u8F93\u5165\u5B58\u653E\u4F4D\u7F6E"),
    bE: common_vendor.n($setup.advancedSearch.location.value.length > 0 ? "info-item-color" : ""),
    bF: common_vendor.o(($event) => $setup.locationSelect("location")),
    bG: $setup.advancedSearch.location.value.length > 0
  }, $setup.advancedSearch.location.value.length > 0 ? {
    bH: common_vendor.o(($event) => $setup.removeAdvancedInput("location")),
    bI: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bJ: common_vendor.t($setup.advancedSearch.corp.value.length > 0 ? $setup.advancedSearch.corp.name : "\u8BF7\u8F93\u5165\u6240\u5C5E\u516C\u53F8"),
    bK: common_vendor.n($setup.advancedSearch.corp.value.length > 0 ? "info-item-color" : ""),
    bL: common_vendor.o(($event) => $setup.corpDeptSelect("corp")),
    bM: $setup.advancedSearch.corp.value.length > 0
  }, $setup.advancedSearch.corp.value.length > 0 ? {
    bN: common_vendor.o(($event) => $setup.removeAdvancedInput("corp")),
    bO: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bP: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "bP",
      vueId: "d4cb53f8-53,d4cb53f8-52"
    }),
    bQ: common_vendor.t($setup.advancedSearch.usage.value ? $setup.advancedSearch.usage.name : "\u4F7F\u7528\u60C5\u51B5"),
    bR: common_vendor.n($setup.advancedSearch.usage.value ? "info-item-color" : ""),
    bS: common_vendor.o((val) => $setup.inputChange(val, "usage")),
    bT: common_vendor.o(($event) => $setup.advancedSearch.usage.value = $event),
    bU: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u4F7F\u7528\u60C5\u51B5",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.usage.options,
      modelValue: $setup.advancedSearch.usage.value
    }),
    bV: $setup.advancedSearch.usage.value
  }, $setup.advancedSearch.usage.value ? {
    bW: common_vendor.o(($event) => $setup.removeAdvancedInput("usage")),
    bX: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    bY: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "bY",
      vueId: "d4cb53f8-56,d4cb53f8-55"
    }),
    bZ: common_vendor.t($setup.advancedSearch.status.value ? $setup.advancedSearch.status.name : "\u8BF7\u8F93\u5165\u8D44\u4EA7\u72B6\u6001"),
    ca: common_vendor.n($setup.advancedSearch.status.value ? "info-item-color" : ""),
    cb: common_vendor.o((val) => $setup.inputChange(val, "status")),
    cc: common_vendor.o(($event) => $setup.advancedSearch.status.value = $event),
    cd: common_vendor.p({
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.advancedSearch.status.options,
      modelValue: $setup.advancedSearch.status.value
    }),
    ce: $setup.advancedSearch.status.value
  }, $setup.advancedSearch.status.value ? {
    cf: common_vendor.o(($event) => $setup.removeAdvancedInput("status")),
    cg: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ch: common_vendor.t($setup.advancedSearch.kAEName.value ? $setup.advancedSearch.kAEName.value : "\u8BF7\u8F93\u5165\u540D\u79F0"),
    ci: common_vendor.n($setup.advancedSearch.kAEName.value ? "info-item-color" : ""),
    cj: common_vendor.o(($event) => $setup.openAdvancedInputDialog("kAEName")),
    ck: $setup.advancedSearch.kAEName.value
  }, $setup.advancedSearch.kAEName.value ? {
    cl: common_vendor.o(($event) => $setup.removeAdvancedInput("kAEName")),
    cm: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    cn: common_vendor.t($setup.advancedSearch.uAEName.value ? $setup.advancedSearch.uAEName.value : "\u8BF7\u8F93\u5165\u540D\u79F0"),
    co: common_vendor.n($setup.advancedSearch.uAEName.value ? "info-item-color" : ""),
    cp: common_vendor.o(($event) => $setup.openAdvancedInputDialog("uAEName")),
    cq: $setup.advancedSearch.uAEName.value
  }, $setup.advancedSearch.uAEName.value ? {
    cr: common_vendor.o(($event) => $setup.removeAdvancedInput("uAEName")),
    cs: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ct: common_vendor.s(`height:${$setup.windowHeights - $setup.bottomHeight}px`),
    cv: common_vendor.o((...args) => $setup.querySearch && $setup.querySearch(...args)),
    cw: common_vendor.o((...args) => $setup.conditionReset && $setup.conditionReset(...args)),
    cx: common_vendor.o((...args) => $setup.close && $setup.close(...args)),
    cy: common_vendor.p({
      mode: "right",
      ["mask-click"]: true,
      width: _ctx.windowWidths
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d4cb53f8"], ["__file", "D:/gitPro/C8_UI/platformApp/components/advancedSearch/advancedSearch.vue"]]);
my.createComponent(Component);
