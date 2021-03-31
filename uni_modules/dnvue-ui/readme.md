<p align="center">
    <img alt="logo" src="https://dnvue.dengqichang.cn/file/imgs/logo-transparent.png" width="120" height="120" style="margin-bottom: 10px;">
</p>
<h3 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">DNVUE UI</h3>
<h3 align="center">多平台快速开发 NVUE / VUE 组件库</h3>
<p align="center">
<a href='https://gitee.com/dqc/dnvue-ui/stargazers'><img src='https://gitee.com/dqc/dnvue-ui/badge/star.svg?theme=dark' alt='star'></img></a>
<a href='https://gitee.com/dqc/dnvue-ui/members'><img src='https://gitee.com/dqc/dnvue-ui/badge/fork.svg?theme=dark' alt='fork'></img></a>
</p>

### 介绍

DNVUE UI是[uni-app](https://uniapp.dcloud.io/)生态中优秀的(NVUE/VUE)多平台兼容高性能组件库

### 特性

- 【uni_modules版本】 uni_modules版本一键更新升级，高效便捷
- 【兼容性】（ NVUE / VUE ）兼容安卓，iOS，微信小程序，H5，QQ小程序，百度小程序，支付宝小程序，头条小程序
- 【阿里字体图标库】360+ 阿里字体图标，图标统一风格，满足大部分场景需求
- 【精选组件】组件功能丰富，多端兼容（ NVUE / VUE ）
- 【全局挂载】支持nvue全局挂载，js自动注册全局挂载功能
- 【页面布局】众多的常用页面和布局，开箱即用
- 【配置驱动】以.dnvue 配置文件为中心的配置项目结构，配置方式帮助您全局管理与管理常用资源
- 【工具库】众多常用js小工具，让您开发过程中事半功倍

### 官方文档

[DNVUE UI 官方文档](https://dnvue.dengqichang.cn)：https://dnvue.dengqichang.cn

### 交流反馈

DNVUE UI QQ交流群 : 871507982

### 码云地址

[https://gitee.com/dqc/public-dnvue-ui](https://gitee.com/dqc/dnvue-ui)

### 插件市场地址

[DNVUE UI 插件市场](https://ext.dcloud.net.cn/plugin?id=4303)

### 安装教程

#### 下载地址

插件市场下载地址：[DNVUE UI](https://ext.dcloud.net.cn/plugin?id=4303)

#### 开发环境

- [Hbuilder X](https://www.dcloud.io/hbuilderx.html)的<strong>APP开发版</strong>
- [scss/sass编译编译插件](https://ext.dcloud.net.cn/plugin?name=compile-node-sass)

#### 安装

在[uni-app插件市场](https://ext.dcloud.net.cn/plugin?id=4303)选择 `使用Hbuilder X导入插件` 导入到项目中

#### 配置

1. main.js中配置
```js
// 全局挂载
import config from '@/uni_modules/dnvue-ui/config.js'
Vue.prototype.$store = config
```

2. 下载 `.dnvue` 目录文件放置项目目录下（与uni_modules目录同级）  [.dnvue目录文件下载](https://dnvue.dengqichang.cn/file/js/.dnvue.rar)
```
┌─.dnvue          //.dnvue 目录
├─pages 
├─static 
├─uni_modules
├─App.vue           
├─main.js        //第一步main.js配置
├─manifest.json 
├─pages.json  
└─uni.scss
```

#### ***配置完成，使用愉快~^o^~***

### 版本升级

在项目 `uni_modules` 目录下的 `dnvue-ui` 目录，鼠标右键选择 `从插件市场更新` 即可  
  
升级前建议开发者先查看[更新日志](http://dnvue.dengqichang.cn/component/log.html)与[升级指南](http://dnvue.dengqichang.cn/component/upgrade_guide.html)的版本更新内容，以便开发者了解最新版本动态。

### 版权信息

`DNVUE UI` 遵循 `MIT` 开源协议，完全开源免费。