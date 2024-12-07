const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    quantity:{type:String,required:true},
    farmerId:{type:mongoose.Schema.Types.ObjectId,ref:'farmers',required:true}
});
module.exports=mongoose.model('products',ProductSchema);