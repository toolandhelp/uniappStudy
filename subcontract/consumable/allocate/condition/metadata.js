import {
	ref,
	reactive
} from 'vue'
import {
	getDate
} from '@/share/util/dateTime.js'

export default function() {
	const Data = ref({
		"IsSetNumber": true,
		"QST": "",
		"WarehouseOrCorpIDs": [],
		"BillCode": "",
		"AllocateEndDate": "",
		"AllocateStartDate": "",
		"ConsumableCategoryIDs": [],
		"HandlerEmployeeIDs": [],
		"HandlerOrgIDs": [],
		"ConsumableCode": "",
		"ListMode": 2,
		"Sort": 2,
		"PageSize": 20,
		"PageNO": 1,
		"BillStatus":0
	});
	
	const Condition = ref({
		"WarehouseOrCorp": [
		],
		"Person": [
		],
	
	});
	
	
	const BillType = [{
			label: "全部",
			value: 0
		},
		{
			label: "草稿",
			value: 1
		},
		{
			label: "已提交",
			value: 2
		},
		{
			label: "待审批",
			value: 3
		},
		{
			label: "审批中",
			value: 4
		},
		{
			label: "审批不通过",
			value: 5
		},
		{
			label: "审批通过",
			value: 6
		},
		{
			label: "待确认",
			value: 7
		},
		{
			label: "已生效",
			value: 8
		},
		{
			label: "已取消",
			value: 9
		},
	];
	return {
		Data,
		BillType,
		Condition
	}
};
