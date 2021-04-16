<template>
	<view class="container">
		<view v-for="item in borrowInfo" name="card" class="card" title="信息" thumbnail="" extra="额外信息" note="Tips">
			<view class="header">
				<div class="time">{{item.time}}</div>
			</view>
			<view class="content">
				<text>
					申请人:<text class="item">{{item.reqname}}</text>
				</text>
				<text>
					产品名:<text class="item">{{item.pname}}</text>
				</text>
				<text>
					申请原因:<text class="item">{{item.reason}}</text>
				</text>
				<text>
					商品类型:<text class="item">{{item.is_important?'重要商品':'普通商品'}}</text>
				</text>
			</view>
			<view class="footer" v-if="item.confirm==1">
				<button @click="confirm(item.id,1)" type="default">确 认</button>
				<button @click="confirm(item.id,2)" type="default">拒 绝</button>
			</view>
			<view class="footer" v-else>
				<text class="time">{{item.rsp_time}}</text>
				<text class="status">{{item.confirm==2?'已同意':'已拒绝'}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	import {config} from '@/util/config.js'//配置文件
	import {date} from '@/util/Date.js'//日期转换小工具
	export default{
		data(){
			return{
				borrowInfo:[],//获取信息
				user:'',
				token:'',
			}
		},
		methods:{
			GetBorrow(){
				this.borrowInfo.length = 0
				fetch(config.base_url + config.rsp,{
					"method":"GET",
					headers:new Headers({
					"Authorization":this.token
					})
				}).then(res=>res.json()).catch(err=>console.log(err)).then(data=>{
					for(let x of data.data){
						fetch(config.base_url + "work/worker/" + x.ReqWID).then(res=>res.json()).catch(err=>console.log(err)).then(data2=>{
							//获取worker信息
							fetch(config.base_url + "product/id/" + x.PID).then(res=>res.json()).catch(err=>console.log(err)).then(data3=>{
								//1. 获取product信息
								//2. 构建数据
								let temp = {}
								temp.reqname = data2.data.worker.Name
								temp.reqID = data2.data.worker.ID
								temp.reqNum = data2.data.worker.Nums
								temp.pid = data3.id
								temp.pname = data3.product_name
								temp.reason = x.Reason
								temp.important = data3.is_important
								temp.id = x.id
								temp.confirm = x.Confirm
								temp.time = date.formatDate(new Date(x.Time*1000),"YYYY-MM-DD HH:ii:ss")
								temp.rsp_time = x.Confirm==1?0:date.formatDate(new Date(x.RspTime*1000),"YYYY-MM-DD HH:ii:ss")
								this.borrowInfo.push(temp)
							})
						})
					}
				})
			},
			confirm(id,status){
				//合并reject，复写浪费资源
				let url = ""
				let text = ""
				if(status == 1){
					//confirm
					url = `${config.base_url}work/confirm/${id}`;
					text = "是否确认同意，同意后不能反悔了哦"
				}else{
					//reject
					url = `${config.base_url}work/reject/${id}`;
					text = "确认拒绝吗，拒绝后不能返回哦"
				}
				console.log(id)
				uni.showModal({
					title:'确认',
					content:text,
					success:res=>{
						//发起请求
						if(res.confirm){
							//确认，发起请求
							uni.showLoading({
								title:'请求中...'
							})
							fetch(url,{
								method:'POST',
								headers:new Headers({
									"Authorization":this.token
								})
							}).then(res=>res.json()).catch(err=>{console.log(err)}).then(data=>{
								if(typeof(data) == undefined){
									uni.hideLoading()
									uni.showToast({
										title:'未知错误，请联系管理员'
									})
									
								}
								if(data.code == 2004){
									//token失效
									uni.hideLoading()
									uni.showToast({
										title:"token失效，请重新登陆",
										success:_=>{
											uni.redirectTo({
												url:'../index/index'
											})
										}
									})
								}else if(data.code==500){
									uni.hideLoading()
									uni.showToast({
										title:'服务端错误'
									})
								}else{
									uni.hideLoading()
									uni.showToast({
										title:'操作成功',
										success: () => {
											this.GetBorrow()
										}
									})
								}
							})
						}else{
							//取消
							return
						}
					},
					cancelText:"我再想想"
				})
			},
		},
		onLoad(){
			this.token = uni.getStorageSync("token")
			if (this.token == undefined || this.token == null){
				uni.showModal({
					title:"error",
					content:"验证失效，请重新登陆"
				})
				uni.redirectTo({
					url:'../index/index'
				})
			}
			//获取用户信息
			let username = uni.getStorageSync("username")
			fetch(config.base_url+config.getUserInfoByUsername+username,
			{
					"method":"GET",
					headers:new Headers({
					"Authorization":this.token
					})
			}).then(res=>res.json()).catch(err=>{
				uni.showModal({
					title:"error",
					content:"无法读取数据，请重新登陆",
					success: () => {
						uni.redirectTo({
							url:'../index/index'
						})
					}
				})
				console.log(err)
			}).then(data=>{
				data = data.data
				if(typeof data == undefined || typeof data.worker==undefined){
					uni.showModal({
						title:"error",
						content:"验证失效，请重新登陆"
					})
					uni.redirectTo({
						url:'../index/index'
					})
					return
				}
				//验证成功
				this.GetBorrow()
			})
		}
	}
</script>

<style lang="scss">
	page{
		min-height:100%;
		background:linear-gradient(to bottom,#d6d6d6,#f1f1f1);
	}
	.container{
		overflow-y: scroll;
		overflow-x: hidden;
		width:100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding:25rpx 0;
		.card{
			padding:25rpx 35rpx;
			margin:30rpx 0;
			justify-content: center;
			width:90%;
			box-sizing: border-box;
			background:#fdfdfd;
			border-radius: 30rpx;
			box-shadow: 7px 5px 4px rgba(164,164,164,.75),
			7px -5px 4px rgba(164,164,164,.75),
			3px -2px 4px rgba(164,164,164,.75),
			1px -2px 4px rgba(164,164,164,.75);
			backdrop-filter: blur(10px);
			.header{
				width:95%;
				margin-left:2.5%;
				padding:16rpx 0;
				border-bottom: 2rpx solid #ccc;
				.time{
					font-size:24rpx;
					line-height:28rpx;
					color:#777;
				}
			}
			.content{
				width:95%;
				margin-left:2.5%;
				padding-bottom: 30rpx;
				text{
					line-height:55rpx;
					font-size:31rpx;
					text-align: left;
					display: block;
					.item{
						display: inline-block;
					}
				}
			}
			.footer{
				width:95%;
				margin-left:2.5%;
				border-top: 2rpx dashed #999;
				padding-top:20rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-wrap:nowrap;
				button{
					padding:20rpx 60rpx;
					border-radius: 40rpx;
					display: inline-block;
					font-size:30rpx;
					line-height:46rpx;
					background:linear-gradient(to right,#bbb,#c8c8c8)
				}
				.status{
					color:#333;
					font-size:40rpx;
					font-weight: 150;
					
					line-height:68rpx;
				}
				.time{
					color:#aaa;
					font-size:24rpx;
					line-height:35rpx;
				}
			}
		}
	}
</style>