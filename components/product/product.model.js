
const mongoose = require("mongoose")
const { type } = require("./product.validation")
const { ref } = require("joi")

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true, "must be provided a product name"],
        trim : true,
        maxLength : [45, "product name cannot be longer than 45 characters."]
    },
    productPrice : {
        type : String,
        required : [true, "product must included a price value"],
        trim : true,
    },
    productImageUrl : {
        type : String,
        required : [true, "product must had an image url's "],
        trim : true
    },
    productDescription : {
        type : String,
        required : [true, "product must be had an description"],
        trim :true
    },
    user_id : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
})

module.exports = mongoose.model("Products", productSchema)

// Populate için ref : User Model şemasını aldı. Burdaki User şemanın adıdır.