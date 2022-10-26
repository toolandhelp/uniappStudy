import AssetControllerBase from "../controllerBase/assetControllerBase";

class RepairResultController extends AssetControllerBase {
    /**
     * 根据资产id获取资产数据
     * @param {number} id 资产id 
     * @returns 
     */
     assetListQueryByBillType(qst) {
         const data = {
            BillType: 9,
            PageNO: 1,
            PageSize: 5,
            QST: qst,
         }
        return this.request("/Asset/List/QueryByBillType", data);
   }
   
   submitRepairInfo(data){
	   return this.request('/Bill/Repair/Submit',data);
	   
   }
   submitFalutTypeInfo(data){
   	   return this.request('/Asset/FaultType/Add',data);
   	   
   }
   getFalutTypeListByCategoryID(data){
	   return this.request('/Asset/FaultType/ListByCategoryID',data);
   }
    
}

export default new RepairResultController();