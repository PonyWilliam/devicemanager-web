<template>
	<view>
		<u-popup v-model="aboutshow" mode="center">
			<view class="about">
				<text class="title">关于我们</text>
				<text>我们是一群喜欢折腾的年轻人</text>
				<text>我们想做一堆好玩更实用的发明</text>
				<text>期待成长路上更好的我们！</text>
			</view>
		</u-popup>
		
		<u-popup v-model="helpshow" mode="center">
			<view class="help">
				<text class="title">帮助中心</text>
				<ol class="helps">
					<li>大家可以通过转借确认来确认其它人的转借</li>
					<li>我的通知用于系统推送一些通知</li>
					<li>转借确认后该物品若丢失将由你负全部责任</li>
				</ol>
			</view>
		</u-popup>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator">
							<img src="../../static/user/face.jpg">
						</view>
						<view class="phone-number">ID:{{res.id}}</view>
						<view class="phone-number">工号:{{res.num}}</view>
						<view class="phone-number">姓名:{{res.name}}</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="notification">
							<view class="icon"><img src="../../static/user/message.png"></view>
							<view class="text">我的通知</view>
						</view>
						<view class="item" @click="confirm">
							<view class="icon"><img src="../../static/user/favorite.png"></view>
							<view class="text">转借确认</view>
						</view>
						<view class="item" @click="logout">
							<view class="icon"><img src="../../static/user/service.png"></view>
							<view class="text">退出登陆</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder" >
					<view class="icon" @click="mine"><image src="../../static/user/card.png"></image></view>
					<view class="text">我的名片</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li " @click="borrow">
					<view class="icon"><image src="../../static/user/skin.png"></image></view>
					<view class="text">物品转借</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="help">
					<view class="icon"><image src="../../static/user/help.png"></image></view>
					<view class="text">帮助中心</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				
				<view class="li " @click="myorder">
					<view class="icon"><image src="../../static/user/opinion.png"></image></view>
					<view class="text">我的租借</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " @click="about">
					<view class="icon"><image src="../../static/user/about.png"></image></view>
					<view class="text">关于我们</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {config} from '@/util/config.js'
	export default {
		data() {
			return {
				res:{
					id:null,
					num:null,
					name:null
				},
				helpshow:false,
				aboutshow:false,
				mineshow:true
			};
		},
		onLoad() {
			uni.getStorage({
				key:"token",
				success:(res)=>{
					console.log(res)
					//获取用户信息
					let username = uni.getStorageSync("username")
					fetch(config.base_url+config.getUserInfoByUsername+username,
					{
							"method":"GET",
							headers:new Headers({
							"Authorization":res.data
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
						if(data.data.worker==undefined){
							uni.showModal({
								title:"error",
								content:"验证失效，请重新登陆",
								success: () => {
									uni.redirectTo({
										url:'../index/index'
									})
								}
							})
							
							return
						}
						//登陆成功
						this.res.id = data.data.worker.ID
						this.res.name = data.data.worker.Name
						this.res.num = data.data.worker.Nums
					})
				},
				fail:(err)=>{
					uni.showModal({
						title:"token失效，请重新登陆",
						success: () => {
							uni.redirectTo({
								url:"../index/index"
							})
						}
					})
					
				}
			})
		},
		methods: {
			confirm:function(){
				uni.navigateTo({
					url:'../borrow/order'
				})
			},
			notification:function(){
				uni.showModal({
					title:'预留功能',
					content:'预留功能'
				})
			},
			borrow:function(){
				uni.navigateTo({
					url:'../borrow/borrow'
				})
			},
			about:function(){
				//显示关于我们，用弹窗
				this.aboutshow = true
			},
			help:function(){
				//显示帮助
				this.helpshow = true
			},
			mine:function(){
				//显示自己的信息
				this.mineshow = true
			},
			myorder:function(){
				//查看自己的租借记录
			},
			logout:function(){
				//退出登陆
				uni.showModal({
					title:'退出登陆',
					content:'是否确认退出登陆',
					success:res=>{
						if(res.confirm){
							uni.clearStorageSync()
							uni.redirectTo({
								url:'../index/index'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.help{
	padding:40upx 15upx;
	border-radius: 15upx;
	text-align: center;
}
.help .title{
	font-size:48upx;
	line-height:48upx;
	color:#F29100;
}
.help .helps{
	margin:30upx 0;
	line-height:68upx;
	font-size:28upx;
	text-align: left;
	color: #444;
	padding-left:56upx;
}
.help .helps li{
	padding:0;
	text-indent: 0;
}

.about{
	padding:40upx 45upx;
	text-align: center;
}
.about .title{
	font-size:48upx;
	line-height:48upx;
	color:#F29100;
}
.about text{
	margin-top:20upx;
	line-height:60upx;
	font-size:30upx;
	color: #444;
	display: block;
}
.header{
	background: rgba(255,255,255,.7);
	height: 290upx;
	padding-bottom: 110upx;
	margin-bottom:200upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#4191ea;
	}
}
.box{
	width: 650upx;
	height: 340upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 60upx;
				height: 60upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
}
.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:50upx;
			height:50upx;
			image{
				width:50upx;
				height:50upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
