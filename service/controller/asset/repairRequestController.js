import AssetControllerBase from "../controllerBase/assetControllerBase";

class RepairRequestController extends AssetControllerBase {

    // /**
    //  * 报维修记录
    //  */
    // list(data) {
    //     return this.request("/Bill/Repair/List", data);
    // }

    /**
     * 根据资产id获取资产数据
     * @param {number} id 资产id 
     * @returns 
     */
     assetGetByID(id) {
        return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
   }
   /**
   * 报修申请提交
   * @param {number} id 资产id
   * @param {string} reason 报修原因
   * @returns 
   */
    requestRepairSubmit(id,reason,files) {
        const obj = {
             AssetId:id,
             AssetPics: files,
             RequestReason:reason
        }
        return this.request("/Bill/RequestRepair/Submit",obj);
   }
   /**
     * 报修列表
     */
    repairList(qst, pageNo) {
        const data = {
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
        };
        return this.request("/Bill/Repair/List", data);
    }

    /**
     * 根据资产编码获取资产数据
     * @param {string} code 资产code 
     * @returns 
     */
     assetListQueryByBillType(code) {
         const data = {
            BillType: 8,
            Conditions: [],
            PageNO: 1,
            PageSize: 5,
            QST: code,
         }
        return this.request("/Asset/List/QueryByBillType", data);
    }
}

export default new RepairRequestController();