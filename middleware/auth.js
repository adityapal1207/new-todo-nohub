const jwt=require('jsonwebtoken');
const config=require('config');
module.exports = (req,res,next) =>{
 //decoding  token from headers and verifying it 
 const token=req.header('Authorization');
 if(!token){
     return res.status(401).send({
         message:"autherization failed",
         status:false,
     });
 }
 //if   the token is present we  need verify it 
try{
const decoded=jwt.verify(token,config.get('jwtSecretCode'));
req.user=decoded.user;
next();
} catch(err){
    return res.status(400).send({
        message:"Token is not valid ",
        status :false
    })

}

}