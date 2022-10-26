"use strict";
var common_vendor = require("../../../../common/vendor.js");
var GetMetadata = () => {
  const files = common_vendor.ref([]);
  const isfiles = common_vendor.ref(true);
  const toIndex = common_vendor.ref("");
  const bill = common_vendor.ref({
    id: null,
    status: null,
    isSubmit: null,
    code: "",
    warehouse: {
      Name: "",
      ID: "",
      OID: ""
    },
    discardDate: "",
    corpID: "",
    handledPerson: {
      ID: "",
      Name: ""
    },
    handlerOrg: {
      ID: "",
      NameCN: "",
      NameEN: ""
    },
    remark: "",
    remark: "",
    IsStart: false,
    startFlow: true,
    FlowPath: false,
    IsApproval: false,
    enablingApproval: false
  });
  const rowDetail = common_vendor.ref({
    ConsumableName: "",
    Brand: "",
    Spec: "",
    Model: "",
    Qty: 1,
    TotalAvailableStock: 0
  });
  const remarkVal = common_vendor.ref("");
  const applyReasonOption = common_vendor.ref([]);
  const billDetail = common_vendor.ref([]);
  const deleteOperationBtn = common_vendor.ref([]);
  deleteOperationBtn.value = [
    {
      text: "\u53D6\u6D88",
      style: {
        backgroundColor: "#007aff"
      }
    },
    {
      text: "\u5220\u9664",
      style: {
        backgroundColor: "#F56C6C"
      }
    }
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
  let serachGoodsList = common_vendor.ref([]);
  const goodsDialog = common_vendor.ref(null);
  const isOpened = common_vendor.ref("none");
  const inputDialog = common_vendor.ref(null);
  const editInfoTitle = common_vendor.ref("");
  const inputRemarkDialog = common_vendor.ref(null);
  const detailIndex = common_vendor.ref(null);
  const deleteDialog = common_vendor.ref(null);
  const approveDialog = common_vendor.ref(null);
  const submitMsgType = common_vendor.reactive({
    type: "info",
    cancel: "\u53D6\u6D88",
    confirm: "\u786E\u8BA4",
    title: "\u786E\u8BA4\u63D0\u4EA4?"
  });
  const submitDialog = common_vendor.ref(null);
  const approveStartUpDialog = common_vendor.ref(null);
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
  const processTrackDialog = common_vendor.ref(null);
  const processTrackCurrent = common_vendor.ref(0);
  const processTrackApprovalLog = common_vendor.ref([]);
  const processTrackApprovalTask = common_vendor.ref([]);
  const windowHeights = common_vendor.ref("");
  let nonEditable = common_vendor.ref(false);
  return {
    bill,
    rowDetail,
    remarkVal,
    deleteOperationBtn,
    billDetail,
    applyReasonOption,
    fab,
    fabPattern,
    fabContent,
    scanCodeDialog,
    searchCodeVal,
    serachGoodsList,
    goodsDialog,
    isOpened,
    inputDialog,
    editInfoTitle,
    inputRemarkDialog,
    detailIndex,
    deleteDialog,
    approveDialog,
    submitMsgType,
    submitDialog,
    approveStartUpDialog,
    approverOption,
    approvalProcessData,
    processTrackDialog,
    processTrackCurrent,
    processTrackApprovalLog,
    processTrackApprovalTask,
    windowHeights,
    nonEditable,
    isfiles,
    files,
    toIndex
  };
};
exports.GetMetadata = GetMetadata;
