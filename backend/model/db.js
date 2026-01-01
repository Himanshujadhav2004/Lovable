const mongoose = require('mongoose');
require("dotenv").config();

main().catch(err => console.log(err));

async function main() {
    try{
  await mongoose.connect(process.env.DATABASE);
console.log("Connected !");
    }
    catch(err){
        console.log(err);
    }


}