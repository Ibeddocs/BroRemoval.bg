import multer from "multer";


// creating multer
const storage = multer.diskStorage({
    filename : function (req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`);
    }



})

const upload = multer({storage})




export default upload  // export the multer function