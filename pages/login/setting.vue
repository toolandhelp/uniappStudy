<template>
  <view class="upbox">
    <uni-forms ref="form" :modelValue="formData" :rules="rules">
      <uni-forms-item label="服务地址" :required="true" name="serverAddress">
        <uni-easyinput
          type="text"
          v-model="formData.serverAddress"
          placeholder="请输入服务器地址"
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
import { navigateTo } from "../../share/redirect/index";
import { getStorage, setStorage } from "../../share/util/storage";
import ServiceUrl from "../../share/http/serveUrl";
import productEnum from "../../service/enumeration/productEnum";
import {
  showOkToast,
  showErrorToast,
  showLoading,
  clearLoading,
} from "../../share/util/message";
import { reactive, ref } from "vue";
import { httpRequest } from "../../share/http/http";

export default {
  setup() {
    const form = ref(null);
    const formData = reactive({
      serverAddress: "",
    });
    //判断是否有选择
    formData.serverAddress =
      typeof getStorage("serverAddress") === "string" &&
      getStorage("serverAddress").indexOf("http") == 0
        ? getStorage("serverAddress")
        : "http://demo.houqinstar.com/";

    //验证
    const rules = reactive({
      serverAddress: {
        rules: [
          { required: true, errorMessage: "服务地址必填" },
          {
            validateFunction: function (rule, value, data, callback) {
              //   const reg =
              //     /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
              //   const reg1 =
              //     /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
              //   if (!reg.test(value) || !reg1.test(reg1)) {
              //     callback("请输入正确的服务地址");
              //   }
              if (value.indexOf("http") !== 0) {
                callback("请输入正确的服务地址");
              }

              return true;
            },
          },
        ],
      },
    });

    function blur() {
      form.value.validate();
    }
    //取消 返回
    function goBack() {
      navigateTo("/");
    }
    //提交
    function submit() {
      form.value.validate().then(() => {
        const url = formData.serverAddress + "/configure.jsonp";

        /* #ifdef APP-PLUS */
        let temp = httpRequest(url, {}, "get");
        temp
          .then((value) => {
            let tmpdata = value.data;
            tmpdata = tmpdata.replace(/\s+/g, '"');
            tmpdata = tmpdata.replace(/:"/g, '":"');
            tmpdata = tmpdata.replace(/,"$/gi, "");
            tmpdata = tmpdata.replace(',"}', "}");
            tmpdata = tmpdata.slice(1);
            tmpdata = tmpdata.slice(0, -1);
            const data = jsonpToJson(tmpdata);

            setStorage("services", JSON.stringify(data));
            setStorage("serverAddress", formData.serverAddress);
            //设置
            ServiceUrl.set(productEnum.system, data.system);
            ServiceUrl.set(productEnum.asset, data.asset);
            ServiceUrl.set(productEnum.consumable, data.consumables);
            ServiceUrl.set(productEnum.myWork, data.myWork);
            //ServiceUrl.set(productEnum.OBPProject, data.OBPProject);
            ServiceUrl.set(productEnum.file, data.fileServiceRoot);

            showOkToast("设置成功");
            goBack();
          })
          .catch((err) => {
            showErrorToast("服务地址错误！");
          });

        /* #endif */

        var scr = document.createElement("script");
        scr.setAttribute("type", "text/javascript");
        scr.setAttribute("src", url);
        scr.setAttribute("onerror", "errorfunc()");

        document.querySelector("head").appendChild(scr);
        
        window.jsonpCallback = function jsonpCallback(data) {
          setStorage("services", JSON.stringify(data));
          setStorage("serverAddress", formData.serverAddress);
          //设置
          ServiceUrl.set(productEnum.system, data.system);
          ServiceUrl.set(productEnum.asset, data.asset);
          ServiceUrl.set(productEnum.consumable, data.consumables);
          ServiceUrl.set(productEnum.myWork, data.myWork);
          //ServiceUrl.set(productEnum.OBPProject, data.OBPProject);
          ServiceUrl.set(productEnum.file, data.fileServiceRoot);

          showOkToast("设置成功");
          goBack();
        };
        showErrorToast("服务地址错误！");
      });
    }

    function jsonpToJson(datas) {
      let jsonData = null;
      // 下面是对获取到的数据进行处理，把jsonp格式的数据处理成json格式的数据
      if (typeof datas === "string") {
        // 返回的是jsonp类型的数据，所以要用正则表达式来匹配截取json数据
        const reg = /^\w+\((\{[^()]+\})\)$/;
        const matches = datas.match(reg);
        // matches匹配到的是数组，数组第一个是所有正则表达式匹配的字符串，第二个是第一个小括号匹配到的字符串
        if (matches) {
          console.log("dddd");
          jsonData = JSON.parse(matches[1]);
        }
      }
      return jsonData;
    }

    return {
      form,
      rules,
      blur,
      formData,
      submit,
      goBack,
    };
  },
};
</script>

<style lang="scss" scoped>
.upbox ::v-deep .uni-forms-item {
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
