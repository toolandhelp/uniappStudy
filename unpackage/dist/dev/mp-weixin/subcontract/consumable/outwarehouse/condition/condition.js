"use strict";
var subcontract_consumable_outwarehouse_condition_index = require("./index.js");
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
      bindOutWarehouseStartDatePickerChange,
      bindOutWarehouseEndDatePickerChange,
      clearInputText,
      reset,
      getPersonText,
      getPersonIDs,
      getSupplierText,
      getSupplierIDs
    } = subcontract_consumable_outwarehouse_condition_index.MetaData();
    return {
      Data,
      query,
      BillType,
      BillTypeIndex,
      bindPickerChange,
      getWarehouseOrCorpText,
      getWarehouseOrCorpIDs,
      bindOutWarehouseStartDatePickerChange,
      bindOutWarehouseEndDatePickerChange,
      clearInputText,
      reset,
      getPersonText,
      getPersonIDs,
      getSupplierText,
      getSupplierIDs
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
    q: common_vendor.t($setup.Data.OutWarehouseStartDate ? $setup.Data.OutWarehouseStartDate : "\u5165\u5E93\u65E5\u671F\u8D77"),
    r: common_vendor.o((...args) => $setup.bindOutWarehouseStartDatePickerChange && $setup.bindOutWarehouseStartDatePickerChange(...args)),
    s: $setup.Data.OutWarehouseStartDate
  }, $setup.Data.OutWarehouseStartDate ? {
    t: common_vendor.o(($event) => $setup.clearInputText("OutWarehouseStartDate"))
  } : {}, {
    v: common_vendor.t($setup.Data.OutWarehouseEndDate ? $setup.Data.OutWarehouseEndDate : "\u5165\u5E93\u65E5\u671F\u6B62"),
    w: common_vendor.o((...args) => $setup.bindOutWarehouseEndDatePickerChange && $setup.bindOutWarehouseEndDatePickerChange(...args)),
    x: $setup.Data.OutWarehouseEndDate
  }, $setup.Data.OutWarehouseEndDate ? {
    y: common_vendor.o(($event) => $setup.clearInputText("OutWarehouseEndDate"))
  } : {}, {
    z: common_vendor.o((...args) => $setup.reset && $setup.reset(...args)),
    A: common_vendor.o((...args) => $setup.query && $setup.query(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2511751e"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/outwarehouse/condition/condition.vue"]]);
wx.createPage(MiniProgramPage);
