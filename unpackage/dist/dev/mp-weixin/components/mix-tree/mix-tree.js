"use strict";
var components_mixTree_currentIcon = require("./currentIcon.js");
var common_vendor = require("../../common/vendor.js");
let idKey = "";
let nameKey = "";
let parentIdKey = "";
let childrenKey = "";
let itemDisabledKey = "";
const done = "done";
const _sfc_main = {
  emits: [done],
  props: {
    list: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => ({})
    },
    idKey: {
      type: String,
      default: "id"
    },
    nameKey: {
      type: String,
      default: "name"
    },
    parentIdKey: {
      type: String,
      default: "parentId"
    },
    childrenKey: {
      type: String,
      default: "children"
    },
    itemDisabledKey: {
      type: String,
      default: "disabled"
    },
    isLast: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    initIds: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      treeList: [],
      treeParams: {
        defaultIcon: components_mixTree_currentIcon.rightIcon,
        currentIcon: components_mixTree_currentIcon.bottomIcon,
        lastIcon: "",
        border: false
      },
      selectedIds: []
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
      this.renderTreeList(list);
    }
  },
  methods: {
    renderTreeList(list = [], rank = 0, parentId = []) {
      list.forEach((item) => {
        const treeItem = {
          [idKey]: item[idKey],
          [nameKey]: item[nameKey],
          [parentIdKey]: parentId,
          rank,
          showChild: false,
          show: rank === 0,
          checked: this.selectedIds.includes(item[idKey].toString())
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
    treeItemTap(item) {
      let list = this.treeList;
      let id = item[idKey];
      if (item.lastRank === true) {
        if (this.isLast && this.multiple === false && item[itemDisabledKey] !== true) {
          this.$emit(done, item);
        }
        return;
      }
      item.showChild = !item.showChild;
      list.forEach((childItem) => {
        if (item.showChild === false) {
          if (!childItem[parentIdKey].includes(id)) {
            return;
          }
          if (childItem.lastRank !== true) {
            childItem.showChild = false;
          }
          childItem.show = false;
        } else {
          if (childItem[parentIdKey][childItem[parentIdKey].length - 1] === id) {
            childItem.show = true;
          }
        }
      });
    },
    treeItemTextClick(item) {
      if (this.isLast || this.multiple || item[itemDisabledKey])
        return;
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.multiple
  }, $props.multiple ? {
    b: common_vendor.t($data.selectedIds.length),
    c: common_vendor.o((...args) => $options.multipleDone && $options.multipleDone(...args))
  } : {}, {
    d: common_vendor.f($data.treeList, (item, index, i0) => {
      return common_vendor.e({
        a: item.lastRank ? $data.treeParams.lastIcon : item.showChild ? $data.treeParams.currentIcon : $data.treeParams.defaultIcon
      }, $props.multiple ? {
        b: common_vendor.o(() => {
        }),
        c: item.checked,
        d: item[$props.idKey].toString(),
        e: item[$props.itemDisabledKey]
      } : {}, {
        f: $props.isLast || $props.multiple || item[$props.itemDisabledKey]
      }, $props.isLast || $props.multiple || item[$props.itemDisabledKey] ? {
        g: common_vendor.t(item[$props.nameKey]),
        h: item[$props.itemDisabledKey] ? 1 : ""
      } : {
        i: common_vendor.t(item[$props.nameKey]),
        j: common_vendor.o(($event) => $options.treeItemTextClick(item))
      }, {
        k: item[$props.idKey],
        l: common_vendor.s({
          paddingLeft: item.rank * 19 + "rpx",
          zIndex: item.rank * -1 + 50
        }),
        m: item.show ? 1 : "",
        n: item.lastRank ? 1 : "",
        o: item.showChild ? 1 : "",
        p: item[$props.itemDisabledKey] ? 1 : "",
        q: common_vendor.o(($event) => $options.treeItemTap(item, index), item[$props.idKey])
      });
    }),
    e: $props.multiple,
    f: $data.treeParams.border === true ? 1 : "",
    g: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fbc33238"], ["__file", "D:/gitPro/C8_UI/platformApp/components/mix-tree/mix-tree.vue"]]);
wx.createComponent(Component);
