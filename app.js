const express = require("express");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const app = express();

const config = require("./components/config/index");
const connectDB = require("./components/data-access/db-connect/connect");
const {userRouter} = require("./components/user/user.api.index");
const productRouter = require("./components/product/product.api");


config()

app.use(express.json());
app.use(helmet());
app.use(fileUpload());

app.use("/api/v2",userRouter)
app.use("/api/v2/products", productRouter)

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>")
})

const start = async()=>{
    try {
        await connectDB()
    } catch (error) {
        console.log(error)
    }
    app.listen(process.env.PORT, ()=>{
        console.log(`the server listening on ${process.env.PORT}`);
    })
}

start()



