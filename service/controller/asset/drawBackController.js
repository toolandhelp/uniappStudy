import AssetControllerBase from "../controllerBase/assetControllerBase";
class DrawController extends AssetControllerBase {
    /**
     * 根据资产id获取资产数据
     * @param {number} id 单据ID 
     * @returns 
     */
    drawBackGetByID(id) {
        return this.request("/Bill/DrawBack/GetByID", { "ID": id });
    }
    /**
      * 根据资产数据保存资产数据
      * @param {string} obj 资产数据
      * @returns 
      */
    drawBackSaveDraft(obj) {
        return this.request("/Bill/DrawBack/SaveDraft", obj);
    }
    /**
      * 根据资产id删除资产数据
      * @param {number} id 单据ID
      * @returns 
      */
    drawBackDelete(id) {
        return this.request("/Bill/DrawBack/Delete", { "ID": id });
    }
    /**
    * 获取列表
    * @param {string} qst  
    * @param {number} pageNo  
    * @returns 
    */
    drawBackList({qst, pageNo,billCode,drawBackBeginDate,drawBackEndDate}) {
        const data = {
            IsSetNumber: true,
            ShowMode: 0,
            Sort: 1,
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
            BillCode:billCode,
            DrawBackBeginDate:drawBackBeginDate,
            DrawBackEndDate:drawBackEndDate,
        };
        return this.request("/Bill/DrawBack/List", data);
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
            BillType: 2,
        }
        return this.request("/Asset/List/QueryByBillType", data);
    }
}
export default new DrawController();