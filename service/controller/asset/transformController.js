import AssetControllerBase from "../controllerBase/assetControllerBase";
class DrawController extends AssetControllerBase {
    /**
     * 根据资产id获取资产数据
     * @param {number} id 单据ID 
     * @returns 
     */
    transformGetByID(id) {
        return this.request("/Bill/Transform/GetByID", { "ID": id });
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    transformSaveDraft(obj) {
        return this.request("/Bill/Transform/SaveDraft", obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    transformDelete(id) {
        return this.request("/Bill/Transform/Delete", { "BillID": id });
    }
    /**
     * 根据资产id启动审批流弹框
     * @param {number} id 单据ID
     * @returns 
     */
    transformPreStartFlow(id) {
        return this.request("/Bill/Transform/PreStartFlow", { "ID": id });
    }
    /**
    * 启动审批流
    * @param {string} obj 
    * @returns 
    */
    transformStartFlow(obj) {
        return this.request("/Bill/Transform/StartFlow", obj);
    }
    /**
     * 流程轨迹
     * @param {number} id 资产id 
     * @returns 
     */
     requestDrawGetFlowTrail(id) {
        return this.request("/Bill/Transform/GetFlowTrail", { "ID":id });
    }
    /**
    * 根据资产id启动审批弹框
    * @param {number} id 单据ID 
    * @returns 
    */
    transformPrevApproval(id) {
        return this.request("/Bill/Transform/PrevApproval", { "ID": id });
    }
    /**
    * 审批确定
    * @param {string} obj 
    * @returns 
    */
    transformSubmitApproval(obj) {
        return this.request("/Bill/Transform/SubmitApproval", obj);
    }
    /**
    * 获取列表
    * @param {string} qst  
    * @param {number} pageNo  
    * @returns 
    */
    transformList({
        qst,
        pageNo,
        billCode,
        transformDateStart,
        transformDateEnd,
        transformReason,
        originalUAO,
        originalUAE,
        originalKAO,
        originalKAE,
        originalLocation,
        transferToUAO,
        transferToUAE,
        transferToKAO,
        transferToKAE,
        transferToLocation,
        }) {
        const data = {
            IsSetNumber: true,
            ShowMode: 0,
            Sort: 1,
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
            BillCode:billCode,
            TransformBeginDate:transformDateStart,
            TransformEndDate:transformDateEnd,
            TransferReasonIDs:transformReason,
            OriginalUAOIDs:originalUAO,
            OriginalUAEIDs:originalUAE,
            OriginalKAOIDs:originalKAO,
            OriginalKAEIDs:originalKAE,
            OriginalLocationIDs:originalLocation,
            NewUAOIDs:transferToUAO,
            NewUAEIDs:transferToUAE,
            NewKAOIDs:transferToKAO,
            NewKAEIDs:transferToKAE,
            NewLocationIDs:transferToLocation,
        };
        return this.request("/Bill/Transform/List", data);
    }
    /**
    * 扫码检索资产数据
    * @param {string} qst 检索条件 
    * @returns 
    */
     assetListQueryByBillType(qst) {
        const data = {
            QST:qst,
            PageSize:10,
            PageNo:1,
            BillType: 3,
        }
        return this.request("/Asset/List/QueryByBillType", data);
    }
}
export default new DrawController();