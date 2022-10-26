<template>
  <uni-easyinput
    prefixIcon="search"
    v-model="qst"
    placeholder="编码/名称"
    @iconClick="refreshList"
    confirmType="search"
    trim="both"
    :inputBorder="false"
    @confirm="refreshList"
    @clear="refreshList"
  >
  </uni-easyinput>
  <scroll-view
    class="can-borrow-list"
    :style="`height:${windowHeights - 36}px`"
    @scrolltolower="reachBottom"
    scroll-y
  >
    <uni-list>
      <uni-list-item
        link
        v-for="{
          AssertStatusText,
          Code,
          Name,
          LocationName,
          AssetCategoryName,
          SN,
          SapCorpName,
          AssertAttributeText,
          Qty,
          ID,
        } in list"
        :key="ID"
        @click="itemClick(ID)"
      >
        <template v-slot:body>
          <view class="list-item">
            <text class="list-item-title" selectable>{{ Name }}</text>
            <view class="list-item-column">
              <text>资产状态：{{ AssertStatusText }}</text>
              <text selectable>资产编码：{{ Code }}</text>
            </view>
            <view class="list-item-column">
              <text>资产分类：{{ AssetCategoryName }}</text>
              <text>存放位置：{{ LocationName }}</text>
            </view>
            <view class="list-item-column">
              <text selectable>设备序列号：{{ SN }}</text>
              <text>SAP公司：{{ SapCorpName }}</text>
            </view>
            <view class="list-item-column">
              <text>资产性质：{{ AssertAttributeText }}</text>
              <text>数量：{{ Qty }}</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </scroll-view>
</template>

<script>
import borrowReturnController from "../../../../service/controller/asset/borrowReturnController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../../share/util/message";
import { navigateTo } from "../../../../share/redirect/index";
import { reactive, ref } from "vue";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
export default {
  setup() {
    const qst = ref("");
    let currentPage = 1;
    let pageCount = -1;
    const list = ref([]);

    function search() {
      showLoading();
      borrowReturnController
        .borrowList(qst.value, currentPage)
        .then(({ PageCount, Items }) => {
          pageCount = PageCount;
          if (currentPage === 1) {
            list.value = Items;
          } else {
            list.value = list.value.concat(Items);
          }
          uni.stopPullDownRefresh();
          uni.hideNavigationBarLoading();
        })
        .finally(() => clearLoading());
    }

    function refreshList() {
      currentPage = 1;
      search();
    }

    {
      uni.showNavigationBarLoading();
      search();
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

    onPullDownRefresh(() => {
      refreshList();
    });

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}&handle=1`);
    }

    // 获取屏幕高度
    const windowHeights = ref("");
    uni.getSystemInfo({
      success: (result) => {
        windowHeights.value = result.windowHeight;
      },
    });
    return { qst, list, refreshList, itemClick, reachBottom, windowHeights };
  },
};
</script>

<style lang="scss" scoped>
.can-borrow-list {
  //  height: calc(100% - 36px);
  overflow: auto;
}
.list-item {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.list-item-column {
  font-size: 12px;
  color: #999;
  display: flex;
  padding: 5px 0;
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 50%;
  }
}
.list-item-textarea {
  font-size: 12px;
  color: #999;
  display: flex;
  padding: 5px 0;
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
}
.list-item-title {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
