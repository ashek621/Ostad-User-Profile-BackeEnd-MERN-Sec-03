const express= require('express');
const app= new express();
const router=require("./src/routes/api")


//Security Middleware Import:-

const helmet= require('helmet');
const mongoSanitize= require('express-mongo-sanitize');
const rateLimit= require('express-rate-limit');
const xss= require('xss-clean');
const hpp= require('hpp');
const cors= require('cors');
const mongoose=require('mongoose');


//Security Middleware Implement:-

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(helmet())
app.use(mongoSanitize())

app.use(xss())
app.use(hpp())
app.use(cors())


//Rate-Limit:-

const limiter=rateLimit({

        windowMs:15*60*1000,
        max:1000
})

app.use(limiter);

//MongoDB DataBase Connection:-

let URI="mongodb://localhost:27017/Todo";
let options={user:"",pass:"",autoIndex:true}

mongoose.connect(URI,options,(err)=>{
    console.log("Connected to MongoDB DataBase.");
    console.log(err);
})


//API End Point:-

app.use("/api/v1",router)


//Undifined Route:-

app.use('*',(req,res)=>{

    res.status(404).json({status:"Fail",data:"Not Found"})

})




module.exports=app;

