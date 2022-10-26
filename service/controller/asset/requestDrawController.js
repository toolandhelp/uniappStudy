import AssetControllerBase from "../controllerBase/assetControllerBase";
class RequestDrawController extends AssetControllerBase {
	constructor(){
		super("RequestDraw");
	}
     /**
      * 根据资产id获取资产数据
      * @param {number} id 单据ID 
      * @returns 
      */
    requestDrawGetByID(id) {
         return this.request("/Bill/RequestDraw/GetByID", { "ID": id});
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    requestDrawSaveDraft(obj){
          return this.request("/Bill/RequestDraw/SaveDraft",obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    requestDrawDelete(id){
        return this.request("/Bill/RequestDraw/Delete",{"ID": id});
    }
      /**
      * 获取资产列表
      * @param {string} qst  
      * @param {number} pageNo  
      * @returns 
      */
      requestDrawList({
        qst, 
        pageNo,
        pageSize,
        billCode,
        requestDrawEmployeeName,
        startRequestDrawDate,
        endRequestDrawDate,
        goodsCode,
        goodsName,
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
            BillCode:billCode,
            RequestDrawEmployeeName:requestDrawEmployeeName,
            StartRequestDrawDate:startRequestDrawDate,
            EndRequestDrawDate:endRequestDrawDate,
            GoodsCode:goodsCode,
            GoodsName:goodsName,
            AssetCategoryIDs:assetCategoryIDs,
            Brand:brand,
            Spec:spec,
            Model:model,
            IsClosed:IsClosed,
            PageNO: pageNo,
            PageSize: pageSize?pageSize:20,
            QST: qst,
        };
        return this.request("/Bill/RequestDraw/List", data);
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
     goodsList(keyWorld) {
        return this.request("/BasicData/Goods/List", { "PageEnable": 2, "QST": keyWorld,"PageNO": 1,"PageSize": 10,"AssetCategoryIDs":null });
    }
 }
 export default  new RequestDrawController()