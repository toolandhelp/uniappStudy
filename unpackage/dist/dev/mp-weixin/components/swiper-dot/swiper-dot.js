"use strict";
var common_vendor = require("../../common/vendor.js");
var share_http_serveUrl = require("../../share/http/serveUrl.js");
require("../../service/enumeration/productEnum.js");
const _sfc_main = {
  props: {
    height: {
      type: [String, Number],
      default: 150
    },
    swiperImg: {
      type: Array,
      default: () => {
        return [
          share_http_serveUrl.getFileUrl("/static/app1.jpg"),
          share_http_serveUrl.getFileUrl("/static/app2.jpg"),
          share_http_serveUrl.getFileUrl("/static/app3.jpg")
        ];
      }
    }
  },
  setup() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.swiperImg, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.s(`height:${$props.height}px`)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e5053978"], ["__file", "D:/gitPro/C8_UI/platformApp/components/swiper-dot/swiper-dot.vue"]]);
wx.createComponent(Component);
