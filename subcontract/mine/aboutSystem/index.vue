<template>
  <view class="about">
    <view class="Logo">
      <!-- <cover-image class="controls-play img" @click="play" src="/static/image/Logo.png"></cover-image> -->
      <image src="/static/icon/logo.png"  />
    </view>
    <view class="listInfo">
      <uni-list :border="false">
        <uni-list-item
          title="版本："
          :note=appVersion
          :border="false"
        ></uni-list-item>
        <uni-list-item
          title="技术支持邮箱："
          note="changejet@kibon.cn"
          :border="false"
        ></uni-list-item>
        <view class="userAgree">
          <uni-list-item
            title="其他："
            note="《用户协议/隐私政策》"
            link="navigateTo"
            to="/subcontract/mine/aboutSystem/userAgreement"
            :border="false"
          ></uni-list-item>
        </view>
      </uni-list>
    </view>
  </view>
</template>

<script>
import { getStorage } from "../../../share/util/storage.js";

export default {
  setup() {
    
    //console.warn("页面Setup");
    //获取版本号
    const appVersion = getStorage("SystemVersion");
    return {
      appVersion,
    };
  },
};
</script>

<style lang="scss" scoped>
.about {
  max-height: 100vh;
  background: #ffffff;
  > .Logo {
    padding-top: 0.6rem;
    text-align: center;
    box-sizing: border-box;
    > img,image {
      width: 4.48rem;
      height: 4.48rem;
      // #ifdef MP-ALIPAY
      width: 2.48rem;
      height: 2.48rem;
      // #endif
    }
  }
  .listInfo ::v-deep .uni-list-item__content {
    display: inline;
  }
  .userAgree ::v-deep .uni-list-item__content-note {
    color: #1989fa;
  }
}
</style>
