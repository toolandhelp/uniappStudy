"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_discardController = require("../../../service/controller/asset/discardController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_storage = require("../../../share/util/storage.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_dateTime = require("../../../share/util/dateTime.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_util_index = require("../../../share/util/index.js");
var share_util_checkCompliance = require("../../../share/util/checkCompliance.js");
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
    const disposalType = common_vendor.ref([]);
    const toIndex = common_vendor.ref("");
    const files = common_vendor.ref([]);
    const nonEditable = common_vendor.ref(false);
    const autoStart = common_vendor.ref(false);
    const windowHeights = common_vendor.ref("");
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
      if (share_util_checkCompliance.priceCheck(amountVal.value)) {
        const number = parseFloat(Number(amountVal.value).toFixed(2));
        bill.value[amountInputKey.value].value = number.toString();
      }
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
            autoStart.value = true;
          }
        });
        submitDialogClose();
      }).finally(() => share_util_message.clearLoading());
    }
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
        autoStart.value = false;
        if (type && type == "mywork" && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/discard/list");
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
        bill.value.discardDatetime.value = value;
      },
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
      files,
      filesChange,
      toIndex,
      autoStart
    };
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_BillEnclosure = common_vendor.resolveComponent("BillEnclosure");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_easycom_uni_easyinput2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $setup.amountVal = $event),
    b: common_vendor.p({
      focus: true,
      border: false,
      maxlength: "17",
      type: "digit",
      placeholder: "\u8BF7\u8F93\u5165\u91D1\u989D",
      modelValue: $setup.amountVal
    }),
    c: common_vendor.o($setup.dialogAmountInputConfirm),
    d: common_vendor.p({
      type: "info",
      title: "\u8F93\u5165\u91D1\u989D"
    }),
    e: common_vendor.sr("inputAmountDialog", "1dd10939-0"),
    f: common_vendor.p({
      type: "dialog"
    }),
    g: common_vendor.o($setup.dialogRemarkInputConfirm),
    h: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    i: common_vendor.sr("inputRemarkDialog", "1dd10939-3"),
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.o($setup.submitDialogConfirm),
    l: common_vendor.o($setup.submitDialogClose),
    m: common_vendor.p({
      model: "base",
      ["before-close"]: true,
      type: $setup.submitMsgType.type,
      cancelText: $setup.submitMsgType.cancel,
      confirmText: $setup.submitMsgType.confirm,
      title: $setup.submitMsgType.title
    }),
    n: common_vendor.sr("submitDialog", "1dd10939-5"),
    o: common_vendor.p({
      type: "dialog"
    }),
    p: common_vendor.f($setup.serachAssetList, ({
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
        j: "1dd10939-10-" + i0 + ",1dd10939-9"
      };
    }),
    q: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    r: common_vendor.o(($event) => $setup.assetsDialog.close()),
    s: common_vendor.o($setup.assetsDialogConfirm),
    t: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    v: common_vendor.sr("assetsDialog", "1dd10939-7"),
    w: common_vendor.p({
      type: "dialog"
    }),
    x: common_vendor.t($setup.rowDetail.code),
    y: common_vendor.p({
      disabled: true
    }),
    z: common_vendor.t($setup.rowDetail.name),
    A: common_vendor.p({
      disabled: true
    }),
    B: common_vendor.w(({
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
      path: "B",
      vueId: "1dd10939-17,1dd10939-16"
    }),
    C: common_vendor.t($setup.rowDetail.disposalVal ? $setup.rowDetail.disposalText : "\u8BF7\u9009\u62E9\u5904\u7F6E\u65B9\u5F0F"),
    D: common_vendor.n($setup.rowDetail.disposalVal ? "info-item-color" : ""),
    E: common_vendor.o($setup.disposalTypeChange),
    F: common_vendor.o(($event) => $setup.rowDetail.disposalVal = $event),
    G: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u5904\u7F6E\u65B9\u5F0F",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.disposalType,
      modelValue: $setup.rowDetail.disposalVal
    }),
    H: common_vendor.o(($event) => $setup.rowDetail.remarks = $event),
    I: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u5904\u7F6E\u8BF4\u660E",
      modelValue: $setup.rowDetail.remarks
    }),
    J: common_vendor.o($setup.editDetailConfirm),
    K: common_vendor.o($setup.editDetailClose),
    L: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    M: common_vendor.sr("inputDialog", "1dd10939-11"),
    N: common_vendor.p({
      type: "center"
    }),
    O: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    P: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210")
  } : {
    Q: common_vendor.t($setup.bill.code)
  }, {
    R: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    S: common_vendor.p({
      disabled: true
    }),
    T: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    U: common_vendor.t($setup.bill.discardDatetime.value ? $setup.bill.discardDatetime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    V: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args))
  } : {
    W: common_vendor.t($setup.bill.discardDatetime.value)
  }, {
    X: common_vendor.n($setup.bill.discardDatetime.value ? "content_effective" : ""),
    Y: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    Z: $setup.nonEditable ? false : $setup.bill.discardDatetime.value
  }, ($setup.nonEditable ? false : $setup.bill.discardDatetime.value) ? {
    aa: common_vendor.o(($event) => $setup.removeInput("discardDatetime")),
    ab: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ac: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ad: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ae: common_vendor.t($setup.bill.handlerEmployee.value ? $setup.bill.handlerEmployee.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    af: common_vendor.o(($event) => $setup.personnelSelect("handlerEmployee"))
  } : {
    ag: common_vendor.t($setup.bill.handlerEmployee.text)
  }, {
    ah: common_vendor.n($setup.bill.handlerEmployee.value ? "content_effective" : ""),
    ai: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aj: $setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.handlerEmployee.value
  }, ($setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.handlerEmployee.value) ? {
    ak: common_vendor.o(($event) => $setup.removeInput("handlerEmployee")),
    al: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    am: common_vendor.p({
      disabled: $setup.nonEditable || $setup.getStorage("UserType") == 2
    }),
    an: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ao: common_vendor.t($setup.bill.cost.value ? $setup.bill.cost.value : "\u8BF7\u8F93\u5165\u5904\u7F6E\u6210\u672C"),
    ap: common_vendor.o(($event) => $setup.openAmountDialog("cost"))
  } : {
    aq: common_vendor.t($setup.bill.cost.value)
  }, {
    ar: common_vendor.n($setup.bill.cost.value ? "content_effective" : ""),
    as: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    at: $setup.nonEditable ? false : $setup.bill.cost.value
  }, ($setup.nonEditable ? false : $setup.bill.cost.value) ? {
    av: common_vendor.o(($event) => $setup.removeInput("cost")),
    aw: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ax: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ay: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    az: common_vendor.t($setup.bill.income.value ? $setup.bill.income.value : "\u8BF7\u8F93\u5165\u5904\u7F6E\u6536\u5165"),
    aA: common_vendor.o(($event) => $setup.openAmountDialog("income"))
  } : {
    aB: common_vendor.t($setup.bill.income.value)
  }, {
    aC: common_vendor.n($setup.bill.income.value ? "content_effective" : ""),
    aD: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aE: $setup.nonEditable ? false : $setup.bill.income.value
  }, ($setup.nonEditable ? false : $setup.bill.income.value) ? {
    aF: common_vendor.o(($event) => $setup.removeInput("income")),
    aG: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aH: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aI: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aJ: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    aK: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    aL: common_vendor.t($setup.bill.remark)
  }, {
    aM: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
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
      return common_vendor.e({
        a: common_vendor.t(item.Name)
      }, !$setup.nonEditable ? {
        b: common_vendor.o(($event) => $setup.editBillDetail(index)),
        c: "1dd10939-35-" + i0 + "," + ("1dd10939-34-" + i0),
        d: common_vendor.p({
          type: "compose",
          size: "30",
          color: "#444"
        })
      } : {}, {
        e: common_vendor.t(item.Code),
        f: common_vendor.t(item.OriginalCode),
        g: common_vendor.t(item.OriginalAmount),
        h: common_vendor.t(item.DiscardModeName),
        i: common_vendor.t(item.Brand),
        j: common_vendor.t(item.Spec),
        k: common_vendor.t(item.Model),
        l: common_vendor.t(item.Qty),
        m: common_vendor.t(item.CategoryName),
        n: common_vendor.t(item.DiscardDesc),
        o: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        p: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.index),
        q: item.index,
        r: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.index),
        s: "1dd10939-34-" + i0 + ",1dd10939-33",
        t: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: item.isOpened,
          ["auto-close"]: false
        })
      });
    }),
    aU: !$setup.nonEditable,
    aV: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    aW: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    aX: common_vendor.s(`height:100%`)
  } : {}, {
    aY: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    aZ: common_vendor.o($setup.filesChange),
    ba: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    bb: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bc: common_vendor.o(($event) => $setup.toIndex = ""),
    bd: $setup.toIndex,
    be: common_vendor.o($setup.jumpList),
    bf: common_vendor.o($setup.handleSaveDraft),
    bg: common_vendor.o($setup.deleteDialogConfirm),
    bh: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bi: common_vendor.o(($event) => $setup.toIndex = "example"),
    bj: common_vendor.o(($event) => $setup.scan()),
    bk: common_vendor.o($setup.dialogsearchCodeValConfirm),
    bl: common_vendor.o((id) => $setup.editGetByID(id)),
    bm: common_vendor.p({
      type: $setup.type,
      billType: "Discard",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u641C\u7D22",
      scanInputDialogHint: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/discard/detail.vue"]]);
wx.createPage(MiniProgramPage);
