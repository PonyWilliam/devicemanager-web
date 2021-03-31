let config = {};
//引入dnvue-ui
let requireAll = require.context('@/uni_modules/dnvue-ui/js', false, /\.js$/)
requireAll.keys().map(requireAllKey => {
	const requireAllName = requireAllKey.replace(/(\.\/|\.js)/g, '')
	config[requireAllName] = requireAll(requireAllKey).default || requireAll(requireAllKey)
})

//引入common
try {
	let requireCommonAll = require.context('@/.dnvue/common', false, /\.js$/)
	requireCommonAll.keys().map(requireAllKey => {
		const requireAllName = requireAllKey.replace(/(\.\/|\.js)/g, '')
		if(Object.keys(config).indexOf(requireAllName) == -1){
			config[requireAllName] = requireCommonAll(requireAllKey).default || requireCommonAll(requireAllKey);
		}else{
			config[requireAllName] = Object.assign(config[requireAllName],requireCommonAll(requireAllKey).default || requireCommonAll(requireAllKey));
		}
	})
} catch (e) {
	//TODO handle the exception
	//console.error("dnvue-ui作者温馨提醒：如需js支持全局挂载功能，请在项目下新建.dnvue/common文件夹，当前文件夹下的所有js将支持自动全局挂载，如无需则可忽略")
}

//引入vuex
try {
	let requireVuexAll = require.context('@/.dnvue/vuex', false, /\.js$/)
	requireVuexAll.keys().map(requireAllKey => {
		const requireAllName = requireAllKey.replace(/(\.\/|\.js)/g, '')
		config[requireAllName] = requireVuexAll(requireAllKey).default || requireVuexAll(requireAllKey)
	})
} catch (e) {
	//TODO handle the exception
	//console.error("dnvue-ui作者温馨提醒：如需使用vuex状态管理，请在项目下新建.dnvue/vuex文件夹，在vuex文件夹下进行处理，如无需则可忽略")
}

export default config
