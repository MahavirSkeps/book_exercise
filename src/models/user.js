const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,

    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is not valid')
               
            }
        }

    },
    role:{
        type: String,
        default: "customer",
        validate(value){
            if (value!=='customer' && value!='admin'){
                throw new Error('Enter the defined roles')

            }
            if (value==='admin'){
                throw new Error('you not have the right to choose your role admin')
            }
        }

    },
    password:{
        type: String,
        required:true,
        trim: true,
        validate(value){
            if(value.length<6){
                throw Error ('size must be greater then 6')
            }
            if(value==="password"){
                throw Error("password must not be password")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'mahavir')
    // console.log(token)

    // console.log(user);
    user.tokens = user.tokens.concat({ token })
    // console.log(user);
    await user.save()
    return token

}




userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {

        throw new Error('Unable to login')
    }
    return user
}





//userSchema.pre('save', async function (next) {
//    const user = this
//     if (user.isModified('password')) {

//         user.password = await bcrypt.hash(user.password, 8)

//     }
//     next()

// })
// const me = new User({
//     name: '   Mahavireff hdjw  new kkkd',
//     email:'abc@amexMERAa.com',
//     role: 'customer',
//     password: 'passworgd'
// })

// me.save().then(()=>{
//     console.log(me);

// }).catch((err)=>{
//     console.log(err);
// })

const User=mongoose.model('User',userSchema)
module.exports = User;
