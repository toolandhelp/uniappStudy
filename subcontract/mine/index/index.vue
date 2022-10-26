<template>
  <view class="top">
    <view class="top_top">
      <view class="top_top_left">
        <image :src="headPhoto" class="top_top_image" mode="aspectFit" />
      </view>
      <view class="top_top_right">
        <view class="top_top_right_text bigtext">{{userName}}</view>
      </view>
    </view>
    <!-- <view class="top_bottom">
      <view class="top_bottom_text bigtext">
        {{jobNo}}
      </view>
    </view> -->

    
  </view>
  <view class="content">
    <view class="content_list bigtext" v-for="(value,index) in contentDatas">
    <view class="content_list_left">{{value.lable}}</view>
    <view class="content_list_right">{{value.text}}</view>

    </view>
    
  </view>
</template>

<script>
import { navigateTo } from "../../../share/redirect/index";
import { getJurisdiction } from "../../../share/util/index";
import { getStorage, setStorage } from "../../../share/util/storage";
import userController from "../../../service/controller/system/userController";
import { reactive, ref } from "vue";

export default {
  
  setup() {
    const userName = getStorage('UserName');
    const jobNo = getStorage('UserCode')
    
    const headPhoto = '/static/images/touxiang.png'
    const contentDatas = [
      {
        lable:'工号',
        text: jobNo
      },
      {
        lable:'所属部门',
        text: getStorage('OrgName')
      }
    ]

    return {
      // 名字
      userName,
      // 工号
      jobNo,
      // 下面的内容
      contentDatas,
      // 头像
      headPhoto
    };
  },
  components:{
  
  }
};
</script>
<style lang="scss" scoped>
.bigtext{
  font-size: larger;
  color: rgb(93, 93, 93);
  // font-weight: 600;
}
.top{
  width: 90%;
  height: 250rpx;
  // border: 1px solid black;
  padding: 0 30rpx;
  .top_top{
    width: 90%;
    height: 250rpx;
    display: flex;
    align-items: center;
    .top_top_left{
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .top_top_right{
      width: 60%;
      height: 100%;
      .top_top_right_text{
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
  .top_top_image{
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
  }
}
.content{
  width: 90%;
  height: 600rpx;
  // border: 1px solid red;
  padding: 30rpx  30rpx 0 30rpx;
  .content_list{
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(215, 214, 214);
    .content_list_left{
      width: 25%;
      display: flex;
      justify-content: flex-start;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

}

</style>
