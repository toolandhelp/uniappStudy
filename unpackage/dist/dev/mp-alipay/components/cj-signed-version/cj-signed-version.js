"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return { ctx: {}, moveX: "", moveY: "", windowHeight: 0, windowWidth: 0, canvasStyle: { height: "", width: "70vw", backgroundColor: "#fff" } };
  },
  methods: {
    touchstart(e) {
      let {
        x,
        y
      } = e.changedTouches[0];
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.moveX = "";
      this.moveY = "";
    },
    cancel() {
      this.$emit("cancel");
    },
    touchmove(e) {
      let {
        x,
        y
      } = e.changedTouches[0];
      if (this.moveX && this.moveY) {
        this.ctx.moveTo(this.moveX, this.moveY);
        this.ctx.lineTo(this.moveX, this.moveY);
      }
      this.ctx.lineTo(x, y);
      this.moveX = x;
      this.moveY = y;
      this.ctx.stroke();
      this.ctx.draw(true);
    },
    clearCotent() {
      this.ctx.draw(false);
      this.ctx.lineWidth = 4;
      this.ctx.setLineCap("round");
      this.ctx.setLineJoin("round");
      this.ctx.strokeStyle = "rgb(0,0,0)";
      this.moveX = "";
      this.moveY = "";
      this.ctx.draw(false);
    },
    submit() {
      let that = this;
      this.ctx.draw(true, () => {
        common_vendor.index.canvasToTempFilePath({
          fileType: "jpg",
          canvasId: "handWriting1",
          success: function(res) {
            that.$emit("success", res);
          },
          fail(err) {
            that.$emit("error", err);
          }
        }, this);
      });
    }
  },
  mounted() {
    common_vendor.index.getSystemInfo({
      success: (result) => {
        this.windowHeight = result.windowHeight;
        this.windowWidth = result.windowWidth;
        this.canvasStyle.height = result.windowHeight + "px";
      }
    });
    let ctx = common_vendor.index.createCanvasContext("handWriting1", this);
    ctx.lineWidth = 4;
    ctx.setLineCap("round");
    ctx.setLineJoin("round");
    ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx = ctx;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.clearCotent && $options.clearCotent(...args)),
    b: common_vendor.s($data.canvasStyle),
    c: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    d: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args)),
    e: common_vendor.o((...args) => $options.cancel && $options.cancel(...args)),
    f: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    g: $data.windowHeight + "px",
    h: $data.windowWidth + "px"
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/components/cj-signed-version/cj-signed-version.vue"]]);
my.createComponent(Component);
