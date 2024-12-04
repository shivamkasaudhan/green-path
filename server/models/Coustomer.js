const mongoose=require('mongoose');

const customerSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    contact:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator :function(value){
                return /^\d{10}$/.test(value);
            },
            message:'Invalid contact no. It should be 10 digits.'
        }
    },
    address :{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    postalCode:{type:String,required:true},
    country:{type:String,required:true},
    gender:{type:String}
},{timestamps:true});

module.exports= mongoose.model('customer',customerSchema);