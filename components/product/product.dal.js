const ProductModel = require("./product.model");
const { id } = require("./product.validation");

class ProductDal{
    constructor(products){
        this.products = products // this.products; req.body eşittir.
        //console.log("Product DAL' req || req.body =>",products)
    }
    findOneProduct(){
        //
    }
    getAllProducts(){
        // return ProductModel.find({})
        return ProductModel.find({}).populate({
            path : "user_id",
            select: "name email"
        })
    }
    createProduct(){
        // const {productName, productPrice, productImageUrl, productDescription} = this.products
        //this.products.body.user_id = this.products.admin?._doc._id // User || Admin ile product arasında ilişki kurmamızı sağlar.
        const user_id = this.products.admin.doc_id
        console.log("user_id", user_id)
        const {productName, productPrice, productImageUrl, productDescription} = this.products.body
        const createdProduct = ProductModel.create({productName, productPrice, productImageUrl, productDescription, user_id})
        return createdProduct
    }
    updateProduct(){

        const { id : productId } = this.products.params; // Controller'dan constructor'a req aldığımız için this.products; req eşittir.
        const {productName, productPrice, productImageUrl, productDescription} = this.products.body 
        const update = {productName : productName ,productPrice : productPrice, productImageUrl : productImageUrl, productDescription : productDescription}
        const updateProduct = ProductModel.findByIdAndUpdate({_id : productId}, update, {new:true, runValidators:true,})
        return updateProduct

        // const {productName, productPrice, productImageUrl, productDescription} = this.products 
        // const update = {productPrice : productPrice, productImageUrl : productImageUrl, productDescription : productDescription}
        // const updatedProduct = ProductModel.findOneAndUpdate({productName}, update, {new:true,upsert:true})
        // return updatedProduct
        
    
    }
    deleteProduct(){
        const { id : productId } = this.products;
        const deletedProduct = ProductModel.findByIdAndDelete({_id : productId})
        return deletedProduct
    }

    createProductImage(){
        //
    }
}

module.exports = ProductDal

// createProduct içerisinde bulanan user_id Populate işleminin bir parçasıdır.
// user_id bilgisi referans gösterilerek User Model şablonunda bulunan istediğimiz veriye erişim sağlayabiliriz.
// Hangi verinin getirileceği await .find() çağırdığımız yerde ( şu senaryo için product.dal)'da set edilir.
// User Model ile Product Model arasındaki ilişki JWT yardımıyla sağlanır.