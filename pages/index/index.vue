<template>
	<view class="container">
		

		<n-page>
			<view slot="navbar"></view>
			<view slot="header"></view>
			<view slot="body">
				<view class="background"></view>
				<view class="login">
					<text class="title">请登陆</text>
					<input class="input username" v-model="username" type="text" placeholder="请输入用户名" />
					<input class="input password" v-model="password" type="password" placeholder="请输入密码" />
					<button class="button" @click="login()">登 陆</button>
					<button class="button">人脸登陆</button>
				</view>
			</view>
			<view slot="footer"></view>
		</n-page>
		
		<u-modal v-model="show" :title-style="{color: 'red'}">
					<view class="slot-content">
						<rich-text :nodes="content"></rich-text>
					</view>
		</u-modal>
	</view>
	
</template>
<style lang="scss" scoped>
	.background{
		width:100vw;
		height:25vh;
		background-color: #a3a5a7;
	}
	.login{
		flex: 1;
		width:90vw;
		margin-left:5vw;
		text-align: center;
		margin-top:-10vh;
		padding-top:15px;
		padding-bottom:20px;
		background-color:#efefef;
		border-radius: 15px;
		border-width: 1px;
		border-style: solid;
		border-color: #bbb;
	}
	.login .title{
		color:#010101;
		font-size: 20px;
		line-height:20px;
		margin-top:10px;
		margin-bottom:10px;
		
	}
	.login .input{
		width:50%;
		margin-left:25%;
		padding:8px 15px;
		box-sizing: border-box;
		height:35px;
		line-height:35px;
		background-color: #dcdcdc;
		border-radius: 15px;
		line-height:30px;
		font-size:15px;
		margin-top:20px;
	}
	.login .input:focus{
		background-color: #dcdcdc;
	}
	.login .button{
		margin-top:25px;
		background-color: #e6f7ff;
		width:40%;
		text-align: center;
		border-radius: 30px;
		margin-left:30%;
		padding-top:5px;
		padding-bottom:5px;
		color:#253525;
		box-sizing: border-box;
		font-size:14px;
	}
	.slot-content {
			font-size: 28rpx;
			color: $u-content-color;
			padding-left: 30rpx;
	}
	.popup{
		height:400px;
	}
</style>
<script>
	import {config} from '@/util/config.js'
	import $ from '@/util/jquery.js'
	export default{
		data(){
			return{
				username:'',
				password:'',
				show:false,
				content:''
			}
		},
		methods:{
			login:function(){
				if(this.username == "" || this.password == ""){
					this.content = "请输入账号名和密码"
					this.show = true
					return
				}
				let formData = new FormData();
				formData.append('username',this.username)
				formData.append('password',this.password)
				let url = config.base_url + config.login
				uni.showLoading({
					title:"请求中..."
				})
				fetch(url,{
					method:'POST',
					body:formData,
					headers: new Headers({
					    //'Content-Type': 'application/json'
					 })
				}).then(res=>res.json()).catch((err)=>{
					uni.hideLoading()
					this.content = err
					this.show = true
				}).then((response)=>{
					uni.hideLoading()
					if(response.code == 200){
						//登陆成功,存储token并跳转到下一个页面
						uni.setStorage({
							key:"token",
							data:response.token,
							success:()=>{
								uni.setStorageSync("username",this.username)
								uni.redirectTo({
								    url: '../mine/mine'
								});
							}
						})
						console.log(response)
					}else{
						this.content = response.msg
						this.show = true
					}
				})
			},
			
			onChange(e){
				this.show = e.detail
			}
			
		}
	}
</script>