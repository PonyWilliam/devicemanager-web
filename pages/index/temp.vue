<template>
	<div class="container">
		<div class="background">
			
		</div>
		<div class="logincontent">
			<h3 class="title">
				请输入您的账户
			</h3>
			<div class="form">
				<input type="text" placeholder="请输入账号" class="normal">
				<input type="password" placeholder="请输入密码" class="normal">
			</div>
		</div>
		<div class="submit">
			<button class="submit">登 陆</button>
			<button class="login">人脸登陆</button>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	div{
		text-align: center;
		box-sizing: border-box;
	}
	.container{
		font-size:16px;
	}
	.background{
		font-size:0;
		width:100vw;
		height:30vh;
		background-image: linear-gradient(to bottom right,#f7e561,#f19d85);
		z-index: 1;
	}
	.logincontent{
		background:white;
		width:90vw;
		margin-top:-10vh;
		margin-left:5vw;
		box-sizing: border-box;
		padding:1rem;
		z-index: 2;
		border-radius: 1rem;
		box-shadow:.1rem .1rem .1rem #ccc;
	}
	.logincontent .title{
		font-size:1rem;
	}
	.logincontent .form{
		margin-top:1rem;
	}
	.logincontent .form .normal{
		border:1px solid #ccc;
		display:block;
		width:80%;
		margin:.8rem 10%;
		box-sizing: border-box;
		height:2rem;
		line-height:.85rem;
		font-size:.85rem;
		border-radius: .8rem;
		color:#A3A5A7;
	}
	.submit{
		width:80vw;
		display: flex;
		justify-content: center;
		flex-direction: column;
		margin-left:10vw;
		box-sizing: border-box;
	}
	.submit button{
		margin:.6rem 0;
		border-radius:.8rem;
		display: block;
		background-image: linear-gradient(#597ef7,#d6e4ff);
	}
</style>
