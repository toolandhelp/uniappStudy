<template>
    <!-- 流程轨迹 -->
  <uni-popup ref="processTrackDialog" type="dialog">
    <uni-popup-cancel-dialog title="流程轨迹" @close="close">
      <view :style="`height:${windowHeights / 2}px`">
      <view class="process_track_tab">
          <uni-segmented-control 
          :current="processTrackCurrent" 
          :values="['待办任务', '流转日志']" 
          :style-type="'text'"
		  :active-color="'#007aff'"  
          @clickItem="processTrackClickItem"/>
      </view>
      <view class="process_track_content" v-if="processTrackCurrent == 0">
          <view class="process_track" v-if="processTrackApprovalTask.length">
              <view>
                <view>当前节点：</view>
                <view> {{processTrackApprovalTask[0].FlowNodeName}}</view>
              </view>
              <view>
                <view>创建时间：</view>
                <view>{{processTrackApprovalTask[0].CreatedTime}}</view>
              </view>
              <view>
                <view>接收者：</view>
                <view>{{processTrackApprovalTask[0].ApprovalEmployeeName}}</view>
              </view>
          </view>
          <view v-else class="no_content">
            暂无内容
          </view>
      </view>
      <view class="process_track_content" v-if="processTrackCurrent == 1">
          <view class="process_track process_dividing_line" v-for="(item,index) in processTrackApprovalLog" :key="index">
              <view>
                <view>节点名称：</view>
                <view> {{item.FlowNodeName}}</view>
              </view>
              <view>
                <view>审批人：</view>
                <view>{{item.OperaterEmployeeName}}</view>
              </view>
              <view>
                <view>审批时间：</view>
                <view>{{item.OperationDatetime}}</view>
              </view>
              <view>
                <view>审批结果：</view>
                <view>{{item.OperationType}}</view>
              </view>
              <view>
                <view>审批意见：</view>
                <view>{{item.ApprovalComment}}</view>
              </view>
          </view>
          <view v-if="!processTrackApprovalLog.length" class="no_content">
            暂无内容
          </view>
      </view>
      </view>
    </uni-popup-cancel-dialog>
  </uni-popup>
</template>
<script>
import { ref, computed,onMounted } from "vue";
export default {
    props:{
        processTrackApprovalTask:{
            type:Array,
            default:()=>[]
        },
        processTrackApprovalLog:{
            type:Array,
            default:()=>[]
        }
    },
    emits:['closeDialog'],
    setup(props,ctx) {
        const processTrackDialog = ref(null);

        const processTrackCurrent = ref(0);

        const windowHeights = ref("");

        onMounted(()=>{
            processTrackDialog.value.open();
        });
        function close(){
            ctx.emit("closeDialog");
        }

        function processTrackClickItem(e){
            if (processTrackCurrent.value != e.currentIndex) {
                processTrackCurrent.value = e.currentIndex;
            }
        }

        {
           uni.getSystemInfo({
                success: (result) => {
                    windowHeights.value = result.windowHeight;
                },
            }); 
        }
         return {
             processTrackDialog,
             processTrackCurrent,
             close,
             processTrackClickItem,
             windowHeights,
         }
     }
}
</script>
<style lang="scss" scoped>
.process_track_tab{
  width: 260px;
}
.process_track_content{
  height: 90%;
  overflow-y: auto;
  .no_content{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #909399;
  }
  >.process_track{
    border-bottom: 1px dashed #ccc;
    &:last-child{
      border-bottom: 0px;
    }
  }
}
.process_track{
  overflow: hidden;
  width: 260px;
  >view{
    display: flex;
    font-size: 14px;
    font-weight: 400;
    color:rgb(160, 160, 160);
    &:first-child{
      font-weight: bold;
    }
    margin: 5px;
      >view:first-child{
      white-space: nowrap;
      width:30%;
      text-align: right;
    }
     >view:last-child{
       width: 70%;
       color: #2785e9;
     }
  }
}
.process_dividing_line{
  >view{
    color:rgb(160, 160, 160);
    >view:last-child{
       color: #777777;
    }
    &:first-child{
      font-weight: bold;
      >view{
        color: #f8555a !important;
      }
    }
  }
}
</style>