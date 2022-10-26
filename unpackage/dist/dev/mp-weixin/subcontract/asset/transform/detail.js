"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_transformController = require("../../../service/controller/asset/transformController.js");
var service_controller_system_dictionaryController = require("../../../service/controller/system/dictionaryController.js");
var share_util_message = require("../../../share/util/message.js");
var share_redirect_index = require("../../../share/redirect/index.js");
var share_util_uniEvent = require("../../../share/util/uniEvent.js");
var service_enumeration_eventNames = require("../../../service/enumeration/eventNames.js");
var share_http_serveUrl = require("../../../share/http/serveUrl.js");
var share_util_billBasicConfig = require("../../../share/util/billBasicConfig.js");
require("../../../service/controller/controllerBase/assetControllerBase.js");
require("../../../service/controller/controllerBase/controllerBase.js");
require("../../../share/http/axios.js");
require("../../../service/enumeration/businessStatusCode.js");
require("../../../service/model/ajaxResult.js");
require("../../../share/token/index.js");
require("../../../share/util/storage.js");
require("../../../share/util/index.js");
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
    const remarkVal = common_vendor.ref("");
    const billDetail = common_vendor.ref([]);
    const isOpened = common_vendor.ref("none");
    const inputRemarkDialog = common_vendor.ref(null);
    const submitMsgType = common_vendor.reactive({
      type: "info",
      cancel: "\u53D6\u6D88",
      confirm: "\u786E\u8BA4",
      title: "\u786E\u8BA4\u63D0\u4EA4?"
    });
    const submitDialog = common_vendor.ref(null);
    const toIndex = common_vendor.ref("");
    const files = common_vendor.ref([]);
    const autoStart = common_vendor.ref(false);
    const windowHeights = common_vendor.ref("");
    const serachAssetList = common_vendor.ref([]);
    const assetDialog = common_vendor.ref(null);
    const nonEditable = common_vendor.ref(false);
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
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B");
        return;
      }
      if (!bill.value.IsTransformToPublic.value && !bill.value.NewKAO.value && !bill.value.NewKAE.value && !bill.value.NewLocation.value && !bill.value.NewUAO.value && !bill.value.NewUAE.value) {
        share_util_message.showErrorToast("\u8F6C\u79FB\u540E\u76F8\u5173\u4FE1\u606F\u4E0D\u5B8C\u5584,\u8BF7\u5B8C\u5584\u76F8\u5173\u4FE1\u606F");
        return;
      }
      if (bill.value.transferType.value == 2 && !bill.value.NewCorp.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u6240\u5C5E\u516C\u53F8");
        return;
      }
      if (bill.value.IsTransformToPublic.value) {
        if (!bill.value.NewUAO.value) {
          share_util_message.showErrorToast("\u516C\u5171\u8D44\u4EA7\u4F7F\u7528\u90E8\u95E8\u5FC5\u586B");
          return;
        }
      } else {
        if (bill.value.NewUAO.value && !bill.value.NewUAE.value) {
          share_util_message.showErrorToast("\u975E\u516C\u5171\u8D44\u4EA7,\u5B58\u5728\u4F7F\u7528\u90E8\u95E8,\u4F7F\u7528\u4EBA\u5458\u5FC5\u586B");
          return;
        }
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
            autoStart.value = true;
          }
        });
        submitDialogClose();
      }).finally(() => share_util_message.clearLoading());
    }
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
        autoStart.value = false;
        if (type && type == "mywork" && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/transform/list");
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
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D018").then(({ Items }) => {
        applyReasonOption.value = Items.map((p) => {
          return {
            text: p.ItemText,
            value: p.ID
          };
        });
        const { ItemText, ID } = Items.filter((p) => p.IsDefaultItem)[0];
        bill.value.applyReason.value = ID;
        bill.value.applyReason.text = ItemText;
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
      if (key == "NewCorp" && bill.value.transferType.value == 1) {
        return;
      }
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
      type,
      IsScroll,
      bill,
      applyReasonOption,
      applyReasonHandle,
      billDetail,
      uniSwipeActionItemRightOptions: share_util_billBasicConfig.uniSwipeActionItemRightOptions,
      isOpened,
      uniSwipeChange,
      uniSwipeClick,
      dialogRemarkInputConfirm,
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
      autoStart,
      jumpList,
      serachAssetList,
      assetDialog,
      assetDialogConfirm,
      addQuery,
      dialogsearchCodeValConfirm,
      windowHeights,
      locationSelect,
      corpDeptSelect,
      checkBoxChange,
      removeInput,
      switchChange,
      transferTypeChange,
      personnelSelect,
      files,
      filesChange,
      toIndex
    };
  }
};
if (!Array) {
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
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_data_picker2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
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
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_data_picker + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "e62d742a-1,e62d742a-0"),
    b: common_vendor.o($setup.dialogRemarkInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    d: common_vendor.sr("inputRemarkDialog", "e62d742a-0"),
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
    i: common_vendor.sr("submitDialog", "e62d742a-2"),
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
        j: "e62d742a-7-" + i0 + ",e62d742a-6"
      };
    }),
    l: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    m: common_vendor.o(($event) => $setup.assetDialog.close()),
    n: common_vendor.o($setup.assetDialogConfirm),
    o: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7",
      type: "info",
      ["before-close"]: true
    }),
    p: common_vendor.sr("assetDialog", "e62d742a-4"),
    q: common_vendor.p({
      type: "dialog"
    }),
    r: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    s: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210")
  } : {
    t: common_vendor.t($setup.bill.code)
  }, {
    v: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    w: common_vendor.p({
      disabled: true
    }),
    x: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    y: common_vendor.w(({
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
      path: "y",
      vueId: "e62d742a-11,e62d742a-10"
    }),
    z: common_vendor.t($setup.bill.transferType.value ? $setup.bill.transferType.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B"),
    A: common_vendor.o($setup.transferTypeChange),
    B: common_vendor.o(($event) => $setup.bill.transferType.value = $event),
    C: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u8F6C\u79FB\u7C7B\u578B",
      border: false,
      ["clear-icon"]: false,
      localdata: $setup.bill.transferType.options,
      modelValue: $setup.bill.transferType.value
    })
  } : {
    D: common_vendor.t($setup.bill.transferType.text)
  }, {
    E: common_vendor.n($setup.bill.transferType.value ? "content_effective" : ""),
    F: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    G: $setup.nonEditable ? false : $setup.bill.transferType.value
  }, ($setup.nonEditable ? false : $setup.bill.transferType.value) ? {
    H: common_vendor.o(($event) => $setup.removeInput("transferType")),
    I: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    J: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    K: $setup.bill.transferType.value == 2
  }, $setup.bill.transferType.value == 2 ? {} : {}, {
    L: common_vendor.n($setup.bill.transferType.value == 2 ? "" : "ensp"),
    M: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    N: common_vendor.t($setup.bill.NewCorp.value ? $setup.bill.NewCorp.text : "\u8BF7\u9009\u62E9\u6240\u5C5E\u516C\u53F8"),
    O: common_vendor.n($setup.bill.NewCorp.value ? "content_effective" : ""),
    P: common_vendor.o(($event) => $setup.corpDeptSelect("NewCorp", 0))
  } : {
    Q: common_vendor.t($setup.bill.NewCorp.text)
  }, {
    R: common_vendor.n($setup.bill.NewCorp.value ? "content_effective" : ""),
    S: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    T: $setup.nonEditable ? false : $setup.bill.NewCorp.value
  }, ($setup.nonEditable ? false : $setup.bill.NewCorp.value) ? {
    U: common_vendor.o(($event) => $setup.removeInput("NewCorp")),
    V: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    W: common_vendor.p({
      disabled: $setup.nonEditable ? true : $setup.bill.transferType.value == 1
    }),
    X: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    Y: common_vendor.t($setup.bill.NewLocation.value ? $setup.bill.NewLocation.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    Z: common_vendor.o(($event) => $setup.locationSelect("NewLocation"))
  } : {
    aa: common_vendor.t($setup.bill.NewLocation.text)
  }, {
    ab: common_vendor.n($setup.bill.NewLocation.value ? "content_effective" : ""),
    ac: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ad: $setup.nonEditable ? false : $setup.bill.NewLocation.value
  }, ($setup.nonEditable ? false : $setup.bill.NewLocation.value) ? {
    ae: common_vendor.o(($event) => $setup.removeInput("NewLocation")),
    af: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ag: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ah: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ai: common_vendor.t($setup.bill.NewKAO.value ? $setup.bill.NewKAO.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u90E8\u95E8"),
    aj: common_vendor.o(($event) => $setup.corpDeptSelect("NewKAO", 0))
  } : {
    ak: common_vendor.t($setup.bill.NewKAO.text)
  }, {
    al: common_vendor.n($setup.bill.NewKAO.value ? "content_effective" : ""),
    am: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    an: $setup.nonEditable ? false : $setup.bill.NewKAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAO.value) ? {
    ao: common_vendor.o(($event) => $setup.removeInput("NewKAO")),
    ap: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aq: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ar: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    as: common_vendor.t($setup.bill.NewKAE.value ? $setup.bill.NewKAE.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u4EBA\u5458"),
    at: common_vendor.o(($event) => $setup.personnelSelect("NewKAE"))
  } : {
    av: common_vendor.t($setup.bill.NewKAE.text)
  }, {
    aw: common_vendor.n($setup.bill.NewKAE.value ? "content_effective" : ""),
    ax: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ay: $setup.nonEditable ? false : $setup.bill.NewKAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAE.value) ? {
    az: common_vendor.o(($event) => $setup.removeInput("NewKAE")),
    aA: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aB: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aC: common_vendor.o($setup.switchChange),
    aD: common_vendor.p({
      ["show-switch"]: true,
      switchChecked: $setup.bill.IsTransformToPublic.value,
      disabled: $setup.nonEditable
    }),
    aE: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aF: common_vendor.t($setup.bill.NewUAO.value ? $setup.bill.NewUAO.text : "\u8BF7\u9009\u62E9\u4F7F\u7528\u90E8\u95E8"),
    aG: common_vendor.o(($event) => $setup.corpDeptSelect("NewUAO", 0))
  } : {
    aH: common_vendor.t($setup.bill.NewUAO.text)
  }, {
    aI: common_vendor.n($setup.bill.NewUAO.value ? "content_effective" : ""),
    aJ: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aK: $setup.nonEditable ? false : $setup.bill.NewUAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewUAO.value) ? {
    aL: common_vendor.o(($event) => $setup.removeInput("NewUAO")),
    aM: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aN: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aO: !$setup.bill.IsTransformToPublic.value
  }, !$setup.bill.IsTransformToPublic.value ? common_vendor.e({
    aP: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aQ: common_vendor.t($setup.bill.NewUAE.value ? $setup.bill.NewUAE.text : "\u8BF7\u9009\u62E9\u4F7F\u7528\u4EBA\u5458"),
    aR: common_vendor.o(($event) => $setup.personnelSelect("NewUAE"))
  } : {
    aS: common_vendor.t($setup.bill.NewUAE.text)
  }, {
    aT: common_vendor.n($setup.bill.NewUAE.value ? "content_effective" : ""),
    aU: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aV: $setup.nonEditable ? false : $setup.bill.NewUAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewUAE.value) ? {
    aW: common_vendor.o(($event) => $setup.removeInput("NewUAE")),
    aX: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aY: common_vendor.p({
      disabled: $setup.nonEditable
    })
  }) : {}, {
    aZ: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ba: common_vendor.w(({
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
      path: "ba",
      vueId: "e62d742a-27,e62d742a-26"
    }),
    bb: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u8F6C\u79FB\u539F\u56E0"),
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
    bf: common_vendor.t($setup.bill.applyReason.text)
  }, {
    bg: common_vendor.n($setup.bill.applyReason.value ? "content_effective" : ""),
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
    bm: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    bn: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    bo: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    bp: common_vendor.t($setup.bill.remark)
  }, {
    bq: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
    br: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    bs: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    bt: common_vendor.o(($event) => $setup.removeInput("remark")),
    bv: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    bw: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    bx: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    by: common_vendor.f($setup.billDetail, ({
      AssetID,
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
        d: common_vendor.t(Brand),
        e: common_vendor.t(Spec),
        f: common_vendor.t(Model),
        g: common_vendor.t(Qty),
        h: common_vendor.t(OriginalKAOName),
        i: common_vendor.t(OriginalUAOName),
        j: common_vendor.t(OriginalUAEName),
        k: common_vendor.t(OriginalAmount),
        l: common_vendor.t(OriginalLocationName),
        m: common_vendor.t(CategoryName),
        n: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        o: common_vendor.o(($event) => $setup.uniSwipeChange(index), AssetID),
        p: AssetID,
        q: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), AssetID),
        r: "e62d742a-33-" + i0 + ",e62d742a-32",
        s: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: isOpened,
          ["auto-close"]: false
        })
      };
    }),
    bz: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    bA: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    bB: common_vendor.s(`height:100%`)
  } : {}, {
    bC: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    bD: common_vendor.o($setup.filesChange),
    bE: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    bF: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    bG: common_vendor.o(($event) => $setup.toIndex = ""),
    bH: $setup.toIndex,
    bI: common_vendor.o($setup.jumpList),
    bJ: common_vendor.o($setup.handleSaveDraft),
    bK: common_vendor.o($setup.deleteDialogConfirm),
    bL: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    bM: common_vendor.o(($event) => $setup.toIndex = "example"),
    bN: common_vendor.o(($event) => _ctx.scan()),
    bO: common_vendor.o($setup.dialogsearchCodeValConfirm),
    bP: common_vendor.o((id) => $setup.editGetByID(id)),
    bQ: common_vendor.p({
      type: $setup.type,
      billType: "Transform",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u641C\u7D22",
      scanInputDialogHint: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/transform/detail.vue"]]);
wx.createPage(MiniProgramPage);
