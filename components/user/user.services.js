const UserDAL = require("./user.dal")
const {generateAccessToken, generateRefreshToken} = require("./user.auth")
const sendMail = require("./user.send.mail")


class UserService {

    constructor(usersReq) {
        this.usersReq = usersReq;
        this.userDAL = new UserDAL(this.usersReq);     
    }

    resetUserPassword(){
        const updatedPassword = this.userDAL.updatePassword()
        return updatedPassword
    //    return sendMail()
    }
    mailSend(){
         return sendMail();
    }
    
   async getUserById(id){
        return await this.userDAL.getUserById(id)
    }
    

    // findById(id) {
    //     const user = this.userDAL.findbyId(id);
    //     return user;
    // }
    // accessToken(loginUser){
    //     return generateAccessToken()
    // }
    // refreshToken(loginUser){
    //     return generateRefreshToken()
    // }
}

module.exports = UserService