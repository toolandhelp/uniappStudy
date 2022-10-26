import AssetControllerBase from "../controllerBase/assetControllerBase";
class ApprovalProcess extends AssetControllerBase {
    /**
      * 启动审批流
      * @param {string} obj 
      * @returns 
      */
     preStartFlow(billType,id){
        const url = `/Bill/${billType}/PreStartFlow`;
        return this.request(url,{"ID": id});
    }
    /**
      * 启动审批流
      * @param {string} obj 
      * @returns 
      */
     startFlow(billType,obj){
        const url = `/Bill/${billType}/StartFlow`;
        return this.request(url,obj);
    }
    /**
      * 根据资产id启动审批弹框
      * @param {number} id 单据ID 
      * @returns 
      */
     prevApproval(billType,id){
        const url = `/Bill/${billType}/PrevApproval`;
        return this.request(url,{"ID": id});
    }
    /**
      * 审批确定
      * @param {string} obj 
      * @returns 
      */
     submitApproval(billType,obj){
        const url = `/Bill/${billType}/SubmitApproval`;
        return this.request(url,obj);
    }
    /**
     * 流程轨迹
     * @param {number} id 资产id 
     * @returns 
     */
     getFlowTrail(billType,id) {
        const url = `/Bill/${billType}/GetFlowTrail`;
        return this.request(url,{"ID": id});
    }
}
export default  new ApprovalProcess()