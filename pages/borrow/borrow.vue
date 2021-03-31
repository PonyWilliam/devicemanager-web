<template>
	<view class="">
		<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
		<u-form :model="form" ref="uForm">
			<u-form-item label="对方id" prop="id" placeholder="请输入对方id">
				<u-input v-model="form.id" />
			</u-form-item>
			<u-form-item label="原因" prop="intro" placeholder="请输入原因">
				<u-input v-model="form.intro" />
			</u-form-item>
			<u-form-item label="物品">
				<u-input placeholder="请选择" @click="openlist" prop="pname" v-model="form.pname" disabled="disabled"></u-input>
			</u-form-item>
			<u-input v-show="false" prop="bid" v-model="form.bid"></u-input>
		</u-form>
		<u-button @click="submit">提交</u-button>
	</view>
</template>

<script>
import {config} from '@/util/config.js'
export default {
	data() {
		return {
			show:false,
			token:'',
			list:[
			],
			form: {
				id: '',//对方id
				intro: '',//reason
				pname:'',//物品名
				bid:null,//表内id
			},
			rules: {
				id: [
					{ 
						required: true, 
						message: '请输入对方ID', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					}
				],
				intro: [
					{
						min:10,
						max:200,
						message: '最少10个字符',
						trigger: ['change','blur'],
					}
				],
				name: [
					{
						required: true, 
						message: '物品必须选择哦',
						trigger: ['change','blur'],
					}
				],
				bid: [
					{
						required: true, 
						message: '物品必须选择哦',
						trigger: ['change','blur'],
					}
				],
			}
		}
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					//提交表单到服务器，服务器判断是否有
					let formData = new FormData();
					formData.append('id',this.form.bid)
					formData.append('wid',this.form.id)
					formData.append('reason',this.form.intro)
					fetch(config.base_url + config.toOther,{
						"method":"POST",
						"body":formData,
						headers:new Headers({
							"Authorization":this.token
						})
					}).then(data=>data.json()).catch(err=>console.log(err)).then(data=>{
						if(data.data){
							data = data.data
						}
						if(data && data.code && data.code == 200){
							uni.showModal({
								title:"success",
								"content":data.msg
							})
							this.form.bid = null
							this.form.id = null
							this.form.intro = null
							this.form.pname = null
						}else if(data && data.code){
							uni.showModal({
								"title":"fail",
								"content":data.msg
							})
						}else{
							uni.showModal({
								title:"error",
								"content":"未知错误"
							})
							console.log(data)
						}
					})
				} else {
					console.log('验证失败');
				}
			});
		},
		confirm(e){
			this.form.bid = e[0].value
			this.form.pname = e[0].label
		},
		openlist(){
			this.show = true
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
		
	},
	onLoad(){
				uni.getStorage({
					key:"token",
					success:(res)=>{
						this.token = res.data
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
							data = data.data
							if(data.worker==undefined){
								uni.showModal({
									title:"error",
									content:"验证失效，请重新登陆"
								})
								uni.redirectTo({
									url:'../index/index'
								})
								return
							}
							//登陆成功
							this.user = uni.getStorageSync("username")
							fetch(config.base_url + config.getBorrowInfo+"?now=now",{
								"method":"GET",
								headers:new Headers({
									"Authorization":res.data
								})
							}).then(res=>res.json()).catch(err=>{
								console.log(err)
								uni.showModal({
									title:"error",
									content:"无法与服务器连接，请重试",
									success: () => {
										uni.redirectTo({
											url:'../mine/mine'
										})
									}
								})
							}).then(data=>{
								if(data && data.code && data.code != 200){
									uni.showModal({
										title:"error",
										content:"您没有在租借的物品哦",
										success() {
											uni.redirectTo({
												url:'../mine/mine'
											})
										}
									})
									return
								}
								if(data != undefined){
									//提取元素
									//先提取所有产品信息，方便拿名字
									fetch(config.base_url + config.getProductAll,{
										"method":"GET",
									}).then(res2=>res2.json()).catch(err=>console.log(err)).then(res2=>{
										res2 = res2.data
										for(let x of data){
											for (let y of res2.infos){
												if(x.PID == y.id){
													let temp = {
														"label":`${y.product_name}(pid:${y.id})`,
														"value":x.ID
													}
													this.list.push(temp)
													break
												}
											}
										}
									})
								}
							})
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
			}
};
</script>