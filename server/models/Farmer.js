const mongoose = require('mongoose');
//refrence this website https://mkisan.gov.in/Home/FarmerRegistration
const farmerSchema= mongoose.Schema({
    name : {type:String, required:true},
    email:{type:String, required:true, unique:true},
    age:{type:String,required:true},
    password:{type:String, required:true},
    contact:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function(value){
                return /^\d{10}$/.test(value);
            },
            message:"It should be 10 digit"
        }
    },
    prefferedLanguage:{type:String},
    gender:{type:String,required:true},
    address:{type:String, required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    postalCode:{type:String,required:true},
    country:{type:String,required:true},
    farmSize:{type:String,required:true},
    sector:{type:String,required:true}, //agriculture,sugercane,dairing
    category:{type:String,required:true},
    crop:{type:String,required:true}
});

module.exports=mongoose.model('farmer',farmerSchema);