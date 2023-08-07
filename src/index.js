const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Book = require('./models/book')
const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter);
app.use(bookRouter)


const temp = __dirname + "/../public"
// console.log(path.join(__dirname,'../public/login.html'))
app.use(express.static(temp));

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,'../public/dashboard.html'))
})  

app.listen(port, ( )=>{
    console.log("server is running at 3000 port", + port);
    
})



