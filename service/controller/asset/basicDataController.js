import AssetControllerBase from "../controllerBase/assetControllerBase";

class BasicDataController extends AssetControllerBase {

    /**
     * 获取树结构的存放位置数据
     * @param {*} parentId 上级id
     * @param {*} isPower 是否需要权限过滤
     * @returns 存放位置数据
     */
    getLocationTree(isPower = true, parentId = null) {
        const _d = { "ParentId": parentId, "Delay": false, "OnlyLoadPrivilegeLocation": isPower };
        return this.request("/BasicData/Location/GetTree", _d);
    }

    /**
     * 获取资产分类树
     * @param {bool} isPower 是否权限过滤
     * @returns 资产分类树
     */
    getAssetCategoryTree(isPower = true) {
        const _d = { "ParentId": null, "Delay": true, "OnlyLoadPrivilegeLocation": isPower };
        return this.request("/BasicData/Location/GetTree", _d);
    }

    /**
     * 或者供应商分类树
     * @param {bool} isPower 是否权限过滤
     * @returns 
     */
    getSupplierCategory(isPower = true) {
        const _d = { "ParentId": null, "Delay": false, "OnlyLoadPrivilegeLocation": isPower };
        return this.request("/BasicData/SupplierCategory/GetTree", _d);
    }

    /**
     * 获取供应商列表
     */
    getSupplierList(qst, qse) {
        const _d = { "QST": qst, "QSE": qse, "PageSize": 30, "PageNO": 1, "IsSetNumber": false };
        return this.request("/BasicData/Supplier/List", _d);
    }

}

export default new BasicDataController();