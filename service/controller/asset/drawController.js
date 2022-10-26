import AssetControllerBase from "../controllerBase/assetControllerBase";
class DrawController extends AssetControllerBase {
     /**
      * 根据资产id获取资产数据
      * @param {number} id 单据ID 
      * @returns 
      */
    drawGetByID(id) {
         return this.request("/Bill/Draw/GetByID", { "ID": id});
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    drawSaveDraft(obj){
        return this.request("/Bill/Draw/SaveDraft",obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    drawDelete(id){
        return this.request("/Bill/Draw/Delete",{"ID": id});
    }
      /**
      * 获取资产列表
      * @param {string} qst  
      * @param {number} pageNo  
      * @returns 
      */
      drawList({
        qst,
        pageNo,
        billCode,
        drawEndDate,
        drawBeginDate,
        drawAssetOrgIDs,
        drawAssetEmployeeIDs,
        assetCode,
        assetName,
        assetCategory,
        brand,
        spec,
        model
        }) {
        const data = {
            ShowMode: 0,
            Sort: 1,
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
            BillCode:billCode,
            DrawBeginDate:drawBeginDate,
            DrawEndDate:drawEndDate,
            DrawAssetOrgIDs:drawAssetOrgIDs,
            DrawAssetEmployeeIDs:drawAssetEmployeeIDs,
            AssetCode:assetCode,
            AssetName:assetName,
            AssetCategoryIDs:assetCategory,
            Brand:brand,
            Spec:spec,
            Model:model,


        };
        return this.request("/Bill/Draw/List", data);
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
    * 扫码检索资产数据
    * @param {string} qst 检索条件 
    * @returns 
    */
     assetListQueryByBillType(qst) {
        const data = {
            QST:qst,
            PageSize:10,
            PageNo:1,
            BillType: 1,
        }
        return this.request("/Asset/List/QueryByBillType", data);
    }
 }
 export default  new DrawController()