<template>
  <mix-tree
    :list="list"
    @done="treeDone"
    idKey="id"
    nameKey="label"
    parentIdKey="parent_id"
    childrenKey="children"
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
    isPower: {},
    isLast: {},
    multiple: {},
    ids: {},
  },
  setup({ isPower = "1", isLast = "0", multiple = "0", ids = "" }) {
    const list = ref(null);
    const insideIsLast = isLast === "1";
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];

    showLoading();
    basicDataController
      .getAssetCategoryTree(insideIsPower)
      .then(({ Items }) => (list.value = Items))
      .finally(clearLoading);

    function treeDone(item) {
      emit(eventNames.assetCategorySelectBack, item);
      navigateBack();
    }

    return {
      list,
      treeDone,
      insideIsLast,
      insideMultiple,
      insideIds,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>