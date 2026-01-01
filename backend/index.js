
const express = require("express");
require("dotenv").config();
require("./model/db")
const cors = require("cors");
const app = express();
const userouter = require("./router/user")
app.get('/',(req,res)=>{
res.send("Himanshu Hi")
})

app.use(cors());
app.use(express.json());

app.use('/user',userouter)
app.listen(process.env.PORT);