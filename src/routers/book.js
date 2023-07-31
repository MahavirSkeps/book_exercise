const express = require('express')
const Book = require('../models/book');
const auth = require('../middleware/auth')
const router = new express.Router()
const addBookSchema = require('../schema/book_schema');
const order_schema = require('../schema/order_schema');
const logger = require('../logger')


router.get('/books',auth, async (req, res)=>{
    
    try{
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 2; // Default to 10 items per page if not provided

        const skip = (page - 1) * limit;
        const books = Book.find({}).limit(limit).skip(skip);
        res.send( await books).status(200)
    }
    catch(e){
     return res.status(400).send(e)
    }   
})

router.get('/books/:id',auth, async (req, res)=>{
    // console.log(req.params.id);
    const _id =req.params.id;

    if(req.role==='customer'){
        return res.status(400).send('You are not allowed to do this operation')
    }
    
    try{
        const book = await Book.findOne({_id})
        // console.log("book", book);
        if(!book){
            console.log(e);
            return res.send("book not found").status(404)
        }
        res.send(book)
    }
    catch(e){
     return res.status(500).send(e)
    }  
})

router.post('/add/book',auth, async(req,res)=>{
   
    const book = new Book(req.body);
    const { error, value } = addBookSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // console.log(req.role)
    if(req.role==='customer'){
        return res.status(400).send('You are not allowed to do this operation')
    }
    try{
        await book.save();
        res.send(book);
    } catch(e){

        res.status(400).send("error aa gyabbahi");
    }
})

router.put('/update/book/:id',auth, async(req,res)=>{
    const _id = req.params.id;    

    if(req.role==='customer'){
        return res.status(400).send('You are not allowed to do this operation')
    }
    try{
        const book = await Book.findOne({_id})
        if(!book){
            console.log(e);
            return res.status(404).send("book not found")
        }
        book.title = req.body.title
        book.author = req.body.author
        book.genre = req.body.genre
        book.price = req.body.price
        book.stock = req.body.stock
        await book.save()
        res.send(book);
    } catch(e){
       return  res.status(400).send("error aa gyabbahi");
    }
})

router.delete('/delete/book/:id?',auth, async (req, res)=>{
    // console.log(req.params.id);
    const _id =req.params.id;

    if(req.role==='customer'){
        return res.status(400).json({ error: "you are not allowed to do this operation" })
    }
    
    try{
        const book = await Book.findOne({_id})
        // console.log("book", book);
        if(book==null){
            return res.json({ error: "book not found" }).status(404)
        }
        await book.delete()
        res.send(book)
    }
    catch(e){
     return res.status(400).send(e.message)
    }  
})

//function of api heating 

const axios = require('axios');
const Transaction = require('../models/transaction');

async function makePostRequest(postData) {
  try {
    const response = await axios.post('https://stoplight.io/mocks/skeps/book-store:master/12094368/misc/payment/process', postData);
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}



// Buy Book



router.post('/buy/book/:id?',auth, async(req,res)=>{
    logger.info(`User ${req.user_id} is attempting to buy book  ${req.params.id}`)
    if(req.role!='customer' && req.role!='admin'){
        return res.status(403).send('You are not allowed to do this operation')
    }
    console.log("user_id", req.user_id);
    const _id =req.params.id;
    console.log("id_lenght",_id.length);
    if(_id.length<24 || _id.length>24){
     return res.status(411).json({ error: "enter valid id" });
    }
   

    // console.log(req.role)
   
    try{
        
        const book = await Book.findById(_id)
            if(book==null){
                // console.log(e.message);
                logger.warn(`user ${req.user_id} is attempting to buy book of this id: ${_id} which is not found`)
                return res.status(404).send("book not found")
            }
        const { error, value } = order_schema.validate(req.body);
    
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
      
       const order_Sch = req.body;
       if(order_Sch.count> book.stock){
        logger.warn(`user ${req.body.email} is attempting to buy book of id${_id} which is not in stock`)
       return  res.status(409).send("count should be less then stock try again")
    }
       console.log(order_Sch);
       const trans_req= {};
       trans_req.card_number = order_Sch.card_number;
       trans_req.cvv = order_Sch.cvv;
       trans_req.expiry = order_Sch.expiry;
       trans_req.currency = "USD";
       trans_req.amount = ((book.price)*(order_Sch.count))
    //    console.log("trans_req",trans_req);
       const responseData = await makePostRequest(trans_req);
    //    console.log('Response Data:', responseData.payment_id);
       const new_trans = new Transaction();
       new_trans.book_id = _id;
       new_trans.payment_id=  responseData.payment_id;
       new_trans.amount_paid = trans_req.amount;
       new_trans.count = order_Sch.count;
       new_trans.customer_id = req.user_id
       console.log("new_trans", new_trans);
       await new_trans.save();
       book.stock = book.stock - new_trans.count;
       await book.save();
    //    new_trans.customer_id = req.user_id;

     return  res.status(201).send({"new transaction":new_trans})

    } catch(e){
        console.log(e);
       return res.status(400).send(e);
    }
})

module.exports = router