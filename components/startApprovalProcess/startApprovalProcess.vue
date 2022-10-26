<template>
    <uni-popup ref="approveStartUpDialog" type="dialog">
        <uni-popup-dialog
        type="info"
        :before-close="true"
        cancelText="取消"
        confirmText="确认"
        title="启动审批流"
        @confirm="approveStartConfirm"
        @close="close"
        >
        <view class="approve">
            <view class="approve-type">
            <text>下个节点：</text>
            <view>
                {{ approvalProcessData.nextActivityName }}
            </view>
            </view>
            <view class="approve-type">
            <text>审批人员：</text>
            <view class="select">
                <cj-uni-data-select
                    :clear="false"
                    v-model="approvalProcessData.employeeID"
                    :localdata="approverOption"
                    @change="approverChange"
                    v-if="approverOption.length > 1"
                />
                <template v-else>
                    {{ approvalProcessData.employeeName }}
                </template>
            </view>
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
import cjUniDataSelect from "@/components/uni-data-select/components/uni-data-select/uni-data-select.vue";
export default {
    emits:['closeDialog','approveStartConfirm'],
    components:{"cj-uni-data-select":cjUniDataSelect},
    props:{
        approverOption:{
            type:Array,
            default:()=>[]
        },
        approvalProcessData:{
            type:Object,
            required:true
        }
    },
    setup(props,ctx) {
        const approveStartUpDialog = ref(null);
        //审批人员ID
        const employeeID = ref([]);        
        // 启动审批
        function approveStartConfirm() {
            if (
                props.approverOption.length > 1 &&
                employeeID.value.length == 0
            ) {
                showErrorToast("请选择审批人");
                return;
            }
            ctx.emit("approveStartConfirm",employeeID.value);
        }

        function approverChange(val) {
         employeeID.value =  props.approverOption.filter((p) => p.EmployeeID == val);
         console.log(employeeID.value)
        }

        function close(){
            ctx.emit("closeDialog");
        }

        onMounted(()=>{
            approveStartUpDialog.value.open();
        })

        {

        }
        return {
            approveStartUpDialog,
            approveStartConfirm,
            approverChange,
            employeeID,
            close,
        }
    }
}
</script>
<style lang="scss" scoped>
.approve {
  width: 100%;
}
.approve-type {
  font-size: 14px;
  color: #4444;
  display: flex;
  padding: 5px 0;
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
.approve-type view:nth-child(2) {
  width: 70%;
  color: #444;
}
</style>
