const JWT = require("jsonwebtoken");
const UserService = require("../user/user.services");

// const accessAdminToken = (req,res,next)=>{
//     const authHeader = req.headers["authorization"]
//     const authToken = authHeader?.split(" ")[1]
//     if(authToken === null){
//         return res.status(400).send({msg:"the token is unvalid. Please login by being admin."})
//     }
//     JWT.verify(authToken, process.env.JWT_ACcESS_TOKEN, (err,user)=>{
//         if(err){
//             return res.status(400).send({"msg":"The token invalid or can not been no more used."})
//         }
//         req.user = user
//         console.log(user, "an error has occured admin.auth middleware")
//         next()
//     })
// }

// module.exports = accessAdminToken

const accessAdminToken = async (req,res,next)=>{
    const autHeader = req.headers["authorization"];
    const authToken = autHeader?.split(" ")[1];
    if(authToken === null){
        return res.status(400).send({msg:"Unauthorizated token please login first by being admin."})
    }

    JWT.verify(authToken, process.env.JWT_ACCESS_TOKEN, async (err,admin)=>{
        if(err){
            return res.status(400).send({err:"The token invalid or can not been no more used."})
        }

        console.log(admin)

        // req.user = user?._doc | diyebiliriz ve bu şekilde req objesine şu an ki user'ı yada admini ekleriz.

        const id = admin?.doc_id

        const user = await  new UserService().getUserById(id)
        console.log("admin =",admin)
        console.log("req.body=", req.body)
        console.log(user);
        if(user.isAdmin){
            // req.admin = user
            req.admin = admin  // Populate işlemi için gerekli adım. 
            next();
        }else{
            return res.status(400).send({msg:"If you want to carry on this process you have to be an admin."})
        }
    })
}

module.exports = accessAdminToken

// Burada req.user = user olayı inanılmaz önemlidir çünkü bize şu anki user'ı verir. 
// Şöyle düşün; user yada admin bir product'ı favorilerine almış olsun. Hnagi user'ın hangi ürünü beğendiğini bu yolla bağlayabiliriz.
// req.user = user?._doc dersek sadece user'a şu anki durumda producta ait bilgileride dönebiliriz. Gereksiz bilgiden kurtuluruz.

// req.admin = admin şeklinde güncelleme yap. ( (err,user )=>...) kısmındaki user'ı ve 32. satırı güncellemeyi unutma
// product.dal.js içerisinde create içerisinde user'ı admin diye değiştirmeyi unutma 