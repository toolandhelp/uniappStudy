"use strict";
var common_vendor = require("../../common/vendor.js");
var service_controller_approvalProcess_asset = require("../../service/controller/approvalProcess/asset.js");
var service_controller_approvalProcess_consumable = require("../../service/controller/approvalProcess/consumable.js");
var share_util_message = require("../../share/util/message.js");
var share_util_index = require("../../share/util/index.js");
var share_util_billBasicConfig = require("../../share/util/billBasicConfig.js");
require("../../service/controller/controllerBase/assetControllerBase.js");
require("../../service/controller/controllerBase/controllerBase.js");
require("../../share/http/axios.js");
require("../../service/enumeration/businessStatusCode.js");
require("../../service/model/ajaxResult.js");
require("../../share/token/index.js");
require("../../share/util/storage.js");
require("../../share/http/serveUrl.js");
require("../../service/enumeration/productEnum.js");
require("../../share/redirect/index.js");
require("../../share/http/http.js");
require("../../service/enumeration/fileTypeEnum.js");
require("../../share/util/page.js");
require("../../service/controller/controllerBase/consumableControllerBase.js");
require("../../share/util/image.js");
const StartApprovalProcess = () => "../startApprovalProcess/startApprovalProcess.js";
const Approval = () => "../approval/approval.js";
const ProcessTrack = () => "../processTrack/processTrack.js";
const UniPopupKeyword = () => "../uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.js";
const _sfc_main = {
  options: { styleIsolation: "shared" },
  components: {
    ProcessTrack,
    StartApprovalProcess,
    Approval,
    UniPopupKeyword
  },
  emits: ["save", "delete", "getById", "jumpList", "scrollToTop", "scrollToFooter", "keyword"],
  props: {
    type: {},
    bill: {
      type: Object,
      required: true
    },
    billType: {
      type: String,
      required: true
    },
    autoStart: {
      type: Boolean,
      required: true
    },
    consumable: {
      type: Boolean,
      default: false
    },
    nonEditable: {
      type: Boolean,
      default: false
    },
    scanInputDialogTitle: {
      type: String,
      default: "\u641C\u7D22"
    },
    scanInputDialogHint: {
      type: String,
      default: "\u7F16\u7801/\u540D\u79F0"
    }
  },
  setup(props, ctx) {
    common_vendor.watch(() => props.autoStart, (newVal) => {
      if (newVal) {
        enablingApprovalShow();
      }
    });
    var approvalProcess = {};
    common_vendor.onMounted(() => {
      if (props.consumable) {
        approvalProcess = service_controller_approvalProcess_consumable.consumableApprovalProcess;
      } else {
        approvalProcess = service_controller_approvalProcess_asset.assetApprovalProcess;
      }
    });
    const fab = common_vendor.ref(null);
    const deleteDialog = common_vendor.ref(null);
    const approveStartUpDialog = common_vendor.ref(null);
    const approveDialog = common_vendor.ref(null);
    const processTrackDialog = common_vendor.ref(null);
    const processTrackApprovalLog = common_vendor.ref([]);
    const processTrackApprovalTask = common_vendor.ref([]);
    const rule = common_vendor.ref({
      startFlow: true,
      FlowPath: false,
      IsApproval: false,
      enablingApproval: false
    });
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
    const approverOption = common_vendor.ref([]);
    const scanRetrieval = common_vendor.ref(null);
    function sign() {
      const signKey = getSignKey(props.billType);
      common_vendor.index.navigateTo({
        url: `/pages/system/signConfirm/signConfirm?type=1&key=${signKey}&billID=${props.bill.id}`
      });
    }
    function getSignKey(type) {
      let key = "";
      if (props.consumable) {
        switch (type) {
          case "RequestDraw":
            key = 207;
            break;
        }
      } else {
        switch (type) {
          case "RequestDraw":
            key = 100;
            break;
          case "Draw":
            key = 101;
            break;
          case "DrawBack":
            key = 102;
            break;
          case "Transform":
            key = 103;
            break;
          case "RequestDiscard":
            key = 106;
            break;
          case "Discard":
            key = 107;
            break;
        }
      }
      return key;
    }
    function jumpList() {
      ctx.emit("jumpList");
    }
    function enablingApprovalShow() {
      share_util_message.showLoading();
      rule.value.enablingApproval = false;
      approvalProcess.preStartFlow(props.billType, props.bill.id).then(({
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
        if (NextActivityCandidaters.length == 1 && props.bill.IsStart || NextActivityType == 2 && props.bill.IsStart) {
          approveStartConfirm();
        } else {
          share_util_message.clearLoading();
        }
      }).catch(() => share_util_message.clearLoading());
    }
    function approveStartConfirm(val) {
      share_util_message.showLoading();
      const approveData = {
        ID: props.bill.id,
        ActivityName: approvalProcessData.value.activityName,
        ActivityID: approvalProcessData.value.activityID,
        ActivityType: approvalProcessData.value.activityType,
        NextActivityName: approvalProcessData.value.nextActivityName,
        NextActivityID: approvalProcessData.value.nextActivityID,
        NextActivityType: approvalProcessData.value.nextActivityType,
        CandidateApprovers: val ? val : approvalProcessData.value.nextActivityCandidaters
      };
      approvalProcess.startFlow(props.billType, approveData).then(async ({ ID }) => {
        rule.value.startFlow = false;
        await share_util_index.awaitDelay(3e3);
        resetApprovalProcessData();
        await ctx.emit("getById", ID);
        approveStartClose();
      }).catch(() => share_util_message.clearLoading());
    }
    function approveStartClose() {
      approveStartUpDialog.value = false;
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
      rule.value.enablingApproval = true;
      approvalProcess.prevApproval(props.billType, props.bill.id).then((dataInfo) => {
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
        ID: props.bill.id,
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
      approvalProcess.submitApproval(props.billType, obj).then(({ ID }) => {
        rule.value.startFlow = false;
        let timer = setTimeout(() => {
          resetApprovalProcessData();
          ctx.emit("getById", ID);
          approveDialog.value = false;
          clearTimeout(timer);
        }, 3e3);
      }).catch(() => share_util_message.clearLoading());
    }
    function processTrack() {
      share_util_message.showLoading();
      approvalProcess.getFlowTrail(props.billType, props.bill.id).then(({ ApprovalLog, ApprovalTask }) => {
        processTrackApprovalLog.value = ApprovalLog.reverse();
        processTrackApprovalTask.value = ApprovalTask;
        processTrackDialog.value = true;
      }).finally(() => share_util_message.clearLoading());
    }
    function handleSaveDraft(status) {
      ctx.emit("save", status);
    }
    function billDelete() {
      deleteDialog.value.open();
    }
    function deleteDialogConfirm() {
      ctx.emit("delete");
    }
    function scrollToTop() {
      ctx.emit("scrollToTop");
    }
    function scrollToFooter() {
      ctx.emit("scrollToFooter");
    }
    function fabTrigger({ index }) {
      switch (index) {
        case 0:
          ctx.emit("scan");
          break;
        case 1:
          scanRetrieval.value.open();
          break;
        case 2:
          scrollToTop();
          break;
        case 3:
          scrollToFooter();
          break;
      }
      fab.value.close();
    }
    function scanRetrievalConfirm(val) {
      ctx.emit("keyword", val);
    }
    return {
      deleteDialog,
      approveStartUpDialog,
      approveDialog,
      processTrackDialog,
      processTrackApprovalLog,
      processTrackApprovalTask,
      approvalProcessData,
      approverOption,
      approveStartConfirm,
      approveConfirm,
      handleSaveDraft,
      billDelete,
      approvalShow,
      enablingApprovalShow,
      processTrack,
      jumpList,
      sign,
      deleteDialogConfirm,
      scrollToTop,
      scrollToFooter,
      fab,
      fabPattern: share_util_billBasicConfig.fabPattern,
      fabContent: share_util_billBasicConfig.fabContent,
      fabTrigger,
      scanRetrieval,
      scanRetrievalConfirm
    };
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_StartApprovalProcess = common_vendor.resolveComponent("StartApprovalProcess");
  const _component_Approval = common_vendor.resolveComponent("Approval");
  const _component_ProcessTrack = common_vendor.resolveComponent("ProcessTrack");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _component_uni_popup_keyword = common_vendor.resolveComponent("uni-popup-keyword");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _component_StartApprovalProcess + _component_Approval + _component_ProcessTrack + _easycom_uni_icons2 + _easycom_uni_fab2 + _component_uni_popup_keyword)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_icons + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($setup.deleteDialogConfirm),
    b: common_vendor.p({
      model: "base",
      type: "error",
      cancelText: "\u53D6\u6D88",
      confirmText: "\u786E\u8BA4",
      title: "\u5220\u9664\u5355\u636E"
    }),
    c: common_vendor.sr("deleteDialog", "23d7913a-0"),
    d: common_vendor.p({
      type: "dialog"
    }),
    e: $setup.approveStartUpDialog
  }, $setup.approveStartUpDialog ? {
    f: common_vendor.o($setup.approveStartConfirm),
    g: common_vendor.o(($event) => $setup.approveStartUpDialog = false),
    h: common_vendor.p({
      approverOption: $setup.approverOption,
      approvalProcessData: $setup.approvalProcessData
    })
  } : {}, {
    i: $setup.approveDialog
  }, $setup.approveDialog ? {
    j: common_vendor.o($setup.approveConfirm),
    k: common_vendor.o(($event) => $setup.approveDialog = false),
    l: common_vendor.p({
      approvalProcessData: $setup.approvalProcessData
    })
  } : {}, {
    m: $setup.processTrackDialog
  }, $setup.processTrackDialog ? {
    n: common_vendor.o(($event) => $setup.processTrackDialog = false),
    o: common_vendor.p({
      processTrackApprovalTask: $setup.processTrackApprovalTask,
      processTrackApprovalLog: $setup.processTrackApprovalLog
    })
  } : {}, {
    p: $props.nonEditable
  }, $props.nonEditable ? {
    q: common_vendor.p({
      type: "arrow-up",
      color: "#fff",
      size: "30"
    }),
    r: common_vendor.o((...args) => $setup.scrollToTop && $setup.scrollToTop(...args)),
    s: common_vendor.p({
      type: "arrow-down",
      color: "#fff",
      size: "30"
    }),
    t: common_vendor.o((...args) => $setup.scrollToFooter && $setup.scrollToFooter(...args))
  } : {}, {
    v: !$props.nonEditable
  }, !$props.nonEditable ? {
    w: common_vendor.sr("fab", "23d7913a-7"),
    x: common_vendor.o($setup.fabTrigger),
    y: common_vendor.p({
      pattern: $setup.fabPattern,
      content: $setup.fabContent,
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal"
    })
  } : {}, {
    z: common_vendor.o($setup.scanRetrievalConfirm),
    A: common_vendor.p({
      mode: "input",
      title: $props.scanInputDialogTitle,
      value: "",
      placeholder: $props.scanInputDialogHint
    }),
    B: common_vendor.sr("scanRetrieval", "23d7913a-8"),
    C: common_vendor.p({
      type: "dialog"
    }),
    D: !$props.type
  }, !$props.type ? {
    E: common_vendor.o($setup.jumpList),
    F: common_vendor.p({
      type: "bars",
      color: "#007aff",
      size: "35"
    })
  } : {}, {
    G: $props.bill.status == 1 || $props.bill.status == null
  }, $props.bill.status == 1 || $props.bill.status == null ? {
    H: common_vendor.o(($event) => $setup.handleSaveDraft(0))
  } : {}, {
    I: $props.bill.status == 1
  }, $props.bill.status == 1 ? {
    J: common_vendor.o((...args) => $setup.billDelete && $setup.billDelete(...args))
  } : {}, {
    K: $props.bill.status == 1 || $props.bill.status == null
  }, $props.bill.status == 1 || $props.bill.status == null ? {
    L: common_vendor.o(($event) => $setup.handleSaveDraft(1))
  } : {}, {
    M: $props.bill.IsApproval
  }, $props.bill.IsApproval ? {
    N: common_vendor.o((...args) => $setup.approvalShow && $setup.approvalShow(...args))
  } : {}, {
    O: $props.bill.IsStart && $props.bill.startFlow
  }, $props.bill.IsStart && $props.bill.startFlow ? {
    P: common_vendor.o((...args) => $setup.enablingApprovalShow && $setup.enablingApprovalShow(...args))
  } : {}, {
    Q: $props.bill.FlowPath
  }, $props.bill.FlowPath ? {
    R: common_vendor.o((...args) => $setup.processTrack && $setup.processTrack(...args))
  } : {}, {
    S: $props.bill.status == 7
  }, $props.bill.status == 7 ? {
    T: common_vendor.o((...args) => $setup.sign && $setup.sign(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-23d7913a"], ["__file", "D:/gitPro/C8_UI/platformApp/components/billFooterBtn/billFooterBtn.vue"]]);
wx.createComponent(Component);
