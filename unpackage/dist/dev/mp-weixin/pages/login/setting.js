"use strict";
var share_redirect_index = require("../../share/redirect/index.js");
var share_util_storage = require("../../share/util/storage.js");
var share_http_serveUrl = require("../../share/http/serveUrl.js");
var service_enumeration_productEnum = require("../../service/enumeration/productEnum.js");
var share_util_message = require("../../share/util/message.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      serverAddress: ""
    });
    formData.serverAddress = typeof share_util_storage.getStorage("serverAddress") === "string" && share_util_storage.getStorage("serverAddress").indexOf("http") == 0 ? share_util_storage.getStorage("serverAddress") : "http://demo.houqinstar.com/";
    const rules = common_vendor.reactive({
      serverAddress: {
        rules: [
          { required: true, errorMessage: "\u670D\u52A1\u5730\u5740\u5FC5\u586B" },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value.indexOf("http") !== 0) {
                callback("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u670D\u52A1\u5730\u5740");
              }
              return true;
            }
          }
        ]
      }
    });
    function blur() {
      form.value.validate();
    }
    function goBack() {
      share_redirect_index.navigateTo("/");
    }
    function submit() {
      form.value.validate().then(() => {
        const url = formData.serverAddress + "/configure.jsonp";
        var scr = document.createElement("script");
        scr.setAttribute("type", "text/javascript");
        scr.setAttribute("src", url);
        scr.setAttribute("onerror", "errorfunc()");
        document.querySelector("head").appendChild(scr);
        window.jsonpCallback = function jsonpCallback(data) {
          share_util_storage.setStorage("services", JSON.stringify(data));
          share_util_storage.setStorage("serverAddress", formData.serverAddress);
          share_http_serveUrl.ServiceUrl.set(service_enumeration_productEnum.productEnum.system, data.system);
          share_http_serveUrl.ServiceUrl.set(service_enumeration_productEnum.productEnum.asset, data.asset);
          share_http_serveUrl.ServiceUrl.set(service_enumeration_productEnum.productEnum.consumable, data.consumables);
          share_http_serveUrl.ServiceUrl.set(service_enumeration_productEnum.productEnum.myWork, data.myWork);
          share_http_serveUrl.ServiceUrl.set(service_enumeration_productEnum.productEnum.file, data.fileServiceRoot);
          share_util_message.showOkToast("\u8BBE\u7F6E\u6210\u529F");
          goBack();
        };
        share_util_message.showErrorToast("\u670D\u52A1\u5730\u5740\u9519\u8BEF\uFF01");
      });
    }
    return {
      form,
      rules,
      blur,
      formData,
      submit,
      goBack
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.blur),
    b: common_vendor.o(($event) => $setup.formData.serverAddress = $event),
    c: common_vendor.p({
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740",
      modelValue: $setup.formData.serverAddress
    }),
    d: common_vendor.p({
      label: "\u670D\u52A1\u5730\u5740",
      required: true,
      name: "serverAddress"
    }),
    e: common_vendor.sr("form", "687a7901-0"),
    f: common_vendor.p({
      modelValue: $setup.formData,
      rules: $setup.rules
    }),
    g: common_vendor.o((...args) => $setup.submit && $setup.submit(...args)),
    h: common_vendor.o((...args) => $setup.goBack && $setup.goBack(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-687a7901"], ["__file", "D:/gitPro/C8_UI/platformApp/pages/login/setting.vue"]]);
wx.createPage(MiniProgramPage);
