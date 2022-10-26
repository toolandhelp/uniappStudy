<template>
  <!-- 锚点与数量 -->
  <AnchorPointAndQty
  :qty="list.length"
  :totalQty="totalQty"
  :scrollAreaHeight="windowHeights - 105"
  :scrollTopDistance="scrollTopDistance" 
  @scrollTop="toIndex = 'scrollTop'" 
  />
  <uni-easyinput
    prefixIcon="search"
    v-model="qst"
    placeholder="盘点主题/盘点单号"
    @iconClick="search"
    confirmType="search"
    trim="both"
    :inputBorder="false"
    @confirm="search"
    @clear="search"
  >
  </uni-easyinput>
  <view class="list-style">
      <view class="list-content">
        <scroll-view
            :style="`height:${windowHeights - 46}px`"
            @scrolltolower="reachBottom"
            @scroll="scroll"
            :scroll-into-view="toIndex"
            :scroll-with-animation="false"
            scroll-y
          >
            <view id="scrollTop"></view>
            <view class="list-item_card" style="background:#fff" v-for="{
                  Title,
                  WaitingCheck,
                  AlreadyCheck,
                  BillerEmployeeName,
                  BillDatetime,
                  TaskCode,
                  TaskID,
                  AllQty,
                  EmployeeTaskID,
                } in list"
                :key="TaskID"
                @click="itemClick(TaskID, Title, TaskCode, EmployeeTaskID)">
              <view>
                <text class="bold">{{ Title }}</text>
              </view>
              <view class="list-item-col">
                <text selectable>盘点单号：{{ TaskCode }}</text>
                <text>待盘人数：{{ WaitingCheck }}</text>
              </view>
              <view class="list-item-col">
                <text>应盘人数：{{ AllQty }}</text>
                <text>实盘人数：{{ AlreadyCheck }}</text>
              </view>
              <view class="list-item-col">
                <text>创建人：{{ BillerEmployeeName }}</text>
                <text>创建时间：{{ BillDatetime }}</text>
              </view>
            </view>
            <view class="nothing" :style="`height:${windowHeights - 105}px`" v-if="list.length < 1">
              暂 无 数 据
            </view>
          </scroll-view>
      </view>
  </view>
  <!-- <uni-list>
    <uni-list-item
      link
      v-for="{
        Title,
        WaitingCheck,
        AlreadyCheck,
        BillerEmployeeName,
        BillDatetime,
        TaskCode,
        TaskID,
        AllQty,
        EmployeeTaskID,
      } in list"
      :key="TaskID"
      @click="itemClick(TaskID, Title, TaskCode, EmployeeTaskID)"
    >
      <template v-slot:body>
        <view class="list-item">
          <text class="bold" selectable>{{ Title }}</text>
          <view class="list-item-column">
            <text selectable>盘点单号：{{ TaskCode }}</text>
            <text>待盘人数：{{ WaitingCheck }}</text>
          </view>
          <view class="list-item-column">
            <text>应盘人数：{{ AllQty }}</text>
            <text>实盘人数：{{ AlreadyCheck }}</text>
          </view>
          <view class="list-item-column">
            <text>创建人：{{ BillerEmployeeName }}</text>
            <text>创建时间：{{ BillDatetime }}</text>
          </view>
        </view>
      </template>
    </uni-list-item>
  </uni-list> -->
</template>

<script>
import inventoryController from "../../../../service/controller/asset/inventoryController";
import { navigateTo } from "../../../../share/redirect/index";
import { ref } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import { showLoading,clearLoading } from "../../../../share/util/message";
import { only } from "../../../../share/util/uniEvent";
import eventNames from "../../../../service/enumeration/eventNames";
import AnchorPointAndQty from "../../../../components/anchor-point-and-qty/anchor-point-and-qty.vue";

export default {
  components: {AnchorPointAndQty },
  setup() {
    const qst = ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = ref([]);
    const totalQty = ref(0);
    const toIndex = ref("");
    const scrollTopDistance = ref(0);
    // 获取屏幕高度
    const windowHeights = ref(0);

    async function search() {
      showLoading();
      uni.showNavigationBarLoading();
      const {PageCount, Items,TotalRecordQty } = await inventoryController.employeeList(qst.value,currentPage);
      pageCount = PageCount;
      if (currentPage === 1) {
        list.value = Items;
      } else {
        list.value = list.value.concat(Items);
      }
      totalQty.value = TotalRecordQty;
      clearLoading();
      uni.stopPullDownRefresh();
      uni.hideNavigationBarLoading();
    }

    {
      search();
      only(eventNames.employeeInvDetailBack, search);
      uni.getSystemInfo({
        success: (result) => {
            windowHeights.value = result.windowHeight;
        },
    });
    }

    function scroll({detail}){
      scrollTopDistance.value = detail.scrollTop;
      toIndex.value = '';
    }

    function reachBottom() {
      if (currentPage >= pageCount) {
        uni.hideNavigationBarLoading();
        showErrorToast("暂无更多数据");
      } else {
        ++currentPage;
        search();
      }
    }

    function refreshList() {
      currentPage = 1;
      search();
    }

    onPullDownRefresh(() => {
      refreshList();
    });

    function itemClick(id, title, taskCode, employeeTaskID) {
      title = decodeURIComponent(title);
      navigateTo(
        `./detail?id=${id}&code=${taskCode}&employeeTaskID=${employeeTaskID}&title=${title}`
      );
    }

    return { 
      qst, 
      list,
      totalQty,
      toIndex,
      scrollTopDistance,
      scroll, 
      search, 
      itemClick,
      reachBottom,
      windowHeights 
      };
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
}
.list-item-column {
  font-size: 12px;
  color: #999;
  display: flex;
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & > text:nth-child(1) {
    width: 200px;
  }
  & > text:nth-child(2) {
    width: 180px;
  }
}
</style>
