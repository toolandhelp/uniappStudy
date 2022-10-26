<template>
  <view v-if="multiple" class="mix-tree-top">
    <view>当前选中{{ selectedIds.length }}条</view>
    <view><button @click="multipleDone" type="primary">完成</button></view>
  </view>
  <checkbox-group @change="checkboxChange">
    <view class="mix-tree-list">
      <view
        v-for="(item, index) in treeList"
        :key="item[idKey]"
        class="mix-tree-item"
        :style="[
          {
            paddingLeft: item.rank * 19 + 'rpx',
            zIndex: item.rank * -1 + 50,
          },
        ]"
        :class="{
          border: treeParams.border === true,
          show: item.show,
          last: item.lastRank,
          showchild: item.showChild,
          mixItemDisabled: item[itemDisabledKey],
        }"
        @click.stop="treeItemTap(item, index)"
      >
        <image
          class="mix-tree-icon"
          :src="
            item.lastRank
              ? treeParams.lastIcon
              : item.showChild
              ? treeParams.currentIcon
              : treeParams.defaultIcon
          "
        />
        <checkbox
          v-if="multiple"
          @click.stop
          :checked="item.checked"
          class="mix-checkbox"
          :value="item[idKey].toString()"
          :disabled="item[itemDisabledKey]"
        />
        <text
          v-if="isLast || multiple || item[itemDisabledKey]"
          :class="{ disabled: item[itemDisabledKey] }"
        >
          {{ item[nameKey] }}
        </text>
        <text v-else @click.stop="treeItemTextClick(item)">
          {{ item[nameKey] }}
        </text>
      </view>
    </view>
  </checkbox-group>
</template>

<script>
import { bottomIcon, rightIcon } from "./currentIcon";
let idKey = "";
let nameKey = "";
let parentIdKey = "";
let childrenKey = "";
let itemDisabledKey = "";

const done = "done";
export default {
  emits: [done],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    idKey: {
      type: String,
      default: "id",
    },
    nameKey: {
      type: String,
      default: "name",
    },
    parentIdKey: {
      type: String,
      default: "parentId",
    },
    childrenKey: {
      type: String,
      default: "children",
    },
    itemDisabledKey: {
      type: String,
      default: "disabled",
    },
    isLast: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    initIds: {
      type: Array, //必须是字符串类型数组
      default: [],
    },
  },
  data() {
    return {
      treeList: [],
      treeParams: {
        defaultIcon: rightIcon,
        currentIcon: bottomIcon,
        lastIcon: "",
        border: false,
      },
      selectedIds: [],
    };
  },
  mounted() {
    idKey = this.idKey;
    nameKey = this.nameKey;
    parentIdKey = this.parentIdKey;
    childrenKey = this.childrenKey;
    itemDisabledKey = this.itemDisabledKey;

    this.selectedIds = this.initIds;
  },
  watch: {
    list(list) {
      this.treeParams = Object.assign(this.treeParams, this.params);
      //   console.log(this.treeParams, this.params);
      this.renderTreeList(list);
    },
  },
  methods: {
    //扁平化树结构
    renderTreeList(list = [], rank = 0, parentId = []) {
      list.forEach((item) => {
        const treeItem = {
          [idKey]: item[idKey],
          [nameKey]: item[nameKey],
          [parentIdKey]: parentId, // 父级id数组
          rank, // 层级
          showChild: false, //子级是否显示
          show: rank === 0, // 自身是否显示
          checked: this.selectedIds.includes(item[idKey].toString()), //默认是否选中
        };
        this.treeList.push(Object.assign(item, treeItem));
        if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
          let parents = [...parentId];
          parents.push(item[idKey]);
          this.renderTreeList(item[childrenKey], rank + 1, parents);
        } else {
          this.treeList[this.treeList.length - 1].lastRank = true;
        }
      });
    },
    // 点击
    treeItemTap(item) {
      let list = this.treeList;
      let id = item[idKey];
      if (item.lastRank === true) {
        if (
          this.isLast &&
          this.multiple === false &&
          item[itemDisabledKey] !== true
        ) {
          //点击最后一级时触发事件
          this.$emit(done, item);
        }
        return;
      }
      item.showChild = !item.showChild;
      list.forEach((childItem) => {
        if (item.showChild === false) {
          //隐藏所有子级
          if (!childItem[parentIdKey].includes(id)) {
            return;
          }
          if (childItem.lastRank !== true) {
            childItem.showChild = false;
          }
          childItem.show = false;
        } else {
          if (
            childItem[parentIdKey][childItem[parentIdKey].length - 1] === id
          ) {
            childItem.show = true;
          }
        }
      });
    },
    treeItemTextClick(item) {
      if (this.isLast || this.multiple || item[itemDisabledKey]) return;
      this.$emit(done, item);
    },
    multipleDone() {
      const tl = Array.from(this.treeList);
      const obj = {};
      const ids = Array.from(this.selectedIds);
      obj["ids"] = ids;
      const selectItems = ids.map((id) => tl.find((p) => p[idKey] == id));
      obj["items"] = selectItems;
      obj["names"] = selectItems.map((v) => v[nameKey]).toString();
      this.$emit(done, obj);
    },
    checkboxChange({ detail: { value } }) {
      this.selectedIds = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.mix-tree-top {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  align-items: center;
  padding: 0 8rpx;
  height: 80rpx;
  button {
    height: 60rpx;
    width: 120rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12rpx;
  }
}
.mix-tree-list {
  display: flex;
  flex-direction: column;
  padding-left: 30upx;
}
.mix-tree-item {
  display: flex;
  align-items: center;
  font-size: 30upx;
  color: #333;
  height: 0;
  opacity: 0;
  transition: 0.2s;
  position: relative;
}
.mix-tree-item.border {
  border-bottom: 1px solid #eee;
}
.mix-tree-item.show {
  height: 80upx;
  opacity: 1;
}
.mix-tree-icon {
  width: 26upx;
  height: 30upx;
  margin-right: 8upx;
  opacity: 0.9;
}

.mix-tree-item.showchild:before {
  transform: rotate(90deg);
}
.mix-tree-item.last:before {
  opacity: 0;
}
.mix-checkbox {
  transform: scale(0.7);
}
.mix-tree-item .disabled {
  cursor: not-allowed !important;
  color: #bbb !important;
}
</style>
