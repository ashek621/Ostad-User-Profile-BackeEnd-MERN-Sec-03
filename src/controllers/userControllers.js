const userModel = require("../models/userModel");


//Registration:-

exports.UserSignUp=(req,res)=>{

    let reqBody=req.body;

    userModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err})
        }
        else{
            res.status(200).json({status:"Successful",data:data})
        }
    })
};

//LogIn:-

exports.UserLogIn=(req,res)=>{

    let UserName=req.body['UserName']
    let Password=req.body['Password']

    userModel.find({UserName:UserName,Password:Password},(err,data)=>{

                    if(err){
                    res.status(400).json({Status:"Fail", Data:err})
                }
                else {
                    if(data.length>0){
                        res.status(200).json({Status:"Successfully logged in!", Data:data})
                    }
                    else {

                        res.status(401).json({Status:"Unathuoraised", Data:err})

                    }
                }
    })

};

//Change Password:=

exports.ChangePassword=(req,res)=>{
    let UserName=req.headers['UserName'];
    let reqBody=req.body;

    userModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(err,data)=>{
        if(err){
            res.status(400).json({status:"Password not changed!! ",data:err})
        }
        else{
            res.status(200).json({status:"Password Change Successfully!",data:data})
        }
    })
};