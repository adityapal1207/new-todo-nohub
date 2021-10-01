const mongoose=require('mongoose');
const config =require('config');
const db=config.get('mongoURI');

const connectDb= async () =>{
    try{
        await mongoose.connect(db,{
           // useNewUrlParse:true,
        //useCreateIndex:true,

        });
         console.log('mongodbb connected');
        

    }catch(err){
      console.log('mongodb not connected' ,err);
    process.exit(1);
    }
}

module.exports = connectDb;