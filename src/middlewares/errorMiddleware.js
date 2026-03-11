const multer = require("multer");

const handle = (err, req, res, next) => {
    
    let msg = err.message || "Internal Server Error";
    let code = err.statusCode || 500;
    
    if(err instanceof multer.MulterError){
        msg = "File Size is too large"
        code = 400
    }

    console.error(err);

    res.status(code).send(msg);
}

module.exports = handle;