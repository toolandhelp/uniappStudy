<template>
    <uni-popup ref="approveDialog" type="dialog">
        <uni-popup-dialog
        type="info"
        :before-close="true"
        cancelText="取消"
        confirmText="确认"
        title="单据审批"
        @confirm="approvalConfirm"
        @close="close"
        >
        <view class="approve">
            <view class="approve-type">
            <text>审批结果：</text>
            <view>
                <uni-data-checkbox
                v-model="approvalType"
                :localdata="approvalProcessData.approvalTypeOption"
                />
            </view>
            </view>
            <view class="approve-type" v-if="approvalType != 1">
            <text v-if="approvalProcessData.supportedStrategies.length">
                处理方式：
            </text>
            <view>
                <uni-data-checkbox
                v-model="refuseType"
                :localdata="approvalProcessData.supportedStrategies"
                />
            </view>
            </view>
            <view class="approve-opinion approve-type">
            <text>审批意见：</text>
            <view>
                <uni-easyinput
                type="textarea"
                v-model="remark"
                placeholder="请输入内容"
                />
            </view>
            </view>
            <view
            class="approve-footer approve-type"
            v-if="approvalType == 1"
            >
            <text>下个节点：</text>
            <text>
                {{ approvalProcessData.nextActivityName }}
            </text>
            </view>
        </view>
        </uni-popup-dialog>
    </uni-popup>
</template>
<script>
import { ref, computed,onMounted } from "vue";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../share/util/message";
export default {
    emits:['closeDialog','confirmApproval'],
     props:{
        approvalProcessData:{
            type:Object,
            required:true
        }
    },
    setup(props,ctx) {
        const approveDialog = ref(null);

        const approvalType = ref(1);//审批结果

        const refuseType = ref(props.approvalProcessData.refuseType);//处理方式

        const remark = ref("");//审批意见

        onMounted(()=>{
            approveDialog.value.open();
        })
        function approvalConfirm(){
            if (
                !approvalType.value &&
                !refuseType.value &&
                props.approvalProcessData.supportedStrategies.length != 0
            ) {
                showErrorToast("请选择处理方式");
                return;
            }
            if (
                !approvalType.value &&!remark.value
            ) {
                showErrorToast("请输入审批意见");
                return;
            }
            ctx.emit("confirmApproval",{
                approvalType:approvalType.value,
                refuseType:refuseType.value,
                remark:remark.value,
            });
        }

        function close(){
            ctx.emit("closeDialog");
        }

        return {
            approveDialog,
            approvalType,
            refuseType,
            remark,
            approvalConfirm,
            close,
        }
    }
}
</script>
<style lang="scss" scoped>
.approve {
  width: 100%;
}
.approve-opinion{
  align-items: flex-start;
}
.approve-type {
  font-size: 14px;
  color: #4444;
  display: flex;
  padding: 5px 0;
  >view{
    width:70%;
  }
}
.approve-type text:nth-child(1) {
  width: 30%;
  display: flex;
  align-items: center;
  color: #444;
  text-align: right;
  .checka {
    color: red;
  }
}
.approve-type text:nth-child(2) {
  width: 70%;
  color: #444;
}
.approve-type ::v-deep .uni-stat__select {
  padding: 0;
}

.approve-type ::v-deep .uni-select__input-box {
  width: 150px;
}
</style>