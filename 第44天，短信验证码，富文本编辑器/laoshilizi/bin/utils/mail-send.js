
// nodemailer模块，可以使用smtp协议发送邮件。
const nodemailer = require("nodemailer");

const smtp = require("nodemailer-smtp-transport");

// 邮箱账号配置
let config = smtp({
    service:"qq",
    auth:{
        user:"1193529870@qq.com",
        pass:"eqmybhhajowuhajj",
    }
})
// 创建发送邮件的对象

const mailSender = nodemailer.createTransport(config);

module.exports = mailSender;
