"use strict";
var service_controller_controllerBase_assetControllerBase = require("../controllerBase/assetControllerBase.js");
var service_enumeration_fileTypeEnum = require("../../enumeration/fileTypeEnum.js");
class AssetController extends service_controller_controllerBase_assetControllerBase.AssetControllerBase {
  constructor() {
    super("asset");
  }
  myAssetList(qst, pageNo) {
    const data = {
      DutyType: "0",
      PageNO: pageNo,
      PageSize: 20,
      QST: qst
    };
    return this.request("/Asset/My/List", data);
  }
  getById(id) {
    return this.request("/Asset/GetByID", { "ID": id, "Visibility": 1 });
  }
  async uploadImage(filePaths) {
    const res = [];
    for (const filePath of filePaths) {
      const { UploadedFileInfo } = await this.upload("/Asset/UploadImage", service_enumeration_fileTypeEnum.fileTypeEnum.image, filePath);
      res.push(UploadedFileInfo[0]);
    }
    return res;
  }
  async uploadAttachment(filePaths) {
    const res = [];
    for (const filePath of filePaths) {
      const { UploadedFileInfo } = await this.upload("/Attachment/Upload", service_enumeration_fileTypeEnum.fileTypeEnum.image, filePath);
      res.push(UploadedFileInfo[0]);
    }
    return res;
  }
  uploadSignImageByBase64(base64img) {
    return this.request("/Attachment/SignRotate", { ImgBaseCode: base64img, ImgType: "image/jpeg" });
  }
  uploadRotate(file) {
    return this.upload("/Attachment/UploadRotate", service_enumeration_fileTypeEnum.fileTypeEnum.image, file);
  }
  edit(data) {
    return this.request("/Asset/Edit", data);
  }
  editPicture(data) {
    return this.request("/Asset/EditPicture", data);
  }
  assetListQuery(qst, pageNo, condition, kAEText, uAEText) {
    const data = {
      IsSetNumber: true,
      PageNO: pageNo,
      PageSize: 20,
      QST: qst,
      KAENameText: kAEText,
      UAENameText: uAEText,
      Conditions: condition
    };
    return this.request("/Asset/List/Query", data);
  }
  scanQuery(code) {
    const data = {
      PageNO: 1,
      PageSize: 1,
      Conditions: [{ AssetPropertyCode: "Code", Operator: 1, Values: [{ Value: code }] }]
    };
    return this.request("/Asset/List/Query", data);
  }
  getAssetProperty(visibilities = 1) {
    return this.request("/Asset/Property/All", visibilities);
  }
  getPrintAssets(IDs) {
    const data = {
      IDs
    };
    return this.request("/LabelPrint/GetPrintAssets", data);
  }
  getLabelTemplate() {
    return this.request("/Setting/LabelTemplate/Get");
  }
  assetChangeLocation(id, location) {
    const data = {
      ID: id,
      LocationID: location.id,
      LocationNameCN: location.name,
      LocationNameEN: location.name
    };
    return this.request("/Asset/ChangeLocation", data);
  }
  assetGetOptions() {
    return this.request("/Asset/GetOptions", {});
  }
}
var assetController = new AssetController();
exports.assetController = assetController;
