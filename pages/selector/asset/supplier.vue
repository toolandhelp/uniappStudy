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
import basicDataController from "../../../service/controller/asset/basicDataController";
import { ref } from "vue";
import { showLoading, clearLoading } from "../../../share/util/message";
import { emit } from "../../../share/util/uniEvent";
import { navigateBack } from "../../../share/redirect/index";
import eventNames from "../../../service/enumeration/eventNames";

export default {
  components: { "list-data-select": listDataSelect },
  props: {
    multiple: {},
    ids: {},
    qse: {},
  },
  setup({ multiple = "0", ids = null, qse = null }) {
    const list = ref(null);
    const insideMultiple = multiple === "1";
    const insideIds = ids ? ids.split(",") : [];

    search();

    function done(item) {
      emit(eventNames.supplierSelectBack, item);
      navigateBack();
    }

    function search(v) {
      showLoading();
      basicDataController
        .getSupplierList(v, qse)
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