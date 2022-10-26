"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_util_message = require("../../../share/util/message.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_index = require("../../../share/util/index.js");
const _sfc_main = {
  data() {
    return {
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      Categorys: [],
      Warehouse: [],
      QST: ""
    };
  },
  methods: {
    reset() {
      this.IsIncludeZeroStockItems = false;
      this.IsOnlyLessThanMinimunStockItems = false;
      this.QST = "";
      this.Warehouse = [];
      this.Categorys = [];
    },
    IncludeZeroStockItemsChange(e) {
      this.IsIncludeZeroStockItems = e.detail.value.length > 0;
    },
    OnlyLessThanMinimunStockItems(e) {
      this.IsOnlyLessThanMinimunStockItems = e.detail.value.length > 0;
    },
    openCategorySelector() {
      common_vendor.index.navigateTo({
        url: `/pages/selector/consumable/category?ids=${this.Categorys.map((d) => d.ID)}&multiple=${1}`
      });
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableCategoryBack, (obj) => {
        let categorys = obj.items.map((e) => {
          return {
            Name: e.label,
            ID: e.id
          };
        });
        this.Categorys.push(...categorys);
      });
    },
    openWarehouseSelector() {
      common_vendor.index.navigateTo({
        url: `/pages/selector/consumable/warehouse?ids=${this.Warehouse.map((d) => d.ID)}&multiple=${1}`
      });
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableWarehouseBack, (obj) => {
        let warehouse = obj.items.map((e) => {
          return {
            Name: e.label,
            ID: e.id
          };
        });
        this.Warehouse.push(...warehouse);
      });
    },
    query() {
      if (this.Warehouse.length == 0) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u4ED3\u5E93");
        return;
      }
      let obj = {
        CategoryIDs: this.Categorys.map((d) => d.ID),
        WarehouseIDs: this.Warehouse.map((d) => d.ID),
        QST: this.QST,
        IsOnlyLessThanMinimunStockItems: this.IsOnlyLessThanMinimunStockItems,
        IsIncludeZeroStockItems: this.IsIncludeZeroStockItems
      };
      let par = JSON.stringify(obj);
      console.log(obj);
      common_vendor.index.navigateTo({
        url: `/subcontract/consumable/stock/list?condition=${par}`
      });
    },
    clearCategory() {
      this.Categorys = [];
    },
    clearWarehouse() {
      this.Warehouse = [];
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
    CategoryIDsText() {
      return this.Categorys.reduce((prevaluer, n) => {
        if (prevaluer == "") {
          return n.Name;
        }
        return n.Name + "/" + prevaluer;
      }, "");
    },
    WarehouseText() {
      return this.Warehouse.reduce((prevaluer, n) => {
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
    a: common_vendor.o((...args) => $options.openWarehouseSelector && $options.openWarehouseSelector(...args)),
    b: $options.WarehouseText,
    c: common_vendor.o(($event) => $options.WarehouseText = $event.detail.value),
    d: $options.WarehouseText
  }, $options.WarehouseText ? {
    e: common_vendor.o((...args) => $options.clearWarehouse && $options.clearWarehouse(...args))
  } : {}, {
    f: common_vendor.o((...args) => $options.openCategorySelector && $options.openCategorySelector(...args)),
    g: $options.CategoryIDsText,
    h: common_vendor.o(($event) => $options.CategoryIDsText = $event.detail.value),
    i: $options.CategoryIDsText
  }, $options.CategoryIDsText ? {
    j: common_vendor.o((...args) => $options.clearCategory && $options.clearCategory(...args))
  } : {}, {
    k: $data.QST,
    l: common_vendor.o(($event) => $data.QST = $event.detail.value),
    m: common_vendor.o((...args) => $options.ScanCode && $options.ScanCode(...args)),
    n: $data.IsIncludeZeroStockItems,
    o: common_vendor.o((...args) => $options.IncludeZeroStockItemsChange && $options.IncludeZeroStockItemsChange(...args)),
    p: $data.IsOnlyLessThanMinimunStockItems,
    q: common_vendor.o((...args) => $options.OnlyLessThanMinimunStockItems && $options.OnlyLessThanMinimunStockItems(...args)),
    r: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    s: common_vendor.o((...args) => $options.query && $options.query(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-774ba421"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/stock/condition.vue"]]);
my.createPage(MiniProgramPage);
