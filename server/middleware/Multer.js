const multer=require('multer');
const path=require('path');

//configure storage 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ path.extname(file.originalname));
    }
});

//filter for image file 
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'|| file.mimetype==='image/png'){
        cb(null,true);
    }else{
        cb(new Error('Only Jpeg or png are alowed'),false);
    }
};

//initialize multer
const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*1},
    fileFilter:fileFilter
});
module.exports=upload;