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
var service_controller_asset_transformController = require("../../../service/controller/asset/transformController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_index = require("../../../share/util/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var service_enumeration_fileExtType = require("../../../service/enumeration/fileExtType.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/http/http.js");
require("../../../service/enumeration/fileTypeEnum.js");
require("../../../share/util/page.js");
require("../../../service/enumeration/productEnum.js");
require("../../../service/controller/controllerBase/systemControllerBase.js");
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
      transferType: {
        hint: "\u8F6C\u79FB\u7C7B\u578B",
        text: "",
        value: null,
        options: [
          {
            text: "\u516C\u53F8\u5185\u8F6C\u79FB",
            value: 1
          },
          {
            text: "\u8DE8\u516C\u53F8\u8F6C\u79FB",
            value: 2
          }
        ]
      },
      NewCorp: {
        hint: "\u6240\u5C5E\u516C\u53F8",
        text: "",
        value: null
      },
      NewKAO: {
        hint: "\u7BA1\u7406\u90E8\u95E8",
        text: "",
        value: null
      },
      NewKAE: {
        hint: "\u7BA1\u7406\u4EBA\u5458",
        text: "",
        value: null
      },
      IsTransformToPublic: {
        hint: "\u516C\u5171\u8D44\u4EA7",
        value: false
      },
      NewUAO: {
        hint: "\u4F7F\u7528\u90E8\u95E8",
        text: "",
        value: null
      },
      NewUAE: {
        hint: "\u4F7F\u7528\u4EBA\u5458",
        text: "",
        value: null
      },
      NewLocation: {
        hint: "\u5B58\u653E\u4F4D\u7F6E",
        text: "",
        value: null
      },
      applyReason: {
        hint: "\u8F6C\u79FB\u539F\u56E0",
        text: "",
        value: null
      },
      remark: "",
      IsStart: false,
      startFlow: true,
      IsApproval: false,
      FlowPath: false,
      enablingApproval: false
    });
    const applyReasonOption = common_vendor.ref([]);
    const fabPattern = {
      color: "#7A7E83",
      backgroundColor: "#fff",
      selectedColor: "#007AFF",
      buttonColor: "#007AFF",
      iconColor: "#fff"
    };
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
    const remarkVal = common_vendor.ref("");
    const billDetail = common_vendor.ref([]);
    const deleteOperationBtn = common_vendor.ref([]);
    deleteOperationBtn.value = [
      { text: "\u53D6\u6D88", style: { backgroundColor: "#007aff" } },
      { text: "\u5220\u9664", style: { backgroundColor: "#F56C6C" } }
    ];
    const isOpened = common_vendor.ref("none");
    const inputRemarkDialog = common_vendor.ref(null);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
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
    const scanCodeDialog = common_vendor.ref(null);
    const searchCodeVal = common_vendor.ref("");
    const toIndex = common_vendor.ref("");
    const filePicker = common_vendor.ref(null);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const windowHeights = common_vendor.ref("");
    const serachAssetList = common_vendor.ref([]);
    const assetDialog = common_vendor.ref(null);
    const fab = common_vendor.ref(null);
    function sign() {
      common_vendor.index.navigateTo({
        url: `/pages/system/signConfirm/signConfirm?type=1&key=103&billID=${bill.value.id}`
      });
    }
    function applyReasonHandle(val) {
      bill.value.applyReason.text = applyReasonOption.value.filter((p) => p.value == val)[0].text;
      bill.value.applyReason.value = val;
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
    function openRemarkDialog() {
      remarkVal.value = bill.value.remark;
      inputRemarkDialog.value.open();
    }
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
      remarkVal.value = val.trim();
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_transformController.transformController.transformDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.transformDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.transferType.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7533\u9886\u7C7B\u578B");
        return;
      }
      if (bill.value.transferType.value == 2 && !bill.value.NewCorp.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u6240\u5C5E\u516C\u53F8");
        return;
      }
      if (!bill.value.applyReason.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u8F6C\u79FB\u539F\u56E0");
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
      obj.CommitType = bill.value.id ? 1 : 0;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.TransformType = bill.value.transferType.value;
      obj.NewCorpID = bill.value.NewCorp.value;
      obj.NewCorpNameCN = bill.value.NewCorp.text;
      obj.NewCorpNameEN = bill.value.NewCorp.text;
      obj.NewKAOID = bill.value.NewKAO.value;
      obj.NewKAONameCN = bill.value.NewKAO.text;
      obj.NewKAONameEN = bill.value.NewKAO.text;
      obj.NewKAEID = bill.value.NewKAE.value;
      obj.NewKAEName = bill.value.NewKAE.text;
      obj.IsTransformToPublic = bill.value.IsTransformToPublic.value;
      obj.NewUAOID = bill.value.NewUAO.value;
      obj.NewUAONameCN = bill.value.NewUAO.text;
      obj.NewUAONameEN = bill.value.NewUAO.text;
      obj.NewUAEID = bill.value.NewUAE.value;
      obj.NewUAEName = bill.value.NewUAE.text;
      obj.NewLocationID = bill.value.NewLocation.value;
      obj.NewLocationNameCN = bill.value.NewLocation.text;
      obj.NewLocationNameEN = bill.value.NewLocation.text;
      obj.TransferReason = bill.value.applyReason.value;
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
      service_controller_asset_transformController.transformController.transformSaveDraft(obj).then(({ Code, ID }) => {
        editGetByID(ID).then(() => {
          if (bill.value.IsStart) {
            enablingApprovalShow();
          }
        });
        submitDialogClose();
      }).finally(() => share_util_message.clearLoading());
    }
    let nonEditable = common_vendor.ref(false);
    function editGetByID(id2) {
      share_util_message.showLoading();
      return service_controller_asset_transformController.transformController.transformGetByID(id2).then(({
        ID,
        Status,
        BillCode,
        TransformTypeText,
        TransformType,
        NewCorpID,
        NewCorpName,
        NewLocationName,
        NewLocationID,
        NewKAOName,
        NewKAOID,
        NewKAEName,
        NewKAEID,
        NewUAOName,
        NewUAOID,
        NewUAEName,
        NewUAEID,
        TransferReason,
        TransferReasonText,
        IsTransformToPublic,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = ID;
        bill.value.status = Status;
        bill.value.code = BillCode;
        bill.value.transferType.text = TransformTypeText;
        bill.value.transferType.value = TransformType;
        bill.value.NewCorp.value = NewCorpID;
        bill.value.NewCorp.text = NewCorpName;
        bill.value.NewLocation.value = NewLocationID;
        bill.value.NewLocation.text = NewLocationName;
        bill.value.NewKAO.text = NewKAOName;
        bill.value.NewKAO.value = NewKAOID;
        bill.value.NewKAE.text = NewKAEName;
        bill.value.NewKAE.value = NewKAEID;
        bill.value.IsTransformToPublic.value = IsTransformToPublic;
        bill.value.NewUAO.text = NewUAOName;
        bill.value.NewUAO.value = NewUAOID;
        bill.value.NewUAE.text = NewUAEName;
        bill.value.NewUAE.value = NewUAEID;
        bill.value.applyReason.value = TransferReason;
        bill.value.applyReason.text = TransferReasonText;
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
      share_redirect_index.navigateTo("/subcontract/asset/transform/list");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });
    {
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D018").then(({ Items }) => {
        applyReasonOption.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
      });
      if (id) {
        editGetByID(id);
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.signBack, () => editGetByID(bill.value.id));
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
      service_controller_asset_transformController.transformController.transformPrevApproval(bill.value.id).then((dataInfo) => {
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
      service_controller_asset_transformController.transformController.transformSubmitApproval(obj).then(({ ID }) => {
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
      service_controller_asset_transformController.transformController.transformPreStartFlow(bill.value.id).then(({
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
      service_controller_asset_transformController.transformController.transformStartFlow(approveData).then(async ({ ID }) => {
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
    function processTrack() {
      share_util_message.showLoading();
      service_controller_asset_transformController.transformController.requestDrawGetFlowTrail(bill.value.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_transformController.transformController.assetListQueryByBillType(keyWorld).then(({ Items }) => {
        serachAssetList.value = Items.map((p) => {
          p.checked = false;
          return p;
        });
        if (serachAssetList.value.length < 1) {
          share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7\u8D44\u6599");
          return;
        }
        assetDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function assetDialogConfirm() {
      let items = serachAssetList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        share_util_message.showErrorToast("\u8BF7\u52FE\u9009\u4E00\u6761\u6570\u636E");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.AssetID == arr[i].ID);
        if (check.length < 1) {
          let obj = {};
          obj.ID = null;
          obj.isOpened = "none";
          obj.AssetID = arr[i].ID;
          obj.Name = arr[i].Name;
          obj.Code = arr[i].Code;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.CategoryID = arr[i].CategoryID;
          obj.CategoryName = arr[i].CategoryName;
          obj.CategoryNameCN = arr[i].CategoryNameCN;
          obj.CategoryNameEN = arr[i].CategoryNameEN;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalKAOID = arr[i].KAOID;
          obj.OriginalKAOName = arr[i].KAOName;
          obj.OriginalKAONameCN = arr[i].KAONameCN;
          obj.OriginalKAONameEN = arr[i].KAONameEN;
          obj.OriginalKAEID = arr[i].KAEID;
          obj.OriginalKAEName = arr[i].KAEName;
          obj.OriginalUAOID = arr[i].UAOID;
          obj.OriginalUAOName = arr[i].UAOName;
          obj.OriginalUAONameCN = arr[i].UAONameCN;
          obj.OriginalUAONameEN = arr[i].UAONameEN;
          obj.OriginalUAEID = arr[i].UAEID;
          obj.OriginalUAEName = arr[i].UAEName;
          obj.OriginalLocationID = arr[i].LocationID;
          obj.OriginalLocationName = arr[i].LocationName;
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
      serachAssetList.value = [];
    }
    function checkBoxChange(e, Id) {
      let values = e.detail.value, items = serachAssetList.value;
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
    function locationSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ id: id2, label }) => {
        bill.value[key].value = id2;
        bill.value[key].text = label;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${_id}`);
    }
    function corpDeptSelect(key, isPower) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ id: id2, label }) => {
        bill.value[key].value = id2;
        bill.value[key].text = label;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=0&type=${key == "NewCorp" ? 2 : 1}&ids=${_id}&isPower=${isPower}`);
    }
    function dialogsearchCodeValConfirm(val) {
      const str = val.trim();
      if (str == "" || str == null || str == void 0) {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      addQuery(str);
    }
    function fabTrigger({ index }) {
      switch (index) {
        case 0:
          scan();
          break;
        case 1:
          searchCodeVal.value = "";
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
    function removeInput(key) {
      if (key == "NewCorp" || key == "NewLocation" || key == "NewKAE" || key == "NewUAE" || key == "applyReason" || key == "transferType") {
        bill.value[key].text = "";
        bill.value[key].value = null;
        return;
      }
      if (key == "NewKAO") {
        bill.value.NewKAO.text = "";
        bill.value.NewKAO.value = null;
        bill.value.NewKAE.text = "";
        bill.value.NewKAE.value = null;
        return;
      }
      if (key == "NewUAO") {
        bill.value.NewUAO.text = "";
        bill.value.NewUAO.value = null;
        bill.value.NewUAE.text = "";
        bill.value.NewUAE.value = null;
        return;
      }
      if (key == "remark") {
        bill.value.remark = "";
        return;
      }
    }
    function switchChange(e) {
      bill.value.IsTransformToPublic.value = e.value;
      if (e.value) {
        bill.value.NewUAE.value = null;
        bill.value.NewUAE.text = "";
      }
    }
    function transferTypeChange(val) {
      bill.value.transferType.text = bill.value.transferType.options.filter((p) => p.value == val)[0].text;
      bill.value.transferType.value = val;
      if (val == 1) {
        bill.value.NewCorp.text = "";
        bill.value.NewCorp.value = null;
      }
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
    function personnelSelect(key) {
      if (key == "NewKAE" && !bill.value.NewKAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u7BA1\u7406\u90E8\u95E8");
        return;
      }
      if (key == "NewUAE" && !bill.value.NewUAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u4F7F\u7528\u90E8\u95E8");
        return;
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=0&corpID=${key == "NewKAE" ? bill.value.NewKAO.value : key == "NewUAE" ? bill.value.NewUAO.value : ""}&ids=${_id}`);
    }
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    let IsScroll = common_vendor.computed$1(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 315) {
        header = 315;
        content = windowHeights.value - 375;
      } else {
        header = content = (windowHeights.value - 60) / 2;
      }
      return { header, content };
    });
    return {
      type,
      IsScroll,
      bill,
      applyReasonOption,
      applyReasonHandle,
      billDetail,
      deleteOperationBtn,
      isOpened,
      uniSwipeChange,
      uniSwipeClick,
      dialogRemarkInputConfirm,
      fabPattern,
      fabContent,
      remarkVal,
      inputRemarkDialog,
      openRemarkDialog,
      deleteDialogConfirm,
      handleSaveDraft,
      submitDialog,
      submitMsgType,
      submitDialogConfirm,
      submitDialogClose,
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
      processTrackDialog,
      processTrackApprovalLog,
      processTrackApprovalTask,
      processTrack,
      jumpList,
      scanCodeDialog,
      searchCodeVal,
      serachAssetList,
      assetDialog,
      assetDialogConfirm,
      addQuery,
      fab,
      dialogsearchCodeValConfirm,
      windowHeights,
      locationSelect,
      corpDeptSelect,
      fabTrigger,
      checkBoxChange,
      removeInput,
      switchChange,
      sign,
      transferTypeChange,
      personnelSelect,
      filePicker,
      select,
      files,
      isfiles,
      deletefile,
      fileExtType: service_enumeration_fileExtType.fileExtType,
      toIndex
    };
  }
};
if (!Array) {
  const _component_StartApprovalProcess = common_vendor.resolveComponent("StartApprovalProcess");
  const _component_Approval = common_vendor.resolveComponent("Approval");
  const _component_ProcessTrack = common_vendor.resolveComponent("ProcessTrack");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_fab2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_fab + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
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
    o: common_vendor.o($setup.submitDialogConfirm),
    p: common_vendor.o($setup.submitDialogClose),
    q: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    r: common_vendor.p({
      type: "dialog"
    }),
    s: common_vendor.o($setup.dialogsearchCodeValConfirm),
    t: common_vendor.p({
      mode: "input",
      title: "\u8D44\u4EA7\u641C\u7D22",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    }),
    v: common_vendor.p({
      type: "dialog"
    }),
    w: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    x: common_vendor.o($setup.fabTrigger),
    y: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    z: common_vendor.f($setup.serachAssetList, ({
      ID,
      Name,
      Code,
      CategoryName,
      Brand,
      Spec,
      Model,
      checked
    }, k0, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(CategoryName),
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: checked,
        h: common_vendor.o(($event) => $setup.checkBoxChange($event, ID)),
        i: ID,
        j: "18cb46fe-13-" + i0 + ",18cb46fe-12"
      };
    }),
    A: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    B: common_vendor.o(($event) => $setup.assetDialog.close()),
    C: common_vendor.o($setup.assetDialogConfirm),
    D: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    E: common_vendor.p({
      type: "dialog"
    }),
    F: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    G: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    H: common_vendor.p({
      disabled: true
    }),
    I: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    J: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "J",
      vueId: "18cb46fe-17,18cb46fe-16"
    }),
    K: common_vendor.t($setup.bill.transferType.value ? $setup.bill.transferType.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B"),
    L: common_vendor.n($setup.bill.transferType.value ? "info-item-color" : ""),
    M: common_vendor.o($setup.transferTypeChange),
    N: common_vendor.o(($event) => $setup.bill.transferType.value = $event),
    O: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.bill.transferType.options,
      modelValue: $setup.bill.transferType.value
    })
  } : {
    P: common_vendor.t($setup.bill.transferType.value ? $setup.bill.transferType.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B"),
    Q: common_vendor.n($setup.bill.transferType.value ? "info-item-color" : "")
  }, {
    R: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    S: $setup.nonEditable ? false : $setup.bill.transferType.value
  }, ($setup.nonEditable ? false : $setup.bill.transferType.value) ? {
    T: common_vendor.o(($event) => $setup.removeInput("transferType")),
    U: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    V: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    W: $setup.bill.transferType.value == 2
  }, $setup.bill.transferType.value == 2 ? {} : {}, {
    X: common_vendor.n($setup.bill.transferType.value == 2 ? "" : "ensp"),
    Y: common_vendor.t($setup.bill.NewCorp.value ? $setup.bill.NewCorp.text : "\u8BF7\u9009\u62E9\u6240\u5C5E\u516C\u53F8"),
    Z: common_vendor.n($setup.bill.NewCorp.value ? "info-item-color" : ""),
    aa: common_vendor.o(($event) => $setup.corpDeptSelect("NewCorp", 0)),
    ab: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ac: $setup.nonEditable ? false : $setup.bill.NewCorp.value
  }, ($setup.nonEditable ? false : $setup.bill.NewCorp.value) ? {
    ad: common_vendor.o(($event) => $setup.removeInput("NewCorp")),
    ae: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    af: common_vendor.p({
      disabled: $setup.nonEditable ? true : $setup.bill.transferType.value == 1
    }),
    ag: common_vendor.t($setup.bill.NewLocation.value ? $setup.bill.NewLocation.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    ah: common_vendor.n($setup.bill.NewLocation.value ? "info-item-color" : ""),
    ai: common_vendor.o(($event) => $setup.locationSelect("NewLocation")),
    aj: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ak: $setup.nonEditable ? false : $setup.bill.NewLocation.value
  }, ($setup.nonEditable ? false : $setup.bill.NewLocation.value) ? {
    al: common_vendor.o(($event) => $setup.removeInput("NewLocation")),
    am: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    an: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ao: common_vendor.t($setup.bill.NewKAO.value ? $setup.bill.NewKAO.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u90E8\u95E8"),
    ap: common_vendor.n($setup.bill.NewKAO.value ? "info-item-color" : ""),
    aq: common_vendor.o(($event) => $setup.corpDeptSelect("NewKAO", 0)),
    ar: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    as: $setup.nonEditable ? false : $setup.bill.NewKAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAO.value) ? {
    at: common_vendor.o(($event) => $setup.removeInput("NewKAO")),
    av: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aw: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ax: common_vendor.t($setup.bill.NewKAE.value ? $setup.bill.NewKAE.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u4EBA\u5458"),
    ay: common_vendor.n($setup.bill.NewKAE.value ? "info-item-color" : ""),
    az: common_vendor.o(($event) => $setup.personnelSelect("NewKAE")),
    aA: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aB: $setup.nonEditable ? false : $setup.bill.NewKAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAE.value) ? {
    aC: common_vendor.o(($event) => $setup.removeInput("NewKAE")),
    aD: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aE: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aF: common_vendor.o($setup.switchChange),
    aG: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.bill.IsTransformToPublic.value,
      disabled: $setup.nonEditable
    }),
    aH: common_vendor.t($setup.bill.NewUAO.value ? $setup.bill.NewUAO.text : "\u8BF7\u9009\u62E9\u4F7F\u7528\u90E8\u95E8"),
    aI: common_vendor.n($setup.bill.NewUAO.value ? "info-item-color" : ""),
    aJ: common_vendor.o(($event) => $setup.corpDeptSelect("NewUAO", 0)),
    aK: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aL: $setup.nonEditable ? false : $setup.bill.NewUAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewUAO.value) ? {
    aM: common_vendor.o(($event) => $setup.removeInput("NewUAO")),
    aN: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aO: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aP: !$setup.bill.IsTransformToPublic.value
  }, !$setup.bill.IsTransformToPublic.value ? common_vendor.e({
    aQ: common_vendor.t($setup.bill.NewUAE.value ? $setup.bill.NewUAE.text : "\u8BF7\u9009\u62E9\u4F7F\u7528\u4EBA\u5458"),
    aR: common_vendor.n($setup.bill.NewUAE.value ? "info-item-color" : ""),
    aS: common_vendor.o(($event) => $setup.personnelSelect("NewUAE")),
    aT: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aU: $setup.nonEditable ? false : $setup.bill.NewUAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewUAE.value) ? {
    aV: common_vendor.o(($event) => $setup.removeInput("NewUAE")),
    aW: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aX: common_vendor.p({
      disabled: $setup.nonEditable
    })
  }) : {}, {
    aY: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aZ: common_vendor.w(({
      data,
      error,
      options
    }, s0, i0) => {
      return {
        a: i0,
        b: s0
      };
    }, {
      name: "d",
      path: "aZ",
      vueId: "18cb46fe-33,18cb46fe-32"
    }),
    ba: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u539F\u56E0"),
    bb: common_vendor.n($setup.bill.applyReason.value ? "info-item-color" : ""),
    bc: common_vendor.o($setup.applyReasonHandle),
    bd: common_vendor.o(($event) => $setup.bill.applyReason.value = $event),
    be: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u8F6C\u79FB\u539F\u56E0",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.applyReasonOption,
      modelValue: $setup.bill.applyReason.value
    })
  } : {
    bf: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u539F\u56E0"),
    bg: common_vendor.n($setup.bill.applyReason.value ? "info-item-color" : "")
  }, {
    bh: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bi: $setup.nonEditable ? false : $setup.bill.applyReason.value
  }, ($setup.nonEditable ? false : $setup.bill.applyReason.value) ? {
    bj: common_vendor.o(($event) => $setup.removeInput("applyReason")),
    bk: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bl: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bm: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    bn: common_vendor.n($setup.bill.remark ? "info-item-color" : ""),
    bo: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRemarkDialog()),
    bp: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bq: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    br: common_vendor.o(($event) => $setup.removeInput("remark")),
    bs: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bt: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bv: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    bw: common_vendor.f($setup.billDetail, ({
      Code,
      Name,
      CategoryName,
      OriginalCode,
      OriginalAmount,
      OriginalKAOName,
      OriginalUAOName,
      OriginalUAEName,
      OriginalLocationName,
      Brand,
      Spec,
      Model,
      Unit,
      Qty,
      isOpened
    }, index, i0) => {
      return {
        a: common_vendor.t(Name),
        b: common_vendor.t(Code),
        c: common_vendor.t(OriginalCode),
        d: common_vendor.t(CategoryName),
        e: common_vendor.t(OriginalLocationName),
        f: common_vendor.t(OriginalKAOName),
        g: common_vendor.t(OriginalUAOName),
        h: common_vendor.t(OriginalUAEName),
        i: common_vendor.t(OriginalAmount),
        j: common_vendor.t(Brand),
        k: common_vendor.t(Spec),
        l: common_vendor.t(Model),
        m: common_vendor.t(Qty),
        n: "18cb46fe-40-" + i0 + "," + ("18cb46fe-39-" + i0),
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        p: index,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        r: "18cb46fe-39-" + i0 + ",18cb46fe-38",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bx: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    by: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    bz: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    bA: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bB: common_vendor.o($setup.select),
    bC: common_vendor.o($setup.deletefile),
    bD: common_vendor.o(($event) => $setup.files = $event),
    bE: common_vendor.p({
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
    bF: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bG: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bH: common_vendor.o(($event) => $setup.toIndex = ""),
    bI: $setup.toIndex,
    bJ: $setup.nonEditable
  }, $setup.nonEditable ? {
    bK: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bL: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bM: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bN: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bO: common_vendor.o($setup.jumpList),
    bP: common_vendor.o($setup.processTrack),
    bQ: common_vendor.o($setup.approvalShow),
    bR: common_vendor.o($setup.enablingApprovalShow),
    bS: common_vendor.o($setup.sign),
    bT: common_vendor.o($setup.handleSaveDraft),
    bU: common_vendor.o($setup.deleteDialogConfirm),
    bV: common_vendor.p({
      type: $setup.type,
      bill: $setup.bill
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18cb46fe"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/transform/detail.vue"]]);
my.createPage(MiniProgramPage);
