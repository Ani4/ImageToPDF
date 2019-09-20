//all imports of module
const express = require("express");
const app = express();
const fs = require("fs");//help us to initialize ,open and etc the files
const multer = require("multer");//help us to upload all file to the server
const {TesseractWorker} = require("tesseract.js"); //help us to read images in files
const worker = new TesseractWorker();

//Storage for Uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./upload")
     },
    filename: (req, file,cb)=>{
    cb(null, file.originalname);
    }
});

const upload = multer ({storage: storage}).single("FileUploaded");



//ROUTE API
app.set("view engine","ejs");
app.use(express.static("public"));


app.get("/",(req,res)=>{
    // console.log(req)
    res.render("index");
}
);
app.post("/upload",(req,res)=>{
    upload(req,res,err=>{
        console.log(req.file);
        fs.readFile("./upload/"+req.file.originalname,(err,data)=>{
        if(err)return console.log("This is your error",err);

        worker.recognize(data,"eng",{tessjs_create_pdf:"1"})
        .progress(progress=>{
            console.log(progress)
        })
        .then(result=>{
            res.redirect('/download');
        })
        .finally(()=>worker.terminate());
    });
});
 });

 app.get('/download',(req,res,err)=>{
    const file=`${__dirname}/tesseract.js-ocr-result.pdf`;
     res.download(file);
 })
    

const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log("Hey Im here");
    
});









