const express =require('express');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const customer=require('./models/Coustomer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port =5000;

const MONGO_URI=process.env.mongo_uri;
const jwt_secret=process.env.jwt_secret_key;


mongoose.connect(MONGO_URI)
.then(()=>console.log("mongo atlas is connected succesfully"))
.catch(err =>console.log("Error connecting in mongo",err));

// middleware to parse jason 
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to backend");
});

//customer sign up 
app.post('/customersignup',async(req,res)=>{
    const {name,email,password,contact,address,city,state,postalCode,country,gender}=req.body;

    try{
        if(!name || !email || !password || !address || !city || !state || !postalCode || !country){
            return res.status(400).json({message:'All feilds are required.'});
        }

        const existingEmail = await customer.findOne({email});
        const existingContact = await customer.findOne({contact});
        if(existingContact || existingEmail){
            return res.status(409).json({message:'User already exist.'});
        }
        //hashing the password 
        const saltRound =10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        //new customer 

        const newCustomer = new customer({
            name,
            email,
            password:hashedPassword,
            contact,
            address,
            city,
            state,
            postalCode,
            country,
            gender,
        });
        await newCustomer.save();

        //generate a json web token 
        const token = jwt.sign({id:newCustomer._id,email:newCustomer.email},jwt_secret,{expiresIn:'1d'});

        res.status(201).json({
            message:'customer registered successfully',
            customer:{id:newCustomer._id,name:newCustomer.name,email:newCustomer.email},token,
        })
    }catch(err){
        console.log("Error during signup",err);
        res.status(500).json({message:"internal server error."});
    }
}) ;


//login endpoint

app.post('/login', async(req,res)=>{
    const {emailorContact,password}=req.body;


    try{
        if(!emailorContact || !password){
            return res.status(400).json({message:"All the fields are required."});
        }

        const user=await customer.findOne({
            $or:[{email:emailorContact},{conatact:emailorContact}]
        });
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }


        // generate json web token 
        const token = jwt.sign(
            {id:user._id,email:user.email}, jwt_secret,{expiresIn:'1d'}
        );
        res.status(200).json({
            message:"Login successfull",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }, token 
        });
    }catch(err){
        console.error("error in login",err);
        res.status(500).json({message:"Internal server failed"});
    }

});
//server start 
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});