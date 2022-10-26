<template>
  <view class="screen">
    <view class="condition_list">
      <view class="condition_item_selector">
        <view class="left tips"> 仓库： </view>
        <view class="content">
          <input
            class="uni-input"
            focus
            placeholder="请选择仓库"
            v-model="WarehouseText"
            disabled="true"
            @click="openWarehouseSelector"
          />
        </view>
        <view class="right">
          <icon
            type="clear"
            size="14"
            style="vertical-align: bottom"
            @click="clearWarehouse"
            v-if="WarehouseText"
          />
        </view>
      </view>
      <view class="condition_item_selector">
        <view class="left"> 易耗品分类： </view>
        <view class="content">
          <input
            class="uni-input"
            focus
            placeholder="请选择易耗品分类"
            v-model="CategoryIDsText"
            disabled="true"
            @click="openCategorySelector"
          />
        </view>
        <view class="right">
          <icon
            type="clear"
            size="14"
            style="vertical-align: bottom"
            @click="clearCategory"
            v-if="CategoryIDsText"
          />
        </view>
      </view>
      <view class="condition_item_selector">
        <view class="left"> 易耗品： </view>
        <view class="content">
          <input
            class="uni-input"
            focus
            placeholder="请扫描/输入易耗品编码"
            v-model="QST"
          />
        </view>
        <view class="right saomao">
          <view class="icon-saoma">
            <image
              src="/static/saoma.png"
              style="width: 100%; height: 100%"
              @click="ScanCode"
            >
            </image>
          </view>
        </view>
      </view>
      <view class="selection_item">
        <view class="left_control">
          <checkbox-group @change="IncludeZeroStockItemsChange">
            <checkbox
              value="cb"
              :checked="IsIncludeZeroStockItems"
              color="#007aff"
              style="transform: scale(0.6)"
            />
          </checkbox-group>
        </view>
        <view class="right_text">含库存为0</view>
      </view>
      <view class="selection_item">
        <view class="left_control">
          <checkbox-group @change="OnlyLessThanMinimunStockItems">
            <checkbox
              value="cb"
              :checked="IsOnlyLessThanMinimunStockItems"
              color="#007aff"
              style="transform: scale(0.6)"
            />
          </checkbox-group>
        </view>
        <view class="right_text">仅小于最低库存</view>
      </view>
    </view>
    <view class="button_list">
      <button class="button_item reset" @click="reset">重置</button>
      <button class="button_item query" @click="query">查询</button>
    </view>
  </view>
</template>

<script>
import { showErrorToast } from "../../../share/util/message";
import { only } from "../../../share/util/uniEvent";
import eventNames from "../../../service/enumeration/eventNames";
import { getScanCode } from "@/share/util/index.js";
export default {
  data() {
    return {
      IsIncludeZeroStockItems: false,
      IsOnlyLessThanMinimunStockItems: false,
      Categorys: [],
      Warehouse: [],
      QST: "",
    };
  },
  methods: {
    reset() {
      this.IsIncludeZeroStockItems = false;
      this.IsOnlyLessThanMinimunStockItems = false;
      this.QST = "";
      this.Warehouse = [];
      this.Categorys = [];
    },
    IncludeZeroStockItemsChange(e) {
      this.IsIncludeZeroStockItems = e.detail.value.length > 0;
    },
    OnlyLessThanMinimunStockItems(e) {
      this.IsOnlyLessThanMinimunStockItems = e.detail.value.length > 0;
    },
    openCategorySelector() {
      uni.navigateTo({
        url: `/pages/selector/consumable/category?ids=${this.Categorys.map(
          (d) => d.ID
        )}&multiple=${1}`,
      });
      only(eventNames.consumableCategoryBack, (obj) => {
        let categorys = obj.items.map((e) => {
          return {
            Name: e.label,
            ID: e.id,
          };
        });
        this.Categorys.push(...categorys);
      });
    },
    openWarehouseSelector() {
      uni.navigateTo({
        url: `/pages/selector/consumable/warehouse?ids=${this.Warehouse.map(
          (d) => d.ID
        )}&multiple=${1}`,
      });
      only(eventNames.consumableWarehouseBack, (obj) => {
        let warehouse = obj.items.map((e) => {
          return {
            Name: e.label,
            ID: e.id,
          };
        });
        this.Warehouse.push(...warehouse);
      });
    },
    query() {
      if (this.Warehouse.length == 0) {
        showErrorToast("请选择仓库");
        return;
      }

      let obj = {
        CategoryIDs: this.Categorys.map((d) => d.ID),
        WarehouseIDs: this.Warehouse.map((d) => d.ID),
        QST: this.QST,
        IsOnlyLessThanMinimunStockItems: this.IsOnlyLessThanMinimunStockItems,
        IsIncludeZeroStockItems: this.IsIncludeZeroStockItems,
      };
      let par = JSON.stringify(obj);
      console.log(obj);
      uni.navigateTo({
        url: `/subcontract/consumable/stock/list?condition=${par}`,
      });
    },
    clearCategory() {
      this.Categorys = [];
    },
    clearWarehouse() {
      this.Warehouse = [];
    },
    ScanCode() {
      let that = this;
      uni.scanCode({
        success(res) {
          let content = res.result;
          that.QST = getScanCode(content);
        },
        fail() {
          showErrorToast("扫描失败，请稍后重试");
        },
      });
    },
  },
  computed: {
    CategoryIDsText() {
      return this.Categorys.reduce((prevaluer, n) => {
        if (prevaluer == "") {
          return n.Name;
        }
        return n.Name + "/" + prevaluer;
      }, "");
    },
    WarehouseText() {
      return this.Warehouse.reduce((prevaluer, n) => {
        if (prevaluer == "") {
          return n.Name;
        }
        return n.Name + "/" + prevaluer;
      }, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.screen {
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-bottom: 0px;
  box-sizing: border-box;
}

.button_list {
  & .button_item {
    width: 100%;
    height: 60px;
    margin: 10px 0;
    color: #fff;
  }

  & .reset {
    background-color: rgb(190, 201, 204);
  }

  & .query {
    background-color: #007aff;
  }
}

.condition_list {
  border-bottom: 1px solid #cccccc42;

  & .selection_item {
    padding: 4px 0;
    display: flex;
    box-sizing: border-box;
    height: 36px;

    & .left_control {
      width: 26px;
      line-height: 28px;
    }

    & .right_text {
      flex: 1;
      font-size: 12px;
      line-height: 28px;
    }
  }

  & .condition_item_selector {
    width: 100%;
    height: 50px;
    display: flex;
    padding-top: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #cccccc42;

    & .tips::after {
      color: red;
      content: "*";
      position: absolute;
      left: 4px;
    }

    & .left {
      width: 30%;
      height: 100%;
    }

    & .content {
      flex: 1;
    }

    & .right {
      height: 100%;
      width: 10%;
      padding-left: 10px;
      box-sizing: border-box;
    }

    & .saomao {
      padding-right: 2px;
      padding-left: 0px;
    }
  }
}

.icon-saoma {
  width: 100%;
  height: 100%;
}
</style>
