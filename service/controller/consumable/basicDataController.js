import ConsumableControllerBase from "../controllerBase/consumableControllerBase";

class BasicDataController extends ConsumableControllerBase {

    /**
     * 获取树结构的易耗品仓库数据
     * @param {*} isPower 是否需要权限过滤
     * @returns 易耗品仓库数据
     */
    getWarehouseTree(isPower = true, disableOrg = false) {
        const _d = { "IsEnableDataPermission": isPower, "IsDisableOrgSelect": disableOrg };
        return this.request("/BasicData/Warehouse/GetTree", _d);
    }

    /**
     * 获取易耗品分类树
     * @returns 易耗品分类树
     */
    getCategoryTree() {
        const _d = { "IsLazyLoad": false, "ParentId": null };
        return this.request("/BasicData/Category/GetTree", _d);
    }
	getConsumable(obj) {
	    return this.request("/BasicData/Consumable/Selector/Query", obj);
	}

}

export default new BasicDataController();