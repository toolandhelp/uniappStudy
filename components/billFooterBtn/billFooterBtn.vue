<template>
    <!-- 删除单据弹框 -->
    <uni-popup ref="deleteDialog" class="deleteDialog" type="dialog">
        <uni-popup-dialog
        model="base"
        type="error"
        cancelText="取消"
        confirmText="确认"
        title="删除单据"
        @confirm="deleteDialogConfirm"
        ></uni-popup-dialog>
    </uni-popup>

    <!-- 启动审批流 -->
    <StartApprovalProcess
        v-if="approveStartUpDialog"
        :approverOption="approverOption"
        :approvalProcessData="approvalProcessData"
        @approveStartConfirm="approveStartConfirm"
        @closeDialog="approveStartUpDialog = false"
    />

    <!-- 审批弹框 -->
    <Approval
        v-if="approveDialog"
        :approvalProcessData="approvalProcessData"
        @confirmApproval="approveConfirm"
        @closeDialog="approveDialog = false"
    />

    <!-- 流程轨迹 -->
    <ProcessTrack
        v-if="processTrackDialog"
        @closeDialog="processTrackDialog = false"
        :processTrackApprovalTask="processTrackApprovalTask"
        :processTrackApprovalLog="processTrackApprovalLog"
    />
    <!-- 查看明细附件快捷键 -->
    <view class="scroll_to" v-if="nonEditable">
        <view @click="scrollToTop"
        ><uni-icons type="arrow-up" color="#fff" size="30"></uni-icons><br
        /></view>
        <view @click="scrollToFooter"
        ><uni-icons type="arrow-down" color="#fff" size="30"></uni-icons><br
        /></view>
    </view>
    
    <!-- 单据操作按钮 -->
    <view class="bill_operation_button" v-if="!nonEditable">
        <uni-fab
        ref="fab"
        :pattern="fabPattern"
        :content="fabContent"
        :horizontal="'right'"
        :vertical="'bottom'"
        :direction="'horizontal'"
        @trigger="fabTrigger"
        />
    </view>

    <!-- 扫码输入弹框 -->
    <uni-popup ref="scanRetrieval" type="dialog">
        <uni-popup-keyword
        mode="input"
        :title="scanInputDialogTitle"
        value=""
        :placeholder="scanInputDialogHint"
        @confirm="scanRetrievalConfirm"
        ></uni-popup-keyword>
    </uni-popup>

    <view class="bill-footer-btn">
        <view class="jump_list">
            <uni-icons v-if="!type" @click="jumpList" type="bars" color="#007aff" size="35"></uni-icons>
        </view>
        <view>
        <button
            @click="handleSaveDraft(0)"
            v-if="bill.status == 1 || bill.status == null"
        >
            <text class="text-overflow">保存草稿</text>
        </button>
        <button v-if="bill.status == 1" @click="billDelete">
            <text class="uni-icon-delete text-overflow">删除草稿</text>
        </button>
        <button
            @click="handleSaveDraft(1)"
            type="primary"
            class="uni-icon-submit"
            v-if="bill.status == 1 || bill.status == null"
        >
            <text class="text-overflow" style="color: #fff">提交</text>
        </button>
        <button v-if="bill.IsApproval" @click="approvalShow">
            <text class="text-overflow">审批</text>
        </button>
        <button
            v-if="bill.IsStart && bill.startFlow"
            @click="enablingApprovalShow"
        >
            <text class="text-overflow"> 启动审批流 </text>
        </button>
        <button v-if="bill.FlowPath" @click="processTrack">
            <text class="text-overflow">流程轨迹</text>
        </button>
        <button @click="sign" v-if="bill.status == 7">
            <text>签字</text>
        </button>
        </view>
    </view>
