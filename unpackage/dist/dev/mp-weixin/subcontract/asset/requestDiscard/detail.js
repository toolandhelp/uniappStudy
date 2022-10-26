"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_requestDiscardController = require("../../../service/controller/asset/requestDiscardController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
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
require("../../../service/controller/controllerBase/systemControllerBase.js");
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
    let serachAssetList = common_vendor.ref([]);
    const assetsDialog = common_vendor.ref(null);
    const isOpened = common_vendor.ref("none");
    const inputDialog = common_vendor.ref(null);
    const editInfoTitle = common_vendor.ref("");
    const inputRemarkDialog = common_vendor.ref(null);
    const detailIndex = common_vendor.ref(null);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
    const scrappingReasonVal = common_vendor.ref(null);
    const scrappingReasonText = common_vendor.ref(null);
    const scrappingReason = common_vendor.ref([]);
    const toIndex = common_vendor.ref("");
    const autoStart = common_vendor.ref(false);
    const files = common_vendor.ref([]);
    const windowHeights = common_vendor.ref("");
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
            autoStart.value = true;
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
        autoStart.value = false;
        if (type && type == "mywork" && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/requestDiscard/list");
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
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
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
      if (key == "handlerEmployee" && share_util_storage.getStorage("UserType") == 2) {
        return;
      }
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
    function filesChange(val) {
      files.value = val;
    }
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
      getStorage: share_util_storage.getStorage,
      type,
      IsScroll,
      bill,
      billDetail,
      remarkVal,
      rowDetail,
      uniSwipeActionItemRightOptions: share_util_billBasicConfig.uniSwipeActionItemRightOptions,
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
      jumpList,
      windowHeights,
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
      removeInput,
      locationSelect,
      corpDeptSelect,
      personnelSelect,
      scrappingReason,
      scrappingReasonVal,
      scrappingReasonChange,
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
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_BillEnclosure = common_vendor.resolveComponent("BillEnclosure");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "45e9e3ca-1,45e9e3ca-0"),
    b: common_vendor.o($setup.dialogRemarkInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    d: common_vendor.sr("inputRemarkDialog", "45e9e3ca-0"),
    e: common_vendor.p({
      type: "dialog"
    }),
    f: common_vendor.o($setup.submitDialogConfirm),
    g: common_vendor.o($setup.submitDialogClose),
    h: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    i: common_vendor.sr("submitDialog", "45e9e3ca-2"),
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.f($setup.serachAssetList, ({
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
        j: "45e9e3ca-7-" + i0 + ",45e9e3ca-6"
      };
    }),
    l: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    m: common_vendor.o(($event) => $setup.assetsDialog.close()),
    n: common_vendor.o($setup.assetsDialogConfirm),
    o: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    p: common_vendor.sr("assetsDialog", "45e9e3ca-4"),
    q: common_vendor.p({
      type: "dialog"
    }),
    r: common_vendor.t($setup.rowDetail.code),
    s: common_vendor.p({
      disabled: true
    }),
    t: common_vendor.t($setup.rowDetail.name),
    v: common_vendor.p({
      disabled: true
    }),
    w: common_vendor.w(({
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
      path: "w",
      vueId: "45e9e3ca-14,45e9e3ca-13"
    }),
    x: common_vendor.t($setup.rowDetail.reasonVal ? $setup.rowDetail.reasonText : "\u8BF7\u9009\u62E9\u62A5\u5E9F\u539F\u56E0"),
    y: common_vendor.o($setup.scrappingReasonChange),
    z: common_vendor.o(($event) => $setup.rowDetail.reasonVal = $event),
    A: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u62A5\u5E9F\u539F\u56E0",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.scrappingReason,
      modelValue: $setup.rowDetail.reasonVal
    }),
    B: common_vendor.o(($event) => $setup.rowDetail.remarks = $event),
    C: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u62A5\u5E9F\u8BF4\u660E",
      modelValue: $setup.rowDetail.remarks
    }),
    D: common_vendor.sr("inputClose", "45e9e3ca-9,45e9e3ca-8"),
    E: common_vendor.o($setup.editDetailConfirm),
    F: common_vendor.o($setup.editDetailClose),
    G: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    H: common_vendor.sr("inputDialog", "45e9e3ca-8"),
    I: common_vendor.p({
      type: "center"
    }),
    J: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    K: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210")
  } : {
    L: common_vendor.t($setup.bill.code)
  }, {
    M: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    N: common_vendor.p({
      disabled: true
    }),
    O: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    P: common_vendor.t($setup.bill.requestDiscardDatetime.value ? $setup.bill.requestDiscardDatetime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    Q: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args))
  } : {
    R: common_vendor.t($setup.bill.requestDiscardDatetime.value)
  }, {
    S: common_vendor.n($setup.bill.requestDiscardDatetime.value ? "content_effective" : ""),
    T: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    U: $setup.nonEditable ? false : $setup.bill.requestDiscardDatetime.value
  }, ($setup.nonEditable ? false : $setup.bill.requestDiscardDatetime.value) ? {
    V: common_vendor.o(($event) => $setup.removeInput("requestDiscardDatetime")),
    W: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    X: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    Y: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    Z: common_vendor.t($setup.bill.handlerEmployee.value ? $setup.bill.handlerEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    aa: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee"))
  } : {
    ab: common_vendor.t($setup.bill.handlerEmployee.text)
  }, {
    ac: common_vendor.n($setup.bill.handlerEmployee.value ? "content_effective" : ""),
    ad: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ae: $setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.handlerEmployee.value
  }, ($setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.handlerEmployee.value) ? {
    af: common_vendor.o(($event) => $setup.removeInput("handlerEmployee")),
    ag: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ah: common_vendor.p({
      disabled: $setup.nonEditable || $setup.getStorage("UserType") == 2
    }),
    ai: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aj: common_vendor.t($setup.bill.NewLocation.value ? $setup.bill.NewLocation.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    ak: common_vendor.o(($event) => $setup.locationSelect("NewLocation"))
  } : {
    al: common_vendor.t($setup.bill.NewLocation.text)
  }, {
    am: common_vendor.n($setup.bill.NewLocation.value ? "content_effective" : ""),
    an: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ao: $setup.nonEditable ? false : $setup.bill.NewLocation.value
  }, ($setup.nonEditable ? false : $setup.bill.NewLocation.value) ? {
    ap: common_vendor.o(($event) => $setup.removeInput("NewLocation")),
    aq: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ar: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    as: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    at: common_vendor.t($setup.bill.NewKAO.value ? $setup.bill.NewKAO.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u90E8\u95E8"),
    av: common_vendor.o(($event) => $setup.corpDeptSelect("NewKAO"))
  } : {
    aw: common_vendor.t($setup.bill.NewKAO.text)
  }, {
    ax: common_vendor.n($setup.bill.NewKAO.value ? "content_effective" : ""),
    ay: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    az: $setup.nonEditable ? false : $setup.bill.NewKAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAO.value) ? {
    aA: common_vendor.o(($event) => $setup.removeInput("NewKAO")),
    aB: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aC: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aD: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aE: common_vendor.t($setup.bill.NewKAE.value ? $setup.bill.NewKAE.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u4EBA\u5458"),
    aF: common_vendor.o(($event) => $setup.personnelSelect("NewKAE"))
  } : {
    aG: common_vendor.t($setup.bill.NewKAE.text)
  }, {
    aH: common_vendor.n($setup.bill.NewKAE.value ? "content_effective" : ""),
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
    aN: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aO: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    aP: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    aQ: common_vendor.t($setup.bill.remark)
  }, {
    aR: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
    aS: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aT: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aU: common_vendor.o(($event) => $setup.removeInput("remark")),
    aV: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aW: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aX: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aY: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.Name)
      }, !$setup.nonEditable ? {
        b: common_vendor.o(($event) => $setup.editBillDetail(index)),
        c: "45e9e3ca-34-" + i0 + "," + ("45e9e3ca-33-" + i0),
        d: common_vendor.p({
          type: "compose",
          size: "30",
          color: "#444"
        })
      } : {}, {
        e: common_vendor.t(item.Code),
        f: common_vendor.t(item.OriginalCode),
        g: common_vendor.t(item.OriginalAmount),
        h: common_vendor.t(item.DiscardReasonName),
        i: common_vendor.t(item.Brand),
        j: common_vendor.t(item.Spec),
        k: common_vendor.t(item.Model),
        l: common_vendor.t(item.Qty),
        m: common_vendor.t(item.CategoryName),
        n: common_vendor.t(item.RequestDesc),
        o: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        p: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.AssetID),
        q: item.AssetID,
        r: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.AssetID),
        s: "45e9e3ca-33-" + i0 + ",45e9e3ca-32",
        t: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: item.isOpened,
          ["auto-close"]: false
        })
      });
    }),
    aZ: !$setup.nonEditable,
    ba: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    bb: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    bc: common_vendor.s(`height:100%`)
  } : {}, {
    bd: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    be: common_vendor.o($setup.filesChange),
    bf: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    bg: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bh: common_vendor.o(($event) => $setup.toIndex = ""),
    bi: $setup.toIndex,
    bj: common_vendor.o($setup.jumpList),
    bk: common_vendor.o($setup.handleSaveDraft),
    bl: common_vendor.o($setup.deleteDialogConfirm),
    bm: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bn: common_vendor.o(($event) => $setup.toIndex = "example"),
    bo: common_vendor.o(($event) => $setup.scan()),
    bp: common_vendor.o($setup.dialogsearchCodeValConfirm),
    bq: common_vendor.o((id) => $setup.editGetByID(id)),
    br: common_vendor.p({
      type: $setup.type,
      billType: "RequestDiscard",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u641C\u7D22",
      scanInputDialogHint: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDiscard/detail.vue"]]);
wx.createPage(MiniProgramPage);
