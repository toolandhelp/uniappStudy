import {
	ref,reactive
} from 'vue'
import {
	getStorage
} from "@/share/util/storage";
import {
	getCurrentDate
} from "@/share/util/dateTime";

export default () => {
	
	 const files = ref([]);
	 const isfiles = ref(true);
	  const toIndex = ref(""); //锚点链接
	// AddOrEdit: 1
	// Attachments: []
	// Details: [{ID: null, Sequence: 1, AvailableStock: 8, Batch: "", Brand: null, ConsumableID: 12,…}]
	// DiscardDate: "2022-08-16"
	// HandlerEmployeeID: 9
	// HandlerEmployeeName: "罗佳骏"
	// HandlerOrgID: 21
	// HandlerOrgNameCN: "后端部"
	// HandlerOrgNameEN: "houduanbumen"
	// ID: null
	// IsCopy: false
	// IsSubmit: false
	// Remark: ""
	// WarehouseID: "8"
	const bill = ref({
		id: null,
		status: null,
		isSubmit: null,
		// 编码
		code: "",
		warehouse:{
			Name:"",
			ID:"",
			OID:""
		},
		discardDate:"",
		corpID:"",
		handledPerson:{
			ID:"",
			Name:""
		},
		handlerOrg:{
			ID:"",
			NameCN:"",
			NameEN:""
		},
		remark:"",
		
	
		// 单据备注
		remark: "",
		//启动审批
		IsStart: false,
		startFlow: true,
		// 流程轨迹
		FlowPath: false,
		// 审批按钮
		IsApproval: false,
		// 启用批准
		enablingApproval: false,
	
	})
	
	const rowDetail = ref({
		ConsumableName: "",
		Brand: "",
		Spec: "",
		Model: "",
		Qty: 1,
		TotalAvailableStock:0
	});
	
	const remarkVal = ref("");
	
	// 申领原因数据
	const applyReasonOption = ref([]);
	
	
	
	// 单据明细信息
	const billDetail = ref([]);
	// 明细删除操作按钮
	const deleteOperationBtn = ref([]);
	deleteOperationBtn.value = [{
			text: "取消",
			style: {
				backgroundColor: "#007aff"
			}
		},
		{
			text: "删除",
			style: {
				backgroundColor: "#F56C6C"
			}
		},
	];
	
	
	
	
	const fab = ref(null);
	
	// 新增按钮颜色配置
	const fabPattern = {
		color: "#7A7E83",
		backgroundColor: "#fff",
		selectedColor: "#007AFF",
		buttonColor: "#007AFF",
		iconColor: "#fff",
	};
	// 新增按钮选项
	const fabContent = [{
			iconPath: "/static/icon/sys.png",
			selectedIconPath: "/static/icon/sys.png",
			text: "扫码",
			active: false,
		},
		{
			iconPath: "/static/icon/edit.png",
			selectedIconPath: "/static/icon/edit.png",
			text: "检索",
			active: false,
		},
		{
		  iconPath: "/static/icon/asset_mingxi.png",
		  selectedIconPath: "/static/icon/asset_mingxi.png",
		  text: "明细",
		  active: false,
		},
		{
		  iconPath: "/static/icon/asset_fujian.png",
		  selectedIconPath: "/static/icon/asset_fujian.png",
		  text: "附件",
		  active: false,
		},
	];
	// 扫码弹框
	const scanCodeDialog = ref(null);
	
	const searchCodeVal = ref(""); //扫码检索
	
	let serachGoodsList = ref([]);
	
	// 资产弹窗
	const goodsDialog = ref(null);
	
	const isOpened = ref("none"); //滑动删除
	
	const inputDialog = ref(null);
	
	const editInfoTitle = ref(""); //编辑明细弹框标题
	
	const inputRemarkDialog = ref(null);
	
	const detailIndex = ref(null);
	
	const deleteDialog = ref(null);
	
	const approveDialog = ref(null);
	
	// 提交弹框信息
	const submitMsgType = reactive({
		type: "info",
		cancel: "取消",
		confirm: "确认",
		title: "确认提交?",
	});
	
	const submitDialog = ref(null); //提交弹框
	
	// 启动审批流
	const approveStartUpDialog = ref(null);
	
	// 审批人信息
	const approverOption = ref([]);
	
	// 启动审批弹框信息
	const approvalProcessData = ref({
		activityID: null,
		activityName: "",
		activityType: "",
		nextActivityID: null,
		nextActivityName: "",
		nextActivityType: "",
		employeeID: null,
		employeeName: "",
		nextActivityCandidaters: [],
		refuseType: null, //拒绝方式
		supportedStrategies: [], //审批不通过处理方式
		approvalType: 1, //审批结果
		approvalTypeOption: [{
				text: "通过",
				value: 1,
			},
			{
				text: "不通过",
				value: 0,
			},
		], //审批类型
		remark: "",
	});
	
	const processTrackDialog = ref(null);
	
	const processTrackCurrent = ref(0);
	// 流转日志
	const processTrackApprovalLog = ref([]);
	// 待办任务
	const processTrackApprovalTask = ref([]);
	
	const windowHeights = ref("");
	
	let nonEditable = ref(false); //不可编辑
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
	}
}
