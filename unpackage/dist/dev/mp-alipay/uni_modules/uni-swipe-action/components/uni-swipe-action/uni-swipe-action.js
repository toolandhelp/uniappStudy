"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniSwipeAction",
  data() {
    return {};
  },
  created() {
    this.children = [];
  },
  methods: {
    resize() {
      this.children.forEach((vm) => {
        vm.init();
      });
    },
    closeAll() {
      this.children.forEach((vm) => {
        vm.close();
      });
    },
    closeOther(vm) {
      if (this.openItem && this.openItem !== vm) {
        this.openItem.close();
      }
      this.openItem = vm;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue"]]);
my.createComponent(Component);
