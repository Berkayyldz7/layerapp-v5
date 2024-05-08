const cryptoJs = require("crypto-js");

const passwordToHash = (password)=>{
    return cryptoJs.HmacSHA1(password, process.env.SECRETKEY).toString()
}

module.exports = {
    passwordToHash
}