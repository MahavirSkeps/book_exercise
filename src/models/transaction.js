
const mongoose = require('mongoose')
const Joi = require('joi');
// const validator = require('validator')


const Transaction = mongoose.model('Transaction', {
    payment_id:{
        type: String,
        required: true,
        trim: true, 
    },
    book_id:{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Book'
         },
    customer_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    count:{
        type: Number,
        required:true,
        validate(value){
            if(value<0){
                throw Error('count can not be negative')
            }
        }
    },
    amount_paid: {
        type: Number
    }
    

})
module.exports = Transaction;
