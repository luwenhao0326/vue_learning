const qcloudSMS = require("qcloudsms_js");

// 相当于连接腾讯云的账号密码
const appid = "1400138340";
const appkey =  "d165b739ad909be7ed77e3502d18489b";

const qc = qcloudSMS(appid,appkey);

const smsSender = qc.SmsSingleSender();

module.exports = smsSender;