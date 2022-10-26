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
import deptController from "../../../service/controller/system/deptController";
import { ref } from "vue";
import {
  showLoading,
  clearLoading,
  showErrorToast,
} from "../../../share/util/message";
import { emit } from "../../../share/util/uniEvent";
import { navigateBack } from "../../../share/redirect/index";
import eventNames from "../../../service/enumeration/eventNames";

function checkDept(org, type) {
  if (type == "1") {
    if (org.Type === 2) {
      showErrorToast("请选择部门(当前选择不应该包含公司)");
      return false;
    }
  } else if (type == "2") {
    if (org.Type !== 2) {
      showErrorToast("请选择公司(当前选择不应该包含部门)");
      return false;
    }
  }
}

export default {
  components: {
    "mix-tree": mixTree,
  },
  props: {
    isPower: {},
    isLast: {},
    multiple: {},
    ids: {},
    type: {}, //1.部门；2.公司；为空则全部
  },
  setup({
    isPower = "1",
    isLast = "0",
    multiple = "0",
    ids = "",
    type = null,
  }) {
    const list = ref(null);
    const insideIsLast = isLast === "1";
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];
    const insideType = type ? type : null;

    if (insideType === "1") {
      uni.setNavigationBarTitle({ title: "请选择部门" });
    } else if (insideType === "2") {
      uni.setNavigationBarTitle({ title: "请选择公司" });
    }

    showLoading();
    deptController
      .getDeptTree(insideIsPower, insideType)
      .then((d) => (list.value = d))
      .finally(clearLoading);

    function treeDone(item) {
      if (insideType !== null) {
        if (insideMultiple) {
          for (const one of item.items) {
            if (checkDept(one, insideType) === false) {
              return;
            }
          }
        } else {
          if (checkDept(item, insideType) === false) {
            return;
          }
        }
      }
	  
      emit(eventNames.deptSelectBack, item);
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