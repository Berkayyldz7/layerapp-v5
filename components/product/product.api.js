const express = require("express");
const { createProduct, getAllProducts, updateProduct, deleteProduct, uploadProductImage } = require("./product.controller");

const productSchema = require("./product.validation")
const productValidationMw = require("./product.valid.middleware")
const accessAdminToken = require("../admin/admin.auth")

const router = express.Router()



// api for products

router.route("/").get(getAllProducts)

router.route("/").post(productValidationMw(productSchema),accessAdminToken,createProduct)
router.route("/upload-product-image").post(accessAdminToken,uploadProductImage)

router.route("/:id").patch(accessAdminToken,updateProduct)

router.route("/:id").delete(accessAdminToken,deleteProduct)

module.exports = router