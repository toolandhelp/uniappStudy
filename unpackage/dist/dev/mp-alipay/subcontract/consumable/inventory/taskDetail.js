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
      state: "",
      items: ["\u5168\u90E8", "\u6B63\u5E38", "\u76D8\u76C8", "\u76D8\u4E8F"],
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      triggered: false,
      isfreshing: false,
      condition: {
        Summary: 0
      },
      data: [],
      pageCount: 0,
      range: "",
      warehouseName: "",
      total: 0,
      fabPattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      fabContent: [
        {
          iconPath: "/static/icon/sys.png",
          selectedIconPath: "/static/icon/sys.png",
          text: "\u626B\u7801",
          active: false
        },
        {
          iconPath: "/static/icon/edit.png",
          selectedIconPath: "/static/icon/edit.png",
          text: "\u68C0\u7D22",
          active: false
        }
      ],
      searchCodeVal: ""
    };
  },
  methods: {
    inventoryConfirm(detailID) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.refreshBack, () => {
        this.condition.PageNO = 1;
        this.load();
      });
      common_vendor.index.navigateTo({
        url: `/subcontract/consumable/inventory/inventoryConfirm?TaskID=${this.condition.Id}&ID=${detailID}`
      });
    },
    scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({
          result
        }) => {
          this.dialogsearchCodeValConfirm(result);
        }
      });
    },
    fabTrigger({
      index
    }) {
      switch (index) {
        case 0:
          this.scan();
          break;
        case 1:
          this.searchCodeVal = "";
          this.$refs.scanCodeDialog.open();
          break;
      }
      this.$refs.fab.close();
    },
    dialogsearchCodeValConfirm(val) {
      const str = val.trim();
      if (str == "" || str == null || str == void 0) {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      console.log(str);
      service_controller_consumable_inventoryController.InventoryController.getDetailIDByCode({
        Code: str,
        ID: this.condition.Id
      }).then((d) => {
        if (d == null) {
          share_util_message.showErrorToast("\u5F53\u524D\u76D8\u70B9\u4EFB\u52A1\u4E0D\u5B58\u5728\u6B64\u6613\u8017\u54C1");
          return;
        }
        common_vendor.index.navigateTo({
          url: `/subcontract/consumable/inventory/inventoryConfirm?TaskID=${this.condition.Id}&ID=${d}`
        });
      });
    },
    fabClick() {
    },
    onClickItem(e) {
      if (this.condition.Summary !== e.currentIndex) {
        this.condition.Summary = e.currentIndex;
        this.condition.PageNO = 1;
        this.load();
      }
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
      service_controller_consumable_inventoryController.InventoryController.getByID(this.condition).then((res) => {
        if (isPush) {
          this.data.push(...res.Items);
        } else {
          this.data = res.Items;
        }
        this.range = res.Range;
        this.warehouseName = res.WarehouseName;
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
    let routes = getCurrentPages();
    let options = routes[routes.length - 1].options;
    common_vendor.index.setNavigationBarTitle({
      title: options.title
    });
    this.state = options.Status;
    this.condition.Id = options.taskID;
    this.condition.PageSize = 10;
    this.condition.PageNO = 1;
    this.load();
  }
};
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_segmented_control2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_fab2)();
}
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.onClickItem),
    b: common_vendor.p({
      current: $data.condition.Summary,
      values: $data.items
    }),
    c: common_vendor.t($data.warehouseName),
    d: common_vendor.t($data.range),
    e: common_vendor.t($data.total),
    f: common_vendor.f($data.data, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.ConsumableCode),
        b: common_vendor.t(item.ConsumableCategoryName),
        c: common_vendor.t(item.ConsumableName),
        d: common_vendor.t(item.WarehouseName),
        e: common_vendor.t(item.Brand),
        f: common_vendor.t(item.Spec),
        g: common_vendor.t(item.Model),
        h: common_vendor.t(item.Stock),
        i: common_vendor.t(item.RealStock),
        j: common_vendor.t(item.Difference),
        k: common_vendor.s(item.Difference != 0 ? "color:red" : ""),
        l: common_vendor.t(item.Unit),
        m: common_vendor.t(item.Remark),
        n: item.Status != 1
      }, item.Status != 1 ? {} : {}, {
        o: item.ID,
        p: common_vendor.o(() => {
          if (this.state == 2) {
            $options.inventoryConfirm(item.ID);
          }
        })
      });
    }),
    g: $data.triggered,
    h: common_vendor.o((...args) => _ctx.onPulling && _ctx.onPulling(...args)),
    i: common_vendor.o((...args) => $options.reachBottom && $options.reachBottom(...args)),
    j: common_vendor.o((...args) => $options.onRefresh && $options.onRefresh(...args)),
    k: common_vendor.o((...args) => _ctx.onRestore && _ctx.onRestore(...args)),
    l: common_vendor.o((...args) => _ctx.onAbort && _ctx.onAbort(...args)),
    m: common_vendor.o($options.dialogsearchCodeValConfirm),
    n: common_vendor.p({
      mode: "input",
      title: "\u9009\u62E9\u6613\u8017\u54C1\u5E93\u5B58",
      value: $data.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
    }),
    o: common_vendor.p({
      type: "dialog"
    }),
    p: common_vendor.o($options.fabTrigger),
    q: common_vendor.o($options.fabClick),
    r: common_vendor.p({
      pattern: $data.fabPattern,
      content: $data.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-348d3bcc"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/inventory/taskDetail.vue"]]);
my.createPage(MiniProgramPage);
