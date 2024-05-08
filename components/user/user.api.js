const express = require("express");
const router = express.Router();

const {getUser, postUser, loginUser, updateUser, deleteUser, resetPasswordUser} = require("./user.controller");
const {schema, resetPasswordCheckSchema} = require("./user.validations");
const validationMiddleware = require("./user.middleware");
const authMiddleware = require("./user.auth.middleware");
const accessAdminMw = require("../admin/admin.auth")

router.route("/").get(authMiddleware,getUser) // Bu routes product bölümüne ait olacak.

router.route("/").post(validationMiddleware(schema),postUser)
router.route("/login").post(loginUser)

router.route("/:id").patch(updateUser);
router.route("/:id").delete(accessAdminMw,deleteUser);

router.route("/password-reset").post(validationMiddleware(resetPasswordCheckSchema), resetPasswordUser)

module.exports = router