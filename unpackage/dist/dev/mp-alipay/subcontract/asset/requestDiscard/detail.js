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
var service_controller_asset_requestDiscardController = require("../../../service/controller/asset/requestDiscardController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
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
  setup({ id, type }) {
    const remarkVal = common_vendor.ref("");
    const bill = common_vendor.ref({
      id: null,
      status: null,
      isSubmit: null,
      code: "",
      handlerEmployee: {
        text: share_util_storage.getStorage("UserName"),
        value: share_util_storage.getStorage("EmployeeID")
      },
      handlerOrgID: {
        text: share_util_storage.getStorage("OrgName"),
        value: share_util_storage.getStorage("OrgID")
      },
      requestDiscardDatetime: {
        hint: "\u8BF7\u9009\u62E9\u62A5\u5E9F\u65E5\u671F",
        value: share_util_dateTime.getCurrentDate()
      },
      NewLocation: {
        hint: "\u5B58\u653E\u4F4D\u7F6E",
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
      remark: "",
      IsStart: false,
      startFlow: true,
      FlowPath: false,
      IsApproval: false,
      enablingApproval: false
    });
    const rowDetail = common_vendor.ref({
      name: "",
      code: "",
      reasonVal: "",
      reasonText: "",
      remarks: ""
    });
    const billDetail = common_vendor.ref([]);
    const deleteOperationBtn = common_vendor.ref([]);
    deleteOperationBtn.value = [
      { text: "\u53D6\u6D88", style: { backgroundColor: "#007aff" } },
      { text: "\u5220\u9664", style: { backgroundColor: "#F56C6C" } }
    ];
    const fab = common_vendor.ref(null);
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
    const scanCodeDialog = common_vendor.ref(null);
    const searchCodeVal = common_vendor.ref("");
    let serachAssetList = common_vendor.ref([]);
    const assetsDialog = common_vendor.ref(null);
    const isOpened = common_vendor.ref("none");
    const inputDialog = common_vendor.ref(null);
    const editInfoTitle = common_vendor.ref("");
    const inputRemarkDialog = common_vendor.ref(null);
    const detailIndex = common_vendor.ref(null);
    const approveDialog = common_vendor.ref(false);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
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
    const scrappingReasonVal = common_vendor.ref(null);
    const scrappingReasonText = common_vendor.ref(null);
    const scrappingReason = common_vendor.ref([]);
    const toIndex = common_vendor.ref("");
    common_vendor.ref(null);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const windowHeights = common_vendor.ref("");
    function sign() {
      common_vendor.index.navigateTo({
        url: `/pages/system/signConfirm/signConfirm?type=1&key=106&billID=${bill.value.id}`
      });
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_requestDiscardController.requestDiscardController.assetListQueryByBillType(keyWorld).then(({ Items }) => {
        serachAssetList.value = Items.map((p) => {
          p.checked = false;
          return p;
        });
        if (serachAssetList.value.length < 1) {
          share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7");
          return;
        }
        assetsDialog.value.open();
      }).finally(() => share_util_message.clearLoading());
    }
    function dialogsearchCodeValConfirm(val) {
      const str = val.trim();
      if (str == "" || str == null || str == void 0) {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      addQuery(str);
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
      remarkVal.value = val.trim();
    }
    function editDetailConfirm(val) {
      billDetail.value[detailIndex.value].DiscardReasonID = rowDetail.value.reasonVal;
      billDetail.value[detailIndex.value].DiscardReasonName = rowDetail.value.reasonText;
      billDetail.value[detailIndex.value].DiscardReasonNameCN = rowDetail.value.reasonText;
      billDetail.value[detailIndex.value].DiscardReasonNameEN = rowDetail.value.reasonText;
      billDetail.value[detailIndex.value].RequestDesc = rowDetail.value.remarks;
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.name = null;
      rowDetail.value.code = null;
      rowDetail.value.reasonVal = null;
      rowDetail.value.reasonText = null;
      rowDetail.value.remarks = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { Name, Code, DiscardReasonID, DiscardReasonName, RequestDesc } = billDetail.value[index];
      rowDetail.value.name = Name;
      rowDetail.value.code = Code;
      rowDetail.value.reasonVal = DiscardReasonID;
      rowDetail.value.reasonText = DiscardReasonName;
      rowDetail.value.remarks = RequestDesc;
      openEditDetailDalog(0);
    }
    function scrappingReasonChange(val) {
      const { value, text } = scrappingReason.value.filter((p) => p.value == val)[0];
      rowDetail.value.reasonVal = value;
      rowDetail.value.reasonText = text;
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.requestDiscardDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.requestDiscardDatetime.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u62A5\u5E9F\u65E5\u671F");
        return;
      }
      if (!bill.value.handlerEmployee.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7ECF\u529E\u4EBA");
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
      obj.RequestDiscardDatetime = bill.value.requestDiscardDatetime.value;
      obj.HandlerEmployeeID = bill.value.handlerEmployee.value;
      obj.HandlerEmployeeName = bill.value.handlerEmployee.text;
      obj.HandlerOrgID = bill.value.handlerOrgID.value;
      obj.HandlerOrgNameCN = bill.value.handlerOrgID.text;
      obj.HandlerOrgNameEN = bill.value.handlerOrgID.text;
      obj.NewLocationID = bill.value.NewLocation.value;
      obj.NewLocationNameCN = bill.value.NewLocation.text;
      obj.NewLocationNameEN = bill.value.NewLocation.text;
      obj.NewKAOID = bill.value.NewKAO.value;
      obj.NewKAONameCN = bill.value.NewKAO.text;
      obj.NewKAONameEN = bill.value.NewKAO.text;
      obj.NewKAEID = bill.value.NewKAE.value;
      obj.NewKAEName = bill.value.NewKAE.text;
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
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardSaveDraft(obj).then(({ Code, ID }) => {
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
      return service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardGetByID(id2).then(({
        ID,
        Status,
        BillCode,
        RequestDiscardDatetime,
        HandlerEmployeeID,
        HandlerEmployeeName,
        HandlerOrgID,
        HandlerOrgNameCN,
        NewLocationID,
        NewLocationName,
        NewKAOID,
        NewKAOName,
        NewKAEID,
        NewKAEName,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = ID;
        bill.value.status = Status;
        bill.value.code = BillCode;
        bill.value.requestDiscardDatetime.value = RequestDiscardDatetime ? RequestDiscardDatetime.substring(0, 10) : "";
        bill.value.handlerEmployee.value = HandlerEmployeeID;
        bill.value.handlerEmployee.text = HandlerEmployeeName;
        bill.value.handlerOrgID.value = HandlerOrgID;
        bill.value.handlerOrgID.text = HandlerOrgNameCN;
        bill.value.NewLocation.value = NewLocationID;
        bill.value.NewLocation.text = NewLocationName;
        bill.value.NewKAO.value = NewKAOID;
        bill.value.NewKAO.text = NewKAOName;
        bill.value.NewKAE.value = NewKAEID;
        bill.value.NewKAE.text = NewKAEName;
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
      share_redirect_index.navigateTo("/subcontract/asset/requestDiscard/list");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });
    {
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D004").then(({ Items }) => {
        scrappingReason.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
        const { ID, ItemText } = Items.filter((p) => p.IsDefaultItem)[0];
        scrappingReasonVal.value = ID;
        scrappingReasonText.value = ItemText;
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
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardPrevApproval(bill.value.id).then((dataInfo) => {
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
    function submitApproval({
      approvalType,
      refuseType,
      remark
    }) {
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
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardSubmitApproval(obj).then(({ ID }) => {
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
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardPreStartFlow(bill.value.id).then(({
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
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardStartFlow(approveData).then(async ({ ID }) => {
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
    function assetsDialogConfirm() {
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
          obj.AssetID = arr[i].ID;
          obj.ID = null;
          obj.BillID = null;
          obj.Name = arr[i].Name;
          obj.Code = arr[i].Code;
          obj.CategoryID = arr[i].CategoryID;
          obj.CategoryName = arr[i].CategoryName;
          obj.CategoryNameCN = arr[i].CategoryNameCN;
          obj.CategoryNameEN = arr[i].CategoryNameEN;
          obj.DiscardReasonID = scrappingReasonVal.value;
          obj.DiscardReasonName = scrappingReasonText.value;
          obj.DiscardReasonNameCN = scrappingReasonText.value;
          obj.DiscardReasonNameEN = scrappingReasonText.value;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.RequestDesc = null;
          obj.isOpened = "none";
          obj.Qty = 1;
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
      assetsDialog.value.close();
      serachAssetList.value = [];
    }
    function scan() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          addQuery(share_util_index.getScanCode(result));
        }
      });
    }
    function processTrack() {
      share_util_message.showLoading();
      service_controller_asset_requestDiscardController.requestDiscardController.requestDiscardGetFlowTrail(bill.value.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
    }
    function removeInput(key) {
      if (key == "requestDiscardDatetime") {
        bill.value.requestDiscardDatetime.value = "";
        return;
      }
      if (key == "NewLocation" || key == "NewKAE") {
        bill.value[key].text = "";
        bill.value[key].value = null;
        return;
      }
      if (key == "NewKAO") {
        bill.value[key].text = "";
        bill.value[key].value = null;
        bill.value.NewKAE.text = "";
        bill.value.NewKAE.value = null;
      }
      if (key == "handlerEmployee") {
        bill.value.handlerEmployee.text = "";
        bill.value.handlerEmployee.value = null;
        bill.value.handlerOrgID.text = "";
        bill.value.handlerOrgID.value = null;
        return;
      }
      if (key == "remark") {
        bill.value.remark = "";
        return;
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
    function locationSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.locationSelectBack, ({ id: id2, label }) => {
        bill.value[key].value = id2;
        bill.value[key].text = label;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/asset/location?isLast=1&multiple=0&ids=${_id}`);
    }
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ id: id2, label }) => {
        bill.value[key].value = id2;
        bill.value[key].text = label;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=0&type=${key == "NewCorp" ? 2 : 1}&ids=${_id}`);
    }
    function personnelSelect(key) {
      if (key == "NewKAE" && !bill.value.NewKAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u7BA1\u7406\u90E8\u95E8");
        return;
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
        if (key == "handlerEmployee") {
          bill.value.handlerOrgID.value = OrgID;
          bill.value.handlerOrgID.text = OrgName;
        }
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=0&corpID=${key == "NewKAE" ? bill.value.NewKAO.value : ""}&ids=${_id}`);
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
      billDetail,
      remarkVal,
      rowDetail,
      deleteOperationBtn,
      isOpened,
      uniSwipeChange,
      uniSwipeClick,
      inputDialog,
      openEditDetailDalog,
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
      approverOption,
      approverChange,
      approvalProcessData,
      enablingApprovalShow,
      approveStartConfirm,
      approveStartClose,
      resetApprovalProcessData,
      jumpList,
      windowHeights,
      fab,
      fabPattern,
      fabContent,
      fabTrigger,
      scanCodeDialog,
      searchCodeVal,
      dialogsearchCodeValConfirm,
      addQuery,
      serachAssetList,
      assetsDialog,
      assetsDialogConfirm,
      checkBoxChange,
      scan,
      applyDateTimeChange: ({ detail: { value } }) => {
        if (nonEditable.value)
          return;
        bill.value.requestDiscardDatetime.value = value;
      },
      processTrackDialog,
      processTrack,
      processTrackApprovalLog,
      processTrackApprovalTask,
      sign,
      removeInput,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      scrappingReason,
      scrappingReasonVal,
      scrappingReasonChange,
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_easyinput2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_easyinput + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
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
    s: common_vendor.f($setup.serachAssetList, ({
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
        j: "a6e6d2d2-10-" + i0 + ",a6e6d2d2-9"
      };
    }),
    t: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    v: common_vendor.o(($event) => $setup.assetsDialog.close()),
    w: common_vendor.o($setup.assetsDialogConfirm),
    x: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    y: common_vendor.p({
      type: "dialog"
    }),
    z: common_vendor.t($setup.rowDetail.code),
    A: common_vendor.p({
      disabled: true
    }),
    B: common_vendor.t($setup.rowDetail.name),
    C: common_vendor.p({
      disabled: true
    }),
    D: common_vendor.w(({
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
      path: "D",
      vueId: "a6e6d2d2-17,a6e6d2d2-16"
    }),
    E: common_vendor.t($setup.rowDetail.reasonVal ? $setup.rowDetail.reasonText : "\u8BF7\u9009\u62E9\u62A5\u5E9F\u539F\u56E0"),
    F: common_vendor.n($setup.rowDetail.reasonVal ? "info-item-color" : ""),
    G: common_vendor.o($setup.scrappingReasonChange),
    H: common_vendor.o(($event) => $setup.rowDetail.reasonVal = $event),
    I: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u62A5\u5E9F\u539F\u56E0",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.scrappingReason,
      modelValue: $setup.rowDetail.reasonVal
    }),
    J: common_vendor.o(($event) => $setup.rowDetail.remarks = $event),
    K: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u5E9F\u8BF4\u660E",
      modelValue: $setup.rowDetail.remarks
    }),
    L: common_vendor.o($setup.editDetailConfirm),
    M: common_vendor.o($setup.editDetailClose),
    N: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    O: common_vendor.p({
      type: "center"
    }),
    P: common_vendor.o($setup.dialogsearchCodeValConfirm),
    Q: common_vendor.p({
      mode: "input",
      title: "\u8D44\u4EA7\u641C\u7D22",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    }),
    R: common_vendor.p({
      type: "dialog"
    }),
    S: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    T: common_vendor.o($setup.fabTrigger),
    U: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    V: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    W: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    X: common_vendor.p({
      disabled: true
    }),
    Y: common_vendor.t($setup.bill.requestDiscardDatetime.value ? $setup.bill.requestDiscardDatetime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    Z: common_vendor.n($setup.bill.requestDiscardDatetime.value ? "info-item-color" : ""),
    aa: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args)),
    ab: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ac: $setup.nonEditable ? false : $setup.bill.requestDiscardDatetime.value
  }, ($setup.nonEditable ? false : $setup.bill.requestDiscardDatetime.value) ? {
    ad: common_vendor.o(($event) => $setup.removeInput("requestDiscardDatetime")),
    ae: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    af: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ag: common_vendor.t($setup.bill.handlerEmployee.value ? $setup.bill.handlerEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    ah: common_vendor.n($setup.bill.handlerEmployee.value ? "info-item-color" : ""),
    ai: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee")),
    aj: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ak: $setup.nonEditable ? false : $setup.bill.handlerEmployee.value
  }, ($setup.nonEditable ? false : $setup.bill.handlerEmployee.value) ? {
    al: common_vendor.o(($event) => $setup.removeInput("handlerEmployee")),
    am: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    an: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ao: common_vendor.t($setup.bill.NewLocation.value ? $setup.bill.NewLocation.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    ap: common_vendor.n($setup.bill.NewLocation.value ? "info-item-color" : ""),
    aq: common_vendor.o(($event) => $setup.locationSelect("NewLocation")),
    ar: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    as: $setup.nonEditable ? false : $setup.bill.NewLocation.value
  }, ($setup.nonEditable ? false : $setup.bill.NewLocation.value) ? {
    at: common_vendor.o(($event) => $setup.removeInput("NewLocation")),
    av: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aw: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ax: common_vendor.t($setup.bill.NewKAO.value ? $setup.bill.NewKAO.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u90E8\u95E8"),
    ay: common_vendor.n($setup.bill.NewKAO.value ? "info-item-color" : ""),
    az: common_vendor.o(($event) => $setup.corpDeptSelect("NewKAO")),
    aA: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aB: $setup.nonEditable ? false : $setup.bill.NewKAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAO.value) ? {
    aC: common_vendor.o(($event) => $setup.removeInput("NewKAO")),
    aD: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aE: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aF: common_vendor.t($setup.bill.NewKAE.value ? $setup.bill.NewKAE.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u4EBA\u5458"),
    aG: common_vendor.n($setup.bill.NewKAE.value ? "info-item-color" : ""),
    aH: common_vendor.o(($event) => $setup.personnelSelect("NewKAE")),
    aI: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aJ: $setup.nonEditable ? false : $setup.bill.NewKAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAE.value) ? {
    aK: common_vendor.o(($event) => $setup.removeInput("NewKAE")),
    aL: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aM: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aN: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    aO: common_vendor.n($setup.bill.remark ? "info-item-color" : ""),
    aP: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRemarkDialog()),
    aQ: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aR: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aS: common_vendor.o(($event) => $setup.removeInput("remark")),
    aT: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aU: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aV: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aW: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.Name),
        b: common_vendor.t(item.Code),
        c: common_vendor.t(item.OriginalCode),
        d: common_vendor.t(item.OriginalAmount),
        e: common_vendor.t(item.CategoryName),
        f: common_vendor.t(item.DiscardReasonName),
        g: common_vendor.t(item.RequestDesc),
        h: common_vendor.t(item.Brand),
        i: common_vendor.t(item.Spec),
        j: common_vendor.t(item.Model),
        k: common_vendor.t(item.Qty),
        l: common_vendor.o(($event) => $setup.editBillDetail(index)),
        m: "a6e6d2d2-40-" + i0 + "," + ("a6e6d2d2-39-" + i0),
        n: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        o: item.index,
        p: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        q: "a6e6d2d2-39-" + i0 + ",a6e6d2d2-38",
        r: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    aX: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aY: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    aZ: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    ba: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    bb: common_vendor.o($setup.select),
    bc: common_vendor.o($setup.deletefile),
    bd: common_vendor.o(($event) => $setup.files = $event),
    be: common_vendor.p({
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
    bf: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bg: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bh: common_vendor.o(($event) => $setup.toIndex = ""),
    bi: $setup.toIndex,
    bj: $setup.nonEditable
  }, $setup.nonEditable ? {
    bk: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bl: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bm: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bn: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bo: common_vendor.o($setup.jumpList),
    bp: common_vendor.o($setup.processTrack),
    bq: common_vendor.o($setup.approvalShow),
    br: common_vendor.o($setup.enablingApprovalShow),
    bs: common_vendor.o($setup.sign),
    bt: common_vendor.o($setup.handleSaveDraft),
    bv: common_vendor.o($setup.deleteDialogConfirm),
    bw: common_vendor.p({
      type: $setup.type,
      bill: $setup.bill
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a6e6d2d2"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDiscard/detail.vue"]]);
my.createPage(MiniProgramPage);
