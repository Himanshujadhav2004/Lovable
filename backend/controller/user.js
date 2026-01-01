const userschema= require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async(req,res)=>{
    const {email , password,name} = req.body;
const user = await userschema.findOne({email});

if(user){
    return res.status(404).json({message:"User Already Register"});
}

 const userdata = new userschema({email,password:await bcrypt.hash(password,10),name})

 await userdata.save();

 return res.status(201).json({message:"User has Register Successfully"});

}

exports.login = async (req,res)=>{

    const {email,password} = req.body;

    const user = await userschema.findOne({email});
    if(!user){
        return res.status(404).json({message:"User Not Found"});

    }
    
    const pass = await bcrypt.compare(password,user.password);
    if(!pass){
        return res.status(401).json({message:"Password is not Correct"});
    }

const token = jwt.sign({email:user.email},process.env.JWT,{expiresIn:'1h'});

return res.status(200).json({token:token,message:"User Login Succesfully"});

}