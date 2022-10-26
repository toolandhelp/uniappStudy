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
var service_controller_consumable_requestDrawController = require("../../../service/controller/consumable/requestDrawController.js");
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
require("../../../service/controller/controllerBase/consumableControllerBase.js");
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
      applyPersonnel: {
        text: share_util_storage.getStorage("UserName"),
        value: share_util_storage.getStorage("EmployeeID")
      },
      applyCorp: {
        text: share_util_storage.getStorage("OrgName"),
        value: share_util_storage.getStorage("OrgID")
      },
      applyDateTime: {
        hint: "\u8BF7\u9009\u62E9\u7533\u9886\u65E5\u671F",
        value: share_util_dateTime.getCurrentDate()
      },
      applyReason: {
        hint: "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0",
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
      consumableName: "",
      brand: "",
      spec: "",
      model: "",
      qty: 1
    });
    const applyReasonOption = common_vendor.ref([]);
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
    let serachConsumableList = common_vendor.ref([]);
    const goodsDialog = common_vendor.ref(null);
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
    const toIndex = common_vendor.ref("");
    const filePicker = common_vendor.ref(null);
    const files = common_vendor.ref([]);
    const isfiles = common_vendor.ref(true);
    const windowHeights = common_vendor.ref("");
    function sign() {
      common_vendor.index.navigateTo({
        url: `/subcontract/system/signConfirm/signConfirm?type=1&key=207&billID=${bill.value.id}`
      });
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_consumable_requestDrawController.requestDrawController.consumableFuzzyQuery(keyWorld).then((Items) => {
        serachConsumableList.value = Items.map((p) => {
          p.checked = false;
          return p;
        });
        if (serachConsumableList.value.length < 1) {
          share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u6613\u8017\u54C1");
          return;
        }
        goodsDialog.value.open();
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
    function applyReasonHandle(val) {
      bill.value.applyReason.text = applyReasonOption.value.filter((p) => p.value == val)[0].text;
      bill.value.applyReason.value = val;
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
      if (!rowDetail.value.consumableName) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6613\u8017\u54C1\u540D\u79F0");
        return;
      }
      if (!rowDetail.value.qty) {
        share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6570\u91CF");
        return;
      } else {
        const reg = /^\+?[1-9][0-9]*$/;
        if (!reg.test(rowDetail.value.qty)) {
          share_util_message.showErrorToast("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u6570\u91CF");
          return;
        }
      }
      if (detailIndex.value == null) {
        const obj = {
          ConsumableName: rowDetail.value.consumableName,
          Brand: rowDetail.value.brand,
          Spec: rowDetail.value.spec,
          Model: rowDetail.value.model,
          Qty: parseInt(rowDetail.value.qty),
          isOpened: "none"
        };
        billDetail.value.push(obj);
      } else {
        billDetail.value[detailIndex.value].ConsumableName = rowDetail.value.consumableName;
        billDetail.value[detailIndex.value].Brand = rowDetail.value.brand;
        billDetail.value[detailIndex.value].Spec = rowDetail.value.spec;
        billDetail.value[detailIndex.value].Model = rowDetail.value.model;
        billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.qty);
      }
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.consumableName = "";
      rowDetail.value.brand = "";
      rowDetail.value.spec = "";
      rowDetail.value.model = "";
      rowDetail.value.qty = 1;
      detailIndex.value = null;
      inputDialog.value.close();
    }
    function editBillDetail(index) {
      if (nonEditable && bill.value.status !== null && bill.value.status != 1) {
        return;
      }
      detailIndex.value = index;
      const { ConsumableName, Brand, Spec, Model, Qty } = billDetail.value[index];
      rowDetail.value.consumableName = ConsumableName;
      rowDetail.value.brand = Brand;
      rowDetail.value.spec = Spec;
      rowDetail.value.model = Model;
      rowDetail.value.qty = Qty;
      openEditDetailDalog(0);
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.requestDrawDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.applyDateTime.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7533\u9886\u65E5\u671F");
        return;
      }
      if (!bill.value.applyReason.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0");
        return;
      }
      if (billDetail.value.length < 1) {
        toIndex.value = "listDetail";
        share_util_message.showErrorToast("\u8BF7\u6DFB\u52A0\u6613\u8017\u54C1\u4FE1\u606F");
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
      obj.AddOrEdit = bill.value.id ? 2 : 1;
      obj.IsSubmit = bill.value.isSubmit ? true : false;
      obj.RequestDate = bill.value.applyDateTime.value;
      obj.RequestDrawReason = bill.value.applyReason.value;
      obj.RequesterEmployeeID = bill.value.applyPersonnel.value;
      obj.RequesterEmployeeName = bill.value.applyPersonnel.text;
      obj.RequesterOrgID = bill.value.applyCorp.value;
      obj.RequesterOrgName = bill.value.applyCorp.text;
      obj.RequesterOrgNameCN = bill.value.applyCorp.text;
      obj.RequesterOrgNameEN = bill.value.applyCorp.text;
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawSaveDraft(obj).then(({ Code, ID }) => {
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
      return service_controller_consumable_requestDrawController.requestDrawController.requestDrawGetByID(id2).then(({
        BillID,
        Status,
        Code,
        RequestDate,
        RequesterEmployeeID,
        RequesterEmployeeName,
        RequesterOrgID,
        RequesterOrgNameCN,
        RequestDrawReason,
        RequestDrawReasonText,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = BillID;
        bill.value.status = Status;
        bill.value.code = Code;
        bill.value.applyDateTime.value = RequestDate ? RequestDate.substring(0, 10) : "";
        bill.value.applyPersonnel.value = RequesterEmployeeID;
        bill.value.applyPersonnel.text = RequesterEmployeeName;
        bill.value.applyCorp.value = RequesterOrgID;
        bill.value.applyCorp.text = RequesterOrgNameCN;
        bill.value.applyReason.value = RequestDrawReason;
        bill.value.applyReason.text = RequestDrawReasonText;
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
      share_redirect_index.navigateTo("/subcontract/consumable/requestDraw/requestDrawList");
    }
    let billDetailNumber = common_vendor.computed$1(() => {
      let num = 0;
      for (let i = 0; i < billDetail.value.length; i++) {
        num += parseInt(billDetail.value[i].qty);
      }
      return num;
    });
    {
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D006").then(({ Items }) => {
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawPrevApproval(bill.value.id).then((dataInfo) => {
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawSubmitApproval(obj).then(({ ID }) => {
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawPreStartFlow(bill.value.id).then(({
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawStartFlow(approveData).then(async ({ ID }) => {
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
      let values = e.detail.value, items = serachConsumableList.value;
      if (values.length > 0) {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ConsumableID == Id) {
            items[i].checked = true;
            break;
          }
        }
      } else {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i].ConsumableID == Id) {
            items[i].checked = false;
            break;
          }
        }
      }
    }
    function goodsDialogConfirm() {
      let items = serachConsumableList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        share_util_message.showErrorToast("\u8BF7\u52FE\u9009\u4E00\u6761\u6570\u636E");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.ConsumableID == arr[i].ConsumableID);
        if (check.length < 1) {
          let obj = {};
          obj.ID = null;
          obj.BillID = arr[i].BillID;
          obj.DetailID = arr[i].DetailID;
          obj.Code = arr[i].Code;
          obj.ConsumableID = arr[i].ConsumableID;
          obj.ConsumableName = arr[i].ConsumableName;
          obj.CategoryName = arr[i].CategoryName;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
          obj.ConsumableInfo = [{
            label: arr[i].ConsumableName,
            value: arr[i].ConsumableID,
            Code: arr[i].Code
          }];
          obj.isOpened = "none";
          obj.Qty = 1;
          billDetail.value.push(obj);
        } else {
          if (timer) {
            share_util_message.showErrorToast("\u8BF7\u52FF\u6DFB\u52A0\u91CD\u590D\u6613\u8017\u54C1");
            timer = false;
            const setTimer = setTimeout(() => {
              timer = true;
              clearTimeout(setTimer);
            }, 3e3);
          }
        }
      }
      goodsDialog.value.close();
      serachConsumableList.value = [];
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
      service_controller_consumable_requestDrawController.requestDrawController.requestDrawGetFlowTrail(bill.value.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
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
    function removeInput(key) {
      if (key == "applyDateTime") {
        bill.value.applyDateTime.value = "";
        return;
      }
      if (key == "applyPersonnel") {
        bill.value.applyPersonnel.text = "";
        bill.value.applyPersonnel.value = null;
        bill.value.applyCorp.text = "";
        bill.value.applyCorp.value = null;
        return;
      }
      if (key == "applyReason") {
        bill.value.applyReason.text = "";
        bill.value.applyReason.value = null;
        return;
      }
      if (key == "remark") {
        bill.value.remark = "";
        return;
      }
    }
    function personnelSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
        bill.value.applyCorp.value = OrgID;
        bill.value.applyCorp.text = OrgName;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=0&ids=${_id}`);
    }
    common_vendor.index.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      }
    });
    let IsScroll = common_vendor.computed$1(() => {
      let header, content;
      if ((windowHeights.value - 60) / 2 > 225) {
        header = 225;
        content = windowHeights.value - 285;
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
      applyReasonOption,
      applyReasonHandle,
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
      serachConsumableList,
      goodsDialog,
      goodsDialogConfirm,
      checkBoxChange,
      scan,
      applyDateTimeChange: ({ detail: { value } }) => {
        if (nonEditable.value)
          return;
        bill.value.applyDateTime.value = value;
      },
      processTrackDialog,
      processTrack,
      processTrackApprovalLog,
      processTrackApprovalTask,
      sign,
      removeInput,
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_uni_file_picker = common_vendor.resolveComponent("uni-file-picker");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_easyinput2 + _easycom_uni_fab2 + _easycom_uni_icons2 + _easycom_uni_data_picker2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_uni_file_picker + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput + _easycom_uni_fab + _easycom_uni_icons + _easycom_uni_data_picker + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
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
    s: common_vendor.f($setup.serachConsumableList, ({
      ConsumableID,
      ConsumableName,
      Code,
      CategoryName,
      Brand,
      Spec,
      Model,
      checked
    }, k0, i0) => {
      return {
        a: common_vendor.t(ConsumableName),
        b: common_vendor.t(Code),
        c: common_vendor.t(CategoryName),
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: checked,
        h: common_vendor.o(($event) => $setup.checkBoxChange($event, ConsumableID)),
        i: ConsumableID,
        j: "6ef293d4-10-" + i0 + ",6ef293d4-9"
      };
    }),
    t: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    v: common_vendor.o(($event) => $setup.goodsDialog.close()),
    w: common_vendor.o($setup.goodsDialogConfirm),
    x: common_vendor.p({
      title: "\u9009\u62E9\u6613\u8017\u54C1\u8D44\u6599",
      type: "info",
      ["before-close"]: true
    }),
    y: common_vendor.p({
      type: "dialog"
    }),
    z: common_vendor.t($setup.rowDetail.consumableName),
    A: common_vendor.t($setup.rowDetail.brand),
    B: common_vendor.t($setup.rowDetail.spec),
    C: common_vendor.t($setup.rowDetail.model),
    D: common_vendor.o(($event) => $setup.rowDetail.qty = $event),
    E: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
      modelValue: $setup.rowDetail.qty
    }),
    F: common_vendor.o($setup.editDetailConfirm),
    G: common_vendor.o($setup.editDetailClose),
    H: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    I: common_vendor.p({
      type: "center"
    }),
    J: common_vendor.o($setup.dialogsearchCodeValConfirm),
    K: common_vendor.p({
      mode: "input",
      title: "\u6613\u8017\u54C1\u641C\u7D22",
      value: $setup.searchCodeVal,
      placeholder: "\u7F16\u7801/\u540D\u79F0"
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
    P: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210"),
    Q: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    R: common_vendor.p({
      disabled: true
    }),
    S: common_vendor.t($setup.bill.applyDateTime.value ? $setup.bill.applyDateTime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    T: common_vendor.n($setup.bill.applyDateTime.value ? "info-item-color" : ""),
    U: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args)),
    V: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    W: $setup.nonEditable ? false : $setup.bill.applyDateTime.value
  }, ($setup.nonEditable ? false : $setup.bill.applyDateTime.value) ? {
    X: common_vendor.o(($event) => $setup.removeInput("applyDateTime")),
    Y: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    Z: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aa: common_vendor.t($setup.bill.applyPersonnel.value ? $setup.bill.applyPersonnel.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    ab: common_vendor.n($setup.bill.applyPersonnel.value ? "info-item-color" : ""),
    ac: common_vendor.o(($event) => $setup.personnelSelect("applyPersonnel")),
    ad: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ae: $setup.nonEditable ? false : $setup.bill.applyPersonnel.value
  }, ($setup.nonEditable ? false : $setup.bill.applyPersonnel.value) ? {
    af: common_vendor.o(($event) => $setup.removeInput("applyPersonnel")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ah: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ai: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aj: common_vendor.w(({
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
      path: "aj",
      vueId: "6ef293d4-30,6ef293d4-29"
    }),
    ak: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0"),
    al: common_vendor.n($setup.bill.applyReason.value ? "info-item-color" : ""),
    am: common_vendor.o($setup.applyReasonHandle),
    an: common_vendor.o(($event) => $setup.bill.applyReason.value = $event),
    ao: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.applyReasonOption,
      modelValue: $setup.bill.applyReason.value
    })
  } : {
    ap: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0")
  }, {
    aq: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ar: $setup.nonEditable ? false : $setup.bill.applyReason.value
  }, ($setup.nonEditable ? false : $setup.bill.applyReason.value) ? {
    as: common_vendor.o(($event) => $setup.removeInput("applyReason")),
    at: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    av: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aw: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    ax: common_vendor.n($setup.bill.remark ? "info-item-color" : ""),
    ay: common_vendor.o(($event) => $setup.nonEditable ? null : $setup.openRemarkDialog()),
    az: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aA: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aB: common_vendor.o(($event) => $setup.removeInput("remark")),
    aC: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aD: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aE: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aF: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return {
        a: common_vendor.t(item.ConsumableName),
        b: common_vendor.t(item.Brand),
        c: common_vendor.t(item.Spec),
        d: common_vendor.t(item.Model),
        e: common_vendor.t(item.Qty),
        f: common_vendor.o(($event) => $setup.editBillDetail(index)),
        g: "6ef293d4-37-" + i0 + "," + ("6ef293d4-36-" + i0),
        h: common_vendor.o(($event) => $setup.uniSwipeChange(index)),
        i: item.index,
        j: common_vendor.o(($event) => $setup.uniSwipeClick($event, index)),
        k: "6ef293d4-36-" + i0 + ",6ef293d4-35",
        l: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.deleteOperationBtn,
          show: item.isOpened,
          ["auto-close"]: false
        })
      };
    }),
    aG: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aH: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      type: "line"
    }),
    aI: $setup.isfiles
  }, $setup.isfiles ? common_vendor.e({
    aJ: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    aK: common_vendor.o($setup.select),
    aL: common_vendor.o($setup.deletefile),
    aM: common_vendor.o(($event) => $setup.files = $event),
    aN: common_vendor.p({
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
    aO: common_vendor.p({
      title: "\u9644\u4EF6",
      type: "line"
    }),
    aP: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    aQ: common_vendor.o(($event) => $setup.toIndex = ""),
    aR: $setup.toIndex,
    aS: $setup.nonEditable
  }, $setup.nonEditable ? {
    aT: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    aU: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    aV: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    aW: common_vendor.o(($event) => $setup.toIndex = "example")
  } : {}, {
    aX: common_vendor.o($setup.jumpList),
    aY: common_vendor.o($setup.processTrack),
    aZ: common_vendor.o($setup.approvalShow),
    ba: common_vendor.o($setup.enablingApprovalShow),
    bb: common_vendor.o($setup.sign),
    bc: common_vendor.o($setup.handleSaveDraft),
    bd: common_vendor.o($setup.deleteDialogConfirm),
    be: common_vendor.p({
      type: $setup.type,
      bill: $setup.bill
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ef293d4"], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/consumable/requestDraw/requestDraw.vue"]]);
my.createPage(MiniProgramPage);
