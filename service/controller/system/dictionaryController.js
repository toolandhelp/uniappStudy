import SystemControllerBase from "../controllerBase/systemControllerBase";
class DictionaryController extends SystemControllerBase {
     /**
    * 根据字典编码获取字典项
    * @param {number} key 编码
    * @returns 
    */
     dictionaryGetByCode(key) {
          return this.request("/Dictionary/GetByCode", key);
     }
}
export default new DictionaryController();