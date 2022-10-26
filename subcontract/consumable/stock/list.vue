<template>
  <view style="display: flex; flex-direction: column; height: 100%">
    <view class="head">
      <view class="seach_condition" @click="SettingCondition">
        <view class="icon_condition">
          <image
            src="/static/icon/condition.png"
            style="width: 26px; height: 26px"
          ></image>
        </view>
      </view>
      <view class="input_search">
        <input
          class="uni-input seach"
          focus
          placeholder="易耗品编码/名称/商品码"
          v-model="this.condition.QST"
          confirm-type="search"
          @confirm="confirm"
        />
      </view>
      <view class="QC">
        <view class="icon-saoma">
          <image
            src="/static/saoma.png"
            style="width: 30px; height: 30px"
            @click="ScanCode"
          ></image>
        </view>
      </view>
    </view>
    <view class="statistics">
      <view class="qty"> 共计：{{ total }} </view>
    </view>

    <scroll-view
      style="flex: 1; "
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="100"
      @refresherpulling="onPulling"
      lower-threshold="10px"
      @scrolltolower="reachBottom"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <view class="data_list">
        <view class="list-item" v-for="(item, index) in data" :key="item.ID">
          <view class="list-item-column">
            <text style="color: #000"
              >易耗品编码：{{ item.ConsumableCode }}</text
            >
            <text>易耗品名称：{{ item.ConsumableName }}</text>
          </view>
          <view class="list-item-textarea">
            <text>易耗品分类：{{ item.CategoryName }}</text>
          </view>
          <view class="list-item-column">
            <text>规格：{{ item.Spec }}</text>
            <text>批次：{{ item.Batch }}</text>
          </view>
          <view class="list-item-column">
            <text>最低库存：{{ item.MinimumStockText + item.Unit }}</text>
            <text>可用库存：{{ item.AvailableStockText + item.Unit }}</text>
          </view>
          <view class="list-item-column">
            <text>占用库存：{{ item.UsedStockText + item.Unit }}</text>
            <text>库存：{{ item.StockText + item.Unit }}</text>
          </view>
          <view class="list-item-column">
            <text>参考成本：{{ item.ReferenceCostText }}</text>
            <text>在库金额：{{ item.StockAmountText }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import StockController from "@/service/controller/consumable/stockController.js";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "@/share/util/message";
export default {
  data() {
    return {
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      triggered: false,
      isfreshing: false,
      condition: {
        CategoryIDs: [],
        WarehouseIDs: ["w_8"],
        QST: "",
        PageSize: 10,
        PageNO: 1,
        IsIncludeZeroStockItems: false,
        IsOnlyLessThanMinimunStockItems: false,
      },
      data: [],
      pageCount: 0,
      total: 0,
    };
  },
  methods: {
    ScanCode() {
      let that = this;
      uni.scanCode({
        success(res) {
          let content = res.result;
          that.condition.QST = getScanCode(content);
          that.condition.PageSize = 10;
          that.condition.PageNO = 1;
          that.load();
        },
        fail() {
          showErrorToast("扫描失败，请稍后重试");
        },
      });
    },
    confirm() {
      this.condition.PageNO = 1;
      this.load();
    },
    onRefresh() {
      if (this.isfreshing) return;
      this.isfreshing = true;
      if (!this.triggered)
        //保证刷新状态下，triggered为true
        this.triggered = true;
      this.condition.PageNO = 1;
      this.load(() => {
        this.isfreshing = false;
        this.triggered = false;
      });
    },
    reachBottom() {
      if (this.condition.PageNO >= this.pageCount) {
        uni.hideNavigationBarLoading();
        showErrorToast("暂无更多数据");
      } else {
        ++this.condition.PageNO;
        this.load(null, true);
      }
    },
    load(fn, isPush) {
      showLoading();
      StockController.getStockList(this.condition)
        .then((res) => {
          if (isPush) {
            this.data.push(...res.Items);
          } else {
            this.data = res.Items;
          }
          this.total = res.TotalRecordQty;
          this.pageCount = res.PageCount;

          if (fn) {
            fn();
          }
          clearLoading();
        })
        .catch(() => {
          clearLoading();
        });
    },
    SettingCondition() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },

  computed: {},
  mounted() {
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    let options = routes[routes.length - 1].options;
    console.log(options.condition);
    this.condition = JSON.parse(options.condition);
    this.condition.PageSize = 10;
    this.condition.PageNO = 1;
    this.load();
  },
};
</script>

<style lang="scss" scoped>
.head {
  border-bottom: 1px dashed #cccccc;
  padding: 10px 20px;
  padding-left: 10px;
  height: 50px;
  box-sizing: border-box;
  display: flex;

  & .seach_condition {
    & .icon_condition {
      padding-right: 10px;
    }
  }

  & .QC {
    width: 30px;
    padding-left: 10px;
    box-sizing: border-box;

    & .saomao {
      padding-right: 2px;
      padding-left: 0px;
    }
  }

  & .input_search {
    flex: 1;

    & .seach {
      width: 100%;
      height: 100%;
      background-color: rgb(247, 248, 250);
      padding: 0 16px;
      box-sizing: border-box;
      border-radius: 14px;
    }
  }
}

.statistics {
  padding: 0 20px;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;

  & .qty {
    float: right;
    height: 100%;
    line-height: 50px;
    font-size: 14px;
  }
}

.data_list {
  padding: 0 10px;

  & .list-item {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 10px 0;
  }

  & .list-item-column {
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

  & .list-item-textarea {
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

  & .list-item-title {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
