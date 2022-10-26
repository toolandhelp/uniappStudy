"use strict";
var common_vendor = require("../../../common/vendor.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var service_controller_consumable_inventoryController = require("../../../service/controller/consumable/inventoryController.js");
require("../../../share/util/index.js");
require("../../../share/util/storage.js");
require("../../../service/controller/controllerBase/consumableControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/message.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const _sfc_main = {
  data() {
    return {
      TaskID: "",
      Batch: "",
      Brand: "",
      ConsumableCategoryName: "",
      ConsumableCode: "",
      ConsumableBarcode: "",
      ConsumableName: "",
      Difference: "",
      ID: "",
      Model: "",
      RealStock: "",
      Remark: "",
      Spec: "",
      Stock: "",
      Unit: "",
      ConsumableID: "",
      StockID: ""
    };
  },
  methods: {
    save() {
      service_controller_consumable_inventoryController.InventoryController.appletSave({
        ID: this.TaskID,
        Items: [{
          ID: this.ID,
          Remark: this.Remark,
          RealStock: this.RealStock,
          DifferenceQty: this.DifferenceQty
        }]
      }).then((d) => {
        share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.refreshBack);
        share_redirect_index.navigateBack();
      });
    }
  },
  computed: {
    GetDifference() {
      return this.RealStock - this.Stock;
    }
  },
  mounted() {
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    var detailID = options.ID;
    this.TaskID = options.TaskID;
    service_controller_consumable_inventoryController.InventoryController.getDetailByID({
      ID: detailID
    }).then((d) => {
      this.Batch = d.Batch;
      this.Brand = d.Brand;
      this.ConsumableCategoryName = d.ConsumableCategoryName;
      this.ConsumableCode = d.ConsumableCode;
      this.ConsumableBarcode = d.ConsumableBarcode;
      this.ConsumableName = d.ConsumableName;
      this.Difference = d.Difference;
      this.ID = d.ID;
      this.Model = d.Model;
      this.RealStock = d.RealStock;
      this.Remark = d.Remark;
      this.Spec = d.Spec;
      this.Stock = d.Stock;
      this.Unit = d.Unit;
      this.ConsumableID = d.ConsumableID;
      this.StockID = d.StockID;
    });
  },
  watch: {
    RealStock() {
      this.Difference = this.Stock - this.RealStock;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.ConsumableCode,
    b: common_vendor.o(($event) => $data.ConsumableCode = $event.detail.value),
    c: $data.ConsumableCategoryName,
    d: common_vendor.o(($event) => $data.ConsumableCategoryName = $event.detail.value),
    e: $data.ConsumableName,
    f: common_vendor.o(($event) => $data.ConsumableName = $event.detail.value),
    g: _ctx.WarehouseName,
    h: common_vendor.o(($event) => _ctx.WarehouseName = $event.detail.value),
    i: $data.Brand,
    j: common_vendor.o(($event) => $data.Brand = $event.detail.value),
    k: $data.Spec,
    l: common_vendor.o(($event) => $data.Spec = $event.detail.value),
    m: $data.Model,
    n: common_vendor.o(($event) => $data.Model = $event.detail.value),
    o: $data.Stock,
    p: common_vendor.o(($event) => $data.Stock = $event.detail.value),
    q: $data.RealStock,
    r: common_vendor.o(($event) => $data.RealStock = $event.detail.value),
    s: common_vendor.s($options.GetDifference != 0 ? "color:red" : ""),
    t: $options.GetDifference,
    v: common_vendor.o(($event) => $options.GetDifference = $event.detail.value),
    w: $data.Unit,
    x: common_vendor.o(($event) => $data.Unit = $event.detail.value),
    y: $data.Remark,
    z: common_vendor.o(($event) => $data.Remark = $event.detail.value),
    A: common_vendor.o((...args) => $options.save && $options.save(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bebcb4b0"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inventory/inventoryConfirm.vue"]]);
wx.createPage(MiniProgramPage);
