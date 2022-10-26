<template>
  <uni-list>
    <uni-list-item
      title="蓝牙打印机列表"
      clickable
      showArrow
      @click="selectPrinterFunc"
      :rightText="`${selectPrinterName}`"
    ></uni-list-item>
    <uni-list-item
      title="标签模板"
      clickable
      showArrow
      @click="selectTemplateFunc"
      :rightText="`${selectTemplateName}`"
    ></uni-list-item>
  </uni-list>

  <view class="quick-return-btn">
    <button type="primary" @click="refreshFunc">刷新</button>
    <!-- <button @click="testPrinterFunc">打印测试</button> -->
  </view>
</template>

<script>
import { currentPlatform, isMP } from "../../../share/util/platform";
import platformEnum from "../../../service/enumeration/platformEnum";
import mineController from "../../../service/controller/mine/MineController.js";
import { reactive, ref } from "vue";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { getStorage, setStorage } from "../../../share/util/storage";
/* #ifdef APP-PLUS */
import api from "./lpapi-uniplugin";
/* #endif */

export default {
  setup() {
    const printerList = ref([]);
    const selectPrinterName = ref("");

    const templateList = ref([]);
    const selectTemplateName = ref("");
    //判断是否有选择
    selectTemplateName.value =
      typeof getStorage("SelectLabelTemplate") === "object"
        ? getStorage("SelectLabelTemplate").LabelName
        : "";

    selectPrinterName.value =
      typeof getStorage("SelectPrinter") === "object"
        ? getStorage("SelectPrinter").name
        : "";

    //判断打印机是否正常连接
    if (selectPrinterName.value) {
      testOpenPrinter(selectPrinterName.value);
    }

    // 判断是否未微信小程序
    // if (isMP && currentPlatform == platformEnum.wx) {
    //   console.log("微信平台小程序");
    // }
    //

    //选择打印机
    async function selectPrinterFunc() {
      showLoading();
      try {
        const list = await api.getPrinters();
        if (list.length > 0) {
          printerList.value = list; //.map((item) => item.name);

          uni.showActionSheet({
            //title:"打印机",
            itemList: list.map((item) => item.name),
            success: function (res) {
              selectPrinterName.value = printerList.value[res.tapIndex].name;
              setStorage("SelectPrinter", printerList.value[res.tapIndex]);

              testOpenPrinter(selectPrinterName.value);
            },
            fail: function (res) {
              console.log(res.errMsg);
            },
          });
        } else {
          showErrorToast("未检测到打印机");
        }
      } finally {
        clearLoading();
      }
    }

    //  测试打印机是否通
    function testOpenPrinter(printerName) {
      api.openPrinter(printerName, (value) => {
        if (value) {
          console.log("打印机连接成功");
          showOkToast("打印机连接成功");
        } else {
          console.log("打印机连接失败，请重新选择！");
          showErrorToast("打印机连接失败");
        }
      });
    }

    //选择模板
    function selectTemplateFunc() {
      showLoading();
      mineController
        .getWithinLimitsByType(1)
        .then((data) => {
          if (data.length > 0) {
            templateList.value = data;
            uni.showActionSheet({
              //title:"打印模板",
              itemList: data.map((item) => item.LabelName),
              success: function (res) {
                selectTemplateName.value =
                  templateList.value[res.tapIndex].LabelName;
                setStorage(
                  "SelectLabelTemplate",
                  templateList.value[res.tapIndex]
                );
              },
              fail: function (res) {
                console.log(res.errMsg);
              },
            });
          } else {
            showErrorToast("无可用模板");
          }
        })
        .catch((err) => {
          showErrorToast(err);
        })
        .finally(() => clearLoading());
    }

    //打印线条测试
    async function testPrinterFunc() {
      const width = 45;
      const height = 20;
      const lineSpace = 5;
      if (await api.isPrinterOpened()) {
        // 开始打印任务
        await api.startJob({ width, height });
        // 绘制直线
        await api.drawLine({
          x1: 0,
          y1: 5,
          x2: width,
          y2: 5,
          lineWidth: 0.5,
        });
        // 绘制虚线
        await api.drawDashLine({
          x1: 0,
          y1: 10,
          x2: width,
          y2: 10,
          dashLen: [0.5, 0.5],
          lineWidth: 0.5,
        });
        //
        await api.drawDashLine({
          x1: 0,
          y1: 15,
          x2: width,
          y2: 15,
          dashLen: [0.5, 0.75, 1],
          lineWidth: 0.5,
        });
        // 提交打印任务
        await api.commitJob();
      }
    }

    //刷新
    function refreshFunc() {
      testOpenPrinter(selectPrinterName.value);
    }

    return {
      printerList,
      selectPrinterFunc,
      selectPrinterName,

      templateList,
      selectTemplateFunc,
      selectTemplateName,
      refreshFunc,
      testPrinterFunc,
    };
  },
};
</script>

<style lang="scss" scoped>
.quick-return-btn {
  width: 100%;
  height: 50px;
  background: rgb(237, 237, 237);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  text-align: right;
  padding: 10px 0;
  z-index: 10;
  button {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    margin: 0 5px;
    border-radius: 5px;
    &:first-child {
      margin-bottom: 10px;
    }
    &:last-child {
      color: #000;
    }
  }
}
</style>
