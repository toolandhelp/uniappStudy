<template>
  <list-data-select
    :list="list"
    idKey="ID"
    nameKey="Name"
    codeKey="Code"
    :multiple="insideMultiple"
    @done="done"
    @search="search"
    :initIds="insideIds"
  />
</template>
<script>
import listDataSelect from "../../../components/list-data-select/list-data-select.vue";
import employeeController from "../../../service/controller/system/employeeController";
import { ref } from "vue";
import { showLoading, clearLoading } from "../../../share/util/message";
import { emit } from "../../../share/util/uniEvent";
import { navigateBack } from "../../../share/redirect/index";
import eventNames from "../../../service/enumeration/eventNames";

export default {
  components: { "list-data-select": listDataSelect },
  props: {
    isPower: {},
    multiple: {},
    ids: {},
    qse: {},
    corpID: {},
    isLeave: {}, //是否显示离职人员
    isUser: {}, //是否过滤已绑定用户的员工
    isChildrenCorp: {}, //是否包含下级公司
    enableEmployeeAccount: {}, //是否启用员工账号
  },
  setup({
    isPower = "1",
    multiple = "0",
    ids = null,
    qse = null,
    corpID = null,
    isLeave,
    isUser,
    isChildrenCorp,
    enableEmployeeAccount = null,
  }) {
    const list = ref(null);
    const insideIsPower = isPower === "1";
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];
    const insideIsLeave = isLeave ? isLeave === "1" : null;
    const insideIsUser = isUser ? isUser === "1" : null;
    const insideIsChildrenCorp = isChildrenCorp ? isChildrenCorp === "1" : null;
    const insideEnableEmployeeAccount = enableEmployeeAccount
      ? enableEmployeeAccount === "1"
      : null;

    search();

    function done(item) {
      emit(eventNames.employeeSelectBack, item);
      navigateBack();
    }

    function search(v) {
      showLoading();
      employeeController
        .list({
          qst: v,
          qse,
          corpID,
          isPower: insideIsPower,
          isLeave: insideIsLeave,
          isUser: insideIsUser,
          isChildrenCorp: insideIsChildrenCorp,
          enableEmployeeAccount: insideEnableEmployeeAccount,
        })
        .then(({ Items }) => (list.value = Items))
        .finally(clearLoading);
    }

    return {
      list,
      done,
      insideMultiple,
      insideIds,
      search,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>