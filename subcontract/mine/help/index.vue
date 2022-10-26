<template>
  <view class="listInfo">
    <uni-list :border="false">
      <view>
        <uni-list-item
          v-for="{ title, filePath } in listInfo"
          :title="title"
          link="navigateTo"
          :to="`/subcontract/mine/help/onlinePDF?filePath=${filePath}`"
        ></uni-list-item>
      </view>
    </uni-list>
  </view>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const listInfo = reactive([
      {
        title: "PC端操作手册",
        filePath:
          "/static/畅捷实物资产管理系统（后勤之星）操作手册（202109更新）.pdf",
      },
      {
        title: "APP端操作手册",
        filePath:
          "/static/畅捷实物资产管理系统（后勤之星）手机APP操作手册（202109更新）.pdf",
      },
      {
        title: "员工账户操作手册",
        filePath:
          "/static/畅捷实物资产管理系统（后勤之星）操作手册（员工账户）（202109更新）.pdf",
      },
      {
        title: "辅助工具操作手册",
        filePath: "/static/辅助工具操作手册2021-06.pdf",
      },
    ]);

    return {
      listInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
