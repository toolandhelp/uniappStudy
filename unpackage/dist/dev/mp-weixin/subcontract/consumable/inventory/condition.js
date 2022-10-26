"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_index = require("../../../share/util/index.js");
require("../../../share/util/storage.js");
const _sfc_main = {
  data() {
    return {
      Data: {
        "Sort": 2,
        "HandlerEmployeeIDs": [],
        "BillCode": "",
        "HandlerOrgIDs": null,
        "InventoryEndDate": "",
        "InventoryStartDate": "",
        "PageNO": 1,
        "PageSize": 10,
        "QST": "",
        "Title": "",
        "IsSetNumber": true
      },
      Person: []
    };
  },
  methods: {
    bindInventoryStartDatePickerChange(data) {
      this.Data.InventoryStartDate = data.detail.value;
    },
    bindInventoryEndDatePickerChange(data) {
      this.Data.InventoryEndDate = data.detail.value;
    },
    clearInputText(key) {
      switch (key) {
        case "BillCode":
          this.Data.BillCode = "";
          break;
        case "Person":
          this.Person = [];
          this.Data.HandlerEmployeeIDs = [];
          break;
        case "InventoryStartDate":
          this.Data.InventoryStartDate = "";
          break;
        case "InventoryEndDate":
          this.Data.InventoryEndDate = "";
          break;
        case "Title":
          this.Data.Title = "";
          break;
        default:
          this.Data.BillCode = "";
          this.Person = [];
          this.Data.HandlerEmployeeIDs = [];
          this.Data.InventoryStartDate = "";
          this.Data.InventoryEndDate = "";
          this.Data.Title = "";
      }
    },
    getPersonIDs() {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, (obj) => {
        let person = obj.items.map((e) => {
          return {
            Name: e.Name,
            ID: e.ID
          };
        });
        this.Person = person;
        this.Data.HandlerEmployeeIDs = person.map((d) => d.ID);
      });
      common_vendor.index.navigateTo({
        url: `/pages/selector/system/employee?multiple=1&ids=${this.Data.HandlerEmployeeIDs}`
      });
    },
    reset() {
      this.clearInputText();
    },
    query() {
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.conditionBack, this.Data);
      share_redirect_index.navigateBack();
    },
    ScanCode() {
      let that = this;
      common_vendor.index.scanCode({
        success(res) {
          let content = res.result;
          that.QST = share_util_index.getScanCode(content);
        },
        fail() {
          share_util_message.showErrorToast("\u626B\u63CF\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
        }
      });
    }
  },
  computed: {
    getPersonText() {
      return this.Person.reduce((prevaluer, n) => {
        if (prevaluer == "") {
          return n.Name;
        }
        return n.Name + "/" + prevaluer;
      }, "");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.Data.BillCode,
    b: common_vendor.o(($event) => $data.Data.BillCode = $event.detail.value),
    c: $data.Data.BillCode
  }, $data.Data.BillCode ? {
    d: common_vendor.o(($event) => $options.clearInputText("BillCode"))
  } : {}, {
    e: $data.Data.Title,
    f: common_vendor.o(($event) => $data.Data.Title = $event.detail.value),
    g: $data.Data.Title
  }, $data.Data.Title ? {
    h: common_vendor.o(($event) => $options.clearInputText("Title"))
  } : {}, {
    i: $options.getPersonText,
    j: common_vendor.o((...args) => $options.getPersonIDs && $options.getPersonIDs(...args)),
    k: $options.getPersonText
  }, $options.getPersonText ? {
    l: common_vendor.o(($event) => $options.clearInputText("Person"))
  } : {}, {
    m: common_vendor.t($data.Data.InventoryStartDate ? $data.Data.InventoryStartDate : "\u5165\u5E93\u65E5\u671F\u8D77"),
    n: common_vendor.o((...args) => $options.bindInventoryStartDatePickerChange && $options.bindInventoryStartDatePickerChange(...args)),
    o: $data.Data.InventoryStartDate
  }, $data.Data.InventoryStartDate ? {
    p: common_vendor.o(($event) => $options.clearInputText("InventoryStartDate"))
  } : {}, {
    q: common_vendor.t($data.Data.InventoryEndDate ? $data.Data.InventoryEndDate : "\u5165\u5E93\u65E5\u671F\u6B62"),
    r: common_vendor.o((...args) => $options.bindInventoryEndDatePickerChange && $options.bindInventoryEndDatePickerChange(...args)),
    s: $data.Data.InventoryEndDate
  }, $data.Data.InventoryEndDate ? {
    t: common_vendor.o(($event) => $options.clearInputText("InventoryEndDate"))
  } : {}, {
    v: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    w: common_vendor.o((...args) => $options.query && $options.query(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c336867"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inventory/condition.vue"]]);
wx.createPage(MiniProgramPage);
