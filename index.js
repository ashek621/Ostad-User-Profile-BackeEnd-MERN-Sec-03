const app = require("./app");


const dotenv=require('dotenv').config({path:'./config.env'});


app.listen(process.env.PORT,()=>{
    console.log("App is running on "+process.env.PORT+" Port.")
})
