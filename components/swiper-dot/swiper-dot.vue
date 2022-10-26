<template>
    <!-- 轮播图 -->
    <view class="swiper-dot" :style="`height:${height}px`">
      <swiper
        style="height: 100%"
        :indicator-dots="false"
        :autoplay="true"
        :vertical="false"
        :interval="3000"
        :circular="true"
      >
        <swiper-item v-for="(item, index) in swiperImg" :key="index">
          <img :src="item" alt="" />
        </swiper-item>
      </swiper>
    </view>
</template>
<script>
import { reactive, ref } from "vue";
import { getFileUrl } from "../../share/http/serveUrl";
export default {
    props:{
      height:{
        type:[String,Number],
        default:150
      },
      swiperImg:{
          type:Array,
          default:()=>{
              return [
                  getFileUrl("/static/app1.jpg"),
                  getFileUrl("/static/app2.jpg"),
                  getFileUrl("/static/app3.jpg"),
            ]
          }
      }  
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
.swiper-dot {
  border-radius: 10px;
  overflow: hidden;
	-webkit-backface-visibility: hidden; //钉钉ios兼容
	-webkit-transform: translate3d(0, 0, 0);
  img,
  image {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
}
</style>
