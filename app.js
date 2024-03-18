//const fs = require('fs')
//fs.mkdirSync("./Crud");
//fs.writeFileSync("First.txt", "Hello, I am unesh and I love to code in node js !");
//fs.appendFileSync("First.txt", "I not just only love to code in node js but i also like to built different projects in node ");
//const a = fs.readFileSync("First.txt", "utf-8")
//console.log(a);
//fs.renameSync("First.txt", "New.txt")

const express = require('express')
const app = express()
const fs = require('fs')
const conncetToDatabase = require('./database/index.js')
const Book = require('./model/bookModel.js')

//multerConfig imports
const {multer,storage}= require('./middleware/multerConfig.js')
const upload = multer({storage})


//CORS Package
const cors = require('cors')

app.use(cors({
    origin : '*'
}))


app.use(express.json())

conncetToDatabase()

app.get("/",(req,res)=>{
 
    res.status(200).json({
        message : "Success"
    })
})

// create book
app.post("/book", upload.single("img"),async(req,res)=>{

    let fileName;
    if(!req.file){
        fileName="https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
    }else{
        fileName = "http://localhost:3004/" + req.file.filename
    }
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body //Destructuring
    await Book.create({
         bookName,
         bookPrice,
         isbnNumber,
         authorName,
         publishedAt,
         publication,
         imageUrl : filename
        })
    res.status(201).json({
     message : "Book Created Successfully"
    })
 })

// all read
app.get("/book",async (req,res)=>{
    const books = await Book.find() // return array ma garxa 
    res.status(200).json({
        message : "Books fetched successfully",
        data : books
    })
})

// single read
app.get("/book/:id",async(req,res)=>{
    const id = req.params.id
   const book = await Book.findById(id) // return object garxa
   if(!book) {
    res.status(404).json({
        message : "Nothing found"
    })
   }else{
    res.status(200).json({
        message : "Single Book Fetched Successfully",
        data : book
    })
   } 
})


//delete operation
app.delete("/book/:id", async (req, res)=>{
    const id = req.params.id
   await Book.findByIdAndDelete(id)
   res.status(200).json({
    message : "Book Deleted successfully"
   })
})

//update operations

app.patch("/book/:id", async(req,res)=>{
    const id = req.params.id
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body

    const oldDatas = await Book.findById(id)
    let fileName;
    if(req.file){
        const oldImagePath = oldDatas.imageUrl
        console.log(oldImagePath)
        const localHostUrlLength = "http://localhost:3004/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        console.log(newOldImagePath)
        fs.unlink(`storage/${newOldImagePath}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File Deleted Successfully")
            }
        })
        fileName = "http://localhost:3004/"+ req.file.filename
    }
   await Book.findByIdAndUpdate(id,{
         bookName,
         bookPrice,
         isbnNumber,
         authorName,
         publishedAt,
         publication
        })
        res.status(200).json({
            message: "Book updated successfully"
        })
})


app.use(express.static("./storage")) //important line (it allows client to read file)


app.listen(3004, () => {
    console.log("Node js Server has started at port 3004")
})


//app.get("/",(req, res)=>{
//res.send("Hello world")
//})

/*app.get("/home",(req, res)=>{
    res.send("Hello world")
})*/



/*app.listen(3000, ()=>{
    console.log("K xa muji haru")
})*/



