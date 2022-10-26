"use strict";
require("../../common/vendor.js");
function setMenus() {
  const commonMenus = [
    {
      code: "Employee/WaitingApproval",
      name: "",
      icon: "calendar-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/clock.png",
      url: "subcontract/mine/todo/todo",
      show: true
    },
    {
      code: "Employee/ApprovalHistory",
      name: "",
      icon: "person-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/alldo.png",
      url: "subcontract/mine/done/done",
      show: true
    },
    {
      code: "Employee/MyAsset",
      name: "",
      icon: "person-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/mxzc.png",
      url: "subcontract/asset/myAssetList/list",
      show: true
    },
    {
      code: "Employee/Asset/RequestDraw",
      name: "",
      icon: "undo",
      iconColor: "#777",
      iconPath: "../../static/icon/shenling.png",
      url: "subcontract/asset/requestDraw/requestDraw",
      show: true
    },
    {
      code: "Employee/Consumable/RequestDraw",
      name: "",
      icon: "undo",
      iconColor: "#777",
      iconPath: "../../static/icon/shenling.png",
      url: "subcontract/consumable/requestDraw/requestDraw",
      show: true
    },
    {
      code: "",
      name: "\u626B\u7801\u62A5\u4FEE",
      icon: "compose",
      iconColor: "#777",
      iconPath: "../../static/icon/baoxius.png",
      url: "subcontract/asset/repair/request/repairRequestList",
      show: true
    },
    {
      code: "",
      name: "\u626B\u7801\u501F\u7528",
      icon: "redo-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/jieyongs.png",
      url: "subcontract/asset/borrowReturn/quickBorrow/quickBorrow",
      show: true
    },
    {
      code: "",
      name: "\u626B\u7801\u5F52\u8FD8",
      icon: "undo-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/return.png",
      url: "subcontract/asset/borrowReturn/quickReturn/quickReturn",
      show: true
    },
    {
      code: "Employee/InventoryEmployeeTask",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/pandian.png",
      url: "subcontract/asset/inventory/employee/list",
      show: true
    },
    {
      code: "",
      name: "\u626B\u7801\u7B7E\u5B57\u786E\u8BA4",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/qianming.png",
      url: "pages/system/signConfirm/signConfirm",
      show: true
    },
    {
      code: "",
      name: "\u8D44\u4EA7\u9000\u5E93\u7533\u8BF7",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/tuiku.png",
      url: "subcontract/asset/drawBack/drawBackDetail",
      show: true
    },
    {
      code: "Employee/Asset/Transform",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/zhuanyi.png",
      url: "subcontract/asset/transform/detail",
      show: true
    }
  ];
  const assetMenus = [
    {
      code: "Asset/List",
      name: "",
      icon: "list",
      iconPath: "../../static/icon/list.png",
      iconColor: "#777",
      url: "subcontract/asset/assetList/list",
      show: false
    },
    {
      code: "",
      name: "\u626B\u7801\u67E5\u8D44\u4EA7",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/sys.png",
      url: "subcontract/asset/assetInfo/scanCode",
      show: false
    },
    {
      code: "Asset/Bill/Draw",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/lingyong.png",
      url: "subcontract/asset/draw/drawDetail",
      show: false
    },
    {
      code: "Asset/Repair/Result",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/weixiu.png",
      url: "subcontract/asset/repair/result/detail",
      show: false
    },
    {
      code: "Asset/Bill/RequestDiscard",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/baofei.png",
      url: "subcontract/asset/requestDiscard/detail",
      show: false
    },
    {
      code: "Asset/Bill/Discard",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/chuzhi.png",
      url: "subcontract/asset/discard/detail",
      show: false
    },
    {
      code: "Asset/Inventory",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/pandian.png",
      url: "subcontract/asset/inventory/manageUser/list",
      show: false
    }
  ];
  const consumableMenus = [
    {
      code: "Consumable/Stock",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/kucunmingxi.png",
      url: "subcontract/consumable/stock/condition",
      show: false
    },
    {
      code: "Consumable/Bill/Inwarehouse",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/ruku.png",
      url: "subcontract/consumable/inwarehouse/detail/detail",
      show: false
    },
    {
      code: "Consumable/Bill/Outwarehouse",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/chuku.png",
      url: "subcontract/consumable/outwarehouse/detail/detail",
      show: false
    },
    {
      code: "Consumable/Bill/Allocate",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/diaobo.png",
      url: "subcontract/consumable/allocate/detail/detail",
      show: false
    },
    {
      code: "Consumable/Bill/Discard",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/baofei.png",
      url: "subcontract/consumable/discard/detail/detail",
      show: false
    },
    {
      code: "Consumable/Inventory",
      name: "",
      icon: "settings-filled",
      iconColor: "#777",
      iconPath: "../../static/icon/pandian.png",
      url: "subcontract/consumable/inventory/list",
      show: false
    }
  ];
  return { commonMenus, assetMenus, consumableMenus };
}
exports.setMenus = setMenus;
