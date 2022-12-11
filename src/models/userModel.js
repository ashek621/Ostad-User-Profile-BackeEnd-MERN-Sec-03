const  mongoose = require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const crypto=require('crypto')

const userSchema=mongoose.Schema({

        FirstName:{

            type:String,
            required: [true,"Please provide your first name!"],
            trim:true,
            minLength:[3,"Name must be at least 3 characters!"],
            maxLength:[30,"Please provide a name under 30 characters."]

         },

        LastName:{

            type:String,
            required: [true,"Please provide your last name!"],
            trim:true,
            minLength:[3,"Name must be at least 3 characters!"],
            maxLength:[30,"Please provide a name under 30 characters."]

        },

         UserName:{

            type:String,
             required:[true,"Please provide your username!"],
             trim:true,
             unique: true,
             lowercase: true,
          },

        Email:{
            type:String,
            validate:[validator.isEmail,"Provide Valid Email"],
            trim:true,
            unique:true,
            lowercase:true,
            required:[true,"Email is Required!"]
        },

        Password:{

            type:String,
            required:[true,"Password is required!!"],
            validate:{
                validator : (value)=>{
                    validator.isStrongPassword(value,{

                        minLength:6,
                        maxLength:50,
                        minLowercase:3,
                        minNumbers:1,
                        minUppercase:2,
                        minSymbols:1,
                    })

                },
                message: "This Password is not strong enough."
            }
        },

        ConfirmPassWord:{

            type:String,
            required:[true,"Please Confirm your password."],
            validate:{
                validator:function(value){

                   return value ===this.Password;
                },
                message:"Don't match this password,please try again!"
            },
        },


        ContactNumber:{

            type:String,
            validate:{
                validator:function (value){
                    return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/ ;
                },
                message: "Please provide a Bangladeshi Contact Number! "
            }
        }
},
    {timestamps:true,versionKey:false})

const userModel=mongoose.model('Profiles' ,userSchema);
module.exports=userModel;