const multer = require('multer')

 const storage =  multer.diskStorage({
    destination : function(req, file, callback ){
        //console.log(file)
        const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg' ]
        if(!allowedFileTypes.includes(file.mimetype)){
            cd(new Error("This filetype is not supported")) //cb(error)
            return
        }
        callback(null, './storage') //cb(error, success)
    },
    filename : function(req,file,callback){
        callback(null, Date.now()+ "-" + file.originalname)
    }
})

module.exports = {
    storage,
    multer
}