# qcloud-iotexplorer-appdev-node-sdk

腾讯云物联网开发平台应用开发，服务端 NodeJS SDK，应用开发API文档：[https://cloud.tencent.com/document/product/1081/40773](https://cloud.tencent.com/document/product/1081/40773)

## 环境

依赖 NodeJS 8.x+

## 安装

```
npm install qcloud-iotexplorer-appdev-node-sdk
```

## 使用

```
const AppDevSdk = require('qcloud-iotexplorer-appdev-node-sdk');

const sdk = new AppDevSdk({ AppKey, AppSecret });

// 请求 AppApi
sdk.requestAppApi('AppGetTokenByWeiXin', { WxOpenID, NickName, Avatar });

// 单独使用签名算法
const dataWithSignature = sdk.assignSignature(data /* 请求参数 */);
```

## API

### sdk.requestAppApi(Action, reqData, options)

入参：

* {String} Action 需要调用的 api 名
* {Object} reqData api的请求参数
* {Object} options 其他请求参数，详细参见 [axios文档](https://github.com/axios/axios#axiosconfig)

响应：
* 成功：返回一个 resolve 的 Promise，内含api的数据响应，如：[AppGetTokenByWeiXin](https://cloud.tencent.com/document/product/1081/40781) 接口，成功的响应为:
```
{
    "Data": {
        "ExpireAt": 12345678,
        "Token": "xxxxxx"
    },
    "RequestId": "rest-client"
}
```
* 失败：返回一个 reject 的 Promise，数据结构为: 
```
{ 
    code: 'ErrorCode',
    msg: 'ErrorMsg'
}
```

### sdk.assignSignature(reqData)

入参:
* {Object} reqData 所有请求参数

响应:
* {Object} 加上签名的请求参数
