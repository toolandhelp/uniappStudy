"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  emits: ["change"],
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup(props, ctx) {
    const popup = common_vendor.ref(null);
    const windowHeights = common_vendor.ref(0);
    const itemOptions = common_vendor.ref([]);
    common_vendor.watch(() => props.value, (newVal) => {
      update();
    });
    common_vendor.watch(() => props.options, (newVal) => {
      update();
    });
    function update() {
      itemOptions.value = props.options.map((p) => {
        p.show = props.value.some((s) => s == p.value);
        return p;
      });
    }
    function checked(val) {
      const index = itemOptions.value.findIndex((p) => p.value == val);
      itemOptions.value[index].show = !itemOptions.value[index].show;
    }
    function complete() {
      let value = [], text = "";
      for (let i = 0, len = itemOptions.value.length; i < len; i++) {
        if (itemOptions.value[i].show) {
          value.push(itemOptions.value[i].value);
          text += itemOptions.value[i].text + ",";
        }
      }
      ctx.emit("change", { value, text: text.substring(0, text.lastIndexOf(",")) });
      close();
    }
    function close() {
      popup.value.close();
    }
    function open() {
      update();
      popup.value.open();
    }
    {
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    return {
      popup,
      windowHeights,
      itemOptions,
      checked,
      complete,
      open,
      close
    };
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.open && $setup.open(...args)),
    b: common_vendor.o((...args) => $setup.close && $setup.close(...args)),
    c: common_vendor.o((...args) => $setup.complete && $setup.complete(...args)),
    d: common_vendor.f($setup.itemOptions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.text),
        b: item.show
      }, item.show ? {
        c: "6811524e-1-" + i0 + ",6811524e-0",
        d: common_vendor.p({
          type: "checkmarkempty",
          color: "#007aff",
          size: "25"
        })
      } : {}, {
        e: index,
        f: common_vendor.o(($event) => $setup.checked(item.value), index)
      });
    }),
    e: common_vendor.s(`height:${$setup.windowHeights / 2 - 70}px`),
    f: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    g: common_vendor.sr("popup", "6811524e-0"),
    h: common_vendor.o(_ctx.change),
    i: common_vendor.p({
      type: "bottom",
      ["is-mask-click"]: false,
      ["background-color"]: "#fff"
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6811524e"], ["__file", "D:/gitPro/C8_UI/platformApp/components/multiplePopupSelect/select.vue"]]);
wx.createComponent(Component);
