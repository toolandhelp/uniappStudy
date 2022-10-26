"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_consumable_inventoryController = require("../../../service/controller/consumable/inventoryController.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
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
        "Sort": 2,
        "HandlerEmployeeIDs": [],
        "BillCode": "",
        "HandlerOrgIDs": null,
        "InventoryEndDate": "",
        "InventoryStartDate": "",
        "PageNO": 1,
        "PageSize": 20,
        "QST": "",
        "Title": "",
        "IsSetNumber": true
      },
      data: [],
      pageCount: 0,
      total: 0
    };
  },
  methods: {
    Jump(id, title, Status) {
      common_vendor.index.navigateTo({
        url: `/subcontract/consumable/inventory/taskDetail?taskID=${id}&title=${title}&Status=${Status}`
      });
    },
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
      service_controller_consumable_inventoryController.InventoryController.getInventoryList(this.condition).then((res) => {
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
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.conditionBack, (obj) => {
        this.condition = obj;
        this.load();
      });
      common_vendor.index.navigateTo({
        url: `/subcontract/consumable/inventory/condition`
      });
    }
  },
  computed: {},
  mounted() {
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
    e: common_vendor.t($data.total),
    f: common_vendor.f($data.data, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.StatusText),
        b: common_vendor.n(item.Status == 1 ? "Draft" : item.Status == 2 ? "Waiting" : "Completed"),
        c: common_vendor.t(item.Title),
        d: common_vendor.t(item.BillCode),
        e: common_vendor.t(item.InventoryDate.substring(0, 10)),
        f: common_vendor.t(item.WarehouseName),
        g: common_vendor.t(item.TotalStock),
        h: common_vendor.t(item.TotalRealStock),
        i: common_vendor.t(item.Difference),
        j: common_vendor.t(item.HandlerOrgName),
        k: item.Status != 1
      }, item.Status != 1 ? {} : {}, {
        l: item.ID,
        m: common_vendor.o(() => {
          if (item.Status != 1) {
            $options.Jump(item.ID, item.Title, item.Status);
          }
        }, item.ID)
      });
    }),
    g: $data.triggered,
    h: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
    i: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    j: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    k: common_vendor.o((...args) => _ctx.onRestore && _ctx.onRestore(...args)),
    l: common_vendor.o((...args) => _ctx.onAbort && _ctx.onAbort(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-11fb8582"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inventory/list.vue"]]);
wx.createPage(MiniProgramPage);
