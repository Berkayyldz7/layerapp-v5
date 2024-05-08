const mongoose = require("mongoose");
const { type } = require("../product/product.validation");
const { required } = require("joi");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "must provide a name"],
        trim: true,
        maxlength: [20, "name cannot length 20 characters"]

    },
    password:{
        type: String,
        required : [true, "please provide a password"],
        trim : true
    },
    email:{
        type: String,
        trim: true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        required : true
    }
    
}, {timestamps:true, versionKey:false})

module.exports = mongoose.model("User",UserSchema) // Populate ederken buradaki "User" kısmını; model içerisinde ki ref veririz.

// Populate etmekten kasıt şu ki; Product Model şemasıyla User Model şemasını birbirine bağlanmasıdır.
// Bunu yaparken JWT'den yardım aldık. Nasıl ? Bir middleware oluşturduk ve JWT'nin döndürdüğü veriyi req içine ekledik.
// Daha sonra Product Model şeması içerisine "user_id" isimli bir veri ekledik.
// Bu verinin veri tipi; mongoose.Types.ObjectId olarak girildi ve ref olarak burdaki "User" verildi.
// .find() metodunu çağırdığımız yerde (getAllProduct) .find().populate({ path : user_id, select : "name email"}) opsiyonu yazılır.
// path : Veri tip mongoose.Type.ObjectId olan şemedaki veridir.
// select : bağlantı kurulan şemadan hangi verileri seçmek istediğimizdir. 
