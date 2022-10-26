import { awaitDelay } from "../../share/util/index";
import { getCurrentPage } from "../../share/util/page";
/**
 * 菜单配置规则如下：
 * 1、code有值代表需要从后端中获取菜单名称
 * 2、name有值代表要使用自定义name（则不会加载后端菜单名称）
 * 3、员工账户的菜单是不能权限过滤的，切记不要配置成需要权限过滤的菜单（有一种简单的辨识方法就是"Employee/"开头的就是不要权限过滤）
 */


function setMenus(){
    const commonMenus = [
        {
            code: "Employee/WaitingApproval",
            name: "",//我的待办
            icon: "calendar-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/clock.png",
            url: "subcontract/mine/todo/todo",
            show: true,
        },
        {
            code: "Employee/ApprovalHistory",
            name: "",//已办事宜
            icon: "person-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/alldo.png",
            url: "subcontract/mine/done/done",
            show: true,
        },
        {   
            code: "Employee/MyAsset",
            name: "",//我的资产
            icon: "person-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/mxzc.png",
            url: "subcontract/asset/myAssetList/list",
            show: true,
        },
        {
            code: "Employee/Asset/RequestDraw",
            name: "",//资产申领
            icon: "undo",
            iconColor: "#777",
            iconPath: "../../static/icon/shenling.png",
            url: "subcontract/asset/requestDraw/requestDraw",
            show: true,
        },
        {
            code: "Employee/Consumable/RequestDraw",
            name: "",//易耗品申领
            icon: "undo",
            iconColor: "#777",
            iconPath: "../../static/icon/shenling.png",
            url: "subcontract/consumable/requestDraw/requestDraw",
            show: true,
        },
        {
            code: "",
            name: "扫码报修",
            icon: "compose",
            iconColor: "#777",
            iconPath: "../../static/icon/baoxius.png",
            url: "subcontract/asset/repair/request/repairRequestList",
            show: true,
        },
        // {
        //   name: "可借用资产",
        //   icon: "wallet-filled",
        //   iconColor: "#777",
        //   iconPath: "../../static/icon/can_borrow.png",
        //   url: "subcontract/asset/borrowReturn/canBorrow/list",
        // },
        {
            code: "",
            name: "扫码借用",
            icon: "redo-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/jieyongs.png",
            url: "subcontract/asset/borrowReturn/quickBorrow/quickBorrow",
            show: true,
        },
        {
            code: "",
            name: "扫码归还",
            icon: "undo-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/return.png",
            url: "subcontract/asset/borrowReturn/quickReturn/quickReturn",
            show: true,
        },
        {
            code: "Employee/InventoryEmployeeTask",
            name: "",//员工自助盘点
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/pandian.png",
            url: "subcontract/asset/inventory/employee/list",
            show: true,
        },
        {
            code: "",
            name: "扫码签字确认",
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/qianming.png",
            url: "pages/system/signConfirm/signConfirm",
            show: true,
        },
        {
            code: "",
            name: "资产退库申请",
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/tuiku.png",
            url: "subcontract/asset/drawBack/drawBackDetail",
            show: true,
        },
        {
            code: "Employee/Asset/Transform",
            name: "",//资产转移申请
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/zhuanyi.png",
            url: "subcontract/asset/transform/detail",
            show: true,
        },
    ];
    
    
    const assetMenus = [
        {
            code: "Asset/List",
            name: "",//资产列表
            icon: "list",
            iconPath: "../../static/icon/list.png",
            iconColor: "#777",
            url: "subcontract/asset/assetList/list",
            show: false,
        },
        {
            code: "",
            name: "扫码查资产",
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/sys.png",
            url: "subcontract/asset/assetInfo/scanCode",
            show: false,
        },
        {
            code: "Asset/Bill/Draw",
            name: "",//发放单
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/lingyong.png",
            url: "subcontract/asset/draw/drawDetail",
            show: false,
        },
        {
            code: "Asset/Repair/Result",
            name: "",//维修结果
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/weixiu.png",
            url: "subcontract/asset/repair/result/detail",
            show: false,
        },
        {
            code: "Asset/Bill/RequestDiscard",
            name: "",//资产报废
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/baofei.png",
            url: "subcontract/asset/requestDiscard/detail",
            show: false,
        },
        {
            code: "Asset/Bill/Discard",
            name: "",//资产处置
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/chuzhi.png",
            url: "subcontract/asset/discard/detail",
            show: false,
        },
        {
            code: "Asset/Inventory",
            name: "",//资产盘点
            icon: "settings-filled",
            iconColor: "#777",
            iconPath: "../../static/icon/pandian.png",
            url: "subcontract/asset/inventory/manageUser/list",
            show: false,
        },
    ];
    
    const consumableMenus =[
            {
                code: "Consumable/Stock",
                name: "",//库存明细
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/kucunmingxi.png",
                url: "subcontract/consumable/stock/condition",
                show: false,
            },
            {
                code: "Consumable/Bill/Inwarehouse",
                name: "",//易耗品入库
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/ruku.png",
                url: "subcontract/consumable/inwarehouse/detail/detail",
                show: false,
            },
            {
                code: "Consumable/Bill/Outwarehouse",
                name: "",//易耗品出库
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/chuku.png",
                url: "subcontract/consumable/outwarehouse/detail/detail",
                show: false,
            },
            {
                code: "Consumable/Bill/Allocate",
                name: "",//易耗品调拨
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/diaobo.png",
                url: "subcontract/consumable/allocate/detail/detail",
                show: false,
            },
            {
                code: "Consumable/Bill/Discard",
                name: "",//易耗品报废
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/baofei.png",
                url: "subcontract/consumable/discard/detail/detail",
                show: false,
            },
            {
                code: "Consumable/Inventory",
                name: "",//易耗品盘点
                icon: "settings-filled",
                iconColor: "#777",
                iconPath: "../../static/icon/pandian.png",
                url: "subcontract/consumable/inventory/list",
                show: false,
            },
        ];
    return { commonMenus, assetMenus, consumableMenus }
}

export { setMenus };


function _setNavigationTitle(route) {
    const { commonMenus, assetMenus, consumableMenus } = setMenus();
    for (const commonMenu of commonMenus) {
        if (commonMenu.url === route) {
            uni.setNavigationBarTitle({
                title: commonMenu.name,
            });
            return;
        }
    }
    for (const assetMenu of assetMenus) {
        if (assetMenu.url === route) {
            uni.setNavigationBarTitle({
                title: assetMenu.name,
            });
            return;
        }
    }
    for (const consumableMenu of consumableMenus) {
        if (consumableMenu.url === route) {
            uni.setNavigationBarTitle({
                title: consumableMenu.name,
            });
            return;
        }
    }
    return false;
}

export function setNavigationTitle() {
    const res = _setNavigationTitle(getCurrentPage().route)
    if (res === false) {
        //失败了重试一次
        awaitDelay(50).then(() => {
            _setNavigationTitle(getCurrentPage().route);
        });
    }
}