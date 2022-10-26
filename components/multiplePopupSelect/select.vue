<template>
    <view @click="open"><slot /></view>
    <uni-popup ref="popup" type="bottom" :is-mask-click="false" background-color="#fff" @change="change">
        <view class="popup-content" :style="`height:${windowHeights / 2 }px`">
            <view class="popup-content_header">
                <button @click="close">取消</button>
                <button class="uni-icon-submit" @click="complete"><text style="color: #fff">完成</text></button>
            </view>
            <view class="popup-content_items" :style="`height:${(windowHeights / 2) - 70 }px`">
                <view class="popup-content_item" v-for="(item,index) in itemOptions" :key="index" @click="checked(item.value)">
                    <text>{{item.text}}</text>
                    <uni-icons type="checkmarkempty" v-if="item.show" color="#007aff" size="25"></uni-icons>
                </view>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import { ref,watch } from "vue";
export default {
    emits:['change'],
    props:{
        options:{
            type:Array,
            default:()=>{
                return []
            }
        },
        value:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    setup(props,ctx) {
        const popup = ref(null); 
        const windowHeights = ref(0);
        const itemOptions = ref([]);
        
        watch(()=>props.value,(newVal)=>{
            update();
        })

        watch(()=>props.options,(newVal)=>{
            update();
        })

        function update(){
            itemOptions.value = props.options.map(p=>{
                p.show = props.value.some( s => s == p.value);
                return p;
            })
        }

        function checked(val){
            const index = itemOptions.value.findIndex(p=>p.value == val);
            itemOptions.value[index].show = !itemOptions.value[index].show;
        }
        
        function complete(){
            let value = [],text = "";
            for(let i =0,len = itemOptions.value.length; i< len; i++){
                if(itemOptions.value[i].show){
                    value.push(itemOptions.value[i].value);
                    text += itemOptions.value[i].text + ',';
                }
            }
            ctx.emit('change',{value,text:text.substring(0,text.lastIndexOf(','))});
            close();
        }

        function close(){
            popup.value.close();
            
        }

        function open(){
            update();
            popup.value.open();

        }

        {
            // 获取屏幕高度
            uni.getSystemInfo({
                success: (result) => {
                    windowHeights.value = result.windowHeight;
                },
            });
        }
        return {
            popup,
            windowHeights,
            itemOptions,
            checked,
            complete,
            open,
            close,
        }
    },
}
</script>
<style lang="scss" scoped>
.uni-icon-submit {
  background: #4a74e7;
  color: #fff;
}
.popup-content {
    background-color: #fff;
    .popup-content_header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        >button{
            width: 70px;
            height: 35px;
            font-weight: bold;
            font-size: 14px;
            color: #444;
            margin: 0 5px;
            border-radius: 5px;
        }
    }
    .popup-content_items{
        margin:10px 0;
        overflow: auto;
        >view{
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:0 10px;
            &:active{
                background: rgba(204, 204, 204, 0.2);
            }
            >text{
                font-size: 14px;
                color: #7d7d7d;
                white-space: nowrap;
            }
        }
    }
}
</style>
