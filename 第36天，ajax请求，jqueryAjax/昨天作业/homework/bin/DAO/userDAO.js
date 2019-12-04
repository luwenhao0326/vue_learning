const connection = require("./connection.js");


const userDAO = {};


// 查询某个用户名是否存在
userDAO.findUserByAccount = function(account){
    return new Promise(function(resolve,reject){
        connection.execute(`SELECT * FROM user WHERE account='${account}'`,function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}







module.exports = userDAO;