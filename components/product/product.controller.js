const ProductDal = require("./product.dal");
const ProductService = require("./product.services");
const path = require("path");

const getAllProducts = async (req,res)=>{
    const products = await new ProductDal().getAllProducts()
    res.status(200).send({products})
}

const createProduct = async (req, res)=>{
    // console.log("req.admin code line 32 at admin.auth.js ",req.admin)
    // req.body.user_id = req.admin?._doc._i
    const createdProduct =  await new ProductDal(req).createProduct()
    res.status(201).send({product: createdProduct})
}

const uploadProductImage = async(req,res)=>{
    const uploadedProductImage = req?.files?.product_image // product_image; postmande resim gönderirken verdiğimiz key adıdır.
    if(!uploadedProductImage){
        return res.status(404).send({msg:"There is no such a file or directory."})
    }
    const fileName = uploadedProductImage.name;
    const savePath = path.join(__dirname, "product.uploads", fileName);

    uploadedProductImage.mv(savePath, (err)=>{
        if(err){
            return res.status(500).send({msg:"An error has come about during upload file."})
        }
    });
    console.log("uploaded files =", req.files);
    res.status(201).send({msg:"everythings ok"});
}

const updateProduct = async (req, res)=>{
    const updatedProduct = await new ProductDal(req).updateProduct()
    if(!updateProduct){
        return res.status(404).send({"msg":`there is no product with id : ${req.body?.productName}`})
    }
    res.status(200).send({updatedProduct})
}

const deleteProduct = async (req,res)=>{
try {
    const deletedProduct = await new ProductDal(req.params).deleteProduct()
    if(!deleteProduct){
        return res.status(404).send({"msg":`there is no product with id : ${req.params?.id}`})
    }
    res.status(200).send({deletedProduct})
} catch (error) {
    res.status(500).send({msg:error})
}
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage
}