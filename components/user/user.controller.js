const UserDAL = require("./user.dal")
const UserService = require("./user.services")

const UserModel = require("./user.model")
const { generateAccessToken, generateRefreshToken } = require("./user.auth")



const postUser = async(req,res)=>{
    try {
        const {name, password, email, isAdmin} = req.body
        console.log("req body", req.body)
        const users = await new UserDAL({name,password,email, isAdmin}).createUser()
        res.status(201).send({users})
        
    } catch (error) {
        res.status(500).send({"msg":error})
        console.log("anaskm")
    }
}


const getUser = async (req,res)=>{
    const users = new UserDAL()
    const user = await users.getAllData()
    res.status(200).send({user})
}

const loginUser = async (req,res)=>{
try {
    const {name,password} = req.body
    const loginUser = await new UserDAL({name,password}).getOneUser() 
    console.log(loginUser)
    if(!loginUser){
        return res.status(400).send({msg:"invalid password or username."})
    }
    // JWT Operations - 
    const signedUsers = {
        // Çok önemli mongodb'den gelen bir data aldığımız için bunu yapmazsak çalışmaz.
        tokens : {
            // access_token : new UserService().accessToken(loginUser),
            // refresh_token : new UserService().refreshToken(loginUser)
            access_token : generateAccessToken(loginUser),
            refresh_token : generateRefreshToken(loginUser)
        }
    }
    // delete loginUser.password
    console.log("tokenized_user:", signedUsers)
    res.status(200).send({loginUser})
} catch (error) {
    res.status(500).send({msg:"An error has come about at userLogin controller."})
}

}

const updateUser = async(req,res)=>{
    const updatedUser = await new UserDAL(req).updateUser();
    if(!updatedUser){
        return res.status(404).send({msg:"An error has come about updating user."})
    }
    res.status(200).send({updatedUser})
}

const deleteUser = async(req, res)=>{
    try {
        const deletedUser = await new UserDAL(req).deleteUser();
        if(!deletedUser){
            return res.status(404).send({msg:`There was not found user with user_id : ${req.params.id}`})
        }
        res.status(200).send({msg:`The user : ${req.params.id} was successfully deleted.`})
    } catch (error) {
        res.status(500).send({msg:error})
    }
}

const resetPasswordUser = async(req, res)=>{
    const resetedPassword = await new UserService(req).resetUserPassword();
    if(!resetedPassword){
        return res.status(404).send({msg:"the password has not been reseted properly. Please try again."})
    }
    new UserService().mailSend();
    res.status(201).send({resetedPassword});
}

module.exports = {
    getUser,
    postUser,
    loginUser,
    updateUser,
    deleteUser,
    resetPasswordUser
}


// export default class UserController {
//     constructor() {
//         this.userService = new UserService();
//     }
//    async getUser (req,res) {
//         try {
//             const {id} = req.param;
//             return this.userService.findById(id);
//         } catch (error) {
//             res.status(500).send({"msg":error})
//         }
//     }
       
// }



// const postUsers = async (req,res)=>{
//     try {
//         const {name} = req.body
//         console.log({name})
//         const users =  await UserModel.create({name})
//         res.status(201).send({users})
//     } catch (error) {
//         res.status(500).send({"msg":error})
//         console.log("anaskm")
//     }
// }

