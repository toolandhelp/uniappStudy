<template>
    <view class="anchor-point-qty" :style="`bottom:${bottom}px;right:${right}px;`">
        <view class="qty">
            <view class="qty-content">
                <view class="list-qty">
                    {{qty}}
                </view>
                <view class="total-qty">
                    {{totalQty}}
                </view>
            </view>
        </view>
        <view class="anchor-point" @click="scorllTop" v-if="scrollTopDistance > scrollAreaHeight">
            <uni-icons type="top" size="30"></uni-icons>
        </view>
    </view>
</template>
<script>
import { ref,computed } from "vue";
export default {
    props:{
        qty:{
            type:[Number,String],
            default:0
        },
        totalQty:{
            type:[Number,String],
            default:0
        },
        bottom:{
            type:[Number,String],
            default:70
        },
        right:{
            type:[Number,String],
            default:10
        },
        scrollAreaHeight:{
            type:[Number,String],
            default:0
        },
        scrollTopDistance:{
            type:[Number,String],
            default:0
        },
    },
    emits: ["scrollTop"],
    setup(props,ctx) {
        function scorllTop(){
            ctx.emit("scrollTop");
        }
        return {
            scorllTop,
        }
    },
}
</script>
<style lang="scss" scoped>
.anchor-point-qty{
    width: 50px;
    height: 120px;
    position: fixed;
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    >.qty{
        display: flex;
        justify-content: center;
        align-items: center;
        >.qty-content{
            width: 100%;
            height: 60%;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >.list-qty{
                width: 100%;
                height: 50%;
                font-size: 12px;
                font-weight: bold;
                color: #000;
                border-bottom: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;

            }
            >.total-qty{
                width: 100%;
                height: 50%;
                font-size: 12px;
                font-weight: bold;
                color: rgb(94, 94, 94);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            font-weight: bold;
            // font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        width: 100%;
        height: 50px;
        text-align: center;
        
        
    }
    >.anchor-point{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    >view{
        border-radius: 50%;
        background: rgb(245, 245, 245);
        box-shadow: 1px 1px 10px 5px rgba(0, 0, 0, 0.178);
    }
}
</style>
