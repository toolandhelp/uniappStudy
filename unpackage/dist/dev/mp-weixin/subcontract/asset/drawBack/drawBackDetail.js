"use strict";
var common_vendor = require("../../../common/vendor.js");
var service_controller_asset_drawBackController = require("../../../service/controller/asset/drawBackController.js");
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
      drawBackEmployee: {
        text: share_util_storage.getStorage("UserName"),
        value: share_util_storage.getStorage("EmployeeID")
      },
      drawBackOrg: {
        text: share_util_storage.getStorage("OrgName"),
        value: share_util_storage.getStorage("OrgID")
      },
      drawBackDatetime: {
        hint: "\u8BF7\u9009\u62E9\u9000\u5E93\u65E5\u671F",
        value: share_util_dateTime.getCurrentDate()
      },
      NewLocation: {
        hint: "\u9000\u5E93\u540E\u5B58\u653E\u4F4D\u7F6E",
        text: "",
        value: null
      },
      NewKAO: {
        hint: "\u9000\u5E93\u540E\u7BA1\u7406\u90E8\u95E8",
        text: "",
        value: null
      },
      NewKAE: {
        hint: "\u9000\u5E93\u540E\u7BA1\u7406\u4EBA\u5458",
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
    }
    function deleteDialogConfirm() {
      share_util_message.showLoading();
      service_controller_asset_drawBackController.drawBackController.drawBackDelete(bill.value.id).then(() => {
        share_util_uniEvent.emitPromise(service_enumeration_eventNames.eventNames.drawBackDetailBack).then(() => share_redirect_index.navigateBack());
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(IsSubmit) {
      bill.value.isSubmit = IsSubmit;
      if (!bill.value.drawBackDatetime.value) {
        share_util_message.showErrorToast("\u8BF7\u9009\u62E9\u9000\u5E93\u65E5\u671F");
        return;
      }
      if (!bill.value.drawBackEmployee.value) {
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
      obj.DrawBackEmployeeID = bill.value.drawBackEmployee.value;
      obj.DrawBackEmployeeName = bill.value.drawBackEmployee.text;
      obj.DrawBackOrgID = bill.value.drawBackOrg.value;
      obj.DrawBackOrgNameCN = bill.value.drawBackOrg.text;
      obj.drawBackDatetime = bill.value.drawBackDatetime.value;
      obj.NewLocationID = bill.value.NewLocation.value;
      obj.NewLocationNameCN = bill.value.NewLocation.text;
      obj.NewKAOID = bill.value.NewKAO.value;
      obj.NewKAONameCN = bill.value.NewKAO.text;
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
      service_controller_asset_drawBackController.drawBackController.drawBackSaveDraft(obj).then(({ Code, ID }) => {
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
      return service_controller_asset_drawBackController.drawBackController.drawBackGetByID(id2).then(({
        ID,
        Status,
        BillCode,
        DrawBackDatetime,
        DrawBackEmployeeID,
        DrawBackEmployeeName,
        DrawBackOrgID,
        DrawBackOrgNameCN,
        NewLocationName,
        NewLocationID,
        NewKAOName,
        NewKAOID,
        NewKAEName,
        NewKAEID,
        Remark,
        Details,
        Attachments,
        FlowInfo
      }) => {
        bill.value.id = ID;
        bill.value.status = Status;
        bill.value.code = BillCode;
        bill.value.drawBackDatetime.value = DrawBackDatetime ? DrawBackDatetime.substring(0, 10) : "";
        bill.value.drawBackEmployee.value = DrawBackEmployeeID;
        bill.value.drawBackEmployee.text = DrawBackEmployeeName;
        bill.value.drawBackOrg.value = DrawBackOrgID;
        bill.value.drawBackOrg.text = DrawBackOrgNameCN;
        bill.value.NewLocation.text = NewLocationName;
        bill.value.NewLocation.value = NewLocationID;
        bill.value.NewKAO.text = NewKAOName;
        bill.value.NewKAO.value = NewKAOID;
        bill.value.NewKAE.text = NewKAEName;
        bill.value.NewKAE.value = NewKAEID;
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
      share_redirect_index.navigateTo("/subcontract/asset/drawBack/drawBackList");
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
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.signBack, () => editGetByID(bill.value.id));
      common_vendor.index.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        }
      });
    }
    function addQuery(keyWorld) {
      share_util_message.showLoading();
      service_controller_asset_drawBackController.drawBackController.assetListQueryByBillType(keyWorld).then(({ Items }) => {
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
          obj.isOpened = "none";
          obj.AssetID = arr[i].ID;
          obj.ID = null;
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
    function corpDeptSelect(key) {
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.deptSelectBack, ({ id: id2, label }) => {
        bill.value[key].value = id2;
        bill.value[key].text = label;
      });
      const _id = bill.value[key].value;
      share_redirect_index.navigateTo(`pages/selector/system/corpDept?multiple=0&type=1&ids=${_id}`);
    }
    function dialogsearchCodeValConfirm(val) {
      const str = val.trim();
      if (str == "" || str == null || str == void 0) {
        share_util_message.showErrorToast("\u65E0\u6548\u7684\u68C0\u7D22\u6761\u4EF6");
        return;
      }
      addQuery(str);
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
      if (key == "drawBackDatetime") {
        bill.value.drawBackDatetime.value = "";
        return;
      }
      if (key == "drawBackEmployee") {
        bill.value.drawBackEmployee.text = "";
        bill.value.drawBackEmployee.value = null;
        bill.value.drawBackOrg.text = "";
        bill.value.drawBackOrg.value = null;
        return;
      }
      if (key == "NewLocation") {
        bill.value.NewLocation.text = "";
        bill.value.NewLocation.value = null;
        return;
      }
      if (key == "NewKAO") {
        bill.value.NewKAO.text = "";
        bill.value.NewKAO.value = null;
        bill.value.NewKAE.text = "";
        bill.value.NewKAE.value = null;
        return;
      }
      if (key == "NewKAE") {
        bill.value.NewKAE.text = "";
        bill.value.NewKAE.value = null;
        return;
      }
      if (key == "remark") {
        bill.value.remark = "";
        return;
      }
    }
    function personnelSelect(key) {
      if (key == "drawBackEmployee" && share_util_storage.getStorage("UserType") == 2) {
        return;
      }
      if (key == "NewKAE" && !bill.value.NewKAO.value) {
        share_util_message.showErrorToast("\u8BF7\u5148\u9009\u62E9\u7BA1\u7406\u90E8\u95E8");
        return;
      }
      share_util_uniEvent.only(service_enumeration_eventNames.eventNames.employeeSelectBack, ({ ID, Name, OrgID, OrgName }) => {
        bill.value[key].value = ID;
        bill.value[key].text = Name;
        if (key == "drawBackEmployee") {
          bill.value.drawBackOrg.value = OrgID;
          bill.value.drawBackOrg.text = OrgName;
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
      drawBackDatetimeChange: ({ detail: { value } }) => {
        if (nonEditable.value)
          return;
        bill.value.drawBackDatetime.value = value;
      },
      locationSelect,
      corpDeptSelect,
      checkBoxChange,
      removeInput,
      personnelSelect,
      files,
      scan,
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
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_BillEnclosure = common_vendor.resolveComponent("BillEnclosure");
  const _component_BillFooterBtn = common_vendor.resolveComponent("BillFooterBtn");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_section2 + _component_BillEnclosure + _component_BillFooterBtn)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_section = () => "../../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.sr("inputClose", "78e2a779-1,78e2a779-0"),
    b: common_vendor.o($setup.dialogRemarkInputConfirm),
    c: common_vendor.p({
      mode: "input",
      title: "\u5355\u636E\u5907\u6CE8",
      value: $setup.remarkVal,
      placeholder: "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"
    }),
    d: common_vendor.sr("inputRemarkDialog", "78e2a779-0"),
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
    i: common_vendor.sr("submitDialog", "78e2a779-2"),
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
        j: "78e2a779-7-" + i0 + ",78e2a779-6"
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
    p: common_vendor.sr("assetDialog", "78e2a779-4"),
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
    y: common_vendor.t($setup.bill.drawBackDatetime.value ? $setup.bill.drawBackDatetime.value : "\u8BF7\u9009\u62E9\u65E5\u671F"),
    z: common_vendor.o((...args) => $setup.drawBackDatetimeChange && $setup.drawBackDatetimeChange(...args))
  } : {
    A: common_vendor.t($setup.bill.drawBackDatetime.value)
  }, {
    B: common_vendor.n($setup.bill.drawBackDatetime.value ? "content_effective" : ""),
    C: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    D: $setup.nonEditable ? false : $setup.bill.drawBackDatetime.value
  }, ($setup.nonEditable ? false : $setup.bill.drawBackDatetime.value) ? {
    E: common_vendor.o(($event) => $setup.removeInput("drawBackDatetime")),
    F: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    G: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    H: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    I: common_vendor.t($setup.bill.drawBackEmployee.value ? $setup.bill.drawBackEmployee.text : "\u8BF7\u9009\u62E9\u7ECF\u529E\u4EBA"),
    J: common_vendor.o(($event) => $setup.personnelSelect("drawBackEmployee"))
  } : {
    K: common_vendor.t($setup.bill.drawBackEmployee.text)
  }, {
    L: common_vendor.n($setup.bill.drawBackEmployee.value ? "content_effective" : ""),
    M: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    N: $setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.drawBackEmployee.value
  }, ($setup.getStorage("UserType") == 2 ? false : $setup.nonEditable ? false : $setup.bill.drawBackEmployee.value) ? {
    O: common_vendor.o(($event) => $setup.removeInput("drawBackEmployee")),
    P: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    Q: common_vendor.p({
      disabled: $setup.nonEditable || $setup.getStorage("UserType") == 2
    }),
    R: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    S: common_vendor.t($setup.bill.NewLocation.value ? $setup.bill.NewLocation.text : "\u8BF7\u9009\u62E9\u5B58\u653E\u4F4D\u7F6E"),
    T: common_vendor.o(($event) => $setup.locationSelect("NewLocation"))
  } : {
    U: common_vendor.t($setup.bill.NewLocation.text)
  }, {
    V: common_vendor.n($setup.bill.NewLocation.value ? "content_effective" : ""),
    W: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    X: $setup.nonEditable ? false : $setup.bill.NewLocation.value
  }, ($setup.nonEditable ? false : $setup.bill.NewLocation.value) ? {
    Y: common_vendor.o(($event) => $setup.removeInput("NewLocation")),
    Z: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aa: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    ab: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ac: common_vendor.t($setup.bill.NewKAO.value ? $setup.bill.NewKAO.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u90E8\u95E8"),
    ad: common_vendor.o(($event) => $setup.corpDeptSelect("NewKAO"))
  } : {
    ae: common_vendor.t($setup.bill.NewKAO.text)
  }, {
    af: common_vendor.n($setup.bill.NewKAO.value ? "content_effective" : ""),
    ag: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ah: $setup.nonEditable ? false : $setup.bill.NewKAO.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAO.value) ? {
    ai: common_vendor.o(($event) => $setup.removeInput("NewKAO")),
    aj: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    ak: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    al: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    am: common_vendor.t($setup.bill.NewKAE.value ? $setup.bill.NewKAE.text : "\u8BF7\u9009\u62E9\u7BA1\u7406\u4EBA\u5458"),
    an: common_vendor.o(($event) => $setup.personnelSelect("NewKAE"))
  } : {
    ao: common_vendor.t($setup.bill.NewKAE.text)
  }, {
    ap: common_vendor.n($setup.bill.NewKAE.value ? "content_effective" : ""),
    aq: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    ar: $setup.nonEditable ? false : $setup.bill.NewKAE.value
  }, ($setup.nonEditable ? false : $setup.bill.NewKAE.value) ? {
    as: common_vendor.o(($event) => $setup.removeInput("NewKAE")),
    at: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    av: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aw: !$setup.nonEditable
  }, !$setup.nonEditable ? {
    ax: common_vendor.t($setup.bill.remark ? $setup.bill.remark : "\u8BF7\u8F93\u5165\u5907\u6CE8\u4FE1\u606F"),
    ay: common_vendor.o(($event) => $setup.openRemarkDialog())
  } : {
    az: common_vendor.t($setup.bill.remark)
  }, {
    aA: common_vendor.n($setup.bill.remark ? "content_effective" : ""),
    aB: !$setup.nonEditable
  }, !$setup.nonEditable ? common_vendor.e({
    aC: $setup.nonEditable ? false : $setup.bill.remark
  }, ($setup.nonEditable ? false : $setup.bill.remark) ? {
    aD: common_vendor.o(($event) => $setup.removeInput("remark")),
    aE: common_vendor.p({
      type: "close",
      size: "16"
    })
  } : {}) : {}, {
    aF: common_vendor.p({
      disabled: $setup.nonEditable
    }),
    aG: common_vendor.s(`height:${$setup.IsScroll.header}px`),
    aH: common_vendor.f($setup.billDetail, ({
      AssetID,
      Code,
      Name,
      CategoryName,
      OriginalCode,
      OriginalAmount,
      OriginalKAOName,
      OriginalKAEName,
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
        h: common_vendor.t(OriginalAmount),
        i: common_vendor.t(OriginalKAOName),
        j: common_vendor.t(OriginalKAEName),
        k: common_vendor.t(OriginalUAOName),
        l: common_vendor.t(OriginalUAEName),
        m: common_vendor.t(CategoryName),
        n: common_vendor.t(OriginalLocationName),
        o: common_vendor.s(index + 1 == $setup.billDetail.length ? "margin-bottom:0px" : ""),
        p: common_vendor.o(($event) => $setup.uniSwipeChange(index), AssetID),
        q: AssetID,
        r: common_vendor.o(($event) => $setup.uniSwipeClick($event, index), AssetID),
        s: "78e2a779-24-" + i0 + ",78e2a779-23",
        t: common_vendor.p({
          disabled: $setup.nonEditable,
          ["right-options"]: $setup.uniSwipeActionItemRightOptions,
          show: isOpened,
          ["auto-close"]: false
        })
      };
    }),
    aI: common_vendor.n($setup.nonEditable ? "disabled_color" : ""),
    aJ: $setup.billDetail.length < 1
  }, $setup.billDetail.length < 1 ? {
    aK: common_vendor.s(`height:100%`)
  } : {}, {
    aL: common_vendor.p({
      title: "\u660E\u7EC6\u5217\u8868",
      rTitle: `\u6570\u91CF\uFF1A${$setup.billDetailNumber}`,
      type: "line"
    }),
    aM: common_vendor.o($setup.filesChange),
    aN: common_vendor.p({
      option: $setup.files,
      nonEditable: $setup.nonEditable
    }),
    aO: common_vendor.s(`height:${$setup.IsScroll.content}px`),
    aP: common_vendor.o(($event) => $setup.toIndex = ""),
    aQ: $setup.toIndex,
    aR: common_vendor.o($setup.jumpList),
    aS: common_vendor.o($setup.handleSaveDraft),
    aT: common_vendor.o($setup.deleteDialogConfirm),
    aU: common_vendor.o(($event) => $setup.toIndex = "listDetail"),
    aV: common_vendor.o(($event) => $setup.toIndex = "example"),
    aW: common_vendor.o(($event) => $setup.scan()),
    aX: common_vendor.o($setup.dialogsearchCodeValConfirm),
    aY: common_vendor.o((id) => $setup.editGetByID(id)),
    aZ: common_vendor.p({
      type: $setup.type,
      billType: "DrawBack",
      bill: $setup.bill,
      nonEditable: $setup.nonEditable,
      autoStart: $setup.autoStart,
      scanInputDialogTitle: "\u8D44\u4EA7\u641C\u7D22",
      scanInputDialogHint: "\u7F16\u7801/\u539F\u7F16\u7801/\u540D\u79F0"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/gitPro/C8_UI/platformApp/subcontract/asset/drawBack/drawBackDetail.vue"]]);
wx.createPage(MiniProgramPage);
