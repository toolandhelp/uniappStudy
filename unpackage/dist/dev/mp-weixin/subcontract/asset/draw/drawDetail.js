"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_drawController = require("../../../service/controller/asset/drawController.js");
var service_controller_asset_requestDrawController = require("../../../service/controller/asset/requestDrawController.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_dateTime = require("../../../share/util/dateTime.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_index = require("../../../share/util/index.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../service/enumeration/productEnum.js");
require("../../../share/util/image.js");
const BillFooterBtn = () => "../../../components/billFooterBtn/billFooterBtn.js";
const BillEnclosure = () => "../../../components/billEnclosure/billEnclosure.js";
const _sfc_main = {
  components: {
    BillEnclosure,
    BillFooterBtn
  },
  props: {
    id: String,
    type: String
  },
  onNavigationBarButtonTap(e) {
    share_redirect_index.navigateTo("/subcontract/asset/requestDraw/requestDrawList");
  },
  setup({ id, type }) {
    const bill = common_vendor.ref({
      id: null,
      status: null,
      isSubmit: null,
      code: "",
      drawAssetEmployee: {
        text: share_util_storage.getStorage("UserName"),
        value: share_util_storage.getStorage("EmployeeID")
      },
      drawAssetOrg: {
        text: share_util_storage.getStorage("OrgName"),
        value: share_util_storage.getStorage("OrgID")
      },
      drawAssetDate: {
        hint: "\u8BF7\u9009\u62E9\u53D1\u653E\u65E5\u671F",
        value: share_util_dateTime.getCurrentDate()
      },
      requestDrawBillCode: {
        hint: "\u5173\u8054\u7533\u8BF7\u5355\u53F7",
        code: "",
        value: ""
      },
      isClosedRequestDraw: {
        hint: "\u7ED3\u675F\u7533\u9886",
        value: false
      },
      remark: "",
      IsStart: false,
      startFlow: true,
      FlowPath: false,
      IsApproval: false,
      enablingApproval: false
    });
    const rowDetail = common_vendor.ref({
      name: "",
      brand: "",
      spec: "",
      model: "",
      qty: 0,
      kAO: {
        hint: "\u7BA1\u7406\u90E8\u95E8",
        name: "",
        value: null
      },
      kAE: {
        hint: "\u7BA1\u7406\u4EBA\u5458",
        name: "",
        value: null
      },
      location: {
        hint: "\u5B58\u653E\u4F4D\u7F6E",
        name: "",
        value: null
      },
      isPublicAsset: {
        hint: "\u662F\u5426\u516C\u5171\u8D44\u4EA7",
        value: false
      },
      uAO: {
        hint: "\u4F7F\u7528\u90E8\u95E8",
        name: "",
        value: null
      },
      uAE: {
        hint: "\u4F7F\u7528\u4EBA\u5458",
        name: "",
        value: null
      }
    });
    const billDetail = common_vendor.ref([]);
    const inputDialog = common_vendor.ref(null);
    const editInfoTitle = common_vendor.ref("");
    const isOpened = common_vendor.ref("none");
    const detailIndex = common_vendor.ref(null);
    const remarkVal = common_vendor.ref("");
    const inputRemarkDialog = common_vendor.ref(null);
    const requestBillCodeList = common_vendor.ref([]);
    const requestBillCodeListDialog = common_vendor.ref(null);
    const inputRequestBillCodeDialog = common_vendor.ref(null);
    const assetDialog = common_vendor.ref(null);
    const searchAssetList = common_vendor.ref([]);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
    const nonEditable = common_vendor.ref(false);
    const autoStart = common_vendor.ref(false);
    const toIndex = common_vendor.ref("");
    const files = common_vendor.ref([]);
    const windowHeights = common_vendor.ref("");
    function uniSwipeChange(e, index) {
      billDetail.value.isOpened = e;
    }
    function uniSwipeClick(e, index) {
      if (e.index == 1) {
        billDetail.value.splice(index, 1);
        share_util_message.showOkToast("\u79FB\u9664\u6210\u529F");
      }
    }
    function openEditDetailDalog(type2) {
      editInfoTitle.value = type2 ? "\u65B0\u589E" : "\u7F16\u8F91";
      inputDialog.value.open();
    }
    function openRemarkDialog() {
      remarkVal.value = bill.value.remark;
      inputRemarkDialog.value.open();
    }
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
    }
    function editDetailConfirm(val) {
      if (!rowDetail.value.kAO.value) {
        share_util_message.showErrorToast("\u7BA1\u7406\u90E8\u95E8\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      if (!rowDetail.value.location.value) {
        share_util_message.showErrorToast("\u5B58\u653E\u4F4D\u7F6E\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      billDetail.value[detailIndex.value].NewKAOID = rowDetail.value.kAO.value;
      billDetail.value[detailIndex.value].NewKAOName = rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAONameCN = rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAONameEN = rowDetail.value.kAO.name;
      billDetail.value[detailIndex.value].NewKAEID = rowDetail.value.kAE.value;
      billDetail.value[detailIndex.value].NewKAEName = rowDetail.value.kAE.name;
      billDetail.value[detailIndex.value].NewLocationID = rowDetail.value.location.value;
      billDetail.value[detailIndex.value].NewLocationName = rowDetail.value.location.name;
      billDetail.value[detailIndex.value].NewLocationNameCN = rowDetail.value.location.name;
      billDetail.value[detailIndex.value].NewLocationNameEN = rowDetail.value.location.name;
      billDetail.value[detailIndex.value].IsPublicAsset = rowDetail.value.isPublicAsset.value;
      billDetail.value[detailIndex.value].NewUAOID = rowDetail.value.uAO.value;
      billDetail.value[detailIndex.value].NewUAOName = rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAONameCN = rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAONameEN = rowDetail.value.uAO.name;
      billDetail.value[detailIndex.value].NewUAEID = rowDetail.value.uAE.value;
      billDetail.value[detailIndex.value].NewUAEName = rowDetail.value.uAE.name;
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.kAO.value = null;
      rowDetail.value.kAO.name = null;
      rowDetail.value.kAE.value = null;
      rowDetail.value.kAE.name = null;
      rowDetail.value.location.value = null;
      rowDetail.value.location.name = null;
      rowDetail.value.isPublicAsset.value = false;
      rowDetail.value.uAO.value = null;
      rowDetail.value.uAO.name = null;
      rowDetail.value.uAE.value = null;
      rowDetail.value.uAE.name = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const {
        NewKAOID,
        NewKAOName,
        NewKAEID,
        NewKAEName,
        NewLocationID,
        NewLocationName,
        IsPublicAsset,
        NewUAOID,
        NewUAOName,
        NewUAEID,
        NewUAEName
      } = billDetail.value[index];
      rowDetail.value.kAO.value = NewKAOID;
      rowDetail.value.kAO.name = NewKAOName;
      rowDetail.value.kAE.value = NewKAEID;
      rowDetail.value.kAE.name = NewKAEName;
      rowDetail.value.location.value = NewLocationID;
      rowDetail.value.location.name = NewLocationName;
      rowDetail.value.isPublicAsset.value = IsPublicAsset;
      rowDetail.value.uAO.value = NewUAOID;
      rowDetail.value.uAO.name = NewUAOName;
      rowDetail.value.uAE.value = NewUAEID;
      rowDetail.value.uAE.name = NewUAEName;
      openEditDetailDalog(0);
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_drawController.drawController.drawDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.drawDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.drawAssetDate.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u53D1\u653E\u65E5\u671F");
        return;
      }
      if (!bill.value.drawAssetEmployee.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u53D1\u653E\u4EBA\u5458");
        return;
      }
      if (billDetail.value.length < 1) {
        toIndex.value = "listDetail";
        share_util_message.showErrorToast("\u8BF7\u6DFB\u52A0\u8D44\u4EA7\u4FE1\u606F");
        return;
      }
      if (!bill.value.isSubmit) {
        submitDialogConfirm();
        return;
      }
      submitDialog.value.open();
    }
    function submitDialogClose() {
      submitDialog.value.close();
    }
    function submitDialogConfirm() {
      let obj = {};
      obj.ID = bill.value.id;
      obj.BillCode = bill.value.code;
      obj.CommitType = bill.value.id ? 1 : 0;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.DrawAssetDate = bill.value.drawAssetDate.value;
      obj.DrawAssetEmployeeID = bill.value.drawAssetEmployee.value;
      obj.DrawAssetEmployeeName = bill.value.drawAssetEmployee.text;
      obj.DrawAssetOrgID = bill.value.drawAssetOrg.value;
      obj.DrawAssetOrgNameCN = bill.value.drawAssetOrg.text;
      obj.DrawAssetOrgNameEN = bill.value.drawAssetOrg.text;
      obj.RequestDrawID = bill.value.requestDrawBillCode.value;
      obj.RequestDrawCode = bill.value.requestDrawBillCode.code;
      obj.IsClosedRequestDraw = bill.value.isClosedRequestDraw.value;
      obj.Remark = bill.value.remark;
      obj.Details = billDetail.value.map((item, index) => {
        let row = item;
        row.Sequence = index + 1;
        return row;
      });
      obj.Attachments = files.value.map((item, index) => {
        item.Sequence = index + 1;
        return item;
      });
      share_util_message.showLoading();
      service_controller_asset_drawController.drawController.drawSaveDraft(obj).then(({ Code, ID }) => {
        editGetByID(ID).then(() => {
          if (bill.value.IsStart) {
            autoStart.value = true;
          }
        });
        submitDialogClose();
      }).finally(() => share_util_message.clearLoading());
    }
    function editGetByID(id2) {
      share_util_message.showLoading();
      return service_controller_asset_drawController.drawController.drawGetByID(id2).then(({
        ID,
        Status,
        BillCode,
        DrawAssetDate,
        DrawAssetEmployeeID,
        DrawAssetEmployeeName,
        DrawAssetOrgID,
        DrawAssetOrgNameCN,
        RequestDrawID,
        RequestDrawCode,
        IsClosedRequestDraw,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = ID;
        bill.value.status = Status;
        bill.value.code = BillCode;
        bill.value.drawAssetDate.value = DrawAssetDate ? DrawAssetDate.substring(0, 10) : "";
        bill.value.drawAssetEmployee.value = DrawAssetEmployeeID;
        bill.value.drawAssetEmployee.text = DrawAssetEmployeeName;
        bill.value.drawAssetOrg.value = DrawAssetOrgID;
        bill.value.drawAssetOrg.text = DrawAssetOrgNameCN;
        bill.value.requestDrawBillCode.value = RequestDrawID;
        bill.value.requestDrawBillCode.code = RequestDrawCode;
        bill.value.isClosedRequestDraw.value = IsClosedRequestDraw;
        bill.value.remark = Remark;
        billDetail.value = Details;
        files.value = Attachments.map((p) => {
          p.name = p.FileName;
          p.url = share_http_serveUrl.getFileUrl(p.FileUrl);
          return p;
        });
        nonEditable.value = bill.value.status != 1 && bill.value.status != null;
        bill.value.IsApproval = FlowInfo.IsApproval;
        bill.value.IsStart = Status != 1 && !FlowInfo.IsStart && FlowInfo.IsEnabledFlow;
        bill.value.FlowPath = Status != 1 && FlowInfo.IsStart && FlowInfo.IsEnabledFlow || FlowInfo.IsSendBack;
        autoStart.value = false;
        if (type && type == "mywork" && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/draw/drawList");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0, len = billDetail.value.length; i < len; i++) {
        if (billDetail.value[i].Qty) {
          num += parseInt(Number(billDetail.value[i].Qty));
        }
      }
      return num;
    });
    {
      if (id) {
        editGetByID(id);
      }
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    function removeInput(key) {
      if (key == "drawAssetDate") {
        bill.value[key].value = null;
        bill.value[key].text = null;
        return;
      }
      if (key == "drawAssetEmployee") {
        bill.value[key].value = null;
        bill.value[key].text = null;
        bill.value.drawAssetOrg.value = null;
        bill.value.drawAssetOrg.text = null;
        return;
      }
      if (key == "requestDrawBillCode") {
        bill.value[key].value = null;
        bill.value[key].code = null;
      }
      if (key == "remark") {
        bill.value[key] = "";
        return;
      }
    }
    function removeEditDetailInputInfo(key) {
      rowDetail.value[key].value = null;
      rowDetail.value[key].name = null;
    }
    function requestBillCode(qst) {
      share_util_message.showLoading();
      service_controller_asset_requestDrawController.requestDrawController.requestDrawList({ qst, pageNo: 1, pageSize: 5 }).then(({ Items }) => {
        if (Items && Items.length < 1) {
          share_util_message.showErrorToast("\u672A\u68C0\u7D22\u5230\u53EF\u7528\u6570\u636E");
          return;
        }
        if (Items && Items.length == 1) {
          bill.value.requestDrawBillCode.code = Items[0].BillCode;
          bill.value.requestDrawBillCode.value = Items[0].ID;
          return;
        }
        requestBillCodeList.value = Items;
        requestBillCodeListDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function selectRequisitionNo({ ID, BillCode }) {
      bill.value.requestDrawBillCode.code = BillCode;
      bill.value.requestDrawBillCode.value = ID;
      requestBillCodeListDialog.value.close();
    }
    function openRequestBillCodeDialog() {
      inputRequestBillCodeDialog.value.open();
    }
    function dialogRequestBillCodeInputConfirm(val) {
      if (val.trim() == "") {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      requestBillCode(val);
    }
    function scanInput(key) {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          requestBillCode(share_util_index.getScanCode(result));
        }
      });
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          addQuery(share_util_index.getScanCode(result));
        }
      });
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_drawController.drawController.assetListQueryByBillType(keyWorld).then(({ Items }) => {
        searchAssetList.value = Items.map((p) => {
          p.checked = false;
          return p;
        });
        if (searchAssetList.value.length < 1) {
          share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7\u8D44\u6599");
          return;
        }
        assetDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function checkBoxChange(e, Id) {
      let values = e.detail.value, items = searchAssetList.value;
      if (values.length > 0) {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ID == Id) {
            items[i].checked = true;
            break;
          }
        }
      } else {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ID == Id) {
            items[i].checked = false;
            break;
          }
        }
      }
    }
    function assetDialogConfirm() {
      let items = searchAssetList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        share_util_message.showErrorToast("\u8BF7\u52FE\u9009\u4E00\u6761\u6570\u636E");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.AssetID == arr[i].ID);
        if (check.length < 1) {
          console.log(arr[i]);
          let obj = {};
          obj.ID = null;
          obj.AssetID = arr[i].ID;
          obj.Name = arr[i].Name;
          obj.AssetInfo = [
            { ID: arr[i].ID, Code: arr[i].Code, Name: arr[i].Name }
          ];
          obj.Code = arr[i].Code;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalKAOID = arr[i].KAOID;
          obj.OriginalLocationID = arr[i].LocationID;
          obj.NewKAOID = arr[i].KAOID;
          obj.NewKAOName = arr[i].KAOName;
          obj.NewKAONameCN = arr[i].KAONameCN;
          obj.NewKAONameEN = arr[i].KAONameEN;
          obj.NewKAEID = arr[i].KAEID;
          obj.NewKAEName = arr[i].KAEName;
          obj.NewLocationID = arr[i].LocationID;
          obj.NewLocationName = arr[i].LocationName;
          obj.NewLocationNameCN = arr[i].LocationName;
          obj.NewLocationNameEN = arr[i].LocationName;
          obj.IsPublicAsset = false;
          obj.NewUAOID = arr[i].UAOID;
          obj.NewUAOName = arr[i].UAOName;
          obj.NewUAONameCN = arr[i].UAOName;
          obj.NewUAONameEN = arr[i].UAOName;
          obj.NewUAEID = arr[i].UAEID;
          obj.NewUAEName = arr[i].UAEName;
          obj.CategoryID = arr[i].AssetCategoryID;
          obj.CategoryName = arr[i].CategoryName;
          obj.CategoryNameCN = arr[i].CategoryNameCN;
          obj.CategoryNameEN = arr[i].CategoryNameEN;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.isOpened = "none";
          billDetail.value.push(obj);
        } else {
          if (timer) {
            share_util_message.showErrorToast("\u8BF7\u52FF\u6DFB\u52A0\u91CD\u590D\u8D44\u4EA7");
            timer = false;
            const setTimer = setTimeout(() => {
              timer = true;
              clearTimeout(setTimer);
            }, 3e3);
          }
        }
      }
      assetDialog.value.close();
      searchAssetList.value = [];
    }
    function dialogsearchCodeValConfirm(val) {
      if (val.trim() == "") {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      addQuery(val);
    }
    function locationSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ id: id3, label }) => {
        rowDetail.value[key].value = id3;
        rowDetail.value[key].name = label;
      });
      const id2 = rowDetail.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${id2}`);
    }
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ id: id3, label }) => {
        rowDetail.value[key].value = id3;
        rowDetail.value[key].name = label;
      });
      const id2 = rowDetail.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=0&ids=${id2}`);
    }
    function personnelSelect(key) {
      if (nonEditable.value)
        return;
      if (key == "drawAssetEmployee" && share_util_storage.getStorage("UserType") == 2) {
        return;
      }
      if (key == "kAE" && !rowDetail.value.kAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u7BA1\u7406\u90E8\u95E8");
        return;
      }
      if (key == "uAE" && !rowDetail.value.uAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4F7F\u7528\u90E8\u95E8");
        return;
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        if (key == "drawAssetEmployee") {
          bill.value[key].value = ID;
          bill.value[key].text = Name;
          bill.value.drawAssetOrg.value = OrgID;
          bill.value.drawAssetOrg.text = OrgName;
        } else {
          rowDetail.value[key].value = ID;
          rowDetail.value[key].name = Name;
        }
      });
      let _id = null;
      if (key == "drawAssetEmployee") {
        _id = bill.value[key].value;
      } else {
        _id = rowDetail.value[key].value;
      }
      let corpId = "";
      if (key == "kAE") {
        corpId = rowDetail.value.kAO.value;
      } else if (key == "uAE") {
        corpId = rowDetail.value.uAO.value;
      }
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=0&corpID=${corpId}&ids=${_id}`);
    }
    function isPublicAssetSwitchChange(e) {
      rowDetail.value.isPublicAsset.value = e.value;
      if (e.value) {
        rowDetail.value.uAE.value = null;
        rowDetail.value.uAE.name = "";
      }
    }
    function switchChange(e) {
      bill.value.isClosedRequestDraw.value = e.value;
    }
    function filesChange(val) {
      files.value = val;
    }
    let IsScroll = common_vendor.computed$1(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 270) {
        header = 270;
        content = windowHeights.value - 330;
      } else {
        header = content = (windowHeights.value - 60) / 2;
      }
      return { header, content };
    });
    return {
      getStorage: share_util_storage.getStorage,
      type,
      IsScroll,
      bill,
      billDetail,
      rowDetail,
      uniSwipeActionItemRightOptions: share_util_billBasicConfig.uniSwipeActionItemRightOptions,
      isOpened,
      uniSwipeChange,
      uniSwipeClick,
      inputDialog,
      openEditDetailDalog,
      remarkVal,
      dialogRemarkInputConfirm,
      inputRemarkDialog,
      openRemarkDialog,
      editDetailConfirm,
      editDetailClose,
      editBillDetail,
      deleteDialogConfirm,
      resetInputDialog,
      handleSaveDraft,
      submitDialog,
      submitMsgType,
      submitDialogConfirm,
      submitDialogClose,
      editInfoTitle,
      billDetailNumber,
      editGetByID,
      nonEditable,
      jumpList,
      windowHeights,
      drawAssetDateChange: ({ detail: { value } }) => {
        if (nonEditable.value)
          return;
        bill.value.drawAssetDate.value = value;
      },
      removeInput,
      removeEditDetailInputInfo,
      scanInput,
      requestBillCode,
      requestBillCodeList,
      inputRequestBillCodeDialog,
      openRequestBillCodeDialog,
      dialogRequestBillCodeInputConfirm,
      requestBillCodeListDialog,
      selectRequisitionNo,
      scan,
      addQuery,
      dialogsearchCodeValConfirm,
      searchAssetList,
      assetDialog,
      checkBoxChange,
      assetDialogConfirm,
      isPublicAssetSwitchChange,
      switchChange,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      files,
      filesChange,
      toIndex,
      autoStart
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_BillEnclosure = common_vendor.resolveComponent("BillEnclosure");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.dialogRemarkInputConfirm),
    b: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    c: common_vendor.sr("inputRemarkDialog", "09f3c619-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: common_vendor.o($setup.dialogRequestBillCodeInputConfirm),
    f: common_vendor.p({
      mode: "input",
      title: "\u7533\u9886\u5355\u53F7",
      value: "",
      placeholder: "\u5355\u53F7/\u7533\u9886\u4EBA\u5458"
    }),
    g: common_vendor.sr("inputRequestBillCodeDialog", "09f3c619-2"),
    h: common_vendor.p({
      type: "dialog"
    }),
    i: common_vendor.f($setup.requestBillCodeList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.BillCode),
        b: common_vendor.t(item.RequestDate),
        c: common_vendor.t(item.RequestOrgName),
        d: common_vendor.t(item.RequesterEmployeeName),
        e: common_vendor.t(item.RequestReasonText),
        f: common_vendor.t(item.IsClosedText),
        g: common_vendor.t(item.BillerEmployeeName),
        h: common_vendor.t(item.BillDateTime),
        i: common_vendor.o(($event) => $setup.selectRequisitionNo(item), _ctx.ID),
        j: "09f3c619-7-" + i0 + ",09f3c619-6"
      };
    }),
    j: _ctx.ID,
    k: common_vendor.p({
      link: true
    }),
    l: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    m: common_vendor.o(($event) => $setup.requestBillCodeListDialog.close()),
    n: common_vendor.p({
      title: "\u9009\u62E9\u7533\u9886\u5355\u53F7",
      type: "info",
      ["before-close"]: true
    }),
    o: common_vendor.sr("requestBillCodeListDialog", "09f3c619-4"),
    p: common_vendor.p({
      type: "dialog"
    }),
    q: common_vendor.f($setup.searchAssetList, ({
      ID,
      Name,
      Code,
      AssetCategoryName,
      Brand,
      Spec,
      Model,
      checked
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(AssetCategoryName),
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: checked,
        h: common_vendor.o(($event) => $setup.checkBoxChange($event, ID)),
        i: ID,
        j: "09f3c619-11-" + i0 + ",09f3c619-10"
      };
    }),
    r: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    s: common_vendor.o(($event) => $setup.assetDialog.close()),
    t: common_vendor.o($setup.assetDialogConfirm),
    v: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    w: common_vendor.sr("assetDialog", "09f3c619-8"),
    x: common_vendor.p({
      type: "dialog"
    }),
    y: common_vendor.o($setup.submitDialogConfirm),
    z: common_vendor.o($setup.submitDialogClose),
    A: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    B: common_vendor.sr("submitDialog", "09f3c619-12"),
    C: common_vendor.p({
      type: "dialog"
    }),
    D: common_vendor.t($setup.rowDetail.kAO.value ? $setup.rowDetail.kAO.name : "\u8BF7\u9009\u62E9"),
    E: common_vendor.n($setup.rowDetail.kAO.value ? "content_effective" : ""),
    F: common_vendor.o(($event) => $setup.corpDeptSelect("kAO")),
    G: $setup.rowDetail.kAO.value
  }, $setup.rowDetail.kAO.value ? {
    H: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("kAO")),
    I: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    J: common_vendor.t($setup.rowDetail.kAE.value ? $setup.rowDetail.kAE.name : "\u8BF7\u9009\u62E9"),
    K: common_vendor.n($setup.rowDetail.kAE.value ? "content_effective" : ""),
    L: common_vendor.o(($event) => $setup.personnelSelect("kAE")),
    M: $setup.rowDetail.kAE.value
  }, $setup.rowDetail.kAE.value ? {
    N: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("kAE")),
    O: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    P: common_vendor.t($setup.rowDetail.location.value ? $setup.rowDetail.location.name : "\u8BF7\u9009\u62E9"),
    Q: common_vendor.n($setup.rowDetail.location.value ? "content_effective" : ""),
    R: common_vendor.o(($event) => $setup.locationSelect("location")),
    S: $setup.rowDetail.location.value
  }, $setup.rowDetail.location.value ? {
    T: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("location")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    V: common_vendor.o($setup.isPublicAssetSwitchChange),
    W: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.rowDetail.isPublicAsset.value
    }),
    X: common_vendor.t($setup.rowDetail.uAO.value ? $setup.rowDetail.uAO.name : "\u8BF7\u9009\u62E9"),
    Y: common_vendor.n($setup.rowDetail.uAO.value ? "content_effective" : ""),
    Z: common_vendor.o(($event) => $setup.corpDeptSelect("uAO")),
    aa: $setup.rowDetail.uAO.value
  }, $setup.rowDetail.uAO.value ? {
    ab: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("uAO")),
    ac: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ad: common_vendor.t($setup.rowDetail.uAE.value ? $setup.rowDetail.uAE.name : "\u8BF7\u9009\u62E9"),
    ae: common_vendor.n($setup.rowDetail.uAE.value ? "content_effective" : ""),
    af: common_vendor.o(($event) => $setup.personnelSelect("uAE")),
    ag: $setup.rowDetail.uAE.value
  }, $setup.rowDetail.uAE.value ? {
    ah: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("uAE")),
    ai: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aj: common_vendor.p({
      disabled: $setup.rowDetail.isPublicAsset.value
    }),
    ak: common_vendor.sr("inputClose", "09f3c619-15,09f3c619-14"),
    al: common_vendor.o($setup.editDetailConfirm),
    am: common_vendor.o($setup.editDetailClose),
    an: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    ao: common_vendor.sr("inputDialog", "09f3c619-14"),
    ap: common_vendor.p({
      type: "center"
    }),
    aq: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ar: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210")
  } : {
    as: common_vendor.t($setup.bill.code)
  }, {
    at: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    av: common_vendor.f(2, (s, k0, i0) => {
      return {};
    })
  } : {}, {
    aw: common_vendor.p({
      disabled: true
    }),
    ax: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ay: common_vendor.t($setup.bill.drawAssetDate.value ? $setup.bill.drawAssetDate.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    az: common_vendor.o((...args) => $setup.drawAssetDateChange && $setup.drawAssetDateChange(...args))
  } : {
    aA: common_vendor.t($setup.bill.drawAssetDate.value)
  }, {
    aB: common_vendor.n($setup.bill.drawAssetDate.value ? "content_effective" : ""),
    aC: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aD: $setup.nonEditable ? false : $setup.bill.drawAssetDate.value
  }, ($setup.nonEditable ? false : $setup.bill.drawAssetDate.value) ? {
    aE: common_vendor.o(($event) => $setup.removeInput("drawAssetDate")),
    aF: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aG: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aH: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aI: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aJ: common_vendor.t($setup.bill.drawAssetEmployee.value ? $setup.bill.drawAssetEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    aK: common_vendor.o(($event) => $setup.personnelSelect("drawAssetEmployee"))
  } : {
    aL: common_vendor.t($setup.bill.drawAssetEmployee.text)
  }, {
    aM: common_vendor.n($setup.bill.drawAssetEmployee.value ? "content_effective" : ""),
    aN: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aO: $setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.drawAssetEmployee.value
  }, ($setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.drawAssetEmployee.value) ? {
    aP: common_vendor.o(($event) => $setup.removeInput("drawAssetEmployee")),
    aQ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aR: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aS: common_vendor.p({
      disabled: $setup.nonEditable || $setup.getStorage("UserType") == 2
    }),
    aT: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aU: common_vendor.t($setup.bill.requestDrawBillCode.value ? $setup.bill.requestDrawBillCode.code : "\u5173\u8054\u7533\u8BF7\u5355\u53F7"),
    aV: common_vendor.o(($event) => $setup.openRequestBillCodeDialog())
  } : {
    aW: common_vendor.t($setup.bill.requestDrawBillCode.code)
  }, {
    aX: common_vendor.n($setup.bill.requestDrawBillCode.value ? "content_effective" : ""),
    aY: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aZ: $setup.nonEditable ? false : $setup.bill.requestDrawBillCode.value
  }, ($setup.nonEditable ? false : $setup.bill.requestDrawBillCode.value) ? {
    ba: common_vendor.o(($event) => $setup.removeInput("requestDrawBillCode")),
    bb: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bc: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    bd: common_vendor.o(($event) => $setup.scanInput("requestDrawBillCode")),
    be: common_vendor.p({
      type: "scan",
      size: "16"
    })
  } : {}, {
    bf: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bg: common_vendor.o($setup.switchChange),
    bh: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.bill.isClosedRequestDraw.value,
      disabled: $setup.nonEditable
    }),
    bi: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    bj: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    bk: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    bl: common_vendor.t($setup.bill.remark)
  }, {
    bm: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
    bn: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bo: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bp: common_vendor.o(($event) => $setup.removeInput("remark")),
    bq: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    br: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bs: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bt: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bv: common_vendor.f($setup.billDetail, ({
      Code,
      Name,
      CategoryName,
      OriginalCode,
      OriginalAmount,
      NewKAOName,
      NewKAEName,
      NewUAOName,
      NewUAEName,
      NewLocationName,
      IsPublicAsset,
      Brand,
      Spec,
      Model,
      Qty,
      isOpened,
      AssetID
    }, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(Name)
      }, !$setup.nonEditable ? {
        b: common_vendor.o(($event) => $setup.editBillDetail(index)),
        c: "09f3c619-43-" + i0 + "," + ("09f3c619-42-" + i0),
        d: common_vendor.p({
          type: "compose",
          size: "30",
          color: "#444"
        })
      } : {}, {
        e: common_vendor.t(Code),
        f: common_vendor.t(OriginalCode),
        g: common_vendor.t(OriginalAmount),
        h: common_vendor.t(IsPublicAsset ? "\u662F" : "\u5426"),
        i: common_vendor.t(Brand),
        j: common_vendor.t(Spec),
        k: common_vendor.t(Model),
        l: common_vendor.t(Qty),
        m: common_vendor.t(NewKAOName),
        n: common_vendor.t(NewKAEName),
        o: common_vendor.t(NewUAOName),
        p: common_vendor.t(NewUAEName),
        q: common_vendor.t(CategoryName),
        r: common_vendor.t(NewLocationName),
        s: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        t: common_vendor.o(($event) => $setup.uniSwipeChange(index), AssetID),
        v: AssetID,
        w: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), AssetID),
        x: "09f3c619-42-" + i0 + ",09f3c619-41",
        y: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: isOpened,
          ["auto-close"]: false
        })
      });
    }),
    bw: !$setup.nonEditable,
    bx: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    by: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    bz: common_vendor.s(`height:100%`)
  } : {}, {
    bA: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    bB: common_vendor.o($setup.filesChange),
    bC: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    bD: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bE: common_vendor.o(($event) => $setup.toIndex = ""),
    bF: $setup.toIndex,
    bG: common_vendor.o($setup.jumpList),
    bH: common_vendor.o($setup.handleSaveDraft),
    bI: common_vendor.o($setup.deleteDialogConfirm),
    bJ: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bK: common_vendor.o(($event) => $setup.toIndex = "example"),
    bL: common_vendor.o(($event) => $setup.scan()),
    bM: common_vendor.o($setup.dialogsearchCodeValConfirm),
    bN: common_vendor.o((id) => $setup.editGetByID(id)),
    bO: common_vendor.p({
      type: $setup.type,
      billType: "Draw",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u641C\u7D22",
      scanInputDialogHint: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/draw/drawDetail.vue"]]);
wx.createPage(MiniProgramPage);
