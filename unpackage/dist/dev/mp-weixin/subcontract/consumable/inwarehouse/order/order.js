"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_consumable_inWarehouseController = require("../../../../service/controller/consumable/inWarehouseController.js");
var share_util_dateTime = require("../../../../share/util/dateTime.js");
var share_util_message = require("../../../../share/util/message.js");
var share_util_uniEvent = require("../../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../../service/enumeration/eventNames.js");
var share_redirect_index = require("../../../../share/redirect/index.js");
require("../../../../service/controller/controllerBase/consumableControllerBase.js");
require("../../../../service/controller/controllerBase/controllerBase.js");
require("../../../../share/http/axios.js");
require("../../../../service/enumeration/businessStatusCode.js");
require("../../../../service/model/ajaxResult.js");
require("../../../../share/token/index.js");
require("../../../../share/util/storage.js");
require("../../../../share/http/serveUrl.js");
require("../../../../service/enumeration/productEnum.js");
require("../../../../share/util/index.js");
require("../../../../share/http/http.js");
require("../../../../service/enumeration/fileTypeEnum.js");
require("../../../../share/util/page.js");
const _sfc_main = {
  data() {
    return {
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      triggered: false,
      isfreshing: false,
      condition: {
        SupplierID: "",
        OrderDateEndDate: "",
        OrderDateStartDate: "",
        QST: ""
      },
      selectArray: [],
      data: [],
      pageCount: 0,
      total: 0
    };
  },
  methods: {
    timeConvertDate: share_util_dateTime.timeConvertDate,
    orderConfirm() {
      if (this.selectArray.length < 1) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u91C7\u8D2D\u8BA2\u5355");
        return;
      }
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.consumableOrderBack, this.selectArray);
      share_redirect_index.navigateBack();
    },
    cancel() {
      share_redirect_index.navigateBack();
    },
    orderDateStartDateChange(data) {
      this.condition.OrderDateStartDate = data.detail.value;
    },
    orderDateEndDateChange(data) {
      this.condition.OrderDateEndDate = data.detail.value;
    },
    editBill(id) {
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.consumableAllocateEditBill, id);
      share_redirect_index.navigateBack();
    },
    check(index) {
      this.data[index].checked = !this.data[index].checked;
      if (this.data[index].checked) {
        this.selectArray.push(this.data[index]);
      } else {
        this.selectArray = this.selectArray.filter((d) => {
          if (d.ID != this.data[index].ID) {
            return d;
          }
        });
      }
    },
    ScanCode() {
      let that = this;
      common_vendor.index.scanCode({
        success(res) {
          let content = res.result;
          if (content.substring(0, 7).toLowerCase() == "http://" || content.substring(0, 8).toLowerCase() == "https://") {
            that.condition.QST = ruleShow(content);
          } else {
            that.condition.QST = content;
          }
          that.condition.PageSize = 10;
          that.condition.PageNO = 1;
          that.load();
        },
        fail() {
          share_util_message.showErrorToast("\u626B\u63CF\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
        }
      });
    },
    query() {
      this.condition.PageNO = 1;
      this.load();
    },
    confirm() {
      this.condition.PageNO = 1;
      this.load();
    },
    onRefresh() {
      if (this.isfreshing)
        return;
      this.isfreshing = true;
      if (!this.triggered)
        this.triggered = true;
      this.condition.PageNO = 1;
      this.load(() => {
        this.isfreshing = false;
        this.triggered = false;
      });
    },
    reachBottom() {
      if (this.condition.PageNO >= this.pageCount) {
        common_vendor.index.hideNavigationBarLoading();
        share_util_message.showErrorToast("\u6682\u65E0\u66F4\u591A\u6570\u636E");
      } else {
        ++this.condition.PageNO;
        this.load(null, true);
      }
    },
    load(fn, isPush) {
      share_util_message.showLoading();
      service_controller_consumable_inWarehouseController.InWarehouseController.GetOrderList(this.condition).then((res) => {
        res.Items = res.Items.map((d) => {
          d.checked = false;
          return d;
        });
        if (isPush) {
          this.data.push(...res.Items);
        } else {
          this.data = res.Items;
        }
        this.total = res.TotalRecordQty;
        this.pageCount = res.PageCount;
        if (fn) {
          fn();
        }
        share_util_message.clearLoading();
      }).catch(() => {
        share_util_message.clearLoading();
      });
    }
  },
  computed: {},
  mounted() {
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    this.condition.SupplierID = options.SupplierID;
    this.condition.PageSize = 10;
    this.condition.PageNO = 1;
    this.load();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    b: this.condition.QST,
    c: common_vendor.o(($event) => this.condition.QST = $event.detail.value),
    d: common_vendor.o((...args) => $options.query && $options.query(...args)),
    e: common_vendor.t(this.condition.OrderDateStartDate ? this.condition.OrderDateStartDate : "\u8BF7\u9009\u62E9\u8BA2\u5355\u65E5\u671F\u8D77"),
    f: common_vendor.o((...args) => $options.orderDateStartDateChange && $options.orderDateStartDateChange(...args)),
    g: common_vendor.t(this.condition.OrderDateEndDate ? this.condition.OrderDateEndDate : "\u8BF7\u9009\u62E9\u8BA2\u5355\u65E5\u671F\u6B62"),
    h: common_vendor.o((...args) => $options.orderDateEndDateChange && $options.orderDateEndDateChange(...args)),
    i: common_vendor.t($data.total),
    j: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ConsumableName),
        b: common_vendor.t(item.ConsumableCode),
        c: common_vendor.t(item.CategoryName),
        d: common_vendor.t(item.Spec),
        e: item.checked,
        f: common_vendor.t(item.Qty),
        g: common_vendor.t(item.Unit),
        h: common_vendor.t(item.WaitingInWarehouseQty),
        i: item.ID,
        j: common_vendor.o(($event) => $options.check(index), item.ID)
      };
    }),
    k: $data.triggered,
    l: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
    m: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    n: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    o: common_vendor.o((...args) => _ctx.onRestore && _ctx.onRestore(...args)),
    p: common_vendor.o((...args) => _ctx.onAbort && _ctx.onAbort(...args)),
    q: common_vendor.n($data.selectArray.length > 0 ? "button_show" : ""),
    r: common_vendor.o((...args) => $options.orderConfirm && $options.orderConfirm(...args)),
    s: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2409ba8a"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inwarehouse/order/order.vue"]]);
wx.createPage(MiniProgramPage);
