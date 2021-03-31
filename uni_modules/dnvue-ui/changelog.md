## 1.0.6（2021-03-12）
- 【优化】`<n-badge>` 数字角标组件
- 【优化】`<n-page>` 页面组件全局配置内置改为自定义
- 【优化】`<n-text>` 文本组件，添加@click点击事件
- 【修复】`n-rich-text` 富文本 `width` 参数无效问题
- 【新增】`n-sticky` 吸顶组件，此组件用于滑动吸顶场景使用，[传送门](https://dnvue.dengqichang.cn/component/layout_component/n-sticky.html)
- 【新增】`<n-swiper>` 轮播图组件，此组件一般用于导航轮播，广告展示等场景，[传送门](https://dnvue.dengqichang.cn/component/layout_component/n-swiper.html)
- 【新增】`n-tabbar` 自定义底部导航栏组件，此组件一般用于应用底部导航功能，可动态渲染自定义底部导航栏，[传送门](https://dnvue.dengqichang.cn/component/layout_component/n-tabbar.html)
- 【新增】`<n-html>` 扩展富文本组件，般用于富文本解析，例如新闻内容、文章内容、评论显示、推广信息等各类HTMl标签内容显示，[传送门](https://dnvue.dengqichang.cn/component/other_component/n-html.html)

## 1.0.5（2021-03-08）
**【BUG】**  
- 修复辅助样式CLASS的错误内容
## 1.0.4（2021-03-08）
**【BUG】**
- 修复组件内使用自定义颜色值时无效的BUG  

**【组件】**
- 新增 `n-text` 文本组件，[传送门](https://dnvue.dengqichang.cn/component/basic_component/n-text.html)
- 新增 `n-loading` 上拉加载组件，[传送门](https://dnvue.dengqichang.cn/component/layout_component/n-loading.html)

**【CLASS】**
- 新增多端兼容辅助样式CLASS，帮助开发者更快速，更有效的多端兼容。，[传送门](https://dnvue.dengqichang.cn/class/)
## 1.0.3（2021-03-03）
- 调整 `n-popup` 弹出层，direction（弹出方向）默认参数值为 `bottom`
- 调整 `n-mask` 遮罩层，mask-close（击遮罩层是否可关闭）默认参数值为 `false`
- 添加 `n-status-bar` 状态栏组件文档
- 添加 `n-popup` 弹出层文档
- 添加 `n-mask` 遮罩层文档
## 1.0.2（2021-03-03）
文档地址：http://dnvue.dengqichang.cn
## 1.0.1（2021-03-03）
***欢迎各位小伙伴使用，快来提出您宝贵的建议反馈吧~^o^~***  
***交流反馈QQ群：871507982***
## 1.0.0（2021-03-02）
## 20210303 - version 1.0.0
### [NVUE] 兼容平台
- √ ：兼容
- ○ ：未测试  

| APP			| H5			| 微信小程序		| 支付宝小程序	| 百度小程序		|QQ小程序		| 字节跳动小程序 |
| :------------:| :------------:| :------------:| :------------:| :------------:| :------------:|:------------:	|
| √				| √				| √				|√				|√				|√				|√				|
### [NVUE] 全局挂载
- 支持nvue全局挂载，实现以nvue页面全局统一开发的模式
- 支持js自动注册挂载，无需手动引入
### 全局配置
可在 `.dnvue/common/`下配置部分组件内的全局属性，详细查看对应组件的文档说明
### 系统级色彩体系
系统级色彩体系同样源于「自然」的设计价值观。设计师通过对自然场景的抽象捕捉，结合蚂蚁的技术基因，形成了特有的 12 色。进一步又通过大量的观察，捕捉不同色彩在自然光下的变化规律，借助美术中素描的思路，对 12 个颜色进行了衍生。在中性色板的定义上，则是平衡了可读性、美感以及可用性得出的。
### [NVUE] 更新组件
- n-image（图片）
- n-icon（图标）
- n-badge（数字角标）
- n-button （按钮）
- n-page （页面）
- n-empty （为空展示）
- n-rich-text （富文本）
- n-mask （遮罩层）
- n-popup （弹出层）
