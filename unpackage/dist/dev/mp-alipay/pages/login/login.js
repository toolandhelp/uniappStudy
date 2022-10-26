"use strict";
var service_controller_system_userController = require("../../service/controller/system/userController.js");
var share_redirect_index = require("../../share/redirect/index.js");
var share_util_message = require("../../share/util/message.js");
var share_util_storage = require("../../share/util/storage.js");
var share_token_index = require("../../share/token/index.js");
var share_util_platform = require("../../share/util/platform.js");
var share_http_serveUrl = require("../../share/http/serveUrl.js");
var service_enumeration_platformEnum = require("../../service/enumeration/platformEnum.js");
var common_vendor = require("../../common/vendor.js");
require("../../service/controller/controllerBase/systemControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/util/index.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
require("../../service/enumeration/productEnum.js");
function loginSuccess(res2, link, directlyLogin = true) {
  share_token_index.setToken(res2.Token);
  share_util_storage.setStorage("directlyLogin", directlyLogin, true);
  share_util_storage.setStorage("AssetDicSettings", JSON.stringify(res2.AssetDicSettings), true);
  share_util_storage.setStorage("SystemPasswordPolicy", JSON.stringify(res2.UserSetting.SystemPasswordPolicy), true);
  share_util_storage.setStorage("UserType", res2.User.UserType, true);
  share_util_storage.setStorage("isAdmin", res2.User.isAdmin, true);
  share_util_storage.setStorage("UserName", res2.User.Name, true);
  share_util_storage.setStorage("User", JSON.stringify(res2.User), true);
  share_util_storage.setStorage("UserCode", res2.User.EmployeeCode, true);
  share_util_storage.setStorage("UserID", res2.User.ID, true);
  share_util_storage.setStorage("Corp", JSON.stringify(res2.User.Corp), true);
  share_util_storage.setStorage("CorpID", res2.User.Corp.ID, true);
  share_util_storage.setStorage("CorpName", res2.User.Corp.Name, true);
  share_util_storage.setStorage("OrgID", res2.User.Dept.ID, true);
  share_util_storage.setStorage("OrgName", res2.User.Dept.Name, true);
  share_util_storage.setStorage("EmployeeID", res2.User.EmployeeID, true);
  share_util_storage.setStorage("SystemVersion", res2.AuthorizationInfo.Version, true);
  share_util_storage.setStorage("ConsumableDicSettings", res2.ConsumableDicSettings, true);
  share_util_message.clearLoading();
  if (link === "1") {
    share_redirect_index.redirectTo("/pages/mine/todo/todo");
    return;
  }
  share_redirect_index.redirectTo("/pages/home/home");
}
const _sfc_main = {
  props: {
    link: String
  },
  setup({ link }) {
    const uid = common_vendor.ref("");
    const pwd = common_vendor.ref("");
    function ddLogin(uid2, pwd2) {
      dd.getAuthCode({
        success: ({ authCode }) => {
          service_controller_system_userController.userController.ddLogin(authCode, uid2, pwd2).then((res2) => loginSuccess(res2, link)).catch(() => share_util_message.clearLoading());
        },
        fail: () => {
        }
      });
    }
    function wxLogin(uid2, pwd2) {
      wx.login({
        success({ code }) {
          if (code) {
            service_controller_system_userController.userController.wxLogin(code, uid2, pwd2).then((res2) => loginSuccess(res2, link)).catch(() => share_util_message.clearLoading());
            return;
          }
          share_util_message.showErrorToast("\u767B\u5F55\u5931\u8D25\uFF01" + res.errMsg);
        }
      });
    }
    if (share_util_storage.getStorage("directlyLogin")) {
      share_util_message.showLoading();
      switch (share_util_platform.currentPlatform) {
        case service_enumeration_platformEnum.platformEnum.wx:
          wxLogin();
          break;
        case service_enumeration_platformEnum.platformEnum.dd:
          ddLogin();
          break;
        default:
          share_util_message.clearLoading();
          return;
      }
    }
    function login() {
      if (uid.value.length == 0) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u7528\u6237\u540D");
        return;
      }
      if (pwd.value.length == 0) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u5BC6\u7801");
        return;
      }
      share_util_message.showLoading();
      switch (share_util_platform.currentPlatform) {
        case service_enumeration_platformEnum.platformEnum.wx:
          wxLogin(uid.value, pwd.value);
          break;
        case service_enumeration_platformEnum.platformEnum.dd:
          ddLogin(uid.value, pwd.value);
          break;
        default:
          service_controller_system_userController.userController.quickLogin(uid.value, pwd.value).then((res2) => loginSuccess(res2, link, false)).catch(() => share_util_message.clearLoading());
          break;
      }
    }
    function setting() {
      share_redirect_index.navigateTo("pages/login/setting");
    }
    return {
      setting,
      name: share_util_storage.getStorage("UserName"),
      isAppPlatform: !share_util_platform.isMP,
      login,
      uid,
      pwd,
      loginBackgroundImage: `url('${share_http_serveUrl.getFileUrl("/static/bg_beijing.jpg")}')`
    };
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.name
  }, $setup.name ? {
    b: common_vendor.t($setup.name)
  } : {}, {
    c: $setup.isAppPlatform
  }, $setup.isAppPlatform ? {
    d: common_vendor.o($setup.setting),
    e: common_vendor.p({
      name: "setting",
      size: "33px"
    })
  } : {}, {
    f: $setup.uid,
    g: common_vendor.o(($event) => $setup.uid = $event.detail.value),
    h: $setup.pwd,
    i: common_vendor.o(($event) => $setup.pwd = $event.detail.value),
    j: common_vendor.o((...args) => $setup.login && $setup.login(...args)),
    k: $setup.loginBackgroundImage
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b237504c"], ["__file", "D:/gitPro/C8_UI/platformApp/pages/login/login.vue"]]);
my.createPage(MiniProgramPage);