</template>
<script>
import { ref, watch,onMounted } from "vue";
import assetApprovalProcess from "../../service/controller/approvalProcess/asset";
import consumableApprovalProcess from "../../service/controller/approvalProcess/consumable";
import {
  showLoading,
  clearLoading,
} from "../../share/util/message";
import { awaitDelay } from "../../share/util/index";
import StartApprovalProcess from "../../components/startApprovalProcess/startApprovalProcess.vue";
import Approval from "../../components/approval/approval.vue";
import ProcessTrack from "../../components/processTrack/processTrack.vue";
import {fabPattern,fabContent} from "../../share/util/billBasicConfig";
import UniPopupKeyword from "../../components/uni-popup-keyword/components/uni-popup-dialog/uni-popup-dialog.vue";
export default {
    options:{styleIsolation:'shared'},
    // 默认值 isolated(启动隔离)
    // apply-shared或(页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面) 
    // shared(wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了apply-shared 或 shared 的自定义组件)
    components: {
        ProcessTrack, //流程轨迹
        StartApprovalProcess, //启动审批流
        Approval, //审批弹框
        UniPopupKeyword,//检索弹框
    },
    emits:['save','delete','getById','jumpList','scrollToTop','scrollToFooter','keyword'],
    props:{
        type:{},
        bill:{
            type:Object,
            required:true
        },
        billType:{
            type:String,
            required:true
        },
        autoStart:{
            type:Boolean,
            required:true
        },
        consumable:{
            type:Boolean,
            default:false
        },
        nonEditable:{
            type:Boolean,
            default:false
        },
        scanInputDialogTitle:{
            type:String,
            default:'搜索'
        },
        scanInputDialogHint:{
            type:String,
            default:'编码/名称'
        }
    },
    setup(props,ctx) {
        watch(()=>props.autoStart,(newVal)=>{
            if(newVal){
                enablingApprovalShow();
            }
        })

        var approvalProcess = {};

        onMounted(()=>{
            if(props.consumable){
                approvalProcess = consumableApprovalProcess;
            }else{
                approvalProcess = assetApprovalProcess;
            }
        })

        const fab = ref(null);

        const deleteDialog = ref(null);

        const approveStartUpDialog = ref(null);

        const approveDialog = ref(null);

        const processTrackDialog = ref(null);

        // 流转日志
        const processTrackApprovalLog = ref([]);
        // 待办任务
        const processTrackApprovalTask = ref([]);

        const rule = ref({
            startFlow:true,
             // 流程轨迹
            FlowPath: false,
            // 审批按钮
            IsApproval: false,
            // 启用批准
            enablingApproval: false,
        });

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
        approvalTypeOption: [
            {
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

        const approverOption = ref([]);//审批人数据

        // 扫码弹框
        const scanRetrieval = ref(null);

        function sign(){
            const signKey = getSignKey(props.billType);
            uni.navigateTo({
                url: `/pages/system/signConfirm/signConfirm?type=1&key=${signKey}&billID=${props.bill.id}`,
            });
        }

        function getSignKey(type){
            let key = '';
            if(props.consumable){
                switch(type){
                    // 申领
                    case 'RequestDraw':
                        key = 207;
                    break;
                }
            }else{
                switch(type){
                    // 申领
                    case 'RequestDraw':
                        key = 100;
                    break;
                    // 发放
                    case 'Draw':
                        key = 101;
                    break;
                    // 退库
                     case 'DrawBack':
                        key = 102;
                    break;
                    // 转移
                     case 'Transform':
                        key = 103;
                    break;
                    // 报废
                     case 'RequestDiscard':
                        key = 106;
                    break;
                    // 处置
                     case 'Discard':
                        key = 107;
                    break;
                }
            }
            return key;
        }

        function jumpList(){
            ctx.emit("jumpList");
        }


        // 启动审批流
        function enablingApprovalShow(){
            showLoading();
            rule.value.enablingApproval = false;
            approvalProcess.preStartFlow(props.billType,props.bill.id)
                .then(
                ({
                    ActivityID, //审批节点ID
                    ActivityName, //审批节点名称
                    ActivityType, //审批节点类型
                    NextActivityID, //下个审批节点ID
                    NextActivityName, //下个审批节点名称
                    NextActivityType, //下个审批节点类型
                    NextActivityCandidaters, //下个审批人信息{Array}
                }) => {
                    approvalProcessData.value.activityID = ActivityID;
                    approvalProcessData.value.activityName = ActivityName;
                    approvalProcessData.value.activityType = ActivityType;
                    approvalProcessData.value.nextActivityID = NextActivityID;
                    approvalProcessData.value.nextActivityName = NextActivityName;
                    approvalProcessData.value.nextActivityType = NextActivityType;
                    if (
                    NextActivityCandidaters.length != 1 &&
                    NextActivityCandidaters != null
                    ) {
                    approvalProcessData.value.employeeID = null;
                    approvalProcessData.value.employeeName = "";
                    } else {
                    const { EmployeeID, EmployeeName } = NextActivityCandidaters[0];
                    approvalProcessData.value.employeeID = EmployeeID
                        ? EmployeeID
                        : null; //下个节点审批人ID
                    approvalProcessData.value.employeeName = EmployeeName
                        ? EmployeeName
                        : ""; //下个几点审批人名称
                    }
                    approvalProcessData.value.nextActivityCandidaters =
                    NextActivityCandidaters;
                    approverOption.value = NextActivityCandidaters.map((p) => {
                    p.text = p.EmployeeName;
                    p.value = p.EmployeeID;
                    return p;
                    });
                    approveStartUpDialog.value = true; //启动审批流弹框
                    // 启动审批流
                    if (
                    (NextActivityCandidaters.length == 1 && props.bill.IsStart) ||
                    (NextActivityType == 2 && props.bill.IsStart)
                    ) {
                    approveStartConfirm();
                    } else {
                    clearLoading();
                    }
                }
                )
                .catch(() => clearLoading());
        }
        // 启动审批
        function approveStartConfirm(val) {
        showLoading();
        const approveData = {
            ID: props.bill.id,
            ActivityName: approvalProcessData.value.activityName,
            ActivityID: approvalProcessData.value.activityID,
            ActivityType: approvalProcessData.value.activityType,
            NextActivityName: approvalProcessData.value.nextActivityName,
            NextActivityID: approvalProcessData.value.nextActivityID,
            NextActivityType: approvalProcessData.value.nextActivityType,
            CandidateApprovers: val? val : approvalProcessData.value.nextActivityCandidaters,
        };
        approvalProcess.startFlow(props.billType,approveData).then(async ({ ID }) => {
            rule.value.startFlow = false;
            await awaitDelay(3000);
            resetApprovalProcessData(); //重置数据
            await ctx.emit("getById",ID);
            approveStartClose();
            })
            .catch(() => clearLoading());
        }

        // 取消启动审批流
        function approveStartClose() {
        approveStartUpDialog.value = false;
        }

        // 重置审批流程数据
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
                refuseType: null, //拒绝方式
                supportedStrategies: [], //审批不通过处理方式
                approvalType: 1, //审批结果
                approvalTypeOption: [
                {
                    text: "通过",
                    value: 1,
                },
                {
                    text: "不通过",
                    value: 0,
                },
                ], //审批类型
                remark: "",
            };
        }

        // 审批按钮
        function approvalShow() {
        showLoading();
        rule.value.enablingApproval = true;
        approvalProcess
            .prevApproval(props.billType,props.bill.id)
            .then((dataInfo) => {
            const {
                ActivityID, //审批节点ID
                ActivityName, //审批节点名称
                ActivityType, //审批节点类型
                NextActivityID, //下个审批节点ID
                NextActivityName, //下个审批节点名称
                NextActivityType, //下个审批节点类型
                NextActivityCandidaters, //下个审批人信息{Array}
                SupportedStrategies, //审批不通过的处理方式
            } = dataInfo[0];
            approvalProcessData.value.activityID = ActivityID;
            approvalProcessData.value.activityName = ActivityName;
            approvalProcessData.value.activityType = ActivityType;
            approvalProcessData.value.nextActivityID = NextActivityID;
            approvalProcessData.value.nextActivityName = NextActivityName;
            approvalProcessData.value.nextActivityType = NextActivityType;
            const { EmployeeID, EmployeeName } =
                NextActivityCandidaters != null ? NextActivityCandidaters[0] : [];
            approvalProcessData.value.employeeID =
                NextActivityCandidaters != null ? EmployeeID : ""; //下个节点审批人ID
            approvalProcessData.value.employeeName =
                NextActivityCandidaters != null ? EmployeeName : ""; //下个几点审批人名称
            approvalProcessData.value.approvalType = 1; //审批结果
            approvalProcessData.value.refuseType =
                SupportedStrategies != null && SupportedStrategies.length > 0
                ? SupportedStrategies[0]
                : null; //拒绝审批结果
            approvalProcessData.value.remark = ""; //审批意见

            approvalProcessData.value.nextActivityCandidaters =
                NextActivityCandidaters;
            approvalProcessData.value.supportedStrategies =
                SupportedStrategies != null
                ? SupportedStrategies.map((item) => {
                    return {
                        text: item == 1 ? "打回" : item == 2 ? "拒绝" : "退回",
                        value: item,
                    };
                    })
                : [];
            approveDialog.value = true;
            })
            .finally(() => clearLoading());
        }


        // 审批确认
        function approveConfirm(obj) {
        // if(rule.value.enablingApproval){
        //     approveStartConfirm();
        // }else{
                submitApproval(obj);
        // }
        }

        // 审批确认提交
        function submitApproval({ approvalType, refuseType, remark }) {
        showLoading();
        const obj = {
            ID: props.bill.id,
            IsPass: approvalType, //审批结果
            Remark: remark, //审批意见
            SupportedStrategies: refuseType, //审批不通过结果
            IsAdditionalApproval: false, //是否加签(功能暂未开发)
            AdditionalApprovalEmployeeId: null, //加签人员(功能暂未开发)
            ActivityName: approvalProcessData.value.activityName,
            ActivityID: approvalProcessData.value.activityID,
            ActivityType: approvalProcessData.value.activityType,
            NextActivityName: approvalProcessData.value.nextActivityName,
            NextActivityID: approvalProcessData.value.nextActivityID,
            NextActivityType: approvalProcessData.value.nextActivityType,
            CandidateApprovers: approvalProcessData.value.nextActivityCandidaters,
        };
        approvalProcess
            .submitApproval(props.billType,obj)
            .then(({ ID }) => {
            rule.value.startFlow = false;
            let timer = setTimeout(() => {
                resetApprovalProcessData(); //重置数据
                ctx.emit("getById",ID);
                approveDialog.value = false;
                clearTimeout(timer);
            }, 3000);
            })
            .catch(() => clearLoading());
        }

        // 流程轨迹
        function processTrack() {
        showLoading();
        approvalProcess
            .getFlowTrail(props.billType,props.bill.id)
            .then(({ ApprovalLog, ApprovalTask }) => {
            processTrackApprovalLog.value = ApprovalLog.reverse();
            processTrackApprovalTask.value = ApprovalTask;
            processTrackDialog.value = true;
            })
            .finally(() => clearLoading());
        }

        function handleSaveDraft(status){
            ctx.emit("save",status);
        }
        function billDelete(){
            deleteDialog.value.open();
        }

        function deleteDialogConfirm(){
            ctx.emit("delete");
        }

        function scrollToTop(){
            ctx.emit("scrollToTop");
        }

        function scrollToFooter(){
            ctx.emit("scrollToFooter");
        }

        function fabTrigger({ index }){
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

        // 模糊检索
        function scanRetrievalConfirm(val){
            ctx.emit("keyword",val);
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
            fabPattern,
            fabContent,
            fabTrigger,
            scanRetrieval,
            scanRetrievalConfirm,
        }
    }
}
</script>
<style lang="scss" scoped>
.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.uni-icon-delete {
  color: #dd524d;
}
.uni-icon-submit {
  background: #4a74e7;
  color: #fff;
}
.bill-footer-btn {
  padding: 10px 0;
  width: 100%;
  height: 40px;
  background: #eeeeee;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > text {
    color: #444;
    font-size: 14px;
    text-align: left;
    margin-left: 5px;
    white-space: nowrap;
  }
  view:last-child {
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 50px);
    text-align: right;
    button {
      width: 100px;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      color: #444;
      margin: 0 5px;
      border-radius: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  > .jump_list {
    margin-left: 10px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
  }
}
.deleteDialog .uni-border-left ::v-deep .uni-button-color {
  color: #dd524d;
}

.scroll_to {
  position: fixed;
  right: 30px;
  bottom: 80px;
  view {
    font-size: 14px;
    color: #000;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    opacity: 0.6;
    .uni-icons {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d0d0d0;
      line-height: 40px;
    }
  }
}
.scroll_to ::v-deep .uni-icons {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d0d0d0;
  line-height: 40px;
}

.bill_operation_button::v-deep .uni-cursor-point .uni-fab--rightBottom {
  bottom: 70px;
}
.bill_operation_button::v-deep .uni-cursor-point .uni-fab__circle--rightBottom {
  bottom: 70px;
}
</style>