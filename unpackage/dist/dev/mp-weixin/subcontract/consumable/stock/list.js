"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_consumable_stockController = require("../../../service/controller/consumable/stockController.js");
var share_util_message = require("../../../share/util/message.js");
require("../../../service/controller/controllerBase/consumableControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/redirect/index.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const _sfc_main = {
  data() {
    return {
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      triggered: false,
      isfreshing: false,
      condition: {
        CategoryIDs: [],
        WarehouseIDs: ["w_8"],
        QST: "",
        PageSize: 10,
        PageNO: 1,
        IsIncludeZeroStockItems: false,
        IsOnlyLessThanMinimunStockItems: false
      },
      data: [],
      pageCount: 0,
      total: 0
    };
  },
  methods: {
    ScanCode() {
      let that = this;
      common_vendor.index.scanCode({
        success(res) {
          let content = res.result;
          that.condition.QST = getScanCode(content);
          that.condition.PageSize = 10;
          that.condition.PageNO = 1;
          that.load();
        },
        fail() {
          share_util_message.showErrorToast("\u626B\u63CF\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
        }
      });
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
      service_controller_consumable_stockController.StockController.getStockList(this.condition).then((res) => {
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
    },
    SettingCondition() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  },
  computed: {},
  mounted() {
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    console.log(options.condition);
    this.condition = JSON.parse(options.condition);
    this.condition.PageSize = 10;
    this.condition.PageNO = 1;
    this.load();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.SettingCondition && $options.SettingCondition(...args)),
    b: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    c: this.condition.QST,
    d: common_vendor.o(($event) => this.condition.QST = $event.detail.value),
    e: common_vendor.o((...args) => $options.ScanCode && $options.ScanCode(...args)),
    f: common_vendor.t($data.total),
    g: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ConsumableCode),
        b: common_vendor.t(item.ConsumableName),
        c: common_vendor.t(item.CategoryName),
        d: common_vendor.t(item.Spec),
        e: common_vendor.t(item.Batch),
        f: common_vendor.t(item.MinimumStockText + item.Unit),
        g: common_vendor.t(item.AvailableStockText + item.Unit),
        h: common_vendor.t(item.UsedStockText + item.Unit),
        i: common_vendor.t(item.StockText + item.Unit),
        j: common_vendor.t(item.ReferenceCostText),
        k: common_vendor.t(item.StockAmountText),
        l: item.ID
      };
    }),
    h: $data.triggered,
    i: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
    j: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    k: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    l: common_vendor.o((...args) => _ctx.onRestore && _ctx.onRestore(...args)),
    m: common_vendor.o((...args) => _ctx.onAbort && _ctx.onAbort(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-427144f0"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/stock/list.vue"]]);
wx.createPage(MiniProgramPage);
