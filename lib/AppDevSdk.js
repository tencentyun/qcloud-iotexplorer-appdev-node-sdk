const CryptoJS = require("crypto-js");
const axios = require('axios');
const shortid = require('shortid');

class AppDevSdk {
	constructor({
		AppKey,
		AppSecret,
	}) {
		this.AppKey = AppKey;
		this.AppSecret = AppSecret;
	}

	async requestAppApi(Action, reqData = {}, options = {}) {
		const requestOpts = {
			method: 'POST',
			url: 'https://iot.cloud.tencent.com/api/exploreropen/appapi',
			...options,
		};

		if (!reqData.RequestId) {
			reqData.RequestId = shortid();
		}

		requestOpts.data = this.assignSignature({
			Action,
			...reqData,
		});

		const { status, statusText, data: response = {} } = await axios(requestOpts);

		if (status !== 200) {
			return Promise.reject({ code: status, msg: statusText });
		}

		const { code, msg, data = {} } = response;

		if (code) {
			return Promise.reject({ code, msg });
		}

		if (data.Error) {
			return Promise.reject({ code: data.Error.Code, msg: data.Error.Message });
		}

		return data;
	}

	assignSignature(data) {
		const Timestamp = Math.floor(Date.now() / 1000);
		const Nonce = Math.floor((10000 * Math.random())) + 1; // 随机正整数

		data = Object.assign({}, data, {
			Timestamp,
			Nonce,
			AppKey: this.AppKey,
		});

		let keys = Object.keys(data).sort();
		let arr = [];
		for (const key of keys) {
			arr.push(key + '=' + data[key]);
		}
		const paramString = arr.join('&');

		const hash = CryptoJS.HmacSHA1(paramString, this.AppSecret);
		const signature = CryptoJS.enc.Base64.stringify(hash);

		return {
			...data,
			Signature: signature,
		};
	};
}

module.exports = AppDevSdk;