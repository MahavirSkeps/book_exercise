
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/book_stock',{
}).then(()=>{
    console.log("connected to api");
}).catch((err)=>{
    console.log("not connected");
})




