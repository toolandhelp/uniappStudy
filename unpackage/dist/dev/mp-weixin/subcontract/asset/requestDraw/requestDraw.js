"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_requestDrawController = require("../../../service/controller/asset/requestDrawController.js");
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
      code: "",
      name: "",
      brand: "",
      spec: "",
      model: "",
      qty: 1
    });
    const applyReasonOption = common_vendor.ref([]);
    const billDetail = common_vendor.ref([]);
    const serachGoodsList = common_vendor.ref([]);
    const goodsDialog = common_vendor.ref(null);
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
    const autoStart = common_vendor.ref(false);
    const toIndex = common_vendor.ref("");
    const files = common_vendor.ref([]);
    const nonEditable = common_vendor.ref(false);
    const windowHeights = common_vendor.ref("");
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_requestDrawController.requestDrawController.goodsList(keyWorld).then(({ Items }) => {
        serachGoodsList.value = Items.map((p) => {
          p.checked = false;
          return p;
        });
        if (serachGoodsList.value.length < 1) {
          share_util_message.showErrorToast("\u672A\u67E5\u8BE2\u5230\u53EF\u7528\u8D44\u4EA7\u8D44\u6599");
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
      if (detailIndex.value != null) {
        billDetail.value[detailIndex.value].Qty = parseInt(rowDetail.value.qty);
      }
      resetInputDialog();
    }
    function editDetailClose() {
      resetInputDialog();
    }
    function resetInputDialog() {
      rowDetail.value.code = "";
      rowDetail.value.name = "";
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
      const { Code, Name, Brand, Spec, Model, Qty } = billDetail.value[index];
      rowDetail.value.code = Code;
      rowDetail.value.name = Name;
      rowDetail.value.brand = Brand;
      rowDetail.value.spec = Spec;
      rowDetail.value.model = Model;
      rowDetail.value.qty = Qty;
      openEditDetailDalog(0);
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_requestDrawController.requestDrawController.requestDrawDelete(bill.value.id).then(() => {
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
      service_controller_asset_requestDrawController.requestDrawController.requestDrawSaveDraft(obj).then(({ Code, ID }) => {
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
      return service_controller_asset_requestDrawController.requestDrawController.requestDrawGetByID(id2).then(({
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
        autoStart.value = false;
        if (type && type == "mywork" && !bill.value.IsApproval) {
          share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.billDetailBack).then(() => share_redirect_index.navigateBack());
        }
      }).finally(() => share_util_message.clearLoading());
    }
    function jumpList() {
      share_redirect_index.navigateTo("/subcontract/asset/requestDraw/requestDrawList");
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
      service_controller_system_dictionaryController.dictionaryController.dictionaryGetByCode("D006").then(({ Items }) => {
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
    function checkBoxChange(e, Id) {
      let values = e.detail.value, items = serachGoodsList.value;
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
    function goodsDialogConfirm() {
      let items = serachGoodsList.value;
      let arr = items.filter((p) => p.checked);
      if (arr.length < 1) {
        share_util_message.showErrorToast("\u8BF7\u52FE\u9009\u4E00\u6761\u6570\u636E");
        return;
      }
      let timer = true;
      for (let i = 0, len = arr.length; i < len; i++) {
        let check = billDetail.value.filter((p) => p.GoodsID == arr[i].ID);
        if (check.length < 1) {
          let obj = {};
          obj.ID = null;
          obj.DetailID = arr[i].DetailID;
          obj.GoodsID = arr[i].ID;
          obj.Code = arr[i].Code;
          obj.Name = arr[i].Name;
          obj.GoodInfo = [{ ID: arr[i].ID, Name: arr[i].Name, Code: arr[i].Code }];
          obj.AssetCategoryName = arr[i].AssetCategoryName;
          obj.Brand = arr[i].Brand;
          obj.Spec = arr[i].Spec;
          obj.Model = arr[i].Model;
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
      goodsDialog.value.close();
      serachGoodsList.value = [];
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
      if (key == "remark") {
        bill.value.remark = "";
        return;
      }
      if (key == "applyReason") {
        bill.value.applyReason.text = "";
        bill.value.applyReason.value = null;
        return;
      }
    }
    function personnelSelect(key) {
      if (share_util_storage.getStorage("UserType") == 2)
        return;
      if (nonEditable.value)
        return;
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
        bill.value.applyCorp.value = OrgID;
        bill.value.applyCorp.text = OrgName;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/employee?&multiple=0&ids=${_id}`);
    }
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
    function filesChange(val) {
      files.value = val;
    }
    return {
      getStorage: share_util_storage.getStorage,
      type,
      IsScroll,
      bill,
      billDetail,
      remarkVal,
      rowDetail,
      applyReasonOption,
      applyReasonHandle,
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
      autoStart,
      jumpList,
      windowHeights,
      dialogsearchCodeValConfirm,
      addQuery,
      serachGoodsList,
      goodsDialog,
      goodsDialogConfirm,
      checkBoxChange,
      scan,
      applyDateTimeChange: ({ detail: { value } }) => {
        if (nonEditable.value)
          return;
        bill.value.applyDateTime.value = value;
      },
      removeInput,
      personnelSelect,
      files,
      toIndex,
      filesChange
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_BillEnclosure = common_vendor.resolveComponent("BillEnclosure");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_data_picker2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_data_picker + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "cae1dbe0-1,cae1dbe0-0"),
    b: common_vendor.o($setup.dialogRemarkInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    d: common_vendor.sr("inputRemarkDialog", "cae1dbe0-0"),
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
    i: common_vendor.sr("submitDialog", "cae1dbe0-2"),
    j: common_vendor.p({
      type: "dialog"
    }),
    k: common_vendor.f($setup.serachGoodsList, ({
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
        j: "cae1dbe0-7-" + i0 + ",cae1dbe0-6"
      };
    }),
    l: common_vendor.s(`height:${$setup.windowHeights / 2}px`),
    m: common_vendor.o(($event) => $setup.goodsDialog.close()),
    n: common_vendor.o($setup.goodsDialogConfirm),
    o: common_vendor.p({
      title: "\u9009\u62E9\u8D44\u4EA7\u8D44\u6599",
      type: "info",
      ["before-close"]: true
    }),
    p: common_vendor.sr("goodsDialog", "cae1dbe0-4"),
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
    w: common_vendor.t($setup.rowDetail.brand),
    x: common_vendor.p({
      disabled: true
    }),
    y: common_vendor.t($setup.rowDetail.spec),
    z: common_vendor.p({
      disabled: true
    }),
    A: common_vendor.t($setup.rowDetail.model),
    B: common_vendor.p({
      disabled: true
    }),
    C: common_vendor.o(($event) => $setup.rowDetail.qty = $event),
    D: common_vendor.p({
      border: false,
      maxlength: "10",
      type: "number",
      placeholder: "\u8BF7\u8F93\u5165\u6570\u91CF",
      modelValue: $setup.rowDetail.qty
    }),
    E: common_vendor.sr("inputClose", "cae1dbe0-9,cae1dbe0-8"),
    F: common_vendor.o($setup.editDetailConfirm),
    G: common_vendor.o($setup.editDetailClose),
    H: common_vendor.p({
      ["before-close"]: true,
      mode: "input",
      title: $setup.editInfoTitle
    }),
    I: common_vendor.sr("inputDialog", "cae1dbe0-8"),
    J: common_vendor.p({
      type: "center"
    }),
    K: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    L: common_vendor.t($setup.bill.code ? $setup.bill.code : "\u81EA\u52A8\u751F\u6210")
  } : {
    M: common_vendor.t($setup.bill.code)
  }, {
    N: !$setup.nonEditable
  }, !$setup.nonEditable ? {} : {}, {
    O: common_vendor.p({
      disabled: true
    }),
    P: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    Q: common_vendor.t($setup.bill.applyDateTime.value ? $setup.bill.applyDateTime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    R: common_vendor.o((...args) => $setup.applyDateTimeChange && $setup.applyDateTimeChange(...args))
  } : {
    S: common_vendor.t($setup.bill.applyDateTime.value)
  }, {
    T: common_vendor.n($setup.bill.applyDateTime.value ? "content_effective" : ""),
    U: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    V: $setup.nonEditable ? false : $setup.bill.applyDateTime.value
  }, ($setup.nonEditable ? false : $setup.bill.applyDateTime.value) ? {
    W: common_vendor.o(($event) => $setup.removeInput("applyDateTime")),
    X: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    Y: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    Z: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    aa: common_vendor.t($setup.bill.applyPersonnel.value ? $setup.bill.applyPersonnel.text : "\u8BF7\u9009\u62E9\u4EBA\u5458"),
    ab: common_vendor.o(($event) => $setup.personnelSelect("applyPersonnel"))
  } : {
    ac: common_vendor.t($setup.bill.applyPersonnel.text)
  }, {
    ad: common_vendor.n($setup.bill.applyPersonnel.value ? "content_effective" : ""),
    ae: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    af: $setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.applyPersonnel.value
  }, ($setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.applyPersonnel.value) ? {
    ag: common_vendor.o(($event) => $setup.removeInput("applyPersonnel")),
    ah: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ai: common_vendor.p({
      disabled: $setup.nonEditable || $setup.getStorage("UserType") == 2
    }),
    aj: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ak: common_vendor.w(({
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
      path: "ak",
      vueId: "cae1dbe0-25,cae1dbe0-24"
    }),
    al: common_vendor.t($setup.bill.applyReason.value ? $setup.bill.applyReason.text : "\u8BF7\u9009\u62E9\u7533\u9886\u539F\u56E0"),
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
    ap: common_vendor.t($setup.bill.applyReason.text)
  }, {
    aq: common_vendor.n($setup.bill.applyReason.value ? "content_effective" : ""),
    ar: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    as: $setup.nonEditable ? false : $setup.bill.applyReason.value
  }, ($setup.nonEditable ? false : $setup.bill.applyReason.value) ? {
    at: common_vendor.o(($event) => $setup.removeInput("applyReason")),
    av: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aw: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ax: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ay: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    az: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    aA: common_vendor.t($setup.bill.remark)
  }, {
    aB: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
    aC: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aD: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aE: common_vendor.o(($event) => $setup.removeInput("remark")),
    aF: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aG: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aH: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aI: common_vendor.f($setup.billDetail, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.Name)
      }, !$setup.nonEditable ? {
        b: common_vendor.o(($event) => $setup.editBillDetail(index)),
        c: "cae1dbe0-32-" + i0 + "," + ("cae1dbe0-31-" + i0),
        d: common_vendor.p({
          type: "compose",
          size: "30",
          color: "#444"
        })
      } : {}, {
        e: common_vendor.t(item.Code),
        f: common_vendor.t(item.Brand),
        g: common_vendor.t(item.Spec),
        h: common_vendor.t(item.Model),
        i: common_vendor.t(item.Qty),
        j: common_vendor.t(item.AssetCategoryName),
        k: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        l: common_vendor.o(($event) => $setup.uniSwipeChange(index), item.GoodsID),
        m: item.GoodsID,
        n: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), item.GoodsID),
        o: "cae1dbe0-31-" + i0 + ",cae1dbe0-30",
        p: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: item.isOpened,
          ["auto-close"]: false
        })
      });
    }),
    aJ: !$setup.nonEditable,
    aK: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    aL: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    aM: common_vendor.s(`height:100%`)
  } : {}, {
    aN: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    aO: common_vendor.o($setup.filesChange),
    aP: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    aQ: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    aR: common_vendor.o(($event) => $setup.toIndex = ""),
    aS: $setup.toIndex,
    aT: common_vendor.o($setup.jumpList),
    aU: common_vendor.o($setup.handleSaveDraft),
    aV: common_vendor.o($setup.deleteDialogConfirm),
    aW: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    aX: common_vendor.o(($event) => $setup.toIndex = "example"),
    aY: common_vendor.o(($event) => $setup.scan()),
    aZ: common_vendor.o($setup.dialogsearchCodeValConfirm),
    ba: common_vendor.o((id) => $setup.editGetByID(id)),
    bb: common_vendor.p({
      type: $setup.type,
      billType: "RequestDraw",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u8D44\u6599\u641C\u7D22",
      scanInputDialogHint: "\u8D44\u4EA7\u8D44\u6599\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/requestDraw/requestDraw.vue"]]);
wx.createPage(MiniProgramPage);
