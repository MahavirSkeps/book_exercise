// const {logger} = require("./logger") 
// const errorMailer = require('./mailer')

// async function errorHandler(err, req, res, next){
//     logger.error(err.stack)
//     let mail
//     try{
//         mail = await  errorMailer.sendMail({
//             from: 'mahavirgoyal32@gmail.com',
//             to: 'mahavir.goyal@skeps.com',
//             subject: 'RestAPI Error',
//             text : 'error in rest api please check buddy',
//             html: '<p>error in rest api please check buddy book store</p>'
//         })
//         logger.error(`Message Sent : ${mail.messageId}`)
//     }
//     catch(e){
//         logger.error(e)
//     }
//     res.status(500).json({message: "there was an internal servor error. please try again"})
// }

// module.exports = errorHandler;