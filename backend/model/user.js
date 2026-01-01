
const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true}
})

// exports.userschema = mongoose.model("user",UserSchema);

module.exports=mongoose.model("user",UserSchema);