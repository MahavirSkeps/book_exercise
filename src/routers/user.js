const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')
const signupSchema = require('../schema/user_schema')
const logger = require('../logger')
const path = require('path')


router.post('/signup', async (req, res)=>{
    const { error, value } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    
    try{
        const user = new User(req.body);
        
        await user.save();
        const token = await user.generateAuthToken()
        const user1 = {};
        user1.name = user.name;
        user1.email = user.email;
        user1.role = user.role; 
        res.status(200).send({user1,token})
    } catch(e){
        console.log(e);
        res.status(400).send(e.message);
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(!user){
            throw Error("User not found")
        }
        const token = await user.tokens[0].token
        const user1 = {};
        user1.name = user.name;
        user1.email = user.email;
        user1.role = user.role; 
        res.status(200).json({
            "name":user.name,
            "email": user.email,
            "role" : user.role,
            "token" : token
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            "message": "invalid",
            "error" : e.message})
    }
})

router.get('/users', async (req, res)=>{
    const users = User.find({});
    try{
      return res.send( await users)
    }
    catch(e){
     return res.status(500).send(e)
    }
   
})
router.get('/user:id', async (req, res)=>{
    
    try{
        const user = await User.findOne(req.params.id);
        if(!user){
            return res.send("user not found").status(404)
        }
        res.send(user)
    }
    catch(e){
     return res.status(500).send(e)
    }
   
})





module.exports = router