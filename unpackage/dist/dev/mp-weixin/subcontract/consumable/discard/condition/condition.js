"use strict";
var subcontract_consumable_discard_condition_index = require("./index.js");
var common_vendor = require("../../../../common/vendor.js");
require("./metadata.js");
require("../../../../share/util/uniEvent.js");
require("../../../../share/util/index.js");
require("../../../../service/enumeration/eventNames.js");
require("../../../../share/redirect/index.js");
require("../../../../share/util/storage.js");
const _sfc_main = {
  props: {
    id: String,
    type: String
  },
  setup({
    id,
    type
  }) {
    const {
      Data,
      query,
      BillType,
      BillTypeIndex,
      bindPickerChange,
      getWarehouseOrCorpText,
      getWarehouseOrCorpIDs,
      bindDiscardStartDatePickerChange,
      bindDiscardEndDatePickerChange,
      clearInputText,
      reset,
      getPersonText,
      getPersonIDs
    } = subcontract_consumable_discard_condition_index.MetaData();
    return {
      Data,
      query,
      BillType,
      BillTypeIndex,
      bindPickerChange,
      getWarehouseOrCorpText,
      getWarehouseOrCorpIDs,
      bindDiscardStartDatePickerChange,
      bindDiscardEndDatePickerChange,
      clearInputText,
      reset,
      getPersonText,
      getPersonIDs
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.BillType[$setup.Data.BillStatus].label),
    b: common_vendor.o((...args) => $setup.bindPickerChange && $setup.bindPickerChange(...args)),
    c: $setup.BillType[$setup.Data.BillStatus].value,
    d: $setup.BillType.map((d) => d.label),
    e: $setup.getWarehouseOrCorpText(),
    f: common_vendor.o((...args) => $setup.getWarehouseOrCorpIDs && $setup.getWarehouseOrCorpIDs(...args)),
    g: $setup.getWarehouseOrCorpText()
  }, $setup.getWarehouseOrCorpText() ? {
    h: common_vendor.o(($event) => $setup.clearInputText("WarehouseOrCorp"))
  } : {}, {
    i: $setup.getPersonText(),
    j: common_vendor.o((...args) => $setup.getPersonIDs && $setup.getPersonIDs(...args)),
    k: $setup.getPersonText()
  }, $setup.getPersonText() ? {
    l: common_vendor.o(($event) => $setup.clearInputText("Person"))
  } : {}, {
    m: $setup.Data.BillCode,
    n: common_vendor.o(($event) => $setup.Data.BillCode = $event.detail.value),
    o: $setup.Data.BillCode
  }, $setup.Data.BillCode ? {
    p: common_vendor.o(($event) => $setup.clearInputText("BillCode"))
  } : {}, {
    q: common_vendor.t($setup.Data.DiscardStartDate ? $setup.Data.DiscardStartDate : "\u8C03\u62E8\u65E5\u671F\u8D77"),
    r: common_vendor.o((...args) => $setup.bindDiscardStartDatePickerChange && $setup.bindDiscardStartDatePickerChange(...args)),
    s: $setup.Data.DiscardStartDate
  }, $setup.Data.DiscardStartDate ? {
    t: common_vendor.o(($event) => $setup.clearInputText("DiscardStartDate"))
  } : {}, {
    v: common_vendor.t($setup.Data.DiscardEndDate ? $setup.Data.DiscardEndDate : "\u8C03\u62E8\u65E5\u671F\u6B62"),
    w: common_vendor.o((...args) => $setup.bindDiscardEndDatePickerChange && $setup.bindDiscardEndDatePickerChange(...args)),
    x: $setup.Data.DiscardEndDate
  }, $setup.Data.DiscardEndDate ? {
    y: common_vendor.o(($event) => $setup.clearInputText("DiscardEndDate"))
  } : {}, {
    z: common_vendor.o((...args) => $setup.reset && $setup.reset(...args)),
    A: common_vendor.o((...args) => $setup.query && $setup.query(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4126f475"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/discard/condition/condition.vue"]]);
wx.createPage(MiniProgramPage);
