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
var service_controller_asset_discardController = require("../../../service/controller/asset/discardController.js");
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
      discardDatetime: {
        hint: "\u8BF7\u9009\u62E9\u62A5\u5E9F\u65E5\u671F",
        value: share_util_dateTime.getCurrentDate()
      },
      cost: {
        hint: "\u5904\u7F6E\u6210\u672C",
        value: null
      },
      income: {
        hint: "\u5904\u7F6E\u6536\u5165",
        value: null
      },
      remark: "",
      IsStart: false,
      startFlow: true,
      FlowPath: false,
      IsApproval: false,
      enablingApproval: false
    });
    const amountVal = common_vendor.ref(null);
    const amountInputKey = common_vendor.ref(null);
    const inputAmountDialog = common_vendor.ref(null);
    const rowDetail = common_vendor.ref({
      name: "",
      code: "",
      disposalVal: "",
      disposalText: "",
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
    const disposalType = common_vendor.ref([]);
    const toIndex = common_vendor.ref("");
    common_vendor.ref(null);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const windowHeights = common_vendor.ref("");
    function sign() {
      common_vendor.index.navigateTo({
        url: `/pages/system/signConfirm/signConfirm?type=1&key=107&billID=${bill.value.id}`
      });
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_discardController.discardController.assetListQueryByBillType(keyWorld).then(({ Items }) => {
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
    function openAmountDialog(key) {
      amountVal.value = bill.value[key].value;
      amountInputKey.value = key;
      inputAmountDialog.value.open();
    }
    function dialogAmountInputConfirm() {
      if (!amountVal.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u91D1\u989D");
        return;
      }
      const number = parseFloat(amountVal.value);
      bill.value[amountInputKey.value].value = number.toString();
    }
    function dialogRemarkInputConfirm(val) {
      bill.value.remark = val.trim();
      remarkVal.value = val.trim();
    }
    function editDetailConfirm(val) {
      billDetail.value[detailIndex.value].DiscardModeID = rowDetail.value.disposalVal;
      billDetail.value[detailIndex.value].DiscardModeName = rowDetail.value.disposalText;
      billDetail.value[detailIndex.value].DiscardModeNameCN = rowDetail.value.disposalText;
      billDetail.value[detailIndex.value].DiscardModeNameEN = rowDetail.value.disposalText;
      billDetail.value[detailIndex.value].DiscardDesc = rowDetail.value.remarks;
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.name = null;
      rowDetail.value.code = null;
      rowDetail.value.disposalVal = null;
      rowDetail.value.disposalText = null;
      rowDetail.value.remarks = null;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { Name, Code, DiscardModeID, DiscardModeName, DiscardDesc } = billDetail.value[index];
      rowDetail.value.name = Name;
      rowDetail.value.code = Code;
      rowDetail.value.disposalVal = DiscardModeID;
      rowDetail.value.disposalText = DiscardModeName;
      rowDetail.value.remarks = DiscardDesc;
      openEditDetailDalog(0);
    }
    function disposalTypeChange(val) {
      const { value, text } = disposalType.value.filter((p) => p.value == val)[0];
      rowDetail.value.disposalVal = value;
      rowDetail.value.disposalText = text;
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_discardController.discardController.discardDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.discardDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.discardDatetime.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u62A5\u5E9F\u65E5\u671F");
        return;
      }
      if (!bill.value.handlerEmployee.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7ECF\u529E\u4EBA");
        return;
      }
      if (!bill.value.cost.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u5904\u7F6E\u6210\u672C");
        return;
      }
      if (!bill.value.income.value) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u5904\u7F6E\u6536\u5165");
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
      obj.DiscardDatetime = bill.value.discardDatetime.value;
      obj.HandlerEmployeeID = bill.value.handlerEmployee.value;
      obj.HandlerEmployeeName = bill.value.handlerEmployee.text;
      obj.HandlerOrgID = bill.value.handlerOrgID.value;
      obj.HandlerOrgNameCN = bill.value.handlerOrgID.text;
      obj.HandlerOrgNameEN = bill.value.handlerOrgID.text;
      obj.DiscardCost = bill.value.cost.value;
      obj.DiscardIncome = bill.value.income.value;
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
      service_controller_asset_discardController.discardController.discardSaveDraft(obj).then(({ Code, ID }) => {
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
      return service_controller_asset_discardController.discardController.discardGetByID(id2).then(({
        ID,
        Status,
        BillCode,
        DiscardDatetime,
        HandlerEmployeeID,
        HandlerEmployeeName,
        HandlerOrgID,
        HandlerOrgNameCN,
        DiscardCost,
        DiscardIncome,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = ID;
        bill.value.status = Status;
        bill.value.code = BillCode;
        bill.value.discardDatetime.value = DiscardDatetime ? DiscardDatetime.substring(0, 10) : "";
        bill.value.handlerEmployee.value = HandlerEmployeeID;
        bill.value.handlerEmployee.text = HandlerEmployeeName;
        bill.value.handlerOrgID.value = HandlerOrgID;
        bill.value.handlerOrgID.text = HandlerOrgNameCN;
        bill.value.cost.value = DiscardCost;
        bill.value.income.value = DiscardIncome;
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
      share_redirect_index.navigateTo("/subcontract/asset/discard/list");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });
    {
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D005").then(({ Items }) => {
        disposalType.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
        const { ID, ItemText } = Items.filter((p) => p.IsDefaultItem)[0];
        scrappingReasonVal.value = ID;
        scrappingReasonText.value = ItemText;
        console.log(scrappingReasonVal.value);
        console.log(scrappingReasonText.value);
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
      service_controller_asset_discardController.discardController.discardPrevApproval(bill.value.id).then((dataInfo) => {
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
      service_controller_asset_discardController.discardController.discardSubmitApproval(obj).then(({ ID }) => {
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
      service_controller_asset_discardController.discardController.discardPreStartFlow(bill.value.id).then(({
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
      service_controller_asset_discardController.discardController.discardStartFlow(approveData).then(async ({ ID }) => {
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
          obj.DiscardModeID = scrappingReasonVal.value;
          obj.DiscardModeName = scrappingReasonText.value;
          obj.DiscardModeNameCN = scrappingReasonText.value;
          obj.DiscardModeNameEN = scrappingReasonText.value;
          obj.OriginalAmount = arr[i].OriginalAmount;
          obj.OriginalCode = arr[i].OriginalCode;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.Qty = arr[i].Qty;
          obj.DiscardDesc = null;
          obj.isOpened = "none";
          obj.Qty = 1;
          billDetail.value.push(obj);
          console.log(billDetail.value);
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
      service_controller_asset_discardController.discardController.discardGetFlowTrail(bill.value.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
    }
    function removeInput(key) {
      if (key == "discardDatetime" || key == "cost" || key == "income") {
        bill.value[key].value = null;
        return;
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
        bill.value.discardDatetime.value = value;
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
      disposalType,
      scrappingReasonVal,
      disposalTypeChange,
      inputAmountDialog,
      amountVal,
      amountInputKey,
      openAmountDialog,
      dialogAmountInputConfirm,
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
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_easyinput2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker + _component_BillFooterBtn)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
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
    l: common_vendor.o(($event) => $setup.amountVal = $event),
    m: common_vendor.p({
      focus: true,
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $setup.amountVal
    }),
    n: common_vendor.o($setup.dialogAmountInputConfirm),
    o: common_vendor.p({
      type: "info",
      title: "\u8F93\u5165\u91D1\u989D"
    }),
    p: common_vendor.p({
      type: "dialog"
    }),
    q: common_vendor.o($setup.dialogRemarkInputConfirm),
    r: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    s: common_vendor.p({
      type: "dialog"
    }),
    t: common_vendor.o($setup.submitDialogConfirm),
    v: common_vendor.o($setup.submitDialogClose),
    w: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    x: common_vendor.p({
      type: "dialog"
    }),
    y: common_vendor.f($setup.serachAssetList, ({
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
        j: "935399e8-13-" + i0 + ",935399e8-12"
      };
    }),
    z: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    A: common_vendor.o(($event) => $setup.assetsDialog.close()),
    B: common_vendor.o($setup.assetsDialogConfirm),
    C: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    D: common_vendor.p({
      type: "dialog"
    }),
    E: common_vendor.t($setup.rowDetail.code),
    F: common_vendor.p({
      disabled: true
    }),
    G: common_vendor.t($setup.rowDetail.name),
    H: common_vendor.p({
      disabled: true
    }),
    I: common_vendor.w(({
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
      path: "I",
      vueId: "935399e8-20,935399e8-19"
    }),
    J: common_vendor.t($setup.rowDetail.disposalVal ? $setup.rowDetail.disposalText : "\u8BF7\u9009\u62E9\u5904\u7F6E\u65B9\u5F0F"),
    K: common_vendor.n($setup.rowDetail.disposalVal ? "info-item-color" : ""),
    L: common_vendor.o($setup.disposalTypeChange),
    M: common_vendor.o(($event) => $setup.rowDetail.disposalVal = $event),
    N: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u5904\u7F6E\u65B9\u5F0F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.disposalType,
      modelValue: $setup.rowDetail.disposalVal
    }),
    O: common_vendor.o(($event) => $setup.rowDetail.remarks = $event),
    P: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u5904\u7F6E\u8BF4\u660E",
      modelValue: $setup.rowDetail.remarks
    }),
    Q: common_vendor.o($setup.editDetailConfirm),
    R: common_vendor.o($setup.editDetailClose),
    S: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    T: common_vendor.p({
      type: "center"
    }),
    U: common_vendor.o($setup.dialogsearchCodeValConfirm),
    V: common_vendor.p({
      mode: "input",
      title: "\u8D44\u4EA7\u641C\u7D22",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    }),
    W: common_vendor.p({
      type: "dialog"
    }),
    X: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    Y: common_vendor.o($setup.fabTrigger),
    Z: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    aa: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    ab: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    ac: common_vendor.p({
      disabled: true
    }),
    ad: common_vendor.t($setup.bill.discardDatetime.value ? $setup.bill.discardDatetime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    ae: common_vendor.n($setup.bill.discardDatetime.value ? "info-item-color" : ""),
    af: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args)),
    ag: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ah: $setup.nonEditable ? false : $setup.bill.discardDatetime.value
  }, ($setup.nonEditable ? false : $setup.bill.discardDatetime.value) ? {
    ai: common_vendor.o(($event) => $setup.removeInput("discardDatetime")),
    aj: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ak: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    al: common_vendor.t($setup.bill.handlerEmployee.value ? $setup.bill.handlerEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    am: common_vendor.n($setup.bill.handlerEmployee.value ? "info-item-color" : ""),
    an: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee")),
    ao: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ap: $setup.nonEditable ? false : $setup.bill.handlerEmployee.value
  }, ($setup.nonEditable ? false : $setup.bill.handlerEmployee.value) ? {
    aq: common_vendor.o(($event) => $setup.removeInput("handlerEmployee")),
    ar: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    as: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    at: common_vendor.t($setup.bill.cost.value ? $setup.bill.cost.value : "\u8BF7\u8F93\u5165\u5904\u7F6E\u6210\u672C"),
    av: common_vendor.n($setup.bill.cost.value ? "info-item-color" : ""),
    aw: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openAmountDialog("cost")),
    ax: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ay: $setup.nonEditable ? false : $setup.bill.cost.value
  }, ($setup.nonEditable ? false : $setup.bill.cost.value) ? {
    az: common_vendor.o(($event) => $setup.removeInput("cost")),
    aA: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aB: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aC: common_vendor.t($setup.bill.income.value ? $setup.bill.income.value : "\u8BF7\u8F93\u5165\u5904\u7F6E\u6536\u5165"),
    aD: common_vendor.n($setup.bill.income.value ? "info-item-color" : ""),
    aE: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openAmountDialog("income")),
    aF: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aG: $setup.nonEditable ? false : $setup.bill.income.value
  }, ($setup.nonEditable ? false : $setup.bill.income.value) ? {
    aH: common_vendor.o(($event) => $setup.removeInput("income")),
    aI: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aJ: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aK: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    aL: common_vendor.n($setup.bill.remark ? "info-item-color" : ""),
    aM: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRemarkDialog()),
    aN: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aO: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aP: common_vendor.o(($event) => $setup.removeInput("remark")),
    aQ: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aR: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aS: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aT: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.Name),
        b: common_vendor.t(item.Code),
        c: common_vendor.t(item.OriginalCode),
        d: common_vendor.t(item.OriginalAmount),
        e: common_vendor.t(item.CategoryName),
        f: common_vendor.t(item.DiscardModeName),
        g: common_vendor.t(item.DiscardDesc),
        h: common_vendor.t(item.Brand),
        i: common_vendor.t(item.Spec),
        j: common_vendor.t(item.Model),
        k: common_vendor.t(item.Qty),
        l: common_vendor.o(($event) => $setup.editBillDetail(index)),
        m: "935399e8-41-" + i0 + "," + ("935399e8-40-" + i0),
        n: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        o: item.index,
        p: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        q: "935399e8-40-" + i0 + ",935399e8-39",
        r: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    aU: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aV: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    aW: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    aX: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aY: common_vendor.o($setup.select),
    aZ: common_vendor.o($setup.deletefile),
    ba: common_vendor.o(($event) => $setup.files = $event),
    bb: common_vendor.p({
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
    bc: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    bd: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    be: common_vendor.o(($event) => $setup.toIndex = ""),
    bf: $setup.toIndex,
    bg: $setup.nonEditable
  }, $setup.nonEditable ? {
    bh: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    bi: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bj: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    bk: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    bl: common_vendor.o($setup.jumpList),
    bm: common_vendor.o($setup.processTrack),
    bn: common_vendor.o($setup.approvalShow),
    bo: common_vendor.o($setup.enablingApprovalShow),
    bp: common_vendor.o($setup.sign),
    bq: common_vendor.o($setup.handleSaveDraft),
    br: common_vendor.o($setup.deleteDialogConfirm),
    bs: common_vendor.p({
      type: $setup.type,
      bill: $setup.bill
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-935399e8"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/discard/detail.vue"]]);
my.createPage(MiniProgramPage);
