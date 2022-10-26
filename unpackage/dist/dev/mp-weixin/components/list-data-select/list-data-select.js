"use strict";
var common_vendor = require("../../common/vendor.js");
const done = "done";
const search = "search";
const _sfc_main = {
  emits: [done, search],
  props: {
    multiple: {},
    list: {
      type: Array,
      default: () => []
    },
    initIds: {
      type: Array,
      default: []
    },
    idKey: {
      type: String,
      default: "id"
    },
    nameKey: {
      type: String,
      default: "name"
    },
    codeKey: {
      type: String,
      default: "code"
    },
    searchPlaceholder: {
      type: String,
      default: "\u7F16\u7801/\u540D\u79F0"
    },
    maxRowCount: {
      type: Number,
      default: 30
    }
  },
  setup(props, { emit }) {
    const qst = common_vendor.ref("");
    const listLength = common_vendor.computed$1(() => props.list ? props.list.length : 0);
    const selectedIds = common_vendor.ref([...props.initIds]);
    const idKey = props.idKey;
    const nameKey = props.nameKey;
    const windowHeights = common_vendor.ref(0);
    function doneSelect(item) {
      if (props.multiple)
        return;
      emit(done, item);
    }
    function multipleSelectDone() {
      const _l = Array.from(props.list);
      const ids = Array.from(selectedIds.value);
      const selectItems = ids.map((id) => _l.find((p) => p[idKey] == id));
      emit(done, {
        ids,
        items: selectItems,
        names: selectItems.map((v) => v[nameKey]).toString()
      });
    }
    function doneSearch() {
      const _text = qst.value;
      selectedIds.value = [];
      emit(search, _text);
    }
    function checkboxChange({ detail: { value } }) {
      selectedIds.value = value;
    }
    {
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    return {
      doneSelect,
      doneSearch,
      qst,
      listLength,
      checkboxChange,
      selectedIds,
      multipleSelectDone,
      windowHeights
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.multiple
  }, $props.multiple ? {
    b: common_vendor.t($setup.selectedIds.length),
    c: common_vendor.o((...args) => $setup.multipleSelectDone && $setup.multipleSelectDone(...args))
  } : {}, {
    d: common_vendor.o($setup.doneSearch),
    e: common_vendor.o($setup.doneSearch),
    f: common_vendor.o($setup.doneSearch),
    g: common_vendor.o(($event) => $setup.qst = $event),
    h: common_vendor.p({
      prefixIcon: "search",
      placeholder: $props.searchPlaceholder,
      confirmType: "search",
      trim: "both",
      inputBorder: false,
      modelValue: $setup.qst
    }),
    i: common_vendor.f($props.list, (item, k0, i0) => {
      return common_vendor.e($props.multiple ? {
        a: common_vendor.o(() => {
        }),
        b: $setup.selectedIds.includes(item[$props.idKey].toString()),
        c: item[$props.idKey].toString()
      } : {}, {
        d: common_vendor.t(item[$props.nameKey]),
        e: common_vendor.t(item[$props.codeKey]),
        f: item[$props.idKey],
        g: common_vendor.o(($event) => $setup.doneSelect(item), item[$props.idKey])
      });
    }),
    j: $props.multiple,
    k: common_vendor.o((...args) => $setup.checkboxChange && $setup.checkboxChange(...args)),
    l: $setup.listLength < $props.maxRowCount
  }, $setup.listLength < $props.maxRowCount ? {} : {
    m: common_vendor.t($props.maxRowCount)
  }, {
    n: common_vendor.s(`height:${$setup.windowHeights - 87}px`)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-510529f8"], ["__file", "D:/gitPro/C8_UI/platformApp/components/list-data-select/list-data-select.vue"]]);
wx.createComponent(Component);
