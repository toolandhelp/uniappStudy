"use strict";
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpwxs = require("./mpwxs.js");
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_bindingx = require("./bindingx.js");
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpother = require("./mpother.js");
var common_vendor = require("../../../../common/vendor.js");
var block0 = {};
var block1 = {};
const _sfc_main = {
  mixins: [uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpwxs.mpMixins, uni_modules_uniSwipeAction_components_uniSwipeActionItem_bindingx.bindIngXMixins, uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpother.mpother],
  emits: ["click", "change"],
  props: {
    show: {
      type: String,
      default: "none"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 20
    },
    leftOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    rightOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  unmounted() {
    this.__isUnmounted = true;
    this.uninstall();
  },
  methods: {
    uninstall() {
      if (this.swipeaction) {
        this.swipeaction.children.forEach((item, index) => {
          if (item === this) {
            this.swipeaction.children.splice(index, 1);
          }
        });
      }
    },
    getSwipeAction(name = "uniSwipeAction") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.leftOptions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.style && item.style.color ? item.style.color : "#FFFFFF",
        c: index,
        d: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
        e: item.style && item.style.fontSize ? item.style.fontSize : "16px",
        f: common_vendor.o(($event) => _ctx.appTouchEnd($event, index, item, "left"))
      };
    }),
    b: _ctx.btn,
    c: common_vendor.o((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args)),
    d: common_vendor.n(_ctx.elClass),
    e: common_vendor.f($props.rightOptions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.style && item.style.color ? item.style.color : "#FFFFFF",
        c: index,
        d: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
        e: item.style && item.style.fontSize ? item.style.fontSize : "16px",
        f: common_vendor.o(($event) => _ctx.appTouchEnd($event, index, item, "right"))
      };
    }),
    f: _ctx.btn,
    g: common_vendor.o((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args)),
    h: common_vendor.n(_ctx.elClass),
    i: common_vendor.o((...args) => _ctx.touchstart && _ctx.touchstart(...args)),
    j: common_vendor.o((...args) => _ctx.touchmove && _ctx.touchmove(...args)),
    k: common_vendor.o((...args) => _ctx.touchend && _ctx.touchend(...args)),
    l: _ctx.moveLeft,
    m: _ctx.ani ? 1 : ""
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
if (typeof block1 === "function")
  block1(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue"]]);
my.createComponent(Component);
