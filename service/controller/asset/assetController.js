import AssetControllerBase from "../controllerBase/assetControllerBase";
import fileTypeEnum from "../../enumeration/fileTypeEnum";

class AssetController extends AssetControllerBase {

    constructor() {
        super("asset")
    }

    /**
     * 我的资产
     */
    myAssetList(qst, pageNo) {
        const data = {
            DutyType: "0",
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
        };
        return this.request("/Asset/My/List", data);
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
     * 上传图片
     */
    async uploadImage(filePaths) {
        const res = [];
        for (const filePath of filePaths) {
            const { UploadedFileInfo } = await this.upload("/Asset/UploadImage", fileTypeEnum.image, filePath);
            res.push(UploadedFileInfo[0]);

        }
        return res;
    }

    /**
     * 上传文件（一般用于附件上传）
     */
    async uploadAttachment(filePaths) {
        const res = [];
        for (const filePath of filePaths) {
            const { UploadedFileInfo } = await this.upload("/Attachment/Upload", fileTypeEnum.image, filePath);
            res.push(UploadedFileInfo[0]);

        }
        return res;
    }
    /**
     * 上传图片
     */
    uploadSignImageByBase64(base64img) {
        return this.request("/Attachment/SignRotate", { ImgBaseCode: base64img, ImgType: "image/jpeg" });
    }
	
	uploadRotate(file) {
		return  this.upload("/Attachment/UploadRotate", fileTypeEnum.image, file);
	}

    /**
     * 编辑
     */
    edit(data) {
        return this.request("/Asset/Edit", data);
    }

    /**
     * 编辑资产图片
     */
    editPicture(data) {
        return this.request("/Asset/EditPicture", data);
    }

    /**
      * 获取资产列表
      * @param {string} qst  
      * @param {number} pageNo  
      * @returns 
      */
    assetListQuery(qst, pageNo,condition,kAEText,uAEText) {
        const data = {
            IsSetNumber: true,
            PageNO: pageNo,
            PageSize: 20,
            QST: qst,
            KAENameText:kAEText,
            UAENameText:uAEText,
            Conditions:condition,
        };
        return this.request("/Asset/List/Query", data);
    }
    /**
      * 扫码查询资产
      * @param {string} code  
      * @returns 
      */
    scanQuery(code) {
        const data = {
            PageNO: 1,
            PageSize: 1,
            Conditions: [{ AssetPropertyCode: "Code", Operator: 1, Values: [{ Value: code }] }],
        };
        return this.request("/Asset/List/Query", data);
    }


    /**
     * 获取资产属性
     * @param {int} visibilities   资产列表可见:1、停用部门查询可见:2、入账列表可见:4
     * @returns 
     */
    getAssetProperty(visibilities = 1) {
        return this.request("/Asset/Property/All", visibilities);
    }
    /**
     * 获取打印资产字段
     * @param {string} IDs 
     * @returns 
     */
    getPrintAssets(IDs) {
        const data = {
            IDs: IDs
        }
        return this.request("/LabelPrint/GetPrintAssets", data);
    }
    /**
     * 获取模板
     * @returns 
     */
    getLabelTemplate(){
        return this.request("/Setting/LabelTemplate/Get");
    }
    /**
     * 我的资产修改存放位置
     * @returns 
     */
     assetChangeLocation(id,location){
        const data = {
            ID:id,
            LocationID:location.id,
            LocationNameCN:location.name,
            LocationNameEN:location.name,
        }
        return this.request("/Asset/ChangeLocation",data);
    }
    /**
     * 获取字典选项值{用途/取得方式/资产性质}
     * @returns 
     */
     assetGetOptions(){
        return this.request("/Asset/GetOptions",{});
    }
}

export default new AssetController();