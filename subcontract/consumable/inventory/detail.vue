<template>
  <!-- 检索资产 -->
  <uni-popup ref="inputCodeDialog" type="dialog">
    <uni-popup-dialog
      mode="input"
      title="输入资产编码检索资产"
      :before-close="true"
      value=""
      placeholder="输入资产编码"
      @confirm="inputCodeConfirm"
      @close="inputCodeDialog.close()"
    />
  </uni-popup>
  <!-- 模糊检索 -->
  <view class="keyword">
    <uni-easyinput
      prefixIcon="search"
      placeholder="编码/原编码/名称"
      @iconClick="refreshList"
      confirmType="search"
      trim="both"
      v-model="qst"
      :inputBorder="false"
      @confirm="refreshList"
      @clear="refreshList"
    >
    </uni-easyinput>
  </view>
  <!-- tab栏 -->
  <uni-segmented-control
    :current="tabIndex"
    :values="tabVal"
    style-type="text"
    :active-color="
      tabIndex === 0 ? '#d70000' : tabIndex === 1 ? '#7ecc21' : '#db5200'
    "
    @clickItem="switchTab"
  />
  <view class="header-type">
    <view>
      <uni-data-picker
        v-slot:default="{ data, error, options }"
        :border="false"
        :clear-icon="false"
        @input="sortTypeChange"
        :localdata="sortTypeOption"
        v-model="sortTypeText.value"
      >
        <view class="sort-text">
          <view>{{ sortTypeText.text }}</view>
          <uni-icons type="bottom" color="#4a74e7" size="14"></uni-icons>
        </view>
      </uni-data-picker>
    </view>
    <view v-if="tabIndex === 0"> 数量：{{ summarys.WaitingCheck }} </view>
    <view v-if="tabIndex === 1"> 数量：{{ summarys.AlreadyCheck }} </view>
    <view v-if="tabIndex === 2"> 数量：{{ summarys.Profit }} </view>
  </view>
  <scroll-view
    class="content"
    :scroll-top="scrollTop"
    @scroll="scroll"
    @scrolltolower="reachBottom"
    :scroll-y="true"
  >
    <uni-list v-if="tabIndex === 0">
      <uni-list-item
        v-for="{
          StockCheckStatus,
          StockCheckStatusText,
          Name,
          Code,
          OriginalCode,
          KAOName,
          KAEName,
          UAOName,
          UAEName,
          AssetCategoryName,
          LocationName,
          AssetID,
        } in listWaitingCheck"
        @click="itemClick(AssetID)"
        link
      >
        <template v-slot:body>
          <view class="list-item">
            <view class="list-item-title">
              <view>
                <uni-icons
                  type="circle-filled"
                  color="#d70000"
                  size="20"
                ></uni-icons>
                <view class="ensp waitingCheck">
                  <text selectable>{{ StockCheckStatusText }}</text>
                </view>
              </view>
              <view class="item-name">
                <text selectable>{{ Name }}</text>
              </view>
            </view>
            <view class="list-item-column">
              <text selectable>资产编码：{{ Code }}</text>
              <text selectable>原编码：{{ OriginalCode }}</text>
            </view>
            <view class="list-item-column">
              <text>管理部门：{{ KAOName }}</text>
              <text>管理人员：{{ KAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>使用部门：{{ UAOName }}</text>
              <text>使用人员：{{ UAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>资产分类：{{ AssetCategoryName }}</text>
              <text>存放位置：{{ LocationName }}</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
    <uni-list v-if="tabIndex === 1">
      <uni-list-item
        v-for="{
          StockCheckStatus,
          StockCheckStatusText,
          Name,
          Code,
          OriginalCode,
          KAOName,
          KAEName,
          UAOName,
          UAEName,
          AssetCategoryName,
          LocationName,
          StockCheckDesc,
          AssetID,
        } in listAlreadyCheck"
        @click="itemClick(AssetID)"
        link
      >
        <template v-slot:body>
          <view class="list-item">
            <view class="list-item-title">
              <uni-icons
                type="circle-filled"
                color="#7ecc21"
                size="20"
              ></uni-icons>
              <view class="ensp alreadyCheck">
                <text selectable>{{ StockCheckStatusText }}</text>
              </view>
              <view class="item-name">
                <text selectable>{{ Name }}</text>
              </view>
            </view>
            <view class="list-item-column">
              <text selectable>资产编码：{{ Code }}</text>
              <text selectable>原编码：{{ OriginalCode }}</text>
            </view>
            <view class="list-item-column">
              <text>管理部门：{{ KAOName }}</text>
              <text>管理人员：{{ KAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>使用部门：{{ UAOName }}</text>
              <text>使用人员：{{ UAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>资产分类：{{ AssetCategoryName }}</text>
              <text>存放位置：{{ LocationName }}</text>
            </view>
            <view class="list-item-remark">
              <text>实盘说明：{{ StockCheckDesc }}</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
    <uni-list v-if="tabIndex === 2">
      <uni-list-item
        v-for="{
          StockCheckStatus,
          StockCheckStatusText,
          Name,
          Code,
          OriginalCode,
          KAOName,
          KAEName,
          UAOName,
          UAEName,
          AssetCategoryName,
          LocationName,
        } in listProfit"
      >
        <template v-slot:body>
          <view class="list-item">
            <view class="list-item-title profit-title">
              <uni-icons
                type="circle-filled"
                color="#db5200"
                size="20"
              ></uni-icons>
              <view class="ensp profit">
                <text selectable>{{ StockCheckStatusText }}</text>
              </view>
              <view class="item-name">
                <text selectable>{{ Name }}</text>
              </view>
            </view>
            <view class="list-item-column">
              <text selectable>资产编码：{{ Code }}</text>
              <text selectable>原编码：{{ OriginalCode }}</text>
            </view>
            <view class="list-item-column">
              <text>管理部门：{{ KAOName }}</text>
              <text>管理人员：{{ KAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>使用部门：{{ UAOName }}</text>
              <text>使用人员：{{ UAEName }}</text>
            </view>
            <view class="list-item-column">
              <text>资产分类：{{ AssetCategoryName }}</text>
              <text>存放位置：{{ LocationName }}</text>
            </view>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
  </scroll-view>
  <view class="footer">
    <view class="center" @click="inputCodeDialog.open()">
      <uni-icons type="compose" color="#2979ff" size="26"></uni-icons>
      <text>手动输入编码</text>
    </view>
    <view class="center" @click="scan">
      <uni-icons type="scan" color="#2979ff" size="26"></uni-icons>
      <text>扫码查资产</text>
    </view>
  </view>
  <!-- 新增明细 -->
  <view class="asset-register" @click="inventoryRegister" v-if="tabIndex === 2">
    <uni-icons type="compose" size="30" color="#fff"></uni-icons>
    <view>盘点登记</view>
  </view>
</template>

<script>
import inventoryController from "@/service/controller/asset/inventoryController";
import {
  showErrorToast,
  showLoading,
  clearLoading,
} from "@/share/util/message";
import { navigateTo, navigateBack } from "@/share/redirect";
import eventNames from "@/service/enumeration/eventNames";
import { only } from "@/share/util/uniEvent";
import { getScanCode } from "@/share/util/index";
import { onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { getStorage } from "@/share/util/storage";
import { reactive, ref, nextTick } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    id: String,
    taskType: String,
  },
  setup({ id, taskType }) {
    const tabVal = ref(["待盘(0)", "已盘(0)", "盘盈(0)"]);
    const tabIndex = ref(0);
    const sortTypeText = ref({
      text: "默认排序",
      value: 0,
    });
    const sortTypeOption = ref([
      {
        text: "默认排序",
        value: 0,
      },
      {
        text: "编码排序",
        value: 1,
      },
      {
        text: "编码倒序",
        value: 2,
      },
      {
        text: "购置日期正序",
        value: 3,
      },
      {
        text: "购置日期倒序",
        value: 4,
      },
      {
        text: "登记日期正序",
        value: 5,
      },
      {
        text: "登记日期倒序",
        value: 6,
      },
    ]);

    let currentPageWaitingCheck = 1;
    let pageCountWaitingCheck = -1;
    const listWaitingCheck = ref([]);

    let currentPageAlreadyCheck = 1;
    let pageCountAlreadyCheck = -1;
    const listAlreadyCheck = ref([]);

    let currentPageProfit = 1;
    let pageCountProfit = -1;
    const listProfit = ref([]);

    const summarys = ref({});

    const inputCodeDialog = ref(null);

    const store = useStore();

    const qst = ref("");

    const scrollTop = ref(0);

    const oldScrollTop = ref(0);

    function refreshList() {
      if (tabIndex.value == 0) {
        currentPageWaitingCheck = 1;
      } else if (tabIndex.value == 1) {
        currentPageAlreadyCheck = 1;
      } else {
        currentPageProfit = 1;
      }
      goScrollTop();
      return search();
    }

    function sortTypeChange(val) {
      sortTypeText.value.text = sortTypeOption.value[val].text;
      sortTypeText.value.value = val;
      refreshList();
    }
    function switchTab(e) {
      if (tabIndex.value !== e.currentIndex) {
        tabIndex.value = e.currentIndex;
        if (tabIndex.value == 0) {
          currentPageWaitingCheck = 1;
        } else if (tabIndex.value == 1) {
          currentPageAlreadyCheck = 1;
        } else {
          currentPageProfit = 1;
        }
        goScrollTop();
        search();
      }
    }

    async function search() {
      showLoading();
      try {
        const index = tabIndex.value == 0 ? 2 : tabIndex.value == 1 ? 3 : 4;
        let obj = {
          QST: qst.value,
          ID: id,
          InventoryAssetSummary: index,
          PageNO: 1,
          PageSize: 10,
          SortPropertyID: sortTypeText.value.value,
        };

        const { PageCount, Items, Summarys } =
          await inventoryController.inventoryCorpTaskDetail(obj, taskType);
        if (index == 2) {
          pageCountWaitingCheck = PageCount;
          if (currentPageWaitingCheck === 1) {
            listWaitingCheck.value = Items;
          } else {
            listWaitingCheck.value = listWaitingCheck.value.concat(Items);
          }
        } else if (index == 3) {
          pageCountAlreadyCheck = PageCount;
          if (currentPageAlreadyCheck === 1) {
            listAlreadyCheck.value = Items;
          } else {
            listAlreadyCheck.value = listAlreadyCheck.value.concat(Items);
          }
        } else {
          pageCountProfit = PageCount;
          if (currentPageProfit === 1) {
            listProfit.value = Items;
          } else {
            listProfit.value = listProfit.value.concat(Items);
          }
        }
        summarys.value = Summarys;
        tabVal.value = [
          `待盘(${Summarys.WaitingCheck})`,
          `已盘(${Summarys.AlreadyCheck})`,
          `盘盈(${Summarys.Profit})`,
        ];
        uni.stopPullDownRefresh();
        uni.hideNavigationBarLoading();
      } finally {
        clearLoading();
      }
    }

    function reachBottom() {
      if (tabIndex.value == 0) {
        if (currentPageWaitingCheck >= pageCountWaitingCheck) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageWaitingCheck;
          search();
        }
      } else if (tabIndex.value == 1) {
        if (currentPageAlreadyCheck >= pageCountAlreadyCheck) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageAlreadyCheck;
          search();
        }
      } else {
        if (currentPageProfit >= pageCountProfit) {
          uni.hideNavigationBarLoading();
          showErrorToast("暂无更多数据");
        } else {
          ++currentPageProfit;
          search();
        }
      }
    }

    function inputCodeConfirm(code) {
      if (!code) {
        showErrorToast("请输入资产编码");
        return;
      }
      keyWordSearch(code);
    }
    function keyWordSearch(keyWord) {
      showLoading();
      inventoryController
        .inventoryGetAssetByCode(id, keyWord)
        .then((Item) => {
          if (!Item) {
            showErrorToast("暂未查询到可用资产");
            return;
          }
          inputCodeDialog.value.close();
          JumpLink(Item);
        })
        .finally(() => clearLoading());
    }

    function scan() {
      uni.scanCode({
        scanType: ["barCode", "qrCode"],
        success: ({ result }) => {
          keyWordSearch(getScanCode(result));
        },
      });
    }
    function scroll(e) {
      oldScrollTop.value = e.detail.scrollTop;
    }

    function goScrollTop() {
      scrollTop.value = oldScrollTop.value;
      nextTick(() => {
        scrollTop.value = 0;
      });
    }

    function inventoryRegister() {
      navigateTo(
        `subcontract/asset/inventory/manageUser/register?id=${id}&checkstatus=3`
      );
    }

    function JumpLink(item) {
      store.commit("inventory/setmanageUserItem", item);
      navigateTo(`subcontract/asset/inventory/manageUser/inventoryConfirm?id=${id}`);
    }

    function itemClick(id) {
      navigateTo(`subcontract/asset/assetInfo/assetView?id=${id}`);
    }

    onPullDownRefresh(() => {
      refreshList();
    });

    {
      search();
      only(eventNames.inventoryConfirmDetailBack, refreshList);
      only(eventNames.registerDetailBack, refreshList);
    }

    return {
      qst,
      switchTab,
      tabVal,
      tabIndex,
      sortTypeText,
      sortTypeOption,
      sortTypeChange,
      listWaitingCheck, //待盘
      listAlreadyCheck, //已盘
      listProfit, //盘盈
      summarys,
      reachBottom,
      inputCodeDialog,
      inputCodeConfirm,
      keyWordSearch,
      refreshList,
      scan,
      JumpLink,
      inventoryRegister,
      itemClick,
      scroll,
      scrollTop,
    };
  },
};
</script>

<style lang="scss" scoped>
.ensp {
  margin: 0 5px;
}
.waitingCheck {
  white-space: nowrap;
  color: #d70000;
}
.alreadyCheck {
  white-space: nowrap;
  color: #7ecc21;
}
.profit {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #db5200;
}
.keyword {
  border-bottom: 1px solid #f2f2f2;
}
.header-type {
  font-size: 14px;
  padding: 10px 10px;
  height: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > view {
    width: 50%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:nth-child(1) {
      display: flex;
      align-items: center;
      white-space: nowrap;
      justify-content: flex-start;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.sort-text {
  height: 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
}
.content {
  height: calc(100% - 183px);
}
.list-item {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.list-item-title {
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  > view {
    &:nth-last-child(2) {
      display: flex;
      align-items: center;
      width: 30%;
    }
    &:nth-last-child(1) {
      width: 70%;
    }
  }
  .uni-icons {
    width: 20px;
  }
  .item-name {
    text-align: right;
    color: #ababab;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.profit-title {
  > view {
    &:nth-last-child(2) {
      display: flex;
      align-items: center;
      width: 50%;
    }
    &:nth-last-child(1) {
      width: 50%;
    }
  }
}
.list-item-column {
  font-size: 12px;
  color: #999;
  display: flex;
  padding: 5px 0;
  text {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 50%;
  }
}
.list-item-remark {
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
.footer {
  box-sizing: border-box;
  height: 70px;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  border: 1px solid #eee;

  view {
    display: flex;
    text-align: center;
    flex-direction: column;

    .inpt {
      margin: 20rpx;
    }
  }
}
.asset-register {
  position: fixed;
  right: 20px;
  bottom: 120px;
  opacity: 0.8;
  background: #db5200;
  width: 55px;
  height: 55px;
  display: flex;
  opacity: 0.7;
  justify-content: center;
  border-radius: 20%;
  view {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    color: #fff;
  }
}
</style>
