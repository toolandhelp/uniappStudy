import AssetControllerBase from "../controllerBase/assetControllerBase";

class InventoryController extends AssetControllerBase {

    /**
     * 员工自助盘点列表
     * @param {*} qst 快速检索文本，模糊匹配盘点单号和盘点主题
     * @returns 
     */
    employeeList(qst) {
        return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/ListByEmployee", {
            "PageNO": 1,
            "PageSize": 10,
            "QST": qst,
            "Type": "phone"
        });
    }

    /**
     * 盘点列表（不含员工自助盘点）
     * @param {*} qst 快速检索文本，模糊匹配盘点单号和盘点主题
     * @returns 
     */
    manageUserList(qst) {
        return this.request("/Inventory/List", {
            "QST": qst,
            "Title":qst,
            "PageSize": 999,
            "PageNO": 1,
            "Type": "phone"
        });
    }

    /**
     * 获取员工自助盘点的盘点详细数据
     * @param {*} id 盘点任务ID
     * @returns 
     */
    detailByEmployee(id) {
        return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/DetailByEmployee", id);
    }

    /**
     * 提交员工自助盘点任务
     * @param {*} taskID 任务ID
     * @param {*} employeeTaskID 员工任务ID
     * @param {*} assets 盘点的资产集合
     * @returns 
     */
    submitEmployeeTask(taskID, employeeTaskID, assets) {
        return this.request("/Inventory/EmployeeTask/Mine/WaitingProcess/SubmitByEmployee", { TaskID: taskID, EmployeeTaskID: employeeTaskID, Assets: assets });
    }

    /**
     * 盘点明细（不含员工自助盘点）
     * @param {*} id 盘点任务ID
     * @param {*} summary 列表类型 待盘/已盘/盘盈
     * @param {*} sort 排序
     * @returns 
     */
     inventoryCorpTaskDetail(data,taskType) {
         let url = "/Inventory/CorpTask/Detail"
        if(taskType == '1'){
            url = '/Inventory/CorpTask/Detail'//公司
        }
        if(taskType == '2'){
            url = '/Inventory/EmployeeTask/Detail'//员工自助
            data.EmployeeSummary = ''
        }
        if(taskType == '3'){
            url = '/Inventory/GroupTask/Detail'//集团
            data.ShowMode = 2
        }
        if(taskType == '4'){
            url = '/Inventory/SpotInventory/Detail'//抽盘
        }
        return this.request(url, data);
    }
    /**
     * 盘点明细（不含员工自助盘点）
     * @param {Int} id 盘点任务ID
     * @param {String} code 检索条件
     * @returns 
     */
     inventoryGetAssetByCode(id,code) {
        const data = {
            TaskId: id,
            PageNO: 1,
            PageSize: 10,
            Code: code,
        }
        return this.request("/Inventory/GetAssetByCode", data);
    }
    /**
     * 盘点提交（不含员工自助盘点）
     * @param {Number} assetId 资产id
     * @param {Array} imgs 上传图片
     * @param {Number} id ID
     * @param {Number} qty 盘点数量
     * @param {String} remark 盘点说明
     * @param {String} desc 盘点确认说明
     * @param {String} stockStatus 实盘情况
     * @param {Number} taskId 任务id
     * @returns 
     */
     pDAInventorySubmitCheckAsset(assetId,imgs,id,qty,remark,desc,stockStatus,taskId) {
        const data = {
            SubmitTaskAssetDTO:{
                AssetId: assetId,
                AssetPics: imgs,
                Id: id,
                LocationCode: "",
                Qty: qty,
                Remark: remark,
                StockCheckConfirmDesc: desc,
                StockStatus: stockStatus,
                TaskId: taskId,
                UAOCode: "",
            }
        }
        return this.request("/PDA/Inventory/SubmitCheckAsset", data);
    }
    /**
     * 盘点提交（不含员工自助盘点）
     * @param {Array} imgs 上传图片
     * @param {Number} corpId corpId
     * @param {Number} id ID
     * @param {Number} qty 盘点数量
     * @param {String} remark 盘点说明
     * @param {String} desc 盘点确认说明
     * @param {String} stockStatus 实盘情况
     * @param {Number} taskId 任务id
     * @returns 
     */
     pDAInventoryAssetRegister(imgs,corpId,taskId,name,code,originalCode,brand,spec,model,qty,desc) {
        const data = {
            AssetPictures:imgs,
            InventoryTaskAsset: {   
                CorpID:corpId,
                AssetId: null,
                TaskId:taskId,
                OriginalCode:originalCode,
                Name:name,
                Code:code,
                Brand:brand,
                Spec:spec,
                Model:model,
                Qty:qty,
                ActualQty:qty,
                StockCheckStatus: 5,
                StockCheckDesc:desc,
            },
        }
        return this.request("/PDA/Inventory/AssetRegister", data);
    }
}

export default new InventoryController();