/* ============================
	dnvue-ui的js工具文件
 ==============================*/
module.exports = {
	//dnvue-ui版本号
	version() {
		return '1.0.4'
	},
	//32位uuid
	uuid() {
		return `dxxxxxxxxxxxxxxxxxx${new Date().getTime()}`.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});;
	},
	//json赋值化
	jsonParse(e) {
		return JSON.parse(JSON.stringify(e))
	},
	//css转化为微信小程序可用
	toLine(name) {
		return name.replace(/([A-Z])/g, "-$1").toLowerCase();
	},
	//style转化为通用
	styleInto(str) {
		let styleObject = '';
		for (let i in str) {
			styleObject += i.replace(/([A-Z])/g, "-$1").toLowerCase() + ':' + str[i] + ';'
		}
		return styleObject;
	},
	//RGB转换为16进制
	colorHex(str) {
		if (/^(rgb|RGB)/.test(str)) {
			var aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
			var strHex = "#";
			for (var i = 0; i < aColor.length; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = str;
			}
			return strHex;
		} else if (reg.test(str)) {
			var aNum = str.replace(/#/, "").split("");
			if (aNum.length === 6) {
				return str;
			} else if (aNum.length === 3) {
				var numHex = "#";
				for (var i = 0; i < aNum.length; i += 1) {
					numHex += (aNum[i] + aNum[i]);
				}
				return numHex;
			}
		} else {
			return str;
		}
	},
	//16进制转换为RGB
	colorRgb(str) {
		// 16进制颜色值的正则
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		// 把颜色值变成小写
		var color = str.toLowerCase();
		if (reg.test(color)) {
			// 如果只有三位的值，需变成六位，如：#fff => #ffffff
			if (color.length === 4) {
				var colorNew = "#";
				for (var i = 1; i < 4; i += 1) {
					colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
				}
				color = colorNew;
			}
			// 处理六位的颜色值，转为RGB
			var colorChange = [];
			for (var i = 1; i < 7; i += 2) {
				colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
			}
			return "RGB(" + colorChange.join(",") + ")";
		} else {
			return color;
		}
	}

}
