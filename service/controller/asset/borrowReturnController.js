import AssetControllerBase from "../controllerBase/assetControllerBase";

class BorrowReturnController extends AssetControllerBase {

    /**
     * 根据编码获取借用列表
     * @param {*} code 资产编码
     * @returns 
     */
    borrowListByCode(code) {
        const data = { "BillType": 4, "PageSize": 5, "PageNO": 1, "QST": code, "Conditions": [] };
        return this.request("/Asset/List/QueryByBillType", data);
    }

    /**
     * 获取可借用列表
     * @param {*} qst 搜索条件：编码/原编码/名称
     * @param {*} pageNo 当前页码
     * @returns 
     */
    borrowList(qst, pageNo) {
        const data = { "BillType": 4, "PageSize": 20, "PageNO": pageNo, "QST": qst, "Conditions": [] };
        return this.request("/Asset/List/QueryByBillType", data);
    }

    /**
     * 归还资产提交
     * @param {number} assetId 资产id
     * @param {number} employeeId 借用人员id
     * @returns 
     */
    returnQuickly(assetId, employeeId) {
        const data = {
            AssetID: assetId,
            BorrowerEmployeeID: employeeId,
        }
        return this.request("/Bill/Return/Quickly", data);
    }

    /**
     * 根据资产编码获取资产数据
     * @param {string} code 资产code 
     * @returns 
     */
    returnList(code) {
        const data = {
            BillType: 5,
            Conditions: [],
            PageNO: 1,
            PageSize: 5,
            QST: code,
        }
        return this.request("/Asset/List/QueryByBillType", data);
    }

    /**
     * 借用资产提交
     * @param {number} assetId 资产id
     * @param {number} employeeId 借用人员id
     * @param {string} returnDate 归还日期
     * @returns 
     */
    borrowQuickly(assetId, employeeId, returnDate) {
        const data = {
            AssetID: assetId,
            BorrowerEmployeeID: employeeId,
            PlanedReturnDate: returnDate,
        }
        return this.request("/Bill/Borrow/Quickly", data);
    }
}

export default new BorrowReturnController();