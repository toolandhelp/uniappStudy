<template>
  <view v-if="multiple" class="mix-tree-top">
    <view>当前选中 {{ selectedIds.length }} 条</view>
    <view>
      <button @click="multipleSelectDone" type="primary">完成</button>
    </view>
  </view>
  <view class="top">
    <uni-easyinput
      prefixIcon="search"
      v-model="qst"
      :placeholder="searchPlaceholder"
      @iconClick="doneSearch"
      confirmType="search"
      trim="both"
      :inputBorder="false"
      @confirm="doneSearch"
      @clear="doneSearch"
    />
  </view>
  <scroll-view :style="`height:${windowHeights - 87}px`" :scroll-y="true">
    <view class="list">
      <checkbox-group @change="checkboxChange">
        <view
          class="list-item"
          v-for="item in list"
          :key="item[idKey]"
          @click="doneSelect(item)"
        >
          <label>
            <checkbox
              v-if="multiple"
              @click.stop
              :checked="selectedIds.includes(item[idKey].toString())"
              class="mix-checkbox"
              :value="item[idKey].toString()"
            />{{ item[nameKey] }}&nbsp;{{ item[codeKey] }}
          </label>
        </view>
      </checkbox-group>
    </view>
    <view class="footer">
      <text v-if="listLength < maxRowCount">已到底部，没有数据了</text>
      <text v-else>
        当前只显示前{{ maxRowCount }}条数据，请搜索以获得更精确的结果
      </text>
    </view>
  </scroll-view>
  
</template>
<script>
import { ref, computed } from "vue";
const done = "done";
const search = "search";

export default {
  emits: [done, search],
  props: {
    multiple: {},
    list: {
      type: Array,
      default: () => [],
    },
    initIds: {
      type: Array, //必须是字符串类型数组
      default: [],
    },
    idKey: {
      type: String,
      default: "id",
    },
    nameKey: {
      type: String,
      default: "name",
    },
    codeKey: {
      type: String,
      default: "code",
    },
    searchPlaceholder: {
      type: String,
      default: "编码/名称",
    },
    /**
     * 显示的是前多少条数据（也就是分页接口的每页条数是多少条）
     */
    maxRowCount: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    const qst = ref("");
    const listLength = computed(() => (props.list ? props.list.length : 0));
    const selectedIds = ref([...props.initIds]);
    const idKey = props.idKey;
    const nameKey = props.nameKey;
    const windowHeights = ref(0);

    function doneSelect(item) {
      if (props.multiple) return;
      emit(done, item);
    }

    function multipleSelectDone() {
      const _l = Array.from(props.list);
      const ids = Array.from(selectedIds.value);
      const selectItems = ids.map((id) => _l.find((p) => p[idKey] == id));
      emit(done, {
        ids: ids,
        items: selectItems,
        names: selectItems.map((v) => v[nameKey]).toString(),
      });
    }

    function doneSearch() {
      const _text = qst.value;
      selectedIds.value = [];
      emit(search, _text);
    }

    function checkboxChange({ detail: { value } }) {
      selectedIds.value = value;
    }
    
    {
       uni.getSystemInfo({
        success: (result) => {
          windowHeights.value = result.windowHeight;
        },
      });
    }

    return {
      doneSelect,
      doneSearch,
      qst,
      listLength,
      checkboxChange,
      selectedIds,
      multipleSelectDone,
      windowHeights,
    };
  },
};
</script>
<style lang="scss" scoped>
.top {
  border-bottom: solid 1px #ccc;
}
.list {
  .list-item {
    font-size: 25rpx;
    padding: 10rpx 0 10rpx 40rpx;
    border-bottom: solid 1px #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.footer {
  font-size: 20rpx;
  text-align: center;
  padding: 30rpx;
  color: #aaa;
}
.mix-checkbox {
  transform: scale(0.7);
}
.mix-tree-top {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  align-items: center;
  padding: 0 10px;
  height: 50px;
  button {
    height: 35px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 5px;
  }
}
</style>