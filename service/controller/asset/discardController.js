import AssetControllerBase from "../controllerBase/assetControllerBase";
class RequestDrawController extends AssetControllerBase {
     /**
      * 根据资产id获取资产数据
      * @param {number} id 单据ID 
      * @returns 
      */
    discardGetByID(id) {
         return this.request("/Bill/Discard/GetByID", { "ID": id});
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    discardSaveDraft(obj){
          return this.request("/Bill/Discard/SaveDraft",obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    discardDelete(id){
        return this.request("/Bill/Discard/Delete",{"ID": id});
    }
      /**
      * 获取资产列表
      * @param {string} qst  
      * @param {number} pageNo  
      * @returns 
      */
      discardList({
        qst, 
        pageNo,
        pageSize,
        billCode,
        handlerEmployeeIDs,
        discardBeginDate,
        discardEndDate,
        discardModeIDs
    }) {
        const data = {
            IsSetNumber: true,
            ShowMode: 0,
            Sort: 1,
            BillCode:billCode,
            HandlerEmployeeIDs:handlerEmployeeIDs,
            DiscardBeginDate:discardBeginDate,
            DiscardEndDate:discardEndDate,
            DiscardModeIDs:discardModeIDs,
            PageNO: pageNo,
            PageSize: pageSize?pageSize:20,
            QST: qst,
        };
        return this.request("/Bill/Discard/List", data);
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
            BillType: 7,
            Conditions: [],
            PageNO: 1,
            PageSize: 10,
            QST: keyWorld,
         }
        return this.request("/Asset/List/QueryByBillType", data);
    }
 }
 export default  new RequestDrawController()