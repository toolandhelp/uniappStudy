"use strict";
var common_vendor = require("../../../../common/vendor.js");
var service_controller_consumable_outWarehouseController = require("../../../../service/controller/consumable/outWarehouseController.js");
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
      BillType: [
        {
          label: "\u5168\u90E8",
          value: 0
        },
        {
          label: "\u8349\u7A3F",
          value: 1
        },
        {
          label: "\u5DF2\u63D0\u4EA4",
          value: 2
        },
        {
          label: "\u5F85\u5BA1\u6279",
          value: 3
        },
        {
          label: "\u5BA1\u6279\u4E2D",
          value: 4
        },
        {
          label: "\u5BA1\u6279\u4E0D\u901A\u8FC7",
          value: 5
        },
        {
          label: "\u5BA1\u6279\u901A\u8FC7",
          value: 6
        },
        {
          label: "\u5F85\u786E\u8BA4",
          value: 7
        },
        {
          label: "\u5DF2\u751F\u6548",
          value: 8
        },
        {
          label: "\u5DF2\u53D6\u6D88",
          value: 9
        }
      ],
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      triggered: false,
      isfreshing: false,
      condition: {
        BillStatus: 0,
        BillCode: "",
        ConsumableCategoryIDs: [],
        ConsumableCode: "",
        DrawEmployeeIDs: [],
        OutWarehouseEndDate: "",
        OutWarehouseStartDate: "",
        IsSetNumber: true,
        ListMode: 2,
        PageNO: 1,
        PageSize: 20,
        QST: "",
        Sort: 2,
        SupplierIDs: [],
        WarehouseOrCorpIDs: []
      },
      data: [],
      pageCount: 0,
      total: 0
    };
  },
  methods: {
    timeConvertDate: share_util_dateTime.timeConvertDate,
    bindPickerChange(e) {
      let index = this.BillType.findIndex((obj, index2, arr) => {
        return obj.value == e.detail.value;
      });
      this.condition.BillStatus = index;
      this.load();
    },
    editBill(id) {
      share_util_uniEvent.emit(service_enumeration_eventNames.eventNames.consumableInwarehouseEditBill, id);
      share_redirect_index.navigateBack();
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
      service_controller_consumable_outWarehouseController.OutWarehouseController.QueryOutWarehouseBill(this.condition).then((res) => {
        if (isPush) {
          this.data.push(...res.Items);
        } else {
          this.data = res.Items;
        }
        this.total = res.TotalRecordQty;
        this.pageCount = res.PageCount;
        console.log(this.data);
        if (fn) {
          fn();
        }
        share_util_message.clearLoading();
      }).catch(() => {
        share_util_message.clearLoading();
      });
    },
    SettingCondition() {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.consumableInwarehouseConditionBack, (obj) => {
        this.condition = obj;
        this.condition.PageSize = 10;
        this.condition.PageNO = 1;
        this.load();
      });
      common_vendor.index.navigateTo({
        url: `/subcontract/consumable/outwarehouse/condition/condition`
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
    c: this.condition.BillCode,
    d: common_vendor.o(($event) => this.condition.BillCode = $event.detail.value),
    e: common_vendor.o((...args) => $options.ScanCode && $options.ScanCode(...args)),
    f: common_vendor.t($data.BillType[$data.condition.BillStatus].label),
    g: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    h: $data.BillType[$data.condition.BillStatus].value,
    i: $data.BillType.map((d) => d.label),
    j: common_vendor.t($data.total),
    k: common_vendor.f($data.data, (item, index, i0) => {
      return {
        a: common_vendor.t(item.BillerEmployeeName),
        b: common_vendor.t(item.BillDateTime),
        c: common_vendor.t(item.BillCode),
        d: common_vendor.t(item.StatusText),
        e: common_vendor.t(item.WarehouseName),
        f: common_vendor.t(item.OutStockDate.substring(0, 10)),
        g: common_vendor.t(item.RequestDrawCode),
        h: item.IsClosedRequestDraw,
        i: common_vendor.t(item.TotalReferenceCostAmountText),
        j: common_vendor.t(item.Remark),
        k: item.ID,
        l: common_vendor.o(($event) => $options.editBill(item.ID), item.ID)
      };
    }),
    l: $data.triggered,
    m: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
    n: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    o: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    p: common_vendor.o((...args) => _ctx.onRestore && _ctx.onRestore(...args)),
    q: common_vendor.o((...args) => _ctx.onAbort && _ctx.onAbort(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-724f9626"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/outwarehouse/list/list.vue"]]);
wx.createPage(MiniProgramPage);
