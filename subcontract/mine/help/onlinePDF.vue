<template>
  <view>
    <web-view
      :webview-styles="webviewStyles"
      :src="hostPath"
    ></web-view>
  </view>
</template>
<script>
import { getFileUrl } from "../../../share/http/serveUrl";
import { reactive, ref } from "vue";
import { showErrorToast } from "../../../share/util/message";
import { isMP } from "../../../share/util/platform";

export default {
  props: {
    filePath: String,
  },
  setup(filePath) {
    let hostPath = reactive("");
    hostPath = `${getFileUrl(
      ""
    )}/pdfjs/web/viewer.html?path=${encodeURIComponent(
      getFileUrl("") + "/static/辅助工具操作手册2021-06.pdf"
    )}`;
    if (filePath && filePath.filePath) {
      // if (!isMP) {
      //    showErrorToast("手机app");
      //   console.log("手机app===>")
      //   hostPath ="https://a.meipian.cn/2ilo1ij";
      // } else {
        hostPath =
          hostPath.split("=")[0] +
          "=" +
          encodeURIComponent(getFileUrl("") + filePath.filePath);
      //}
    } else {
      showErrorToast("未配置文件");
    }

    console.warn(hostPath);

    return {
      hostPath,
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>