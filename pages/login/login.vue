<template>
  <view class="login" :style="{ backgroundImage: loginBackgroundImage }">
    <view class="van-overlay" style="z-index: 2001; display: none"></view>
    <view
      role="dialog"
      aria-labelledby="用户协议和隐私政策概要"
      class="Agreement van-dialog"
      style="z-index: 2002; display: none"
    >
      <view class="van-dialog__header">用户协议和隐私政策概要</view>
      <view class="van-dialog__content">
        <ul>
          <li>
            欢迎使用后勤之星APP！在您使用后勤之星APP前，请认真阅读并充分理解以下条款:
          </li>
          <li class="Jump">《用户协议/隐私政策》</li>
          <li>如果同意以上条款，请点击"同意"开始接收我们的服务。</li>
        </ul>
      </view>
      <view
        class="van-hairline--top van-dialog__footer van-dialog__footer--buttons"
      >
        <button
          class="
            van-button van-button--default van-button--large
            van-dialog__cancel
          "
        >
          <span class="van-button__text">不同意</span></button
        ><button
          class="
            van-button van-button--default van-button--large
            van-dialog__confirm
            van-hairline--left
          "
        >
          <span class="van-button__text">同意</span>
        </button>
      </view>
    </view>
    <!---->
    <view class="head">
      <span>
        Hello！&ensp;
        <span v-if="name">{{ name }}</span>
        <br />
        <br />
        <span>欢迎回来</span>
      </span>
      <span v-if="isAppPlatform" class="right">
        <u-icon name="setting" size="33px" @click="setting"></u-icon>
      </span>
    </view>
    <view class="loginContainer">
      <view class="van-cell-group van-hairline--top-bottom">
        <view class="van-cell van-field">
          <view class="van-cell__title van-field__label">
            <span>用户名</span>
          </view>
          <view class="van-cell__value">
            <view class="van-field__body">
              <input
                type="text"
                placeholder="请输入用户名"
                class="van-field__control"
                v-model="uid"
              />
            </view>
          </view>
        </view>
        <view class="van-cell van-field">
          <view class="van-cell__title van-field__label">
            <span>密码</span>
          </view>
          <view class="van-cell__value">
            <view class="van-field__body">
              <input
                password
                placeholder="请输入密码"
                maxlength="50"
                class="van-field__control"
                v-model="pwd"
              />
            </view>
          </view>
        </view>
      </view>
      <view class="center">
        <button
          class="
            surebth
            van-button van-button--default van-button--normal
            center
          "
          @click="login"
        >
          <span class="van-button__text">登录</span>
        </button>
      </view>
      <view class="bomm_img">
        <image src="/static/images/bg_logo.png" />
      </view>
    </view>
  </view>
</template>

<script>
import userController from "../../service/controller/system/userController";
import { redirectTo,navigateTo } from "../../share/redirect/index";
import {
  showLoading,
  clearLoading,
  showErrorToast,
} from "../../share/util/message";
import { setStorage, getStorage,clearStorage } from "../../share/util/storage.js";
import { setToken } from "../../share/token/index";
import { isMP, currentPlatform } from "../../share/util/platform";
import { getFileUrl } from "../../share/http/serveUrl";
import platformEnum from "../../service/enumeration/platformEnum";
import { ref } from "vue";

async function loginSuccess(res, link, directlyLogin = true) {
  setToken(res.Token);
  setStorage("directlyLogin", directlyLogin,true);
  setStorage("AssetDicSettings", JSON.stringify(res.AssetDicSettings),true);
  setStorage(
    "SystemPasswordPolicy",
    JSON.stringify(res.UserSetting.SystemPasswordPolicy),true
  );
  setStorage("UserType", res.User.UserType,true);
  setStorage("isAdmin", res.User.isAdmin,true);
  setStorage("UserName", res.User.Name,true);
  setStorage("User", JSON.stringify(res.User),true);
  setStorage("UserCode", res.User.EmployeeCode,true);
  setStorage("UserID", res.User.ID,true);
  setStorage("Corp", JSON.stringify(res.User.Corp),true);
  setStorage("CorpID", res.User.Corp.ID,true);
  setStorage("CorpName", res.User.Corp.Name,true);
  setStorage("OrgID", res.User.Dept.ID,true);
  setStorage("OrgName", res.User.Dept.Name,true);
  setStorage("EmployeeID", res.User.EmployeeID,true);
  setStorage("SystemVersion", res.AuthorizationInfo.Version,true);
  setStorage("ConsumableDicSettings", res.ConsumableDicSettings,true);
  const kind  = await userController.getkinds();
  const employeekind = await userController.getEmployeekinds();
  if(res.User.UserType == '1'){
    setStorage("kinds", JSON.stringify(kind.Products),true);
    setStorage("Employeekinds", JSON.stringify(employeekind.Products),true);
  }else{
    setStorage("kinds", JSON.stringify([]),true);
    setStorage("Employeekinds", JSON.stringify(employeekind.Products),true);
  }
  clearLoading();
  if (link === "1") {
    redirectTo("/pages/mine/todo/todo");
    return;
  }
  redirectTo("/pages/home/home");
}

