"use strict";
var service_controller_mine_MineController = require("../../../service/controller/mine/MineController.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var common_vendor = require("../../../common/vendor.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/http/serveUrl.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
const _sfc_main = {
  setup() {
    var _a;
    const form = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      newPassword: "",
      pastPassword: ""
    });
    const systemPasswordPolicy = (_a = JSON.parse(share_util_storage.getStorage("SystemPasswordPolicy"))) != null ? _a : {};
    const rules = common_vendor.reactive({
      newPassword: {
        rules: [
          { required: true, errorMessage: "\u65B0\u5BC6\u7801\u5FC5\u586B" },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value.trim().length < systemPasswordPolicy.PasswordPolicyMinLength) {
                callback("\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E" + systemPasswordPolicy.PasswordPolicyMinLength + "\u4E2A\u5B57\u7B26");
              } else if (systemPasswordPolicy.PasswordPolicyPasswordStrength) {
                var regnum = 0;
                var reg1 = /[a-z]|[A-Z]/;
                if (reg1.test(value)) {
                  regnum += 1;
                }
                var reg2 = /\d/;
                if (reg2.test(value)) {
                  regnum += 1;
                }
                var reg3 = /[\!\@\#\$\%\^\&\*]/;
                if (reg3.test(value)) {
                  regnum += 1;
                }
                if (regnum < 2) {
                  callback("\u5BC6\u7801\u5FC5\u987B\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7279\u6B8A\u5B57\u7B26\u4E2D\u7684\u4E24\u79CD");
                }
              } else if (formData.pastPassword != value) {
                callback("\u65B0\u5BC6\u7801\u4E0E\u786E\u8BA4\u5BC6\u7801\u4E0D\u4E00\u81F4");
              }
              return true;
            }
          }
        ]
      },
      pastPassword: {
        rules: [
          { required: true, errorMessage: "\u786E\u8BA4\u5BC6\u7801\u5FC5\u586B" },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value.trim().length < systemPasswordPolicy.PasswordPolicyMinLength) {
                callback("\u957F\u5EA6\u4E0D\u80FD\u5C0F\u4E8E" + systemPasswordPolicy.PasswordPolicyMinLength + "\u4E2A\u5B57\u7B26");
              } else if (formData.newPassword != value) {
                callback("\u65B0\u5BC6\u7801\u4E0E\u786E\u8BA4\u5BC6\u7801\u4E0D\u4E00\u81F4");
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
      share_redirect_index.navigateBack();
    }
    function submit() {
      form.value.validate().then(() => {
        const data = {
          ID: share_util_storage.getStorage("UserID"),
          NewPassword: formData.newPassword,
          ReNewPassword: formData.pastPassword
        };
        service_controller_mine_MineController.mineController.modifyPassword(data).then(() => {
          share_util_message.showOkToast("\u64CD\u4F5C\u5B8C\u6210");
          share_redirect_index.navigateBack();
        }).catch((err) => {
          share_util_message.showErrorToast(err);
        }).finally(() => share_util_message.clearLoading());
      }).catch((err) => {
        console.log("err", err);
      });
    }
    return {
      blur,
      form,
      formData,
      submit,
      goBack,
      rules,
      systemPasswordPolicy
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.blur),
    b: common_vendor.o(($event) => $setup.formData.newPassword = $event),
    c: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $setup.formData.newPassword
    }),
    d: common_vendor.p({
      label: "\u65B0 \u5BC6 \u7801",
      required: true,
      name: "newPassword"
    }),
    e: common_vendor.o($setup.blur),
    f: common_vendor.o(($event) => $setup.formData.pastPassword = $event),
    g: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $setup.formData.pastPassword
    }),
    h: common_vendor.p({
      label: "\u786E\u8BA4\u5BC6\u7801",
      required: true,
      name: "pastPassword"
    }),
    i: common_vendor.sr("form", "c53c2e62-0"),
    j: common_vendor.p({
      modelValue: $setup.formData,
      rules: $setup.rules
    }),
    k: common_vendor.o((...args) => $setup.submit && $setup.submit(...args)),
    l: common_vendor.o((...args) => $setup.goBack && $setup.goBack(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c53c2e62"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/mine/changePassword/index.vue"]]);
wx.createPage(MiniProgramPage);
