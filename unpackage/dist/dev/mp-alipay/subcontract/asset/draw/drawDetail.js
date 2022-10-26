"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_assetController = require("../../../service/controller/asset/assetController.js");
var service_controller_asset_drawController = require("../../../service/controller/asset/drawController.js");
var service_controller_asset_requestDrawController = require("../../../service/controller/asset/requestDrawController.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_dateTime = require("../../../share/util/dateTime.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_index = require("../../../share/util/index.js");
var service_enumeration_fileExtType = require("../../../service/enumeration/fileExtType.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
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
const ProcessTrack = () => "../../../components/processTrack/processTrack.js";
const StartApprovalProcess = () => "../../../components/startApprovalProcess/startApprovalProcess.js";
const Approval = () => "../../../components/approval/approval.js";
const UniFilePicker = () => "../../../components/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const BillFooterBtn = () => "../../../components/billFooterBtn/billFooterBtn.js";
function picturesConvertUni(pictures) {
  return pictures.map((p) => {
    const name = p.FileName;
    const i = name.lastIndexOf(".");
    return __spreadProps(__spreadValues({}, p), {
      name,
      url: share_http_serveUrl.getFileUrl(p.FileUrl),
      extname: name.substr(i + 1)
    });
  });
}
const _sfc_main = {
  components: {
    ProcessTrack,
    StartApprovalProcess,
    Approval,
    UniFilePicker,
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
    const fabPattern = {
      color: "#7A7E83",
      backgroundColor: "#fff",
      selectedColor: "#007AFF",
      buttonColor: "#007AFF",
      iconColor: "#fff"
    };
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
    const fabContent = [
      {
        iconPath: "/static/icon/sys.png",
        selectedIconPath: "/static/icon/sys.png",
        text: "\u626B\u7801",
        active: false
      },
      {
        iconPath: "/static/icon/edit.png",
        selectedIconPath: "/static/icon/edit.png",
        text: "\u68C0\u7D22",
        active: false
      },
      {
        iconPath: "/static/icon/asset_mingxi.png",
        selectedIconPath: "/static/icon/asset_mingxi.png",
        text: "\u660E\u7EC6",
        active: false
      },
      {
        iconPath: "/static/icon/asset_fujian.png",
        selectedIconPath: "/static/icon/asset_fujian.png",
        text: "\u9644\u4EF6",
        active: false
      }
    ];
    const fab = common_vendor.ref(null);
    const billDetail = common_vendor.ref([]);
    const deleteOperationBtn = common_vendor.ref([]);
    const inputDialog = common_vendor.ref(null);
    const editInfoTitle = common_vendor.ref("");
    deleteOperationBtn.value = [
      { text: "\u53D6\u6D88", style: { backgroundColor: "#007aff" } },
      { text: "\u5220\u9664", style: { backgroundColor: "#F56C6C" } }
    ];
    const isOpened = common_vendor.ref("none");
    const detailIndex = common_vendor.ref(null);
    const remarkVal = common_vendor.ref("");
    const inputRemarkDialog = common_vendor.ref(null);
    const requestBillCodeList = common_vendor.ref([]);
    const requestBillCodeListDialog = common_vendor.ref(null);
    const inputRequestBillCodeDialog = common_vendor.ref(null);
    const scanCodeDialog = common_vendor.ref(null);
    const assetDialog = common_vendor.ref(null);
    const searchAssetList = common_vendor.ref([]);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
    let nonEditable = common_vendor.ref(false);
    const approveDialog = common_vendor.ref(false);
    const approveStartUpDialog = common_vendor.ref(false);
    const approverOption = common_vendor.ref([]);
    const approvalProcessData = common_vendor.ref({
      activityID: null,
      activityName: "",
      activityType: "",
      nextActivityID: null,
      nextActivityName: "",
      nextActivityType: "",
      employeeID: null,
      employeeName: "",
      nextActivityCandidaters: [],
      refuseType: null,
      supportedStrategies: [],
      approvalType: 1,
      approvalTypeOption: [
        {
          text: "\u901A\u8FC7",
          value: 1
        },
        {
          text: "\u4E0D\u901A\u8FC7",
          value: 0
        }
      ],
      remark: ""
    });
    const processTrackDialog = common_vendor.ref(false);
    const processTrackApprovalLog = common_vendor.ref([]);
    const processTrackApprovalTask = common_vendor.ref([]);
    const toIndex = common_vendor.ref("");
    const filePicker = common_vendor.ref(null);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const windowHeights = common_vendor.ref("");
    function sign() {
      common_vendor.index.navigateTo({
        url: `/pages/system/signConfirm/signConfirm?type=1&key=101&billID=${bill.value.id}`
      });
    }
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
            enablingApprovalShow();
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
        if (type && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/draw/drawList");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });
    {
      if (id) {
        editGetByID(id);
      }
    }
    function resetApprovalProcessData() {
      approvalProcessData.value = {
        activityID: null,
        activityName: "",
        activityType: "",
        nextActivityID: null,
        nextActivityName: "",
        nextActivityType: "",
        employeeID: null,
        employeeName: "",
        nextActivityCandidaters: [],
        refuseType: null,
        supportedStrategies: [],
        approvalType: 1,
        approvalTypeOption: [
          {
            text: "\u901A\u8FC7",
            value: 1
          },
          {
            text: "\u4E0D\u901A\u8FC7",
            value: 0
          }
        ],
        remark: ""
      };
    }
    function approvalShow() {
      share_util_message.showLoading();
      bill.value.enablingApproval = true;
      service_controller_asset_drawController.drawController.drawPrevApproval(bill.value.id).then((dataInfo) => {
        const {
          ActivityID,
          ActivityName,
          ActivityType,
          NextActivityID,
          NextActivityName,
          NextActivityType,
          NextActivityCandidaters,
          SupportedStrategies
        } = dataInfo[0];
        approvalProcessData.value.activityID = ActivityID;
        approvalProcessData.value.activityName = ActivityName;
        approvalProcessData.value.activityType = ActivityType;
        approvalProcessData.value.nextActivityID = NextActivityID;
        approvalProcessData.value.nextActivityName = NextActivityName;
        approvalProcessData.value.nextActivityType = NextActivityType;
        const { EmployeeID, EmployeeName } = NextActivityCandidaters != null ? NextActivityCandidaters[0] : [];
        approvalProcessData.value.employeeID = NextActivityCandidaters != null ? EmployeeID : "";
        approvalProcessData.value.employeeName = NextActivityCandidaters != null ? EmployeeName : "";
        approvalProcessData.value.approvalType = 1;
        approvalProcessData.value.refuseType = SupportedStrategies != null && SupportedStrategies.length > 0 ? SupportedStrategies[0] : null;
        approvalProcessData.value.remark = "";
        approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
        approvalProcessData.value.supportedStrategies = SupportedStrategies != null ? SupportedStrategies.map((item) => {
          return {
            text: item == 1 ? "\u6253\u56DE" : item == 2 ? "\u62D2\u7EDD" : "\u9000\u56DE",
            value: item
          };
        }) : [];
        approveDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
    }
    function approveConfirm(obj) {
      submitApproval(obj);
    }
    function submitApproval({ approvalType, refuseType, remark }) {
      share_util_message.showLoading();
      const obj = {
        ID: bill.value.id,
        IsPass: approvalType,
        Remark: remark,
        SupportedStrategies: refuseType,
        IsAdditionalApproval: false,
        AdditionalApprovalEmployeeId: null,
        ActivityName: approvalProcessData.value.activityName,
        ActivityID: approvalProcessData.value.activityID,
        ActivityType: approvalProcessData.value.activityType,
        NextActivityName: approvalProcessData.value.nextActivityName,
        NextActivityID: approvalProcessData.value.nextActivityID,
        NextActivityType: approvalProcessData.value.nextActivityType,
        CandidateApprovers: approvalProcessData.value.nextActivityCandidaters
      };
      service_controller_asset_drawController.drawController.drawSubmitApproval(obj).then(({ ID }) => {
        bill.value.startFlow = false;
        let timer = setTimeout(() => {
          resetApprovalProcessData();
          editGetByID(ID).then(() => {
            approvalClose();
          }).finally(() => share_util_message.clearLoading());
          clearTimeout(timer);
        }, 3e3);
      }).catch(() => share_util_message.clearLoading());
    }
    function approvalClose() {
      approveDialog.value = false;
    }
    function approverChange(val) {
      approvalProcessData.value.nextActivityCandidaters = approverOption.value.filter((p) => p.EmployeeID == val);
    }
    function enablingApprovalShow() {
      share_util_message.showLoading();
      bill.value.enablingApproval = false;
      service_controller_asset_drawController.drawController.drawPreStartFlow(bill.value.id).then(({
        ActivityID,
        ActivityName,
        ActivityType,
        NextActivityID,
        NextActivityName,
        NextActivityType,
        NextActivityCandidaters
      }) => {
        approvalProcessData.value.activityID = ActivityID;
        approvalProcessData.value.activityName = ActivityName;
        approvalProcessData.value.activityType = ActivityType;
        approvalProcessData.value.nextActivityID = NextActivityID;
        approvalProcessData.value.nextActivityName = NextActivityName;
        approvalProcessData.value.nextActivityType = NextActivityType;
        if (NextActivityCandidaters.length != 1 && NextActivityCandidaters != null) {
          approvalProcessData.value.employeeID = null;
          approvalProcessData.value.employeeName = "";
        } else {
          const { EmployeeID, EmployeeName } = NextActivityCandidaters[0];
          approvalProcessData.value.employeeID = EmployeeID ? EmployeeID : null;
          approvalProcessData.value.employeeName = EmployeeName ? EmployeeName : "";
        }
        approvalProcessData.value.nextActivityCandidaters = NextActivityCandidaters;
        approverOption.value = NextActivityCandidaters.map((p) => {
          p.text = p.EmployeeName;
          p.value = p.EmployeeID;
          return p;
        });
        approveStartUpDialog.value = true;
        if (NextActivityCandidaters.length == 1 && bill.value.IsStart || NextActivityType == 2 && bill.value.IsStart) {
          approveStartConfirm();
        } else {
          share_util_message.clearLoading();
        }
      }).catch(() => share_util_message.clearLoading());
    }
    function approveStartConfirm(val) {
      share_util_message.showLoading();
      const approveData = {
        ID: bill.value.id,
        ActivityName: approvalProcessData.value.activityName,
        ActivityID: approvalProcessData.value.activityID,
        ActivityType: approvalProcessData.value.activityType,
        NextActivityName: approvalProcessData.value.nextActivityName,
        NextActivityID: approvalProcessData.value.nextActivityID,
        NextActivityType: approvalProcessData.value.nextActivityType,
        CandidateApprovers: val ? val : approvalProcessData.value.nextActivityCandidaters
      };
      service_controller_asset_drawController.drawController.drawStartFlow(approveData).then(async ({ ID }) => {
        bill.value.startFlow = false;
        await share_util_index.awaitDelay(3e3);
        resetApprovalProcessData();
        await editGetByID(ID);
        approveStartClose();
      }).catch(() => share_util_message.clearLoading());
    }
    function approveStartClose() {
      approveStartUpDialog.value = false;
    }
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
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
    function fabTrigger({ index }) {
      switch (index) {
        case 0:
          scan();
          break;
        case 1:
          scanCodeDialog.value.open();
          break;
        case 2:
          toIndex.value = "listDetail";
          break;
        case 3:
          toIndex.value = "example";
          break;
      }
      fab.value.close();
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
    function select({ tempFilePaths }) {
      share_util_message.showLoading();
      service_controller_asset_assetController.assetController.uploadAttachment(tempFilePaths).then((res) => {
        isfiles.value = false;
        const _files = picturesConvertUni(res);
        files.value.push(..._files);
        common_vendor.nextTick(() => {
          isfiles.value = true;
        });
      }).finally(() => share_util_message.clearLoading());
    }
    function deletefile({ tempFile }) {
      const i = files.value.findIndex((p) => p === tempFile);
      files.value.splice(i, 1);
      isfiles.value = false;
      common_vendor.nextTick(() => {
        isfiles.value = true;
      });
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
      console.log(key);
      console.log(corpId);
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
    function processTrack() {
      share_util_message.showLoading();
      service_controller_asset_drawController.drawController.drawGetFlowTrail(bill.value.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
        console.log(processTrackApprovalLog.value);
        console.log(processTrackApprovalTask.value);
      }).finally(() => share_util_message.clearLoading());
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
      type,
      IsScroll,
      bill,
      fabPattern,
      fabContent,
      fabTrigger,
      fab,
      billDetail,
      rowDetail,
      deleteOperationBtn,
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
      approvalShow,
      approveDialog,
      approveConfirm,
      submitApproval,
      approvalClose,
      approveStartUpDialog,
      approvalProcessData,
      approverOption,
      approverChange,
      enablingApprovalShow,
      approveStartConfirm,
      approveStartClose,
      resetApprovalProcessData,
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
      scanCodeDialog,
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
      processTrack,
      processTrackDialog,
      processTrackApprovalLog,
      processTrackApprovalTask,
      filePicker,
      select,
      files,
      isfiles,
      deletefile,
      fileExtType: service_enumeration_fileExtType.fileExtType,
      toIndex,
      sign
    };
  }
};
if (!Array) {
  const _component_StartApprovalProcess = common_vendor.resolveComponent("StartApprovalProcess");
  const _component_Approval = common_vendor.resolveComponent("Approval");
  const _component_ProcessTrack = common_vendor.resolveComponent("ProcessTrack");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_cancel_dialog2 = common_vendor.resolveComponent("uni-popup-cancel-dialog");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_cancel_dialog2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_cancel_dialog = () => "../../../components/uni-popup-cancel-dialog/uni-popup-cancel-dialog.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_cancel_dialog + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.approveStartUpDialog
  }, $setup.approveStartUpDialog ? {
    b: common_vendor.o($setup.approveStartConfirm),
    c: common_vendor.o(($event) => $setup.approveStartUpDialog = false),
    d: common_vendor.p({
      approverOption: $setup.approverOption,
      approvalProcessData: $setup.approvalProcessData
    })
  } : {}, {
    e: $setup.approveDialog
  }, $setup.approveDialog ? {
    f: common_vendor.o($setup.approveConfirm),
    g: common_vendor.o(($event) => $setup.approveDialog = false),
    h: common_vendor.p({
      approvalProcessData: $setup.approvalProcessData
    })
  } : {}, {
    i: $setup.processTrackDialog
  }, $setup.processTrackDialog ? {
    j: common_vendor.o(($event) => $setup.processTrackDialog = false),
    k: common_vendor.p({
      processTrackApprovalTask: $setup.processTrackApprovalTask,
      processTrackApprovalLog: $setup.processTrackApprovalLog
    })
  } : {}, {
    l: common_vendor.o($setup.dialogRemarkInputConfirm),
    m: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    n: common_vendor.p({
      type: "dialog"
    }),
    o: common_vendor.o($setup.dialogRequestBillCodeInputConfirm),
    p: common_vendor.p({
      mode: "input",
      title: "\u7533\u9886\u5355\u53F7",
      value: "",
      placeholder: "\u5355\u53F7/\u7533\u9886\u4EBA\u5458"
    }),
    q: common_vendor.p({
      type: "dialog"
    }),
    r: common_vendor.o($setup.dialogsearchCodeValConfirm),
    s: common_vendor.p({
      mode: "input",
      title: "\u8D44\u4EA7\u641C\u7D22",
      value: "",
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    }),
    t: common_vendor.p({
      type: "dialog"
    }),
    v: common_vendor.f($setup.requestBillCodeList, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.BillCode),
        b: common_vendor.t(item.RequestDate),
        c: common_vendor.t(item.RequestOrgName),
        d: common_vendor.t(item.RequesterEmployeeName),
        e: common_vendor.t(item.RequestReasonText),
        f: common_vendor.t(item.IsClosedText),
        g: common_vendor.t(item.BillerEmployeeName),
        h: common_vendor.t(item.BillDateTime),
        i: common_vendor.o(($event) => $setup.selectRequisitionNo(item)),
        j: "fbd852b4-12-" + i0 + ",fbd852b4-11"
      };
    }),
    w: _ctx.ID,
    x: common_vendor.p({
      link: true
    }),
    y: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    z: common_vendor.o(($event) => $setup.requestBillCodeListDialog.close()),
    A: common_vendor.p({
      title: "\u9009\u62E9\u7533\u9886\u5355\u53F7",
      type: "info",
      ["before-close"]: true
    }),
    B: common_vendor.p({
      type: "dialog"
    }),
    C: common_vendor.f($setup.searchAssetList, ({
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
        j: "fbd852b4-16-" + i0 + ",fbd852b4-15"
      };
    }),
    D: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    E: common_vendor.o(($event) => $setup.assetDialog.close()),
    F: common_vendor.o($setup.assetDialogConfirm),
    G: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    H: common_vendor.p({
      type: "dialog"
    }),
    I: common_vendor.o($setup.submitDialogConfirm),
    J: common_vendor.o($setup.submitDialogClose),
    K: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    L: common_vendor.p({
      type: "dialog"
    }),
    M: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    N: common_vendor.o($setup.fabTrigger),
    O: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    P: common_vendor.t($setup.rowDetail.kAO.value ? $setup.rowDetail.kAO.name : "\u8BF7\u9009\u62E9"),
    Q: common_vendor.n($setup.rowDetail.kAO.value ? "info-item-color" : ""),
    R: common_vendor.o(($event) => $setup.corpDeptSelect("kAO")),
    S: $setup.rowDetail.kAO.value
  }, $setup.rowDetail.kAO.value ? {
    T: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("kAO")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    V: common_vendor.t($setup.rowDetail.kAE.value ? $setup.rowDetail.kAE.name : "\u8BF7\u9009\u62E9"),
    W: common_vendor.n($setup.rowDetail.kAE.value ? "info-item-color" : ""),
    X: common_vendor.o(($event) => $setup.personnelSelect("kAE")),
    Y: $setup.rowDetail.kAE.value
  }, $setup.rowDetail.kAE.value ? {
    Z: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("kAE")),
    aa: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ab: common_vendor.t($setup.rowDetail.location.value ? $setup.rowDetail.location.name : "\u8BF7\u9009\u62E9"),
    ac: common_vendor.n($setup.rowDetail.location.value ? "info-item-color" : ""),
    ad: common_vendor.o(($event) => $setup.locationSelect("location")),
    ae: $setup.rowDetail.location.value
  }, $setup.rowDetail.location.value ? {
    af: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("location")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ah: common_vendor.o($setup.isPublicAssetSwitchChange),
    ai: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.rowDetail.isPublicAsset.value
    }),
    aj: common_vendor.t($setup.rowDetail.uAO.value ? $setup.rowDetail.uAO.name : "\u8BF7\u9009\u62E9"),
    ak: common_vendor.n($setup.rowDetail.uAO.value ? "info-item-color" : ""),
    al: common_vendor.o(($event) => $setup.corpDeptSelect("uAO")),
    am: $setup.rowDetail.uAO.value
  }, $setup.rowDetail.uAO.value ? {
    an: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("uAO")),
    ao: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    ap: common_vendor.t($setup.rowDetail.uAE.value ? $setup.rowDetail.uAE.name : "\u8BF7\u9009\u62E9"),
    aq: common_vendor.n($setup.rowDetail.uAE.value ? "info-item-color" : ""),
    ar: common_vendor.o(($event) => $setup.personnelSelect("uAE")),
    as: $setup.rowDetail.uAE.value
  }, $setup.rowDetail.uAE.value ? {
    at: common_vendor.o(($event) => $setup.removeEditDetailInputInfo("uAE")),
    av: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}, {
    aw: common_vendor.p({
      disabled: $setup.rowDetail.isPublicAsset.value
    }),
    ax: common_vendor.o($setup.editDetailConfirm),
    ay: common_vendor.o($setup.editDetailClose),
    az: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    aA: common_vendor.p({
      type: "center"
    }),
    aB: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    aC: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aD: common_vendor.f(2, (s, k0, i0) => {
      return {};
    })
  } : {}, {
    aE: common_vendor.p({
      disabled: true
    }),
    aF: common_vendor.t($setup.bill.drawAssetDate.value ? $setup.bill.drawAssetDate.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    aG: common_vendor.o((...args) => $setup.drawAssetDateChange && $setup.drawAssetDateChange(...args)),
    aH: common_vendor.n($setup.bill.drawAssetDate.value ? "info-item-color" : ""),
    aI: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aJ: $setup.nonEditable ? false : $setup.bill.drawAssetDate.value
  }, ($setup.nonEditable ? false : $setup.bill.drawAssetDate.value) ? {
    aK: common_vendor.o(($event) => $setup.removeInput("drawAssetDate")),
    aL: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aM: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aN: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aO: common_vendor.t($setup.bill.drawAssetEmployee.value ? $setup.bill.drawAssetEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    aP: common_vendor.n($setup.bill.drawAssetEmployee.value ? "info-item-color" : ""),
    aQ: common_vendor.o(($event) => $setup.personnelSelect("drawAssetEmployee")),
    aR: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aS: $setup.nonEditable ? false : $setup.bill.drawAssetEmployee.value
  }, ($setup.nonEditable ? false : $setup.bill.drawAssetEmployee.value) ? {
    aT: common_vendor.o(($event) => $setup.removeInput("drawAssetEmployee")),
    aU: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aV: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aW: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aX: common_vendor.t($setup.bill.requestDrawBillCode.value ? $setup.bill.requestDrawBillCode.code : "\u5173\u8054\u7533\u8BF7\u5355\u53F7"),
    aY: common_vendor.n($setup.bill.requestDrawBillCode.value ? "info-item-color" : ""),
    aZ: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRequestBillCodeDialog()),
    ba: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bb: $setup.nonEditable ? false : $setup.bill.requestDrawBillCode.value
  }, ($setup.nonEditable ? false : $setup.bill.requestDrawBillCode.value) ? {
    bc: common_vendor.o(($event) => $setup.removeInput("requestDrawBillCode")),
    bd: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    be: common_vendor.o(($event) => $setup.scanInput("requestDrawBillCode")),
    bf: common_vendor.p({
      type: "scan",
      size: "16"
    }),
    bg: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bh: common_vendor.o($setup.switchChange),
    bi: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.bill.isClosedRequestDraw.value,
      disabled: $setup.nonEditable
    }),
    bj: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    bk: common_vendor.n($setup.bill.remark ? "info-item-color" : ""),
    bl: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRemarkDialog()),
    bm: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bn: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bo: common_vendor.o(($event) => $setup.removeInput("remark")),
    bp: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bq: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    br: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bs: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bt: common_vendor.f($setup.billDetail, ({
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
      isOpened
    }, index, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(CategoryName),
        d: common_vendor.t(OriginalCode),
        e: common_vendor.t(OriginalAmount),
        f: common_vendor.t(NewKAOName),
        g: common_vendor.t(NewKAEName),
        h: common_vendor.t(NewUAOName),
        i: common_vendor.t(NewUAEName),
        j: common_vendor.t(NewLocationName),
        k: common_vendor.t(IsPublicAsset ? "\u662F" : "\u5426"),
        l: common_vendor.t(Brand),
        m: common_vendor.t(Spec),
        n: common_vendor.t(Model),
        o: common_vendor.t(Qty),
        p: common_vendor.o(($event) => $setup.editBillDetail(index)),
        q: "fbd852b4-49-" + i0 + "," + ("fbd852b4-48-" + i0),
        r: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        s: index,
        t: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        v: "fbd852b4-48-" + i0 + ",fbd852b4-47",
        w: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bv: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bw: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bx: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    by: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bz: common_vendor.o($setup.select),
    bA: common_vendor.o($setup.deletefile),
    bB: common_vendor.o(($event) => $setup.files = $event),
    bC: common_vendor.p({
      limit: 9,
      disabled: $setup.nonEditable,
      ["del-icon"]: !$setup.nonEditable,
      ["file-mediatype"]: "all",
      ["file-extname"]: $setup.fileExtType.all,
      mode: "grid",
      ["auto-upload"]: false,
      title: "\u6700\u591A\u9009\u62E99\u4E2A\u9644\u4EF6",
      modelValue: $setup.files
    })
  }) : {}, {
    bD: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bE: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bF: common_vendor.o(($event) => $setup.toIndex = ""),
    bG: $setup.toIndex,
    bH: $setup.nonEditable
  }, $setup.nonEditable ? {
    bI: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bJ: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bK: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bL: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bM: common_vendor.o($setup.jumpList),
    bN: common_vendor.o($setup.processTrack),
    bO: common_vendor.o($setup.approvalShow),
    bP: common_vendor.o($setup.enablingApprovalShow),
    bQ: common_vendor.o($setup.sign),
    bR: common_vendor.o($setup.handleSaveDraft),
    bS: common_vendor.o($setup.deleteDialogConfirm),
    bT: common_vendor.p({
      type: $setup.type,
      bill: $setup.bill
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fbd852b4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/draw/drawDetail.vue"]]);
my.createPage(MiniProgramPage);
