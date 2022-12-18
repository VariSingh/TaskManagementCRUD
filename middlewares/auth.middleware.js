const jwt = require("jsonwebtoken");
const { JWT_ACCESS_TOKEN_SECRET } = require("../util/config");

exports.authenthorize = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    try{
        if(!token){
            res.status(401).json({message:"Unauthorized"});
        }else{
            const result = await jwt.verify(token,JWT_ACCESS_TOKEN_SECRET);
            console.log("result ",result);
            next();
        }
    }catch(error){
        console.log("error ",error);
        res.status(401).json({message:"Unauthorized"});
    }
    
    
}