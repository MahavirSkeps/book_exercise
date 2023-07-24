const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Book = require('./models/book')
const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter);
app.use(bookRouter)



app.listen(port, ( )=>{
    console.log("server is running at 3000 port", + port);
})

