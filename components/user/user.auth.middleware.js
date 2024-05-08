const JWT = require("jsonwebtoken");

const authenticateToken = (req,res,next)=>{
    const autHeader = req.headers["authorization"];
    const authToken = autHeader?.split(" ")[1];
    if(authToken === null){
        return res.status(400).send({msg:"Unauthorizated token please login first."})
    }

    JWT.verify(authToken, process.env.JWT_ACCESS_TOKEN, (err,user)=>{
        if(err){
            return res.status(400).send({err:"The token invalid or can not been no more used."})
        }
        req.user = user
        console.log("User-JWT-Mw was worked.",user)
        next();
    })
}

module.exports = authenticateToken