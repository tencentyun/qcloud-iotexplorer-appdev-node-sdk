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

	async requestAppApi(Action, data = {}, options = {}) {
		const requestOpts = {
			method: 'POST',
			url: 'https://iot.cloud.tencent.com/api/exploreropen/appapi',
			...options,
		};

		if (!data.RequestId) {
			data.RequestId = shortid();
		}

		requestOpts.data = this.assignSignature({
			Action,
			...data,
		});

		return axios(requestOpts);
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