export default {
  props: {
    link: String,
  },
  setup({ link }) {
    const uid = ref("");
    const pwd = ref("");

    function ddLogin(uid, pwd) {
      dd.getAuthCode({
        success: ({ authCode }) => {
          userController
            .ddLogin(authCode, uid, pwd)
            .then((res) => loginSuccess(res, link))
            .catch(() => clearLoading());
        },
        fail: () => {},
      });
    }

    function wxLogin(uid, pwd) {
      wx.login({
        success({ code }) {
          if (code) {
            userController
              .wxLogin(code, uid, pwd)
              .then((res) => loginSuccess(res, link))
              .catch(() => clearLoading());
            return;
          }
          showErrorToast("登录失败！" + res.errMsg);
        },
      });
    }

    if (getStorage("directlyLogin")) {
      showLoading();
      switch (currentPlatform) {
        case platformEnum.wx:
          wxLogin();
          break;
        case platformEnum.dd:
          ddLogin();
          break;
        default:
          clearLoading();
          return;
      }
    }

    function login() {
      if (uid.value.length == 0) {
        showErrorToast("请输入用户名");
        return;
      }
      if (pwd.value.length == 0) {
        showErrorToast("请输入密码");
        return;
      }
      showLoading();
      switch (currentPlatform) {
        case platformEnum.wx:
          wxLogin(uid.value, pwd.value);
          break;
        case platformEnum.dd:
          ddLogin(uid.value, pwd.value);
          break;
        default:
          userController
            .quickLogin(uid.value, pwd.value)
            .then((res) => loginSuccess(res, link, false))
            .catch(() => clearLoading());
          break;
      }
    }

    function setting() {
      navigateTo("pages/login/setting");
    }

    return {
      setting,
      name: getStorage("UserName"),
      isAppPlatform: !isMP,
      login,
      uid: uid,
      pwd: pwd,
      loginBackgroundImage: `url('${getFileUrl("/static/bg_beijing.jpg")}')`,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // background-image: url("/static/images/bg_beijing.jpg");
  background-color: #666;
  background-position: -738px -101px;
  color: white;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  .van-cell {
    color: white;
    .van-field__control {
      color: white !important;
    }
  }
  .van-button--default {
    border: 1px solid #e4e4e4;
    background-color: #e4e4e4;
    /*color: white;*/
    padding: 0px 24px;
  }
  .head {
    padding: 50rpx;
    font-size: 20px;
    height: 120px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .van-radio__label {
      color: #ffffff;
    }
    .right {
      font-size: 1.2rem;
      float: right;
    }
    .left {
      float: left;
      height: 2rem;
      width: 2rem;
      font-size: 2.2rem;
    }
  }
  .loginContainer {
    background-color: transparent;
    margin-top: 50rpx;
    .van-cell-group {
      background-color: transparent;
      border: none;
      color: white;
      .van-field__label {
        color: white;
      }
      .van-field__control {
        color: white;
      }
    }
    .van-cell {
      background-color: transparent;
    }
    .surebth {
      width: 80px;
      height: 40px;
      font-size: 13px;
      margin-top: 45px;
    }
    .bomm_img {
      width: 100%;
      text-align: center;
      position: fixed;
      bottom: 30rpx;
    }
    image {
      width: 160px;
      height: 45px;
    }
    /*.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
			    border-width: 0px 0;
			}*/
    .van-cell:not(:last-child)::after {
      left: 0;
      border-bottom: 1px solid #ebedf0;
    }
  }
  .text {
    color: black;
    margin: 1rem 2rem 2rem 2rem;
  }
}
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.van-cell::after {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.van-cell:not(:last-child)::before {
  position: absolute;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  top: 0;
  left: 0;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.van-field__label {
  width: 90px;
}
.van-field__control {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  color: #323233;
  text-align: left;
  background-color: transparent !important;
  border: 0;
  resize: none;
  color: white !important;
}
.van-cell__value {
  width: 100%;
}
</style>