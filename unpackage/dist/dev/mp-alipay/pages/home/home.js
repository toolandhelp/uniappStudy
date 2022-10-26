"use strict";
var common_vendor = require("../../common/vendor.js");
var share_util_platform = require("../../share/util/platform.js");
var service_enumeration_platformEnum = require("../../service/enumeration/platformEnum.js");
var share_redirect_index = require("../../share/redirect/index.js");
var share_util_storage = require("../../share/util/storage.js");
var share_util_message = require("../../share/util/message.js");
var service_controller_system_userController = require("../../service/controller/system/userController.js");
var service_controller_asset_assetController = require("../../service/controller/asset/assetController.js");
var share_http_serveUrl = require("../../share/http/serveUrl.js");
var share_util_index = require("../../share/util/index.js");
var pages_home_menu = require("./menu.js");
require("../../service/controller/controllerBase/systemControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/token/index.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
require("../../service/enumeration/productEnum.js");
require("../../service/controller/controllerBase/assetControllerBase.js");
const _sfc_main = {
  setup() {
    const swiperImg = [
      share_http_serveUrl.getFileUrl("/static/app1.jpg"),
      share_http_serveUrl.getFileUrl("/static/app2.jpg"),
      share_http_serveUrl.getFileUrl("/static/app3.jpg")
    ];
    const commonMenu = common_vendor.reactive(pages_home_menu.commonMenus);
    const assetMenu = common_vendor.reactive(pages_home_menu.assetMenus);
    const consumableMenu = common_vendor.reactive(pages_home_menu.consumableMenus);
    service_controller_system_userController.userController.getEmployeekinds().then(({ Products }) => {
      for (const menu of commonMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuByCode(menu.code, Products);
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
        }
      }
    });
    service_controller_system_userController.userController.getkinds().then(({ Products }) => {
      for (const menu of assetMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuByCode(menu.code, Products);
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
      for (const menu of consumableMenu) {
        if (menu.code && menu.name == "") {
          const _menu = share_util_index.getMenuByCode(menu.code, Products);
          console.log(_menu);
          if (_menu === false)
            continue;
          menu.name = _menu.Name;
          menu.show = true;
        }
      }
      console.log(consumableMenu);
    });
    function commonlyChange({ detail: { index } }) {
      share_redirect_index.navigateTo(commonMenu[index].url);
    }
    function assetMenuChange({ detail: { index } }) {
      const menu = assetMenu[index];
      if (menu.url == "subcontract/asset/assetInfo/scanCode") {
        scan();
        return;
      }
      share_redirect_index.navigateTo(menu.url);
    }
    function consumableChange({ detail: { index } }) {
      share_redirect_index.navigateTo(consumableMenu[index].url);
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
        text: share_util_storage.getStorage("UserCode")
      },
      {
        lable: "\u6240\u5C5E\u90E8\u95E8",
        text: share_util_storage.getStorage("OrgName")
      },
      {
        lable: "\u6240\u5C5E\u516C\u53F8",
        text: share_util_storage.getStorage("CorpName")
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
    return {
      swiperImg,
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
      scan
    };
  },
  components: {}
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_section2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2)();
}
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($setup.swiperImg, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    b: common_vendor.p({
      title: "\u901A\u7528\u64CD\u4F5C",
      type: "line"
    }),
    c: common_vendor.f($setup.commonMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show
    }, index, i0) => {
      return {
        a: iconPath,
        b: common_vendor.t(name),
        c: url,
        d: show,
        e: "92bb8f34-2-" + i0 + ",92bb8f34-1",
        f: common_vendor.p({
          index
        })
      };
    }),
    d: common_vendor.o($setup.commonlyChange),
    e: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    f: $setup.assetMenu.length
  }, $setup.assetMenu.length ? {
    g: common_vendor.p({
      title: "\u8D44\u4EA7\u7BA1\u7406",
      type: "line"
    })
  } : {}, {
    h: common_vendor.f($setup.assetMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show
    }, index, i0) => {
      return {
        a: iconPath,
        b: common_vendor.t(name),
        c: url,
        d: show,
        e: "92bb8f34-5-" + i0 + ",92bb8f34-4",
        f: common_vendor.p({
          index
        })
      };
    }),
    i: common_vendor.o($setup.assetMenuChange),
    j: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    k: $setup.consumableMenu.length
  }, $setup.consumableMenu.length ? {
    l: common_vendor.p({
      title: "\u6613\u8017\u54C1\u7BA1\u7406",
      type: "line"
    })
  } : {}, {
    m: common_vendor.f($setup.consumableMenu, ({
      name,
      icon,
      iconColor,
      iconPath,
      url,
      show
    }, index, i0) => {
      return {
        a: iconPath,
        b: common_vendor.t(name),
        c: url,
        d: show,
        e: "92bb8f34-8-" + i0 + ",92bb8f34-7",
        f: common_vendor.p({
          index
        })
      };
    }),
    n: common_vendor.o($setup.consumableChange),
    o: common_vendor.p({
      column: 4,
      borderColor: "#fff",
      highlight: true
    }),
    p: $setup.flag == 1,
    q: $setup.headPhoto,
    r: common_vendor.t($setup.userName),
    s: common_vendor.f($setup.contentDatas, (value, index, i0) => {
      return {
        a: common_vendor.t(value.lable),
        b: common_vendor.t(value.text)
      };
    }),
    t: common_vendor.f($setup.contentOperations, ({
      icon,
      lable,
      subLable,
      click
    }, k0, i0) => {
      return {
        a: common_vendor.o(($event) => click({
          subLable
        })),
        b: "92bb8f34-10-" + i0 + ",92bb8f34-9",
        c: common_vendor.p({
          title: lable,
          thumb: icon,
          rightText: subLable,
          showArrow: true,
          clickable: true
        })
      };
    }),
    v: !$setup.isMP
  }, !$setup.isMP ? {
    w: common_vendor.o((...args) => $setup.logout && $setup.logout(...args))
  } : {}, {
    x: $setup.flag == 2,
    y: common_vendor.f($setup.list, (item, index, i0) => {
      return common_vendor.e({
        a: $setup.flag == item.id
      }, $setup.flag == item.id ? {
        b: "92bb8f34-11-" + i0,
        c: common_vendor.p({
          type: item.icon1,
          color: item.color1,
          size: "25"
        })
      } : {
        d: "92bb8f34-12-" + i0,
        e: common_vendor.p({
          type: item.icon1,
          color: item.color2,
          size: "25"
        })
      }, {
        f: common_vendor.t(item.name),
        g: index,
        h: $setup.flag == item.id ? 1 : "",
        i: common_vendor.o(($event) => $setup.flag = item.id)
      });
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-92bb8f34"], ["__file", "D:/gitPro/C8_UI/platformApp/pages/home/home.vue"]]);
my.createPage(MiniProgramPage);
