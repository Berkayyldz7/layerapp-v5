const ProductDal = require("./product.dal")

class ProductService{
    constructor(){
        this.ProductDal = new ProductDal()
    }

    uploadProductImage(){
        // express-fileuplod; yüklenen dosyalarla ilgili bilgiler req.files oluşturur ve req'te ekler. 
        const productImage = this.ProductDal.createProduct();
    }
};

module.exports = ProductService