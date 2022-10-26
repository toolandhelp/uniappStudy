"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_platform = require("../../share/util/platform.js");
var service_enumeration_platformEnum = require("../../service/enumeration/platformEnum.js");
var share_redirect_index = require("../../share/redirect/index.js");
var share_util_storage = require("../../share/util/storage.js");
var share_util_message = require("../../share/util/message.js");
require("../../service/controller/system/userController.js");
var service_controller_asset_assetController = require("../../service/controller/asset/assetController.js");
var service_controller_myWork_todoController = require("../../service/controller/myWork/todoController.js");
var service_controller_myWork_doneController = require("../../service/controller/myWork/doneController.js");
var share_util_index = require("../../share/util/index.js");
var pages_home_menu = require("./menu.js");
require("../../service/controller/controllerBase/systemControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/token/index.js");
require("../../share/http/serveUrl.js");
require("../../service/enumeration/productEnum.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
require("../../service/controller/controllerBase/assetControllerBase.js");
require("../../service/controller/controllerBase/myWorkControllerBase.js");
const SwiperDot = () => "../../components/swiper-dot/swiper-dot.js";
const _sfc_main = {
  components: {
    SwiperDot
  },
  setup() {
    const todoCount = common_vendor.ref("");
    const doneCount = common_vendor.ref("");
    const { commonMenus, assetMenus, consumableMenus } = pages_home_menu.setMenus();
    const commonMenu = commonMenus;
    const assetMenu = assetMenus;
    const consumableMenu = consumableMenus;
    {
      getMenuPermissions();
    }
    async function getMenuPermissions() {
      let permissions = share_util_storage.getStorage("UserType") == 1 ? JSON.parse(share_util_storage.getStorage("kinds")) : JSON.parse(share_util_storage.getStorage("Employeekinds"));
      for (const menu of commonMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuCode(menu.code, JSON.parse(share_util_storage.getStorage("Employeekinds")));
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
      for (const menu of assetMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuCode(menu.code, permissions);
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
      for (const menu of consumableMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuCode(menu.code, permissions);
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
    }
    function commonlyChange(url) {
      share_redirect_index.navigateTo(url);
    }
    function assetMenuChange(url) {
      if (url == "subcontract/asset/assetInfo/scanCode") {
        scan();
        return;
      }
      share_redirect_index.navigateTo(url);
    }
    function consumableChange(url) {
      share_redirect_index.navigateTo(url);
    }
    const flag = common_vendor.ref(1);
    const list = [
      {
        id: "1",
        url: "pages/home/home",
        name: "\u9996\u9875",
        icon1: "home-filled",
        color1: "#ff5402",
        icon2: "home-filled",
        color2: "#666"
      },
      {
        id: "2",
        url: "subcontract/mine/index/index",
        name: "\u6211\u7684",
        icon1: "person-filled",
        color1: "#ff5402",
        icon2: "person-filled",
        color2: "#666"
      }
    ];
    const userName = share_util_storage.getStorage("UserName");
    const headPhoto = "/static/images/touxiang.png";
    const contentDatas = [
      {
        lable: "\u5DE5\u53F7",
        text: share_util_storage.getStorage("UserCode"),
        icon: "/static/icon/yuangong.png",
        subLable: ""
      },
      {
        lable: "\u6240\u5C5E\u90E8\u95E8",
        text: share_util_storage.getStorage("OrgName"),
        icon: "/static/icon/bumen.png",
        subLable: ""
      },
      {
        lable: "\u6240\u5C5E\u516C\u53F8",
        text: share_util_storage.getStorage("CorpName"),
        icon: "/static/icon/gongsi.png",
        subLable: ""
      }
    ];
    let contentOperations = [
      {
        icon: "/static/icon/xgmm.png",
        lable: "\u4FEE\u6539\u5BC6\u7801",
        subLable: "",
        click: () => share_redirect_index.navigateTo("subcontract/mine/changePassword/index")
      },
      {
        icon: "/static/icon/print.png",
        lable: "\u84DD\u7259\u6253\u5370",
        subLable: "",
        click: () => share_redirect_index.navigateTo("subcontract/mine/printer/index")
      },
      {
        icon: "/static/icon/wtjd.png",
        lable: "\u5E2E\u52A9",
        subLable: "",
        click: () => share_redirect_index.navigateTo("subcontract/mine/help/index")
      },
      {
        icon: "/static/icon/bzzx.png",
        lable: "\u670D\u52A1\u70ED\u7EBF",
        subLable: "400-1878-996",
        click: ({ subLable }) => common_vendor.index.makePhoneCall({ phoneNumber: subLable })
      },
      {
        icon: "/static/icon/logo.png",
        lable: "\u5173\u4E8E",
        subLable: "",
        click: () => share_redirect_index.navigateTo("subcontract/mine/aboutSystem/index")
      }
    ];
    if (share_util_platform.currentPlatform !== service_enumeration_platformEnum.platformEnum.app) {
      const tmpPrint = contentOperations.splice(1, 1);
      contentOperations = contentOperations.filter((item) => item !== tmpPrint);
    }
    function logout() {
      share_util_message.openConfirm("\u786E\u5B9A\u8981\u9000\u51FA\u767B\u5F55\u5417\uFF1F").then(() => {
        share_util_storage.clearStorage();
        share_redirect_index.reLaunch("pages/login/login");
      });
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          result = share_util_index.getScanCode(result);
          share_util_message.showLoading();
          service_controller_asset_assetController.assetController.scanQuery(result).then(({ Items }) => {
            if (!Items.length) {
              share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u8D44\u4EA7\u4FE1\u606F");
              return;
            }
            share_redirect_index.navigateTo(`subcontract/asset/assetInfo/assetView?id=${Items[0].ID}&handle=1`);
          }).finally(() => share_util_message.clearLoading());
        }
      });
    }
    {
      todoDone();
    }
    function todoDone() {
      service_controller_myWork_todoController.todoController.todoWaitingApprovalBillList(share_util_storage.getStorage("EmployeeID"), 1, 1).then(({ TotalRecordQty }) => {
        todoCount.value = TotalRecordQty ? TotalRecordQty : null;
      });
      service_controller_myWork_doneController.doneController.Done(share_util_storage.getStorage("EmployeeID"), 1, 1).then(({ TotalRecordQty }) => {
        doneCount.value = TotalRecordQty ? TotalRecordQty : null;
      });
    }
    common_vendor.onShow(() => {
      todoDone();
    });
    const windowHeights = common_vendor.ref(0);
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    return {
      todoCount,
      doneCount,
      commonMenu,
      assetMenu,
      consumableMenu,
      commonlyChange,
      assetMenuChange,
      consumableChange,
      flag,
      list,
      userName,
      contentDatas,
      headPhoto,
      logout,
      isMP: share_util_platform.isMP,
      contentOperations,
      scan,
      windowHeights,
      getStorage: share_util_storage.getStorage
    };
  }
};
if (!Array) {
  const _component_SwiperDot = common_vendor.resolveComponent("SwiperDot");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_SwiperDot + _easycom_uni_section2 + _easycom_uni_badge2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2)();
}
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_badge + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.commonMenu.length
  }, $setup.commonMenu.length ? {
    b: common_vendor.p({
      title: "\u901A\u7528\u64CD\u4F5C",
      type: "line"
    })
  } : {}, {
    c: common_vendor.f($setup.commonMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show,
      code
    }, index, i0) => {
      return common_vendor.e({
        a: show
      }, show ? common_vendor.e({
        b: code == "Employee/WaitingApproval" || code == "Employee/ApprovalHistory"
      }, code == "Employee/WaitingApproval" || code == "Employee/ApprovalHistory" ? {
        c: iconPath,
        d: common_vendor.o(($event) => $setup.commonlyChange(url)),
        e: "92bb8f34-4-" + i0 + "," + ("92bb8f34-3-" + i0),
        f: common_vendor.p({
          text: code == "Employee/WaitingApproval" ? $setup.todoCount : $setup.doneCount,
          type: code == "Employee/WaitingApproval" ? "error" : "primary",
          absolute: "rightTop",
          size: "normal"
        })
      } : {
        g: iconPath,
        h: common_vendor.o(($event) => $setup.commonlyChange(url))
      }, {
        i: common_vendor.t(name),
        j: "92bb8f34-3-" + i0 + ",92bb8f34-2"
      }) : {}, {
        k: index,
        l: url
      });
    }),
    d: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    e: $setup.assetMenu.length && $setup.getStorage("UserType") == 1
  }, $setup.assetMenu.length && $setup.getStorage("UserType") == 1 ? {
    f: common_vendor.p({
      title: "\u8D44\u4EA7\u7BA1\u7406",
      type: "line"
    })
  } : {}, {
    g: common_vendor.f($setup.assetMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show
    }, index, i0) => {
      return common_vendor.e({
        a: show
      }, show ? {
        b: iconPath,
        c: common_vendor.o(($event) => $setup.assetMenuChange(url)),
        d: common_vendor.t(name),
        e: "92bb8f34-7-" + i0 + ",92bb8f34-6"
      } : {}, {
        f: index,
        g: url
      });
    }),
    h: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    i: $setup.consumableMenu.length && $setup.getStorage("UserType") == 1
  }, $setup.consumableMenu.length && $setup.getStorage("UserType") == 1 ? {
    j: common_vendor.p({
      title: "\u6613\u8017\u54C1\u7BA1\u7406",
      type: "line"
    })
  } : {}, {
    k: common_vendor.f($setup.consumableMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show
    }, index, i0) => {
      return common_vendor.e({
        a: show
      }, show ? {
        b: iconPath,
        c: common_vendor.o(($event) => $setup.consumableChange(url)),
        d: common_vendor.t(name),
        e: "92bb8f34-10-" + i0 + ",92bb8f34-9"
      } : {}, {
        f: index,
        g: url
      });
    }),
    l: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    m: common_vendor.s(`height:${$setup.windowHeights - 250}px`),
    n: common_vendor.s(`height:${$setup.windowHeights - 250}px`),
    o: common_vendor.s(`height:${$setup.windowHeights - 10}px`),
    p: $setup.flag == 1,
    q: $setup.headPhoto,
    r: common_vendor.o((...args) => $setup.logout && $setup.logout(...args)),
    s: common_vendor.t($setup.userName),
    t: common_vendor.f($setup.contentDatas, ({
      icon,
      lable,
      text,
      click
    }, k0, i0) => {
      return {
        a: "92bb8f34-12-" + i0 + ",92bb8f34-11",
        b: common_vendor.p({
          title: lable,
          thumb: icon,
          rightText: text
        })
      };
    }),
    v: common_vendor.f($setup.contentOperations, ({
      icon,
      lable,
      subLable,
      click
    }, k0, i0) => {
      return {
        a: common_vendor.o(($event) => click({
          subLable
        })),
        b: "92bb8f34-14-" + i0 + ",92bb8f34-13",
        c: common_vendor.p({
          title: lable,
          thumb: icon,
          rightText: subLable,
          showArrow: true,
          clickable: true
        })
      };
    }),
    w: !$setup.isMP
  }, !$setup.isMP ? {
    x: common_vendor.o((...args) => $setup.logout && $setup.logout(...args))
  } : {}, {
    y: common_vendor.s(`height:${$setup.windowHeights - 230}px`),
    z: $setup.flag == 2,
    A: common_vendor.s(`height:${$setup.windowHeights - 10}px`),
    B: common_vendor.f($setup.list, (item, index, i0) => {
      return common_vendor.e({
        a: $setup.flag == item.id
      }, $setup.flag == item.id ? {
        b: "92bb8f34-15-" + i0,
        c: common_vendor.p({
          type: item.icon1,
          color: item.color1,
          size: "25"
        })
      } : {
        d: "92bb8f34-16-" + i0,
        e: common_vendor.p({
          type: item.icon1,
          color: item.color2,
          size: "25"
        })
      }, {
        f: common_vendor.t(item.name),
        g: index,
        h: $setup.flag == item.id ? 1 : "",
        i: common_vendor.o(($event) => $setup.flag = item.id, index)
      });
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92bb8f34"], ["__file", "D:/gitPro/C8_UI/platformApp/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
