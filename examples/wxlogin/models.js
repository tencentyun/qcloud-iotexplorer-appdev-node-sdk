const CryptoJS = require("crypto-js");
const request = require('./libs/request');
const { wxAppId, wxAppSecret, appKey, appSecret } = require('./config');

exports.jscode2session = async (code) => {
	const { errcode, errmsg, ...data } = await request('https://api.weixin.qq.com/sns/jscode2session', {
		appid: wxAppId,
		secret: wxAppSecret,
		js_code: code,
		grant_type: 'authorization_code',
	});

	if (errcode) {
		return Promise.reject({ code: errcode, msg: errmsg });
	}

	return data;
};