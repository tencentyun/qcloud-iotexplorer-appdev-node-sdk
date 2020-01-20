# qcloud-iotexplorer-appdev-node-sdk

腾讯云物联网开发平台应用开发，服务端 NodeJS SDK，应用开发文档：[https://cloud.tencent.com/document/product/1081/40773](https://cloud.tencent.com/document/product/1081/40773)

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