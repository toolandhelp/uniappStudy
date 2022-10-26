<script>
import { onShow, onLaunch, onHide } from "@dcloudio/uni-app";
import { setStorage } from "./share/util/storage";
import { setNavigationTitle } from "./pages/home/menu";
export default {
  setup() {
    onLaunch(() => {
      {
        uni.getSystemInfo({
          success: (result) => {
            console.log("success");
            setStorage("windowHeight", result.windowHeight);
          },
        });
        // #ifdef APP-PLUS
        plus.screen.lockOrientation("portrait-primary");
        // #endif
      }
      // 更改首页菜单跳转界面顶部显示暂时不执行
      // uni.addInterceptor("navigateTo", {
      //   success() {
      //     setNavigationTitle();
      //   },
      // });
      console.log("App Launch");
    });
    onShow(() => {
      console.log("App Show");
    });
    onHide(() => {
      console.log("App Hide");
    });
  },
};
</script>
<style lang="scss">
@import "./style/index.scss";
</style>
