<template>
	<view class="panel" :style="{height:windowHeight+'px',width:windowWidth+'px'}">
		<!-- <view class="top" >
			<view class="remove" @click="clearCotent" >
				<view class="signtextrotate">清</view>
				<view class="signtextrotate">空</view>
				</view>
		</view> -->
		<view class="sign-panel" >
		  <!-- 
		   style="width: 100%;height: 100%;background-color: #fff;"
		  -->
			<canvas   disable-scroll :style="canvasStyle"
				canvas-id="handWriting1" id="handWriting1" @touchstart="touchstart"  @touchmove="touchmove"></canvas>
		</view>
		<view class="bottom" >
			<button
			class="remove"
				style="
				position: absolute;
				left: 7.5vw;
				bottom: 250px;
				width:45px;
				height: 80px;
				font-size:16px;
				display: flex;
				color: #ccc;
				flex-direction: column;
				justify-content: space-around;
				border-radius: 10px;
				transform: translateX(-50%);
				"
				@click="clearCotent"
			>
				<view class="signtextrotate">清</view>
				<view class="signtextrotate">空</view>
			</button>
			<button
				style="
				position: absolute;
				left: 7.5vw;
				bottom: 150px;
				width:45px;
				height: 80px;
				font-size:16px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				background-color: #4a74e7;
				color: #fff;
				border-radius: 10px;
				transform: translateX(-50%);
				"
				@click="submit"
			>
				<view class="signtextrotate">确</view>
				<view class="signtextrotate">定</view>
			</button>
			<button
				style="
				position: absolute;
				left: 7.5vw;
				bottom: 50px;
				width:45px;
				height: 80px;
				font-size:16px;
				display: flex;
				color: #444;
				flex-direction: column;
				justify-content: space-around;
				border-radius: 10px;
				transform: translateX(-50%);
				"
				@click="cancel"
			>
				<view class="signtextrotate">取</view>
				<view class="signtextrotate">消</view>
			</button>
			<!-- <button  size="mini" style="    position: absolute;
    left: 7.5vw;
    top: 100px;
    padding: 10px;
    height: 60px;
    display: flex;
    flex-direction: column;
	transform: translateX(-50%);
	"  @click="cancel"  >
			 <view class="signtextrotate">取</view>	
			  <view class="signtextrotate">消</view>	
			</button>
			<button size="mini" style="position: absolute;
    left: 7.5vw;
    bottom: 100px;
    padding: 10px;
    height: 60px;
    display: flex;
    flex-direction: column;background-color: #4a74e7;color: #fff;transform: translateX(-50%);" @click="submit">
				<view class="signtextrotate">确</view>
				 <view class="signtextrotate">定</view>	
			</button> -->
		</view>
	</view>
</template>
<script>
	import { showErrorToast } from '../../share/util/message';
	var IsItValid = false;
	export default {
		data(){
			return { ctx:{},moveX:"",moveY:"",windowHeight:0,windowWidth:0,canvasStyle:{height:'',width:'85vw',backgroundColor:'#fff'}}
		},
		methods:{
			touchstart(e){
				let {
					x,
					y
				} = e.changedTouches[0]
				// 绘制线条起点
				this.ctx.beginPath()
				this.ctx.moveTo(x, y)
				// 起点与移动的连接断开
				this.moveX = ''
				this.moveY = ''
			},
			cancel(){
				this.$emit("cancel")
			},
			touchmove(e){
				//取出x, y的值
				let {
					x,
					y
				} = e.changedTouches[0]
				// 防止线条出现断点
				if (this.moveX && this.moveY) {
					this.ctx.moveTo(this.moveX,this.moveY)
					this.ctx.lineTo(this.moveX, this.moveY)
				}
				IsItValid = true;
				this.ctx.lineTo(x, y)
				this.moveX= x
				this.moveY = y
				this.ctx.stroke()
				// ture，保留之前的内容
				this.ctx.draw(true)
			},
			clearCotent(){
				this.ctx.draw(false)
				this.ctx.lineWidth = 4
				this.ctx.setLineCap('round')
				this.ctx.setLineJoin('round')
				this.ctx.strokeStyle = "rgb(0,0,0)";
				this.moveX = ''
				this.moveY = ''
				this.ctx.draw(false)
				IsItValid = false;
			},
			submit(){
				if(!IsItValid){
					showErrorToast('请进行签字操作');
					return
				}
				let that=this;
				that.ctx.draw(true,(()=>{
					uni.canvasToTempFilePath({
					 fileType:'png',
					  canvasId: 'handWriting1',
					  success: function(res) {
						  IsItValid = false;
						  that.$emit("success",res)
					    // 在H5平台下，tempFilePath 为 base64
					    // console.log(res.tempFilePath)
					  } ,
					  fail(err) {
						  console.log(err);
					  	  that.$emit("error",err)
					  }
					},this)
				})())
			}
			
		},
		mounted() {
			// 获取屏幕高度
			uni.getSystemInfo({
			  success: (result) => {
			    this.windowHeight = result.windowHeight;
				this.windowWidth = result.windowWidth;
				this.canvasStyle.height=result.windowHeight+"px";
			  },
			});
			let ctx = uni.createCanvasContext('handWriting1', this)
			// 设置线条
			 ctx.lineWidth = 4
			 ctx.setLineCap('round')
			 ctx.setLineJoin('round')
			 ctx.strokeStyle = "rgb(0,0,0)";
			// 赋值
			this.ctx =ctx;
		}
	}
</script>

<style >
	/* .sign_canvas{
		width: 100vm;height: 100%;background-color: #fff;
	} */
	.signtextrotate {
		 transform: rotate(90deg);
	}
	.panel {
		overflow: hidden;
		position:  fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		z-index: 666;
		flex-direction:column
	}

	.top {
		position: absolute;
		top: 0;
		right: 0;
		width: 15vw;
		height: 100%;
		background-color: #ccc;
	}

	.remove {
		    position: absolute;
		    color: rgb(41, 121, 255);
		    font-size: 15px;
		    line-height: 17px;
		    text-decoration: underline;
		    left: 20px;
		    bottom: 66px;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width:  15vw;
		height: 100%;
		background-color: #ccc;
	}

	.sign-panel {
		position: absolute;
		top: 0;
		right: 15vw;
		left: 15vw;
		width: 85vw;
	}
</style>
