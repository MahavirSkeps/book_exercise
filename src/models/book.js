
const mongoose = require('mongoose')
const Joi = require('joi');
// const validator = require('validator')


const Book = mongoose.model('Book', {
    title:{
        type: String,
        required: true,
        trim: true,
        
    },
    author:{
        type:String,
        required: true,
        lowercase: true,
        trim: true
    },
    genre:{
        type: String,
        default: "fiction",
        trim: true,
        lowercase: true
    },
    price:{
        type: Number,
        required:true,
        validate(value){
            if(value<0){
                throw Error('Price can not be negative')
            }

        }
    },
    stock:{
        type: Number,
        required:true,
        validate(value){
            if(value<0){
                throw Error('stock can not be negative')
            }
        }
    },
    

})

// const me = new Book({
//     title: '   Mahavireff hdjw  new kkkd',
//     author:'abc@amexMERAa.com',
//     genre: 'customer',
//     price: 10,
//     stock: 11
// })

// me.save().then(()=>{
//     console.log(me);

// }).catch((err)=>{
//     console.log(err);
// })

module.exports = Book
