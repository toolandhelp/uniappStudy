<template>
  <mix-tree
    :list="list"
    @done="treeItemClick"
    idKey="id"
    nameKey="label"
    parentIdKey="parent_id"
    :isLast="insideIsLast"
    :multiple="insideMultiple"
    :initIds="insideIds"
  />
</template>
<script>
import mixTree from "../../../components/mix-tree/mix-tree.vue";
import basicDataController from "../../../service/controller/asset/basicDataController";
import { ref } from "vue";
import { showLoading, clearLoading } from "../../../share/util/message";
import { emit } from "../../../share/util/uniEvent";
import { navigateBack } from "../../../share/redirect/index";
import eventNames from "../../../service/enumeration/eventNames";
export default {
  components: {
    "mix-tree": mixTree,
  },
  props: {
    parentId: {},
    isPower: {},
    isLast: {},
    multiple: {},
    ids: {},
  },
  setup({
    isPower = "1",
    parentId = null,
    isLast = "0",
    multiple = "0",
    ids = "",
  }) {
    const list = ref(null);
    const insideIsLast = isLast === "1";
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];

    showLoading();
    basicDataController
      .getLocationTree(insideIsPower, parentId)
      .then(({ Items }) => {
        list.value = Items;
      })
      .finally(clearLoading);

    function treeItemClick(item) {
      emit(eventNames.locationSelectBack, item);
      navigateBack();
    }

    return { list, treeItemClick, insideIsLast, insideMultiple, insideIds };
  },
};
</script>
<style lang="scss" scoped>
</style>