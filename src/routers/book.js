const express = require('express')
const Book = require('../models/book');
const auth = require('../middleware/auth')
const router = new express.Router()
const addBookSchema = require('../schema/book_schema')


router.get('/books', async (req, res)=>{
    
    try{
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 2; // Default to 10 items per page if not provided

        const skip = (page - 1) * limit;
        const books = Book.find({}).limit(limit).skip(skip);
        res.send( await books)
    }
    catch(e){
     return res.status(500).send(e)
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
        res.status(400).send("error aa gyabbahi");
    }
})

router.delete('/delete/book/:id?',auth, async (req, res)=>{
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
        await book.delete()
        res.send(book)
    }
    catch(e){
     return res.status(500).send(e)
    }  
})

module.exports = router