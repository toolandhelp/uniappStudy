<template>
  <view class="upbox">
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <uni-forms-item label="新 密 码" :required="true" name="newPassword">
        <uni-easyinput
          type="password"
          v-model="formData.newPassword"
          placeholder="请输入密码"
          @blur="blur"
        />
      </uni-forms-item>
      <uni-forms-item label="确认密码" :required="true" name="pastPassword">
        <uni-easyinput
          type="password"
          v-model="formData.pastPassword"
          placeholder="请输入密码"
          @blur="blur"
        />
      </uni-forms-item>
    </uni-forms>

    <view class="quick-return-btn">
      <button type="primary" @click="submit">确 认</button>
      <button @click="goBack">取 消</button>
    </view>
  </view>
</template>

<script>
import mineController from "../../../service/controller/mine/MineController.js";
import { navigateBack } from "../../../share/redirect/index";
import { getStorage } from "../../../share/util/storage.js";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../../share/util/message";
import { reactive, ref } from "vue";

export default {
  setup() {
    const form = ref(null);
    const formData = reactive({
      newPassword: "",
      pastPassword: "",
    });
    const systemPasswordPolicy =
      JSON.parse(getStorage("SystemPasswordPolicy")) ?? {};

    const rules = reactive({
      newPassword: {
        rules: [
          { required: true, errorMessage: "新密码必填" },
          {
            validateFunction: function (rule, value, data, callback) {
              if (
                value.trim().length <
                systemPasswordPolicy.PasswordPolicyMinLength
              ) {
                callback(
                  "长度不能小于" +
                    systemPasswordPolicy.PasswordPolicyMinLength +
                    "个字符"
                );
              } else if (systemPasswordPolicy.PasswordPolicyPasswordStrength) {
                var regnum = 0;
                var reg1 = /[a-z]|[A-Z]/;
                if (reg1.test(value)) {
                  regnum += 1;
                }
                var reg2 = /\d/;
                if (reg2.test(value)) {
                  regnum += 1;
                }
                var reg3 = /[\!\@\#\$\%\^\&\*]/;
                if (reg3.test(value)) {
                  regnum += 1;
                }
                if (regnum < 2) {
                  callback("密码必须包含字母、数字、特殊字符中的两种");
                }
              } else if (formData.pastPassword != value) {
                callback("新密码与确认密码不一致");
              }

              return true;
            },
          },
        ],
      },
      pastPassword: {
        rules: [
          { required: true, errorMessage: "确认密码必填" },
          {
            validateFunction: function (rule, value, data, callback) {
              if (
                value.trim().length <
                systemPasswordPolicy.PasswordPolicyMinLength
              ) {
                callback(
                  "长度不能小于" +
                    systemPasswordPolicy.PasswordPolicyMinLength +
                    "个字符"
                );
              } else if (formData.newPassword != value) {
                callback("新密码与确认密码不一致");
              }

              return true;
            },
          },
        ],
      },
    });
    function blur(){
        form.value
        .validate();
    }

    //取消 返回
    function goBack() {
      navigateBack();
    }
    //提交
    function submit() {
      form.value
        .validate()
        .then(() => {
          const data = {
            ID: getStorage("UserID"),
            NewPassword: formData.newPassword,
            ReNewPassword: formData.pastPassword,
          };
          mineController
            .modifyPassword(data)
            .then(() => {
              showOkToast("操作完成");
              navigateBack();
            })
            .catch((err)=>{
              showErrorToast(err);
            })
            .finally(() => clearLoading());
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    return {
      blur,
      form,
      formData,
      submit,
      goBack,
      rules,
      systemPasswordPolicy, //:JSON.parse(getStorage("SystemPasswordPolicy")) ,
    };
  },
};
</script>

<style lang="scss" scoped>
.upbox ::v-deep .uni-forms--top {
  padding: 25px;
}

.quick-return-btn {
  width: 100%;
  height: 100px;
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
