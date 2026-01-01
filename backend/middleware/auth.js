const jwt = require("jsonwebtoken");

exports.auth=(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res(404).json({message:"Token Missing"});
        }
        const token = authHeader.split(" ")[1];
        if(!token){
               return res(404).json({message:"Invalid Token"});
        }
        const decode = jwt.verify(token,"Himanshu");
        req.user =decode;

        next();
    }
       catch(err){
        console.log(err);
    }
}