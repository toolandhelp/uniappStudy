import SystemControllerBase from "../controllerBase/systemControllerBase";

class MineController extends SystemControllerBase{
    /**
      * 修改密码
      * @param {string} obj 新密码数据
      * @returns 
      */
    modifyPassword(obj){
        return this.request("/User/ModifyPassword",obj);
    }

    /**
     * 获取打印模板
     * @param {number} type 标签类型
     * @returns 
     */
    getWithinLimitsByType(type){
      return this.request("/LabelPrint/GetWithinLimitsByType",{"Type": type});
    }
}

export default new MineController();