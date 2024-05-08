
const { id } = require("../product/product.validation");
const { passwordToHash } = require("./user.crypto");
const UserModel = require("./user.model");
const uuid = require("uuid");


class UserDAL {
    constructor(usersData){
        this.usersData = usersData
        // usersData; req.body'e eşittir.

    }

    async getAllData(where){
        try {
        //    const user = await UserModel.find({})
        //    return user
            return UserModel.find(where)
        } catch (error) {
            console.log("An error has come about at user.dal.js Line 9")
            throw error
        }
    }
    getOneUser(where){
        // if("berkay" === this.usersData.name){ // Koşul yazmaya şu aşamada ihtiyaç yok ama admin kontrolü için var
        //     return UserModel.findOne({name:"berkay"})
        // }      
        const userDataName = this.usersData.name
        const userDataPassword = passwordToHash(this.usersData.password) // db'ye kayıt açılırken parolayı hash'lediğimiz için burdaka şayet hash'leme yapmazsak arattığımız parolayla eşleşmez.
        return UserModel.findOne({name:userDataName, password:userDataPassword})
        
    }
    async getUserById(id){
        const user = await UserModel.findById({ _id : id})
        return user
       
    }
    createUser(){
        try {
            const name = this.usersData.name
            const password = passwordToHash(this.usersData.password)
            const email = this.usersData.email
            const isAdmin = this.usersData.isAdmin
            // const pasword = this.userPassword
            const createdUser = UserModel.create({name,password,email, isAdmin})
            console.log(name,password)
            return createdUser
        } catch (error) {
            console.log("An error has come about at user.dal.js Line 18")
            throw error
        }
    }
    updateUser(){
        const {id : userId} = this.usersData.params;
        const {name, email} = this.usersData.body
        const password = passwordToHash(this.usersData.body.password)
        const update = {name, password, email}
        const updatedUser = UserModel.findByIdAndUpdate({_id : userId}, update, {new:true, runValidators:true,})
        return updatedUser
    }
    updatePassword(){
        const {email} = this.usersData.body
        const password = passwordToHash(this.usersData.body.password)
        const update = {password : password}
        const updatedPassword = UserModel.findOneAndUpdate({email}, update, {new:true, upsert:true})
        return updatedPassword
    }
    deleteUser(){
        const {id : userId} = this.usersData.params;
        const deletedUser = UserModel.findByIdAndDelete({_id : userId})
        return deletedUser
    }
}

module.exports = UserDAL