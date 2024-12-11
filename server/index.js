const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors=require('cors');
const customer = require('./models/Coustomer');
const farmer = require('./models/Farmer');
const blogs = require('./models/Blogs');
const products = require('./models/product');
const admin = require('./models/Admin');
const upload = require('./middleware/Multer');
const jwt = require('jsonwebtoken');
const Admin = require('./models/Admin');
require('dotenv').config();

const app = express();
const port = 5000;

const MONGO_URI = process.env.mongo_uri;
const jwt_secret = process.env.jwt_secret_key;

mongoose.connect(MONGO_URI)
    .then(() => console.log("mongo atlas is connected succesfully"))
    .catch(err => console.log("Error connecting in mongo", err));

// middleware to parse jason 
app.use(cors({
    origin:'http://localhost:3003',
    methods:['get','post'],
    credentials:true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to backend");
});

//authenticator middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired Token" });
    }
};

//customer sign up 
app.post('/customersignup', async (req, res) => {
    const { name, email, password, contact, address, city, state, postalCode, country, gender } = req.body;

    try {
        if (!name || !email || !password || !address || !city || !state || !postalCode || !country) {
            return res.status(400).json({ message: 'All feilds are required.' });
        }

        const existingEmail = await customer.findOne({ email });
        const existingContact = await customer.findOne({ contact });
        if (existingContact || existingEmail) {
            return res.status(409).json({ message: 'User already exist.' });
        }
        //hashing the password 
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        //new customer 

        const newCustomer = new customer({
            name,
            email,
            password: hashedPassword,
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
        const token = jwt.sign({ id: newCustomer._id, email: newCustomer.email }, jwt_secret, { expiresIn: '1d' });

        res.status(201).json({
            message: 'customer registered successfully',
            customer: { id: newCustomer._id, name: newCustomer.name, email: newCustomer.email }, token,
        })
    } catch (err) {
        console.log("Error during signup", err);
        res.status(500).json({ message: "internal server error." });
    }
});

// farmmer signup
app.post('/farmersignup', async (req, res) => {
    const { name, email, age, password, contact, prefferedLanguage, address, city, state, postalCode, country, gender, farmSize, sector, category, crop } = req.body;

    try {
        if (!name || !email || !password || !address || !city || !state || !postalCode || !country || !age || !farmSize || !sector || !category || !crop || !prefferedLanguage) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingEmail = await farmer.findOne({ email });
        const existingContact = await farmer.findOne({ contact });
        if (existingContact || existingEmail) {
            return res.status(409).json({ message: 'User already exist.' });
        }
        //hashing the password 
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);
        //new farmer 

        const newFarmer = new farmer({
            name,
            email,
            age,
            password: hashedPassword,
            contact,
            prefferedLanguage,
            address,
            city,
            state,
            postalCode,
            country,
            gender,
            farmSize,
            sector,
            category,
            crop
        });
        await newFarmer.save();

        //generate a json web token 
        const token = jwt.sign({ id: newFarmer._id, email: newFarmer.email }, jwt_secret, { expiresIn: '1d' });

        res.status(201).json({
            message: 'Farmer registered successfully',
            customer: { id: newFarmer._id, name: newFarmer.name, email: newFarmer.email }, token,
        })
    } catch (err) {
        console.log("Error during signup", err);
        res.status(500).json({ message: "internal server error." });
    }
});

//farmer login 
app.post('/farmerlogin', async (req, res) => {
    const { emailorContact, password } = req.body;


    try {
        if (!emailorContact || !password) {
            return res.status(400).json({ message: "All the fields are required." });
        }

        const user = await farmer.findOne({
            $or: [{ email: emailorContact }, { conatact: emailorContact }]
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        // generate json web token 
        const token = jwt.sign(
            { id: user._id, email: user.email }, jwt_secret, { expiresIn: '1d' }
        );
        res.status(200).json({
            message: "Login successfull",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }, token
        });
    } catch (err) {
        console.error("error in login", err);
        res.status(500).json({ message: "Internal server failed" });
    }

});

//login endpoint
app.post('/login', async (req, res) => {
    const { emailorContact, password } = req.body;


    try {
        if (!emailorContact || !password) {
            return res.status(400).json({ message: "All the fields are required." });
        }

        const user = await customer.findOne({
            $or: [{ email: emailorContact }, { conatact: emailorContact }]
        });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }


        // generate json web token 
        const token = jwt.sign(
            { id: user._id, email: user.email }, jwt_secret, { expiresIn: '1d' }
        );
        res.status(200).json({
            message: "Login successfull",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }, token
        });
    } catch (err) {
        console.error("error in login", err);
        res.status(500).json({ message: "Internal server failed" });
    }

});

//fetch user
app.get('/userinfo', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the JWT token

        // Fetch the user from the database
        const user = await customer.findById(userId, '-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({
            message: 'User info retrieved successfully',
            user,
        });
    } catch (err) {
        console.error('Error fetching user info:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//fetch farmer info 
app.get('/farmerinfo', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the JWT token

        // Fetch the user from the database
        const user = await farmer.findById(userId, '-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'farmer not found!' });
        }

        res.status(200).json({
            message: 'User info retrieved successfully',
            user: user
        });
    } catch (err) {
        console.error('Error fetching farmer info:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

//add blog
app.post('/addblogs', async (req, res) => {
    const { title_english, title_hindi, image, discription_english, discription_hindi, content_english, content_hindi } = req.body;
    try {
        if (!title_english || !title_hindi || !discription_english || !discription_hindi || !content_english || !content_hindi || !image) {
            return res.status(400).json({ messge: 'all fields are required.' });
        }
        const title = {
            english: title_english,
            hindi: title_hindi
        };
        const discription = {
            english: discription_english,
            hindi: discription_hindi
        };
        const content = {
            english: content_english,
            hindi: content_hindi
        };

        const newBlog = new blogs({ title, image, discription, content });
        const savedBlog = await newBlog.save();
        res.status(201).json({
            message: 'Blog added successfully.',
            blog: savedBlog
        });
    } catch (err) {
        console.log("Error in adding blog");
        res.status(500).json({ message: "internal server error" });
    }
});

//get blog 
app.get('/blogs', async (req, res) => {
    try {
        const blog = await blogs.find();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Eroor in fetching blogs' }, err);
    }
})

// get a single blog
app.get('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: "Error in fetching this blog" }, err);
    }

});

//add products 
app.post('/addproduct', authenticateUser, upload.single('image'), async (req, res) => {
    const { title, description, price, quantity } = req.body;
    const farmerId = req.user.id;
    try {
        if (!title || !description || !price || !quantity || !req.file) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newProduct = new products({
            title,
            description,
            image: req.file.path,
            price,
            quantity,
            farmerId
        });
        await newProduct.save();
        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct
        });

    } catch (err) {
        res.status(500).json({ message: 'internal server error.' });
    }
});

//fetch farmers products 
app.get('/myproducts', authenticateUser, async (req, res) => {
    try {
        const farmerId = req.user.id;
        const productList = await products.find({ farmerId });
        if (productList.length === 0) {
            return res.status(404).json({ message: 'No product found' });
        }
        res.status(200).json({
            message: 'product retrieved successfully',
            products: productList
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }

});

// fetch products 
app.get('/products', async (req, res) => {
    try {
        const productList = await products.find();
        res.status(200).json({
            message: 'Product retrieved successfully',
            list: productList
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server error' });
    }
});

//fetch a single product 
app.get('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error.' });
    }

});

//admin signup 
app.post('/admin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:'All fields are required.'});
        }
        const saltRound=10;
        const hashedPassword=await bcrypt.hash(password,saltRound);
        const newAdmin=new Admin({
            email,password:hashedPassword
        });
        await newAdmin.save();
        res.status(200).json({message:'Admin added successfully'});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
});

//admin login
app.post('/adminlogin',async (req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:'All field are required'});
        }
        const user=await admin.findOne({email});
        if(!user){
            return res.status(404).json({message:"Admin not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid password"});
        }
        res.status(200).json({
            message:"Login Successfull",
            admin:{
                id:user._id,
                email:user.email
            }
        });
    }catch(err){
        console.error("Login Failed",err);
        res.status(500).json({message:'internal server failed'});
    }
});

//order 

//server start 
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});