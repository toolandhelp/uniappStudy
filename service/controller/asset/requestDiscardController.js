import AssetControllerBase from "../controllerBase/assetControllerBase";
class RequestDrawController extends AssetControllerBase {
     /**
      * 根据资产id获取资产数据
      * @param {number} id 单据ID 
      * @returns 
      */
    requestDiscardGetByID(id) {
         return this.request("/Bill/RequestDiscard/GetByID", { "ID": id});
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    requestDiscardSaveDraft(obj){
          return this.request("/Bill/RequestDiscard/SaveDraft",obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    requestDiscardDelete(id){
        return this.request("/Bill/RequestDiscard/Delete",{"ID": id});
    }
      /**
      * 获取资产列表
      * @param {string} qst  
      * @param {number} pageNo  
      * @returns 
      */
      requestDiscardList({
        qst, 
        pageNo,
        pageSize,
        billCode,
        requestDiscardAssetEmployeeIDs,
        requestDiscardBeginDate,
        requestDiscardEndDate,
        discardReasonIDs
    }) {
        const data = {
            IsSetNumber: true,
            ShowMode: 0,
            Sort: 1,
            BillCode:billCode,
            RequestDrawEmployeeName:requestDiscardAssetEmployeeIDs,
            RequestDiscardBeginDate:requestDiscardBeginDate,
            RequestDiscardEndDate:requestDiscardEndDate,
            DiscardReasonIDs:discardReasonIDs,
            PageNO: pageNo,
            PageSize: pageSize?pageSize:20,
            QST: qst,
        };
        return this.request("/Bill/RequestDiscard/List", data);
    }

    /**
     * 根据资产id获取资产数据
     * @param {number} id 资产id 
     * @returns 
     */
    getById(id) {
        return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
    }
    /**
     * 根据编码/名称获取资产数据
     * @param {number} id 资产id 
     * @returns 
     */
     assetListQueryByBillType(keyWorld) {
         const data = {
            BillType: 6,
            Conditions: [],
            PageNO: 1,
            PageSize: 10,
            QST: keyWorld,
         }
        return this.request("/Asset/List/QueryByBillType", data);
    }
 }
 export default  new RequestDrawController()