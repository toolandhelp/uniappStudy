import ConsumableControllerBase from "../controllerBase/consumableControllerBase";

class RequestDrawController extends ConsumableControllerBase {

    /**
     * 易耗品申领单列表
     * @param {any} data 
     */
     requestDrawList({
        qst, 
        pageNo,
        billCode,
        startRequestDrawDate,
        endRequestDrawDate,
        consumableCode,
        consumableName,
        assetCategoryIDs,
        brand,
        spec,
        model,
        IsClosed
    }) {
        const data = {
            IsSetNumber: true,
            ShowMode: 0,
            Sort: 1,
            QST: qst,
            PageNO: pageNo,
            BillCode:billCode,
            StartRequestDrawDate:startRequestDrawDate,
            EndRequestDrawDate:endRequestDrawDate,
            ConsumableCode:consumableCode,
            ConsumableName:consumableName,
            CategoryIDs:assetCategoryIDs,
            Brand:brand,
            Spec:spec,
            Model:model,
            IsClosed:IsClosed,
            PageSize: 20,
        };
        return this.request("/Bill/RequestDraw/List", data);
    }
    /**
     * 根据编码/名称获取易耗品数据
     * @param {number} id 易耗品id 
     * @returns 
     */
     consumableFuzzyQuery(keyWorld) {
        return this.request("/BasicData/Consumable/FuzzyQuery", {"QST": keyWorld });
    }
    /**
      * 保存提交
      * @param {string} obj 易耗品数据
      * @returns 
      */
     requestDrawSaveDraft(obj){
        return this.request("/Bill/RequestDraw/SaveDraft",obj);
    }
    /**
      * 根据易耗品id获取易耗品数据
      * @param {number} id 单据ID 
      * @returns 
      */
     requestDrawGetByID(id) {
        return this.request("/Bill/RequestDraw/GetByID", { "ID": id});
    }
    /**
      * 根据易耗品id删除易耗品数据
      * @param {number} id 单据ID
      * @returns 
      */
     requestDrawDelete(id){
        return this.request("/Bill/RequestDraw/Delete",{"ID": id});
    }
     /**
      * 根据易耗品id启动审批流弹框
      * @param {number} id 单据ID
      * @returns 
      */
      requestDrawPreStartFlow(id){
          return this.request("/Bill/RequestDraw/PreStartFlow",{"ID": id});
      }
      /**
      * 启动审批流
      * @param {string} obj 
      * @returns 
      */
      requestDrawStartFlow(obj){
          return this.request("/Bill/RequestDraw/StartFlow",obj);
      }
      /**
      * 根据易耗品id启动审批弹框
      * @param {number} id 单据ID 
      * @returns 
      */
      requestDrawPrevApproval(id){
          return this.request("/Bill/RequestDraw/PrevApproval",{"ID": id});
      }
      /**
      * 审批确定
      * @param {string} obj 
      * @returns 
      */
      requestDrawSubmitApproval(obj){
          return this.request("/Bill/RequestDraw/SubmitApproval",obj);
      }
      /**
      * 流程轨迹
      * @param {number} id 易耗品id 
      * @returns 
      */
      requestDrawGetFlowTrail(id) {
        return this.request("/Bill/RequestDraw/GetFlowTrail", { "ID":id });
      }
	  
	  getStockList(obj) {
	    return this.request("/Stock/List", obj);
	  }
	  
	  

}

export default new RequestDrawController